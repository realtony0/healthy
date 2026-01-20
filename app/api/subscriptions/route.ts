import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { addDays } from 'date-fns'
import { sendWhatsAppNotification, formatSubscriptionNotification } from '@/lib/whatsapp'

const ADMIN_PHONE = '221785987143'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      goal,
      mealPlan,
      duration,
      startDate,
      deliveryAddress,
      deliveryPhone,
      paymentMethod,
      price,
    } = body

    const start = new Date(startDate)
    const end =
      duration === 'SEVEN_DAYS' ? addDays(start, 7) : addDays(start, 28)

    // Créer l'abonnement
    const subscription = await prisma.subscription.create({
      data: {
        userId: session.user.id,
        goal,
        mealPlan,
        duration,
        startDate: start,
        endDate: end,
        price,
        status: 'ACTIVE',
      },
      include: {
        user: true,
      },
    })

    // Créer le paiement
    await prisma.subscriptionPayment.create({
      data: {
        subscriptionId: subscription.id,
        method: paymentMethod,
        amount: price,
        status: 'PENDING',
      },
    })

    // Notification Client
    if (session.user.phone || deliveryPhone) {
      await sendWhatsAppNotification({
        to: session.user.phone || deliveryPhone,
        message: formatSubscriptionNotification(
          subscription.id,
          start,
          end
        ),
      })
    }

    // Notification Admin
    try {
      const adminMessage = `⭐ *NOUVEL ABONNEMENT !*
      
*Client:* ${session.user.name} (+221 ${deliveryPhone})
*Formule:* ${mealPlan}
*Objectif:* ${goal}
*Période:* Du ${start.toLocaleDateString('fr-FR')} au ${end.toLocaleDateString('fr-FR')}
*Montant:* ${price.toLocaleString('fr-FR')} FCFA
*Paiement:* ${paymentMethod}

_Gérer l'abonnement : https://healthy.sn/mmb22115/abonnements/${subscription.id}_`

      await sendWhatsAppNotification({
        to: ADMIN_PHONE,
        message: adminMessage
      })
    } catch (notifError) {
      console.error('Failed to send admin notification:', notifError)
    }

    return NextResponse.json(subscription)
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
            bowlConfig: true,
          },
        },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}
