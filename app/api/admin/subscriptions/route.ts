import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
    const skip = (page - 1) * limit

    const where = {
      ...(status ? { status } : {}),
    }

    const [subscriptions, total] = await Promise.all([
      prisma.subscription.findMany({
        where,
        select: {
          id: true,
          status: true,
          mealPlan: true,
          goal: true,
          price: true,
          startDate: true,
          endDate: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          payments: {
            select: {
              status: true,
              method: true,
            },
            take: 1,
            orderBy: { createdAt: 'desc' },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.subscription.count({ where }),
    ])

    return NextResponse.json({
      subscriptions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching admin subscriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}
