import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { buildDeliveryNotes, generateOrderNumber, isValidDeliveryTime } from '@/lib/utils'

type OrderPayloadItem = {
  productId: string
  quantity: number
  fruitChoices?: string[]
  bowlConfigId?: string | null
  product: { price: number; name: string }
  bowlConfig?: { price: number; size: string } | null
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = (await request.json()) as {
      items: OrderPayloadItem[]
      deliveryAddress: string
      deliveryPhone: string
      deliveryNotes?: string | null
      deliveryTime?: string | null
      paymentMethod: 'CASH' | 'WAVE' | 'ORANGE_MONEY'
      addressId?: string | null
      deliveryZoneId?: string | null
      deliveryFee?: number
    }
    const {
      items,
      deliveryAddress,
      deliveryPhone,
      deliveryNotes,
      deliveryTime,
      paymentMethod,
      addressId,
      deliveryZoneId,
      deliveryFee: deliveryFeeFromClient = 0,
    } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    if (!deliveryTime || !isValidDeliveryTime(deliveryTime)) {
      return NextResponse.json({ error: 'Invalid delivery time' }, { status: 400 })
    }

    // Vérifier que tous les produits existent encore dans la DB
    const nonBowlItems = items.filter(item => !item.bowlConfigId)
    if (nonBowlItems.length > 0) {
      const productIds = nonBowlItems.map(item => item.productId)
      const existingProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, name: true },
      })
      const existingIds = new Set(existingProducts.map(p => p.id))
      const missing = nonBowlItems.filter(item => !existingIds.has(item.productId))
      if (missing.length > 0) {
        const names = missing.map(m => m.product.name).join(', ')
        return NextResponse.json(
          { error: `Produit(s) non disponible(s): ${names}. Veuillez vider votre panier et recommencer.` },
          { status: 400 }
        )
      }
    }

    // Calculer le sous-total
    let subtotal = 0
    for (const item of items) {
      if (item.bowlConfig) {
        subtotal += item.bowlConfig.price * item.quantity
      } else {
        subtotal += item.product.price * item.quantity
      }
    }

    // Récupérer la zone de livraison si elle existe
    let deliveryZone = null
    if (deliveryZoneId) {
      deliveryZone = await prisma.deliveryZone.findFirst({
        where: { id: deliveryZoneId, isActive: true },
        select: { name: true, number: true, price: true },
      })
      if (!deliveryZone) {
        return NextResponse.json({ error: 'Invalid delivery zone' }, { status: 400 })
      }
    }

    const deliveryFee = deliveryZone?.price ?? (deliveryZoneId ? 0 : deliveryFeeFromClient)
    const totalAmount = subtotal + deliveryFee

    const finalDeliveryNotes = buildDeliveryNotes(deliveryTime, deliveryNotes)

    // Créer la commande
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id,
        orderNumber: generateOrderNumber(),
        totalAmount,
        deliveryAddress,
        deliveryPhone,
        deliveryNotes: finalDeliveryNotes,
        addressId,
        deliveryZoneId,
        deliveryFee,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.bowlConfig ? item.bowlConfig.price : item.product.price,
            fruitChoices: item.fruitChoices || [],
            bowlConfigId: item.bowlConfigId,
          })),
        },
        payment: {
          create: {
            method: paymentMethod,
            amount: totalAmount,
            status: 'PENDING',
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        deliveryZone: {
          select: {
            name: true,
            number: true,
            price: true,
          },
        },
      },
    })

    // Vider le panier si l'utilisateur est connecté
    if (session?.user?.id) {
      await prisma.cartItem.deleteMany({
        where: {
          cart: {
            userId: session.user.id,
          },
        },
      })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
