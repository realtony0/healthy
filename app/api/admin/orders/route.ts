import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'FAILED'

export const revalidate = 0 // Force dynamic

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') as OrderStatus | null
  const paymentStatus = searchParams.get('paymentStatus') as PaymentStatus | null
  const page = parseInt(searchParams.get('page') || '1')
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100) // Max 100 par page
  const skip = (page - 1) * limit

  const where = {
    ...(status ? { status } : {}),
    ...(paymentStatus
      ? {
          payment: {
            is: { status: paymentStatus },
          },
        }
      : {}),
  }

  // Optimisation : compter et récupérer en parallèle
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      select: {
        id: true,
        orderNumber: true,
        status: true,
        totalAmount: true,
        deliveryAddress: true,
        deliveryPhone: true,
        createdAt: true,
        items: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                name: true,
              },
            },
          },
        },
        payment: {
          select: {
            method: true,
            status: true,
            reference: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.order.count({ where }),
  ])

  return NextResponse.json({
    orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
}
