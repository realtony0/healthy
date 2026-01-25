import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'
import { sendWhatsAppNotification } from '@/lib/whatsapp'

const ADMIN_PHONE = '221785987143'

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
      paymentMethod,
      addressId,
      deliveryZoneId,
      deliveryFee = 0,
    } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Calculer le total (sous-total + frais de livraison)
    let subtotal = 0
    for (const item of items) {
      if (item.bowlConfig) {
        subtotal += item.bowlConfig.price * item.quantity
      } else {
        subtotal += item.product.price * item.quantity
      }
    }
    const totalAmount = subtotal + deliveryFee

    // Récupérer la zone de livraison si elle existe
    let deliveryZone = null
    if (deliveryZoneId) {
      deliveryZone = await prisma.deliveryZone.findUnique({
        where: { id: deliveryZoneId },
        select: { name: true, number: true, price: true },
      })
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

    // Notification Admin via WhatsApp
    try {
      const itemsList = items.map(it => `- ${it.quantity}x ${it.product.name}${it.bowlConfig ? ` (Bowl ${it.bowlConfig.size})` : ''}`).join('\n')
      const subtotal = totalAmount - deliveryFee
      const paymentMethodLabel = paymentMethod === 'CASH' ? 'Espèces' : paymentMethod === 'WAVE' ? 'Wave' : 'Orange Money'
      
      const userName = session?.user?.firstName && session?.user?.lastName
        ? `${session.user.firstName} ${session.user.lastName}`
        : session?.user?.email?.split('@')[0] || 'Invité'
      
      let message = `🔔 *NOUVELLE COMMANDE !*\n\n`
      message += `*Numéro:* #${order.orderNumber}\n`
      message += `*Client:* ${userName} (+221 ${deliveryPhone})\n`
      if (session?.user?.email) {
        message += `*Email:* ${session.user.email}\n`
      }
      message += `\n*📍 Livraison:*\n`
      message += `Adresse: ${deliveryAddress}\n`
      if (order.deliveryZone) {
        message += `Zone: ${order.deliveryZone.name} (Zone ${order.deliveryZone.number})\n`
      }
      if (deliveryNotes) {
        message += `Notes: ${deliveryNotes}\n`
      }
      message += `\n*🛒 Produits:*\n${itemsList}\n`
      message += `\n*💰 Montant:*\n`
      message += `Sous-total: ${subtotal.toLocaleString('fr-FR')} FCFA\n`
      if (deliveryFee > 0) {
        message += `Livraison: ${deliveryFee.toLocaleString('fr-FR')} FCFA\n`
      }
      message += `*Total: ${totalAmount.toLocaleString('fr-FR')} FCFA*\n`
      message += `\n*💳 Paiement:*\n`
      message += `Méthode: ${paymentMethodLabel}\n`
      message += `Statut: En attente\n`
      message += `\n_Gérer : https://healthy.sn/mmb22115/commandes/${order.orderNumber}_`
      
      await sendWhatsAppNotification({
        to: ADMIN_PHONE,
        message: message
      })

      await sendWhatsAppNotification({
        to: ADMIN_PHONE,
        message: message
      })
    } catch (notifError) {
      console.error('Failed to send admin notification:', notifError)
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
