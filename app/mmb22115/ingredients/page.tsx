'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, Check, X, RefreshCcw } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

type Ingredient = {
  id: string
  name: string
  type: string
  price: number
  isPremium: boolean
  isAvailable: boolean
}

type IngredientForm = {
  id?: string
  name: string
  type: string
  price: string
  isPremium: boolean
  isAvailable: boolean
}

const INGREDIENT_TYPES = [
  { value: 'FECULENT', label: 'Féculent' },
  { value: 'PROTEINE', label: 'Protéine' },
  { value: 'PROTEINE_PREMIUM', label: 'Protéine Premium' },
  { value: 'LEGUMES', label: 'Légumes' },
  { value: 'SAUCE', label: 'Sauce' },
] as const

export default function AdminIngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<IngredientForm>({
    name: '',
    type: 'LEGUMES',
    price: '0',
    isPremium: false,
    isAvailable: true,
  })

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

  const openCreate = () => {
    setForm({
      name: '',
      type: 'LEGUMES',
      price: '0',
      isPremium: false,
      isAvailable: true,
    })
    setShowModal(true)
  }

  const openEdit = (ing: Ingredient) => {
    setForm({
      id: ing.id,
      name: ing.name,
      type: ing.type,
      price: String(ing.price ?? 0),
      isPremium: ing.isPremium,
      isAvailable: ing.isAvailable,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet ingrédient ?')) return
    try {
      const res = await fetch(`/api/admin/ingredients/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Erreur lors de la suppression')
      }
      await fetchIngredients()
    } catch (e) {
      console.error(e)
      alert('Erreur lors de la suppression.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const isEdit = Boolean(form.id)
      const url = isEdit ? `/api/admin/ingredients/${form.id}` : '/api/admin/ingredients'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          price: form.price,
          isPremium: form.isPremium,
          isAvailable: form.isAvailable,
        }),
      })
      if (!res.ok) throw new Error('save failed')
      setShowModal(false)
      await fetchIngredients()
    } catch (e) {
      console.error(e)
      alert('Erreur lors de l’enregistrement.')
    } finally {
      setSaving(false)
    }
  }

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
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={fetchIngredients}
            className="btn btn-outline gap-2"
            type="button"
          >
            <RefreshCcw size={18} />
            Actualiser
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              openCreate()
            }} 
            className="btn btn-primary gap-2 shadow-xl shadow-emerald-900/20 cursor-pointer z-10 relative" 
            type="button"
          >
            <Plus size={20} />
            Nouvel Ingrédient
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-emerald-50 border-t-[#1a472a] rounded-full animate-spin" />
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Chargement...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ingredients.map((ing) => (
            <div key={ing.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 flex flex-col justify-between group hover:border-[#1a472a] transition-all duration-500 relative">
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
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    openEdit(ing)
                  }}
                  className="flex-1 py-3 rounded-2xl bg-gray-50 text-gray-700 font-black text-[10px] uppercase tracking-widest hover:bg-[#1a472a] hover:text-white transition-all cursor-pointer z-10 relative"
                >
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleDelete(ing.id)
                  }}
                  className="w-12 h-12 rounded-2xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all cursor-pointer z-10 relative"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/70 md:bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-black text-[#1a472a]">
                {form.id ? 'Modifier l’ingrédient' : 'Nouvel ingrédient'}
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-2xl bg-gray-50 text-gray-400 hover:text-gray-900 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Nom</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none font-bold"
                    required
                  >
                    {INGREDIENT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Prix (FCFA)</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none font-bold"
                    min="0"
                    step="50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100">
                  <input
                    type="checkbox"
                    checked={form.isAvailable}
                    onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span className="font-bold text-gray-700">Disponible</span>
                </label>
                <label className="flex items-center gap-3 bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100">
                  <input
                    type="checkbox"
                    checked={form.isPremium}
                    onChange={(e) => setForm({ ...form, isPremium: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span className="font-bold text-gray-700">Premium</span>
                </label>
              </div>

              <div className="flex flex-col md:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline w-full md:w-auto"
                  disabled={saving}
                >
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary w-full md:flex-1" disabled={saving}>
                  {saving ? 'Enregistrement…' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
