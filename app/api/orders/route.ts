import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'

type OrderPayloadItem = {
  productId: string
  quantity: number
  fruitChoices?: string[]
  bowlConfigId?: string | null
  product: { price: number }
  bowlConfig?: { price: number } | null
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = (await request.json()) as {
      items: OrderPayloadItem[]
      deliveryAddress: string
      deliveryPhone: string
      deliveryNotes?: string | null
      paymentMethod: 'CASH' | 'WAVE' | 'ORANGE_MONEY'
      addressId?: string | null
    }
    const {
      items,
      deliveryAddress,
      deliveryPhone,
      deliveryNotes,
      paymentMethod,
      addressId,
    } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Calculer le total
    let totalAmount = 0
    for (const item of items) {
      if (item.bowlConfig) {
        totalAmount += item.bowlConfig.price * item.quantity
      } else {
        totalAmount += item.product.price * item.quantity
      }
    }

    // Créer la commande
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id,
        orderNumber: generateOrderNumber(),
        totalAmount,
        deliveryAddress,
        deliveryPhone,
        deliveryNotes,
        addressId,
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
