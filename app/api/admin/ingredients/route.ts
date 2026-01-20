import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const ingredients = await prisma.ingredient.findMany({
      orderBy: [{ type: 'asc' }, { name: 'asc' }],
    })

    return NextResponse.json(ingredients)
  } catch (error) {
    console.error('Error fetching admin ingredients:', error)
    return NextResponse.json({ error: 'Failed to fetch ingredients' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, type, price, isPremium, isAvailable } = body

    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        type,
        price: parseFloat(price) || 0,
        isPremium: isPremium ?? false,
        isAvailable: isAvailable ?? true,
      }
    })

    return NextResponse.json(ingredient)
  } catch (error) {
    console.error('Error creating ingredient:', error)
    return NextResponse.json({ error: 'Failed to create ingredient' }, { status: 500 })
  }
}
