'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { formatPrice } from '@/lib/utils'
import FruitSelector from './FruitSelector'
import { PRODUCTS_WITH_FRUIT_CHOICE } from '@/lib/constants'
import { ShoppingCart, Minus, Plus, Flame, Dumbbell, ShieldCheck, ArrowRight } from 'lucide-react'

interface ProductDetailProps {
  product: {
    id: string
    name: string
    slug: string
    description: string | null
    price: number
    image: string | null
    kcal: number | null
    proteins: number | null
  }
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [quantity, setQuantity] = useState(1)
  const [fruitChoices, setFruitChoices] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    if (
      PRODUCTS_WITH_FRUIT_CHOICE.includes(product.slug as any) &&
      (fruitChoices.length < 1 || fruitChoices.length > 2)
    ) {
      alert('Veuillez sélectionner entre 1 et 2 fruits pour ce produit.')
      return
    }

    if (!session) {
      // Gestion panier invité
      const guestCartJson = localStorage.getItem('healthy_guest_cart')
      let guestCart = guestCartJson ? JSON.parse(guestCartJson) : { items: [] }
      
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        quantity,
        fruitChoices,
        bowlConfigId: null,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        },
        bowlConfig: null
      }
      
      guestCart.items.push(newItem)
      localStorage.setItem('healthy_guest_cart', JSON.stringify(guestCart))
      router.push('/panier')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          fruitChoices,
        }),
      })

      if (!response.ok) throw new Error("Erreur ajout panier")
      router.push('/panier')
    } catch (error) {
      console.error(error)
      alert("Erreur lors de l'ajout au panier.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      {/* Image - Mobile First */}
      <div className="lg:sticky lg:top-32 order-1 lg:order-1">
        <div className="aspect-[4/3] lg:aspect-square rounded-[2rem] lg:rounded-[4rem] overflow-hidden bg-white border-4 lg:border-8 border-white shadow-xl lg:shadow-2xl relative group">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-200 font-black text-2xl lg:text-4xl">Healthy</div>
          )}
          {product.kcal && (
              <div className="absolute bottom-4 right-4 lg:bottom-10 lg:right-10 bg-white md:bg-white/90 backdrop-blur-xl px-4 py-2 lg:px-6 lg:py-3 rounded-2xl lg:rounded-3xl shadow-xl border border-gray-100 flex items-center gap-2">
              <Flame size={16} className="lg:w-5 lg:h-5 text-orange-500" />
              <span className="font-black text-[#1a472a] text-sm lg:text-base">{product.kcal} kcal</span>
            </div>
          )}
        </div>
      </div>

      {/* Details - Mobile First */}
      <div className="space-y-6 lg:space-y-12 py-2 lg:py-4 order-2 lg:order-2">
        <div className="space-y-4 lg:space-y-6">
          <div className="food-badge text-xs lg:text-sm">
            <ShieldCheck size={12} className="lg:w-3.5 lg:h-3.5" />
            100% Halal Garanti
          </div>
          <h1 className="text-3xl lg:text-5xl xl:text-7xl font-black tracking-tight text-[#1a472a] leading-tight lg:leading-none">{product.name}</h1>
          <p className="text-base lg:text-xl text-gray-500 font-medium leading-relaxed italic border-l-4 border-emerald-100 pl-4 lg:pl-6">{product.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          {product.kcal && (
            <div className="bg-orange-50 p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2.5rem] border-2 border-white shadow-lg lg:shadow-xl shadow-orange-900/5">
              <p className="text-[9px] lg:text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1 lg:mb-2 text-center">Énergie</p>
              <div className="flex items-center justify-center gap-1 lg:gap-2 text-2xl lg:text-3xl font-black text-[#1a472a] italic font-serif">
                {product.kcal}
                <span className="text-xs lg:text-sm font-bold uppercase not-italic text-orange-400">kcal</span>
              </div>
            </div>
          )}
          {product.proteins && (
            <div className="bg-blue-50 p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2.5rem] border-2 border-white shadow-lg lg:shadow-xl shadow-blue-900/5">
              <p className="text-[9px] lg:text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 lg:mb-2 text-center">Protéines</p>
              <div className="flex items-center justify-center gap-1 lg:gap-2 text-2xl lg:text-3xl font-black text-[#1a472a] italic font-serif">
                {product.proteins}
                <span className="text-xs lg:text-sm font-bold uppercase not-italic text-blue-400">g</span>
              </div>
            </div>
          )}
        </div>

        <FruitSelector
          productSlug={product.slug}
          onSelectionChange={setFruitChoices}
        />

        <div className="space-y-6 lg:space-y-8">
          <div className="flex items-center justify-between p-6 lg:p-10 bg-[#1a472a] rounded-[2rem] lg:rounded-[3.5rem] text-white shadow-xl lg:shadow-2xl shadow-emerald-900/20 relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-[9px] lg:text-[10px] font-black text-white/50 uppercase tracking-widest">Prix de votre repas</span>
              <div className="text-3xl lg:text-5xl font-black italic font-serif leading-none mt-1 lg:mt-2">{formatPrice(product.price * quantity)}</div>
            </div>
            
                <div className="flex items-center gap-2 lg:gap-4 bg-white/20 md:bg-white/10 backdrop-blur-md p-1.5 lg:p-2 rounded-2xl lg:rounded-3xl border border-white/30 md:border-white/20 relative z-10">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q-1))}
                className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl hover:bg-white hover:text-[#1a472a] flex items-center justify-center transition-all duration-300 active:scale-90"
              >
                <Minus size={18} className="lg:w-6 lg:h-6" />
              </button>
              <span className="w-6 lg:w-8 text-center font-black text-2xl lg:text-3xl italic font-serif">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q+1)}
                className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl hover:bg-white hover:text-[#1a472a] flex items-center justify-center transition-all duration-300 active:scale-90"
              >
                <Plus size={18} className="lg:w-6 lg:h-6" />
              </button>
            </div>
            
            {/* Decor */}
            <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>

          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="btn btn-primary w-full py-6 lg:py-8 text-lg lg:text-2xl font-black shadow-xl lg:shadow-2xl shadow-emerald-900/30 flex items-center justify-center gap-3 lg:gap-4 disabled:opacity-50 group hover:scale-[1.02] transition-transform"
          >
            {loading ? (
              <div className="w-6 h-6 lg:w-8 lg:h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Ajouter au panier
                <ArrowRight className="group-hover:translate-x-2 transition-transform w-5 h-5 lg:w-8 lg:h-8" />
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:gap-6 pt-8 lg:pt-12 border-t border-gray-100">
          {[
            { label: 'Livraison Dakar', sub: 'Rapide & soignée' },
            { label: 'Cuisiné Frais', sub: 'Le matin même' },
            { label: '100% Halal', sub: 'Certifié & tracé' },
            { label: 'Zéro déchet', sub: 'Eco-responsable' }
          ].map(f => (
            <div key={f.label} className="flex flex-col">
              <span className="text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest">{f.label}</span>
              <span className="font-bold text-[#1a472a] text-xs lg:text-sm">{f.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
