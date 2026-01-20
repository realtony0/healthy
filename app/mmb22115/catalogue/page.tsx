'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, LayoutGrid, Utensils, Eye, EyeOff, ArrowRight, ChefHat } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

type Category = {
  id: string
  name: string
  slug: string
  type: string
  isVisiblePublic: boolean
  sortOrder: number
  _count: { products: number }
}

type Product = {
  id: string
  name: string
  price: number
  image: string | null
  isVisible: boolean
  category: { name: string }
  kcal: number | null
  proteins: number | null
}

export default function AdminCataloguePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'categories' | 'products'>('products')

  const fetchData = async () => {
    setLoading(true)
    try {
      const [catsRes, prodsRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/products')
      ])
      const catsData = await catsRes.json()
      const prodsData = await prodsRes.json()
      setCategories(Array.isArray(catsData) ? catsData : [])
      setProducts(Array.isArray(prodsData) ? prodsData : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="food-badge">Menu</div>
          <h1 className="text-4xl font-black text-[#1a472a] tracking-tight">Catalogue</h1>
          <p className="text-gray-500 font-medium italic">Gérez vos catégories de menu et vos produits.</p>
        </div>
        
        <button className="btn btn-primary gap-2">
          <Plus size={20} />
          {activeTab === 'categories' ? 'Nouvelle Catégorie' : 'Nouveau Produit'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 p-2 bg-gray-50 rounded-[2rem] border border-gray-100 w-fit">
        <button 
          onClick={() => setActiveTab('products')}
          className={`px-8 py-3 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all ${
            activeTab === 'products' ? 'bg-[#1a472a] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Produits
        </button>
        <button 
          onClick={() => setActiveTab('categories')}
          className={`px-8 py-3 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all ${
            activeTab === 'categories' ? 'bg-[#1a472a] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Catégories
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-emerald-50 border-t-[#1a472a] rounded-full animate-spin" />
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Chargement...</p>
        </div>
      ) : activeTab === 'products' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30 overflow-hidden group">
              <div className="aspect-[4/3] relative overflow-hidden">
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-xs">Sans image</div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-md border ${
                    p.isVisible ? 'bg-white/90 text-emerald-600 border-emerald-100' : 'bg-red-50/90 text-red-600 border-red-100'
                  }`}>
                    {p.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{p.category.name}</p>
                  <h3 className="text-xl font-black text-gray-900 leading-tight">{p.name}</h3>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <p className="text-2xl font-black text-[#1a472a] italic font-serif">{formatPrice(p.price)}</p>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#1a472a] hover:text-white transition-all shadow-sm">
                      <Edit2 size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((c) => (
            <div key={c.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-xl shadow-gray-200/30 flex items-center justify-between group hover:border-[#1a472a] transition-all duration-500">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#1a472a] shadow-inner font-black italic">
                  {c.sortOrder}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-[#1a472a] transition-colors leading-none">{c.name}</h3>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      c.type === 'BOWL_BUILDER' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {c.type}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{c._count.products} produit(s) • /{c.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  c.isVisiblePublic ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                }`}>
                  {c.isVisiblePublic ? <Eye size={18} /> : <EyeOff size={18} />}
                </div>
                <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#1a472a] hover:text-white transition-all shadow-sm">
                  <Edit2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
