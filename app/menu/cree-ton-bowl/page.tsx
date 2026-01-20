'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import BowlBuilder, { BowlConfig } from '@/components/bowl/BowlBuilder'
import type { Ingredient } from '@prisma/client'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function CreateBowlPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)

  useEffect(() => {
    fetchIngredients()
  }, [])

  const fetchIngredients = async () => {
    try {
      const response = await fetch('/api/ingredients')
      const data = await response.json()
      setIngredients(data)
    } catch (error) {
      console.error('Error fetching ingredients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async (config: BowlConfig) => {
    if (!session) {
      router.push('/auth/signin?callbackUrl=/menu/cree-ton-bowl')
      return
    }

    setAddingToCart(true)
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug: 'bowl-personnalise',
          quantity: 1,
          bowlConfig: config,
        }),
      })

      if (response.ok) {
        router.push('/panier')
      } else {
        const error = await response.json()
        alert(error.error || 'Erreur lors de l\'ajout au panier')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Erreur lors de l\'ajout au panier')
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-32 container-wide flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-emerald-100 border-t-[#1a472a] rounded-full animate-spin" />
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">Chargement du module...</p>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-32 bg-[#fffdfa] relative">
      {/* Adding to Cart Overlay */}
      {addingToCart && (
        <div className="fixed inset-0 bg-[#1a472a]/10 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#1a472a]">
              <ShoppingBag size={32} className="animate-bounce" />
            </div>
            <p className="text-xl font-black text-gray-900">Ajout à votre panier...</p>
          </div>
        </div>
      )}

      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="space-y-4">
            <Link 
              href="/menu" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#1a472a] transition-all font-black text-[10px] uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Retour au menu
            </Link>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-[#1a472a] leading-none">Votre Chef, <br /><span className="italic font-serif text-emerald-500">c&apos;est vous.</span></h1>
          </div>
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 hidden lg:block max-w-sm">
            <p className="text-sm font-bold text-emerald-900/60 leading-relaxed italic">
              &ldquo;Créez l&apos;équilibre parfait selon vos besoins nutritionnels et vos goûts.&rdquo;
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-[4rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden relative">
          {ingredients.length === 0 ? (
            <div className="p-20 text-center space-y-4">
              <p className="text-2xl font-black text-gray-900">Oups !</p>
              <p className="text-gray-500 font-medium">Aucun ingrédient n&apos;est disponible pour le moment.</p>
            </div>
          ) : (
            <BowlBuilder ingredients={ingredients} onComplete={handleComplete} />
          )}
        </div>
      </div>
    </div>
  )
}
