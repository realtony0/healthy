'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, LayoutGrid, Utensils, Eye, EyeOff, ArrowRight, ChefHat, X, Save } from 'lucide-react'
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
  slug: string
  description: string | null
  price: number
  image: string | null
  isVisible: boolean
  categoryId: string
  category: { id: string; name: string }
  kcal: number | null
  proteins: number | null
  sortOrder: number
}

export default function AdminCataloguePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'categories' | 'products'>('products')
  
  // États pour les modales
  const [showProductModal, setShowProductModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [saving, setSaving] = useState(false)
  
  // États pour les formulaires
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    image: '',
    kcal: '',
    proteins: '',
    isVisible: true,
    categoryId: '',
    sortOrder: 0,
  })
  
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    type: 'STANDARD' as 'STANDARD' | 'BOWL_BUILDER',
    isVisiblePublic: true,
    sortOrder: 0,
  })

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

  const openProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setProductForm({
        name: product.name,
        slug: product.slug,
        description: product.description || '',
        price: product.price.toString(),
        image: product.image || '',
        kcal: product.kcal?.toString() || '',
        proteins: product.proteins?.toString() || '',
        isVisible: product.isVisible,
        categoryId: product.categoryId,
        sortOrder: product.sortOrder,
      })
    } else {
      setEditingProduct(null)
      setProductForm({
        name: '',
        slug: '',
        description: '',
        price: '',
        image: '',
        kcal: '',
        proteins: '',
        isVisible: true,
        categoryId: categories[0]?.id || '',
        sortOrder: 0,
      })
    }
    setShowProductModal(true)
  }

  const openCategoryModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category)
      setCategoryForm({
        name: category.name,
        slug: category.slug,
        type: category.type as 'STANDARD' | 'BOWL_BUILDER',
        isVisiblePublic: category.isVisiblePublic,
        sortOrder: category.sortOrder,
      })
    } else {
      setEditingCategory(null)
      setCategoryForm({
        name: '',
        slug: '',
        type: 'STANDARD',
        isVisiblePublic: true,
        sortOrder: 0,
      })
    }
    setShowCategoryModal(true)
  }

  const saveProduct = async () => {
    setSaving(true)
    try {
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products'
      const method = editingProduct ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price) || 0,
          kcal: productForm.kcal ? parseInt(productForm.kcal) : null,
          proteins: productForm.proteins ? parseFloat(productForm.proteins) : null,
          sortOrder: parseInt(productForm.sortOrder.toString()) || 0,
        }),
      })

      if (res.ok) {
        setShowProductModal(false)
        fetchData()
      } else {
        const error = await res.json()
        alert(error.error || 'Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const saveCategory = async () => {
    setSaving(true)
    try {
      const url = editingCategory 
        ? `/api/admin/categories/${editingCategory.id}`
        : '/api/admin/categories'
      const method = editingCategory ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...categoryForm,
          sortOrder: parseInt(categoryForm.sortOrder.toString()) || 0,
        }),
      })

      if (res.ok) {
        setShowCategoryModal(false)
        fetchData()
      } else {
        const error = await res.json()
        alert(error.error || 'Erreur lors de la sauvegarde')
      }
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const deleteProduct = async (productId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return
    
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchData()
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const deleteCategory = async (categoryId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ? Les produits associés seront également supprimés.')) return
    
    try {
      const res = await fetch(`/api/admin/categories/${categoryId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchData()
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Erreur lors de la suppression')
    }
  }

  // Générer slug depuis le nom
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="food-badge">Menu</div>
          <h1 className="text-4xl font-black text-[#1a472a] tracking-tight">Catalogue</h1>
          <p className="text-gray-500 font-medium italic">Gérez vos catégories de menu et vos produits.</p>
        </div>
        
        <button 
          onClick={() => activeTab === 'categories' ? openCategoryModal() : openProductModal()}
          className="btn btn-primary gap-2"
        >
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
                    <button 
                      onClick={() => openProductModal(p)}
                      className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#1a472a] hover:text-white transition-all shadow-sm"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => deleteProduct(p.id)}
                      className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
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
                <div className="flex gap-2">
                  <button 
                    onClick={() => openCategoryModal(c)}
                    className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#1a472a] hover:text-white transition-all shadow-sm"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button 
                    onClick={() => deleteCategory(c.id)}
                    className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Produit */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/70 md:bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-black text-[#1a472a]">
                {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
              </h2>
              <button
                onClick={() => setShowProductModal(false)}
                className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Nom du produit *
                  </label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => {
                      setProductForm({ ...productForm, name: e.target.value, slug: generateSlug(e.target.value) })
                    }}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={productForm.slug}
                    onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Description
                  </label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Prix (FCFA) *
                  </label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Catégorie *
                  </label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Image (URL)
                  </label>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-medium"
                    placeholder="/img/produit.jpg"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    value={productForm.kcal}
                    onChange={(e) => setProductForm({ ...productForm, kcal: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Protéines (g)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={productForm.proteins}
                    onChange={(e) => setProductForm({ ...productForm, proteins: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Ordre d'affichage
                  </label>
                  <input
                    type="number"
                    value={productForm.sortOrder}
                    onChange={(e) => setProductForm({ ...productForm, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.isVisible}
                      onChange={(e) => setProductForm({ ...productForm, isVisible: e.target.checked })}
                      className="w-5 h-5 rounded-lg border-2 border-gray-200 text-[#1a472a] focus:ring-2 focus:ring-[#1a472a]"
                    />
                    <span className="text-sm font-bold text-gray-700">Visible sur le site</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 px-6 py-4 bg-gray-50 rounded-2xl font-black text-gray-600 hover:bg-gray-100 transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={saveProduct}
                  disabled={saving || !productForm.name || !productForm.slug || !productForm.price || !productForm.categoryId}
                  className="flex-1 px-6 py-4 bg-[#1a472a] text-white rounded-2xl font-black hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save size={20} />
                      Enregistrer
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Catégorie */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/70 md:bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl max-w-xl w-full">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-black text-[#1a472a]">
                {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
              </h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Nom de la catégorie *
                  </label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => {
                      setCategoryForm({ ...categoryForm, name: e.target.value, slug: generateSlug(e.target.value) })
                    }}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Type *
                  </label>
                  <select
                    value={categoryForm.type}
                    onChange={(e) => setCategoryForm({ ...categoryForm, type: e.target.value as 'STANDARD' | 'BOWL_BUILDER' })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold"
                    required
                  >
                    <option value="STANDARD">Standard</option>
                    <option value="BOWL_BUILDER">Bowl Builder</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">
                    Ordre d'affichage
                  </label>
                  <input
                    type="number"
                    value={categoryForm.sortOrder}
                    onChange={(e) => setCategoryForm({ ...categoryForm, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={categoryForm.isVisiblePublic}
                      onChange={(e) => setCategoryForm({ ...categoryForm, isVisiblePublic: e.target.checked })}
                      className="w-5 h-5 rounded-lg border-2 border-gray-200 text-[#1a472a] focus:ring-2 focus:ring-[#1a472a]"
                    />
                    <span className="text-sm font-bold text-gray-700">Visible sur le site</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="flex-1 px-6 py-4 bg-gray-50 rounded-2xl font-black text-gray-600 hover:bg-gray-100 transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={saveCategory}
                  disabled={saving || !categoryForm.name || !categoryForm.slug}
                  className="flex-1 px-6 py-4 bg-[#1a472a] text-white rounded-2xl font-black hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save size={20} />
                      Enregistrer
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
