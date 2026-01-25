import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'FAILED'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { orderNumber } = await params

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: {
          product: true,
          bowlConfig: {
            include: {
              ingredients: {
                include: {
                  ingredient: true,
                },
              },
            },
          },
        },
      },
      payment: true,
      user: true,
      deliveryZone: {
        select: {
          name: true,
          number: true,
          price: true,
          quartiers: true,
        },
      },
    },
  })

  if (!order) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(order)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { orderNumber } = await params
  const body = await req.json()
  const { status, payment } = body as {
    status?: OrderStatus
    payment?: {
      status?: PaymentStatus
      reference?: string
      notes?: string
    }
  }

  const updated = await prisma.order.update({
    where: { orderNumber },
    data: {
      ...(status ? { status } : {}),
      ...(payment
        ? {
            payment: {
              update: {
                ...(payment.status ? { status: payment.status } : {}),
                ...(payment.reference !== undefined
                  ? { reference: payment.reference }
                  : {}),
                ...(payment.notes !== undefined ? { notes: payment.notes } : {}),
                ...(payment.status === 'CONFIRMED' ? { confirmedAt: new Date() } : {}),
              },
            },
          }
        : {}),
    },
    include: {
      items: { include: { product: true } },
      payment: true,
    },
  })

  return NextResponse.json(updated)
}
