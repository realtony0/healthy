import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { BowlConfig as BowlConfigPayload } from '@/components/bowl/BowlBuilder'

type BowlIngredientPayload = BowlConfigPayload['selectedIngredients'][number]
type AddToCartBody = {
  productId?: string
  productSlug?: string
  quantity?: number
  fruitChoices?: string[]
  bowlConfig?: BowlConfigPayload
}

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if (!userId) {
      return NextResponse.json({ items: [] })
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
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
      },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
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
        },
      })
    }

    return NextResponse.json(cart)
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const body = (await request.json()) as AddToCartBody
    const { productId, productSlug, quantity, fruitChoices, bowlConfig } = body

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let finalProductId = productId

    if (!finalProductId && productSlug) {
      const product = await prisma.product.findUnique({
        where: { slug: productSlug }
      })
      if (product) {
        finalProductId = product.id
      }
    }

    if (!finalProductId) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    let cart = await prisma.cart.findUnique({
      where: { userId },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      })
    }

    // Créer le bowl config si nécessaire
    let bowlConfigId = null
    if (bowlConfig) {
      const createdBowlConfig = await prisma.bowlConfig.create({
        data: {
          size: bowlConfig.size,
          price: bowlConfig.totalPrice,
          ingredients: {
            create: bowlConfig.selectedIngredients.map((item: BowlIngredientPayload) => ({
              ingredientId: item.ingredientId,
              quantity: item.quantity,
            })),
          },
        },
      })
      bowlConfigId = createdBowlConfig.id
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: finalProductId,
        quantity: quantity || 1,
        fruitChoices: fruitChoices || [],
        bowlConfigId,
      },
      include: {
        product: true,
        bowlConfig: true,
      },
    })

    return NextResponse.json(cartItem)
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get('itemId')

    if (!userId || !itemId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing from cart:', error)
    return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 })
  }
}
