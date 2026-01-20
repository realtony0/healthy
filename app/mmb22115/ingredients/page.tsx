'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, Sparkles, Check, X, RefreshCcw } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

type Ingredient = {
  id: string
  name: string
  type: string
  price: number
  isPremium: boolean
  isAvailable: boolean
}

export default function AdminIngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)

  const fetchIngredients = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/ingredients')
      const data = await res.json()
      setIngredients(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIngredients()
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'FECULENT': return 'bg-emerald-50 text-emerald-600 border-emerald-100'
      case 'PROTEINE': return 'bg-blue-50 text-blue-600 border-blue-100'
      case 'PROTEINE_PREMIUM': return 'bg-orange-50 text-orange-600 border-orange-100'
      case 'LEGUMES': return 'bg-emerald-50 text-emerald-600 border-emerald-100'
      case 'SAUCE': return 'bg-red-50 text-red-600 border-red-100'
      default: return 'bg-gray-50 text-gray-600 border-gray-100'
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="food-badge">Bowl Builder</div>
          <h1 className="text-4xl font-black text-[#1a472a] tracking-tight">Ingrédients</h1>
          <p className="text-gray-500 font-medium italic">Gérez les ingrédients disponibles pour le "Crée ton Bowl".</p>
        </div>
        
        <button className="btn btn-primary gap-2 shadow-xl shadow-emerald-900/20">
          <Plus size={20} />
          Nouvel Ingrédient
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-emerald-50 border-t-[#1a472a] rounded-full animate-spin" />
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Chargement...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ingredients.map((ing) => (
            <div key={ing.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 flex flex-col justify-between group hover:border-[#1a472a] transition-all duration-500">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${getTypeColor(ing.type)}`}>
                    {ing.type}
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm ${
                    ing.isAvailable ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-50 text-gray-300 border-gray-100'
                  }`}>
                    {ing.isAvailable ? <Check size={18} strokeWidth={3} /> : <X size={18} strokeWidth={3} />}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-[#1a472a] transition-colors">{ing.name}</h3>
                  {ing.price > 0 && (
                    <p className="text-sm font-black text-orange-500 italic font-serif">+{formatPrice(ing.price)}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-6 border-t border-gray-50 mt-6">
                <button className="flex-1 py-3 rounded-2xl bg-gray-50 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:bg-[#1a472a] hover:text-white transition-all">
                  Modifier
                </button>
                <button className="w-12 h-12 rounded-2xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
