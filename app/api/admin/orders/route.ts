import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'FAILED'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') as OrderStatus | null
  const paymentStatus = searchParams.get('paymentStatus') as PaymentStatus | null

  const orders = await prisma.order.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(paymentStatus
        ? {
            payment: {
              is: { status: paymentStatus },
            },
          }
        : {}),
    },
    include: {
      items: {
        include: {
          product: true,
          bowlConfig: true,
        },
      },
      payment: true,
      user: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 200,
  })

  return NextResponse.json(orders)
}
