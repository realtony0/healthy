'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Trash2, ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

type CartItem = {
  id: string
  productId: string
  quantity: number
  fruitChoices: string[]
  bowlConfigId: string | null
  product: { id: string; name: string; price: number }
  bowlConfig: null | { id: string; price: number }
}

type Cart = {
  id: string
  items: CartItem[]
}

export default function PanierPage() {
  const { data: session } = useSession()
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetchCart()
    } else {
      // Pour les invités, on récupère le panier depuis le localStorage
      const guestCart = localStorage.getItem('healthy_guest_cart')
      if (guestCart) {
        setCart(JSON.parse(guestCart))
      }
      setLoading(false)
    }
  }, [session])

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart')
      const data = await response.json()
      setCart(data as Cart)
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (itemId: string) => {
    if (session) {
      try {
        await fetch(`/api/cart?itemId=${itemId}`, { method: 'DELETE' })
        fetchCart()
      } catch (error) {
        console.error('Error removing item:', error)
      }
    } else {
      // Pour les invités, on supprime du localStorage
      const guestCartJson = localStorage.getItem('healthy_guest_cart')
      if (guestCartJson) {
        const guestCart = JSON.parse(guestCartJson)
        guestCart.items = guestCart.items.filter((it: any) => it.id !== itemId)
        localStorage.setItem('healthy_guest_cart', JSON.stringify(guestCart))
        setCart(guestCart)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-14 md:pt-16 pb-32 container-wide flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-100 border-t-[#1a472a] rounded-full animate-spin" />
      </div>
    )
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-14 md:pt-16 pb-32 container-wide flex flex-col items-center justify-center text-center space-y-8">
        <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-200">
          <ShoppingBag size={48} />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-[#1a472a]">Panier vide</h1>
          <p className="text-gray-500 font-medium max-w-sm">Il semblerait que vous n&apos;ayez pas encore choisi de délicieux repas.</p>
        </div>
        <Link href="/menu" className="btn btn-primary btn-lg px-12">
          Découvrir le menu
        </Link>
      </div>
    )
  }

  const total = cart.items.reduce((sum: number, item) => {
    const itemPrice = item.bowlConfig ? item.bowlConfig.price : item.product.price
    return sum + itemPrice * item.quantity
  }, 0)

  return (
    <div className="pt-14 md:pt-16 pb-32 bg-[#fffdfa]">
      <div className="container-wide">
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="food-badge">Récapitulatif</div>
          <h1 className="text-5xl font-black tracking-tight text-[#1a472a]">Votre Panier</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => (
              <div key={item.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-8 group">
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#1a472a] transition-colors">{item.product.name}</h3>
                    {item.bowlConfig && (
                      <span className="inline-block bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-100">Bowl sur mesure</span>
                    )}
                  </div>
                  
                  {item.fruitChoices && item.fruitChoices.length > 0 && (
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {item.fruitChoices.map(fruit => (
                        <span key={fruit} className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg italic">
                          + {fruit}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                      Quantité: <span className="text-gray-900 ml-1">{item.quantity}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-2xl font-black text-[#1a472a] italic font-serif">
                    {formatPrice((item.bowlConfig ? item.bowlConfig.price : item.product.price) * item.quantity)}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-12 h-12 rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center shadow-inner"
                    aria-label="Supprimer"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 sticky top-32">
            <div className="bg-[#1a472a] p-10 rounded-[3.5rem] text-white shadow-2xl shadow-emerald-900/30 space-y-10 relative overflow-hidden">
              <div className="space-y-6 relative z-10">
                <h2 className="text-2xl font-black uppercase tracking-widest text-emerald-400/60">Résumé</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center font-bold text-lg text-emerald-50">
                    <span>Sous-total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg text-emerald-50">
                    <span>Livraison</span>
                    <span className="text-emerald-400/60 uppercase text-xs tracking-widest italic">À calculer</span>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                  <span className="text-sm font-bold uppercase tracking-widest text-emerald-400/60">Total produits</span>
                  <span className="text-5xl font-black italic font-serif leading-none">{formatPrice(total)}</span>
                </div>
                <p className="text-xs font-bold text-emerald-400/60 text-center italic pt-2">+ Frais de livraison selon la zone</p>
              </div>
              
              <Link
                href="/checkout"
                className="btn bg-white text-[#1a472a] w-full py-6 text-xl font-black shadow-2xl shadow-black/20 flex items-center justify-center gap-3 group relative z-10"
              >
                Passer la commande
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              
              {/* Decor */}
              <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px]" />
            </div>
            
            <div className="mt-8 px-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Paiement à la livraison
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Livraison en 45-60 min
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
