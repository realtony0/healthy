'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PAYMENT_METHODS } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import { ArrowLeft, ShieldCheck, MapPin, Phone, MessageSquare, CreditCard, Wallet, Banknote, Check, Sparkles, ChevronDown } from 'lucide-react'
import Link from 'next/link'

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

export default function CheckoutPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [zones, setZones] = useState<Array<{ id: string; name: string; number: number; price: number; quartiers: string[] }>>([])
  const [selectedZoneId, setSelectedZoneId] = useState<string>('')
  
  // Créer une liste aplatie de tous les quartiers avec leur zone
  const quartiersList = zones.flatMap(zone => 
    zone.quartiers.map(quartier => ({
      quartier,
      zoneId: zone.id,
      zoneName: zone.name,
      zoneNumber: zone.number,
      price: zone.price
    }))
  ).sort((a, b) => a.quartier.localeCompare(b.quartier))
  const [formData, setFormData] = useState({
    deliveryAddress: '',
    deliveryPhone: '',
    deliveryNotes: '',
    paymentMethod: 'CASH' as keyof typeof PAYMENT_METHODS,
  })

  useEffect(() => {
    fetchZones()
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
  }, [session, router])

  const fetchZones = async () => {
    try {
      const res = await fetch('/api/delivery-zones')
      const data = await res.json()
      setZones(data)
    } catch (error) {
      console.error('Error fetching zones:', error)
    }
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const items = cart!.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        fruitChoices: item.fruitChoices || [],
        bowlConfigId: item.bowlConfigId,
        product: item.product,
        bowlConfig: item.bowlConfig,
      }))

      const selectedZone = zones.find(z => z.id === selectedZoneId)
      const deliveryFee = selectedZone?.price || 0

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          ...formData,
          deliveryZoneId: selectedZoneId || null,
          deliveryFee,
        }),
      })

      if (response.ok) {
        const order = await response.json()
        if (!session) {
          localStorage.removeItem('healthy_guest_cart')
        }
        router.push(`/commande/${order.orderNumber}`)
      } else {
        alert('Erreur lors de la création de la commande')
      }
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Erreur lors de la création de la commande')
    } finally {
      setSubmitting(false)
    }
  }

  const getPaymentIcon = (key: string) => {
    switch (key) {
      case 'CASH': return <Banknote size={20} />
      case 'WAVE': return <Wallet size={20} />
      case 'ORANGE_MONEY': return <CreditCard size={20} />
      default: return <CreditCard size={20} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-32 container-wide flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-100 border-t-[#1a472a] rounded-full animate-spin" />
      </div>
    )
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-32 container-wide flex flex-col items-center justify-center text-center space-y-8">
        <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-300">
          <ArrowLeft size={48} />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-[#1a472a]">Panier vide</h1>
          <p className="text-gray-500 font-medium max-w-sm">Vous ne pouvez pas finaliser une commande sans articles.</p>
        </div>
        <Link href="/menu" className="btn btn-primary btn-lg px-12">
          Retour au menu
        </Link>
      </div>
    )
  }

  const subtotal = cart.items.reduce((sum: number, item) => {
    const itemPrice = item.bowlConfig ? item.bowlConfig.price : item.product.price
    return sum + itemPrice * item.quantity
  }, 0)

  const selectedZone = zones.find(z => z.id === selectedZoneId)
  const deliveryFee = selectedZone?.price || 0
  const total = subtotal + deliveryFee

  return (
    <div className="pt-32 pb-32 bg-[#fffdfa]">
      <div className="container-wide">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/panier" className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#1a472a] transition-all shadow-sm">
            <ArrowLeft size={24} />
          </Link>
          <div className="space-y-1">
            <div className="food-badge">Dernière étape</div>
            <h1 className="text-4xl font-black tracking-tight text-[#1a472a]">Finaliser la commande</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {/* Delivery Info */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <MapPin size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Où livrons-nous ?</h2>
              </div>
              
              <div className="grid gap-6">
                <div className="space-y-3">
                  <label htmlFor="deliveryZone" className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-2">
                    Quartier / Localité *
                  </label>
                  <div className="relative">
                    <select
                      id="deliveryZone"
                      required
                      value={selectedZoneId}
                      onChange={(e) => setSelectedZoneId(e.target.value)}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-lg shadow-inner appearance-none"
                    >
                      <option value="">Sélectionnez votre quartier</option>
                      {quartiersList.map((item, index) => (
                        <option key={`${item.zoneId}-${index}`} value={item.zoneId}>
                          {item.quartier} → {formatPrice(item.price)} FCFA
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  {selectedZoneId && selectedZone && (
                    <div className="mt-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <p className="text-xs font-black text-emerald-900 uppercase tracking-widest mb-2">
                        Zone {selectedZone.number} • Livraison {formatPrice(selectedZone.price)} FCFA
                      </p>
                      <p className="text-xs font-bold text-emerald-700 italic">
                        Tous les quartiers de cette zone sont livrés au même tarif.
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <label htmlFor="deliveryAddress" className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-2">
                    Adresse complète *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="deliveryAddress"
                      required
                      value={formData.deliveryAddress}
                      onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                      className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-medium text-lg shadow-inner"
                      placeholder="Ex: Rue 12, Point E, Dakar"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="deliveryPhone" className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-2">
                    Numéro de téléphone *
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-6 text-gray-400 font-bold border-r border-gray-200 pr-4 flex items-center gap-2">
                      <Phone size={16} />
                      +221
                    </div>
                    <input
                      type="tel"
                      id="deliveryPhone"
                      required
                      value={formData.deliveryPhone}
                      onChange={(e) => setFormData({ ...formData, deliveryPhone: e.target.value })}
                      className="w-full pl-28 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-medium text-lg shadow-inner"
                      placeholder="77 000 00 00"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="deliveryNotes" className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-2">
                    Notes pour le livreur (Optionnel)
                  </label>
                  <div className="relative">
                    <div className="absolute top-5 left-6 text-gray-400">
                      <MessageSquare size={20} />
                    </div>
                    <textarea
                      id="deliveryNotes"
                      value={formData.deliveryNotes}
                      onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                      rows={3}
                      className="w-full pl-16 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-3xl focus:bg-white focus:border-[#1a472a] outline-none transition-all font-medium text-lg shadow-inner"
                      placeholder="Code porte, étage, repère particulier..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Comment réglez-vous ?</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(PAYMENT_METHODS).map(([key, label]) => (
                  <label
                    key={key}
                    className={`flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border-2 transition-all duration-300 cursor-pointer ${
                      formData.paymentMethod === key
                        ? 'border-[#1a472a] bg-emerald-50 shadow-md'
                        : 'border-gray-50 bg-white hover:border-emerald-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={key}
                      checked={formData.paymentMethod === key}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentMethod: e.target.value as keyof typeof PAYMENT_METHODS,
                        })
                      }
                      className="hidden"
                    />
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      formData.paymentMethod === key ? 'bg-[#1a472a] text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {getPaymentIcon(key)}
                    </div>
                    <span className="font-black text-sm uppercase tracking-tighter text-center">{label}</span>
                    {formData.paymentMethod === key && (
                      <div className="w-5 h-5 bg-[#1a472a] rounded-full flex items-center justify-center text-white">
                        <Check size={12} strokeWidth={4} />
                      </div>
                    )}
                  </label>
                ))}
              </div>

              {formData.paymentMethod !== 'CASH' && (
                <div className={`p-8 border-2 rounded-[2.5rem] space-y-6 animate-in fade-in slide-in-from-top-2 duration-300 ${
                  formData.paymentMethod === 'WAVE' 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-orange-50 border-orange-200'
                }`}>
                  <div className={`flex items-center gap-3 font-black uppercase text-xs tracking-widest ${
                    formData.paymentMethod === 'WAVE' ? 'text-blue-700' : 'text-orange-700'
                  }`}>
                    <Sparkles size={16} />
                    Instructions {formData.paymentMethod === 'WAVE' ? 'Wave' : 'Orange Money'}
                  </div>
                  
                  <div className="space-y-4">
                    <p className={`font-bold text-lg ${
                      formData.paymentMethod === 'WAVE' ? 'text-blue-900' : 'text-orange-900'
                    }`}>
                      Transférez <span className={`text-2xl font-black ${
                        formData.paymentMethod === 'WAVE' ? 'text-blue-600' : 'text-orange-600'
                      }`}>{formatPrice(total)}</span> FCFA au numéro suivant :
                    </p>
                    
                    <div className={`bg-white p-6 rounded-2xl border-2 text-center ${
                      formData.paymentMethod === 'WAVE' ? 'border-blue-100' : 'border-orange-100'
                    }`}>
                      <p className={`text-xs font-black uppercase tracking-widest mb-2 ${
                        formData.paymentMethod === 'WAVE' ? 'text-blue-400' : 'text-orange-400'
                      }`}>
                        Numéro {formData.paymentMethod === 'WAVE' ? 'Wave' : 'Orange Money'}
                      </p>
                      <p className={`text-4xl font-black tracking-tighter ${
                        formData.paymentMethod === 'WAVE' ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        78 598 71 43
                      </p>
                    </div>

                    <div className={`p-4 rounded-xl border ${
                      formData.paymentMethod === 'WAVE' 
                        ? 'bg-blue-100/50 border-blue-200' 
                        : 'bg-orange-100/50 border-orange-200'
                    }`}>
                      <p className={`text-sm font-bold leading-relaxed text-center ${
                        formData.paymentMethod === 'WAVE' ? 'text-blue-900' : 'text-orange-900'
                      }`}>
                        ⚠️ <strong>Important :</strong> Indiquez votre <strong>nom complet</strong> ou le <strong>numéro de commande</strong> en référence du transfert.
                        <br />
                        Votre commande sera validée dès réception du paiement.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-center text-gray-400 font-bold italic text-sm">
                Le paiement se fait directement à la livraison ou via transfert.
              </p>
            </div>
          </div>

          {/* Sidebar / Total */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a472a] p-10 rounded-[3.5rem] text-white shadow-2xl shadow-emerald-900/30 space-y-10 relative overflow-hidden sticky top-32">
              <div className="space-y-8 relative z-10">
                <h2 className="text-2xl font-black uppercase tracking-widest text-emerald-400/60">Votre Commande</h2>
                
                <div className="space-y-4 max-h-60 overflow-y-auto no-scrollbar pr-2">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <p className="font-black text-sm leading-tight">{item.product.name}</p>
                        <p className="text-xs font-bold text-emerald-400/60 uppercase">x{item.quantity}</p>
                      </div>
                      <span className="font-black italic font-serif whitespace-nowrap">
                        {formatPrice((item.bowlConfig ? item.bowlConfig.price : item.product.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-center text-emerald-400/60 font-bold text-xs uppercase tracking-widest">
                    <span>Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-400/60 font-bold text-xs uppercase tracking-widest">
                    <span>Livraison</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between items-end pt-4 border-t border-white/10">
                    <span className="text-sm font-bold uppercase tracking-widest">Total</span>
                    <span className="text-5xl font-black italic font-serif leading-none">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="btn bg-white text-[#1a472a] w-full py-6 text-xl font-black shadow-2xl shadow-black/20 flex items-center justify-center gap-3 group relative z-10 disabled:opacity-50"
              >
                {submitting ? (
                  <div className="w-6 h-6 border-4 border-[#1a472a]/30 border-t-[#1a472a] rounded-full animate-spin" />
                ) : (
                  <>
                    Confirmer & Commander
                    <Check className="group-hover:scale-125 transition-transform" strokeWidth={4} />
                  </>
                )}
              </button>
              
              {/* Decor */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400/5 rounded-full blur-[80px]" />
            </div>
            
            <div className="mt-8 bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center gap-4">
              <ShieldCheck className="text-emerald-600 flex-shrink-0" size={32} />
              <p className="text-xs font-bold text-emerald-900/60 leading-relaxed italic">
                Votre commande sera confirmée par nos équipes et livrée dans les meilleurs délais.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
