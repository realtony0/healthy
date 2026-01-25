import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        { error: 'Code requis' },
        { status: 400 }
      )
    }

    const adminCode = process.env.ADMIN_CODE

    if (!adminCode) {
      console.error('ADMIN_CODE not configured in environment variables')
      return NextResponse.json(
        { error: 'Configuration manquante' },
        { status: 500 }
      )
    }

    if (code === adminCode) {
      return NextResponse.json({ valid: true })
    } else {
      return NextResponse.json(
        { valid: false, error: 'Code incorrect' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Error verifying admin code:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
