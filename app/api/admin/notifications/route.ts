import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Récupérer les nouvelles commandes (créées dans les dernières 24h, non livrées)
    const recentOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Dernières 24h
        },
        status: {
          notIn: ['DELIVERED', 'CANCELLED'],
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
          take: 1,
        },
        payment: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })

    // Récupérer les nouveaux abonnements (créés dans les dernières 24h)
    const recentSubscriptions = await prisma.subscription.findMany({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Dernières 24h
        },
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })

    // Compter les commandes en attente de paiement
    const pendingPaymentsCount = await prisma.order.count({
      where: {
        payment: {
          status: 'PENDING',
        },
        status: {
          notIn: ['DELIVERED', 'CANCELLED'],
        },
      },
    })

    return NextResponse.json({
      orders: recentOrders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.payment?.status,
        createdAt: order.createdAt,
        customerName: order.user
          ? (order.user.firstName && order.user.lastName
              ? `${order.user.firstName} ${order.user.lastName}`
              : order.user.email)
          : 'Invité',
        itemPreview: order.items[0]?.product.name || 'Commande',
      })),
      subscriptions: recentSubscriptions.map(sub => ({
        id: sub.id,
        customerName: sub.user.firstName && sub.user.lastName
          ? `${sub.user.firstName} ${sub.user.lastName}`
          : sub.user.email,
        goal: sub.goal,
        mealPlan: sub.mealPlan,
        createdAt: sub.createdAt,
      })),
      pendingPaymentsCount,
      newOrdersCount: recentOrders.length,
      newSubscriptionsCount: recentSubscriptions.length,
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}
