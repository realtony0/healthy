'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Package, MapPin, Phone, MessageSquare, CreditCard, Clock, CheckCircle, Save, RefreshCcw } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'FAILED'

type AdminOrderDetail = {
  id: string
  orderNumber: string
  status: OrderStatus
  totalAmount: number
  deliveryAddress: string
  deliveryPhone: string
  deliveryNotes: string | null
  createdAt: string
  items: Array<{
    id: string
    quantity: number
    price: number
    fruitChoices: string[]
    product: { name: string }
    bowlConfig: null | {
      id: string
      size: 'SMALL' | 'MEDIUM' | 'LARGE'
      price: number
      ingredients: Array<{ quantity: number; ingredient: { name: string; type: string } }>
    }
  }>
  payment: null | {
    method: 'CASH' | 'WAVE' | 'ORANGE_MONEY'
    status: PaymentStatus
    reference: string | null
    notes: string | null
    confirmedAt: string | null
  }
}

export default function AdminOrderDetailPage() {
  const params = useParams<{ orderNumber: string }>()
  const router = useRouter()
  const orderNumber = params?.orderNumber

  const [order, setOrder] = useState<AdminOrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [newStatus, setNewStatus] = useState<OrderStatus>('PENDING')
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('PENDING')
  const [paymentRef, setPaymentRef] = useState('')
  const [paymentNotes, setPaymentNotes] = useState('')

  const fetchOrder = async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/orders/${orderNumber}`)
    const data = await res.json()
    setOrder(data?.orderNumber ? data : null)
    setLoading(false)

    if (data?.orderNumber) {
      setNewStatus(data.status)
      if (data.payment) {
        setPaymentStatus(data.payment.status)
        setPaymentRef(data.payment.reference ?? '')
        setPaymentNotes(data.payment.notes ?? '')
      }
    }
  }

  useEffect(() => {
    if (orderNumber) fetchOrder()
  }, [orderNumber])

  const save = async () => {
    if (!orderNumber) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/orders/${orderNumber}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          payment: {
            status: paymentStatus,
            reference: paymentRef || null,
            notes: paymentNotes || null,
          },
        }),
      })

      if (!res.ok) {
        alert('Erreur lors de la mise à jour')
        return
      }

      await fetchOrder()
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-emerald-50 border-t-[#1a472a] rounded-full animate-spin" />
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Chargement de la commande...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center text-red-400 mx-auto">
          <Package size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-900">Commande introuvable</h2>
          <p className="text-gray-500 font-medium">Cette commande n&apos;existe pas ou a été supprimée.</p>
        </div>
        <Link href="/mmb22115/commandes" className="btn btn-outline">
          Retour à la liste
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href="/mmb22115/commandes" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#1a472a] transition-all">
            <ArrowLeft size={24} />
          </Link>
          <div className="space-y-1">
            <div className="food-badge">Détails de commande</div>
            <h1 className="text-4xl font-black text-[#1a472a] tracking-tight">#{order.orderNumber}</h1>
          </div>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Montant Total</p>
          <p className="text-4xl font-black text-[#1a472a] italic font-serif leading-none">{formatPrice(order.totalAmount)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Items */}
          <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100 shadow-inner space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1a472a] shadow-sm">
                <Package size={20} />
              </div>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Articles commandés</h2>
            </div>
            
            <div className="space-y-4">
              {order.items.map((it) => (
                <div key={it.id} className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm flex justify-between items-center gap-6">
                  <div className="space-y-2">
                    <div className="font-black text-lg text-gray-900 leading-tight">{it.product.name} <span className="text-emerald-600 ml-2">x{it.quantity}</span></div>
                    {it.bowlConfig && (
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 p-3 rounded-xl border border-gray-100">
                        Bowl {it.bowlConfig.size} • {it.bowlConfig.ingredients.map(x => `${x.quantity}x ${x.ingredient.name}`).join(', ')}
                      </div>
                    )}
                    {it.fruitChoices?.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {it.fruitChoices.map(f => (
                          <span key={f} className="text-[10px] font-black bg-orange-50 text-orange-600 px-2 py-1 rounded-lg uppercase tracking-tighter italic">+ {f}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-xl font-black text-[#1a472a] italic font-serif whitespace-nowrap">
                    {formatPrice(it.price * it.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                <MapPin size={24} />
              </div>
              <h2 className="text-2xl font-black text-gray-900">Livraison</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Adresse complète</p>
                  <p className="font-bold text-lg text-gray-900 leading-snug italic underline decoration-blue-100 decoration-4 underline-offset-4">{order.deliveryAddress}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Client</p>
                  <div className="flex items-center gap-3">
                    <p className="font-black text-2xl text-gray-900 italic font-serif leading-none">+221 {order.deliveryPhone}</p>
                    <a href={`tel:+221${order.deliveryPhone}`} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm"><Phone size={18} /></a>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Notes complémentaires</p>
                  <p className="text-sm font-medium text-gray-500 leading-relaxed italic bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-200">
                    {order.deliveryNotes || 'Aucune instruction particulière.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Status Management */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#1a472a] shadow-inner">
                <Clock size={24} />
              </div>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Statut</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Progression</label>
                <select 
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-black text-gray-900 shadow-inner text-sm" 
                  value={newStatus} 
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                >
                  <option value="PENDING">EN ATTENTE</option>
                  <option value="CONFIRMED">CONFIRMÉE</option>
                  <option value="PREPARING">EN CUISINE</option>
                  <option value="READY">PRÊTE À LIVRER</option>
                  <option value="DELIVERED">LIVRÉE</option>
                  <option value="CANCELLED">ANNULÉE</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Management */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 shadow-inner">
                <CreditCard size={24} />
              </div>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Paiement</h2>
            </div>
            
            {order.payment ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center px-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Méthode</span>
                  <span className="font-black text-[#1a472a] italic font-serif">{order.payment.method}</span>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">État du règlement</label>
                  <select 
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-black text-gray-900 shadow-inner text-sm" 
                    value={paymentStatus} 
                    onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                  >
                    <option value="PENDING">NON RÉGLÉ</option>
                    <option value="CONFIRMED">ENCAISSÉ</option>
                    <option value="FAILED">ÉCHEC</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Référence Wave / OM</label>
                  <input 
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-black text-gray-900 shadow-inner text-sm" 
                    value={paymentRef} 
                    onChange={(e) => setPaymentRef(e.target.value)} 
                    placeholder="Ex: TX1234…" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Notes internes</label>
                  <textarea 
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-medium text-gray-900 shadow-inner text-sm" 
                    rows={3} 
                    value={paymentNotes} 
                    onChange={(e) => setPaymentNotes(e.target.value)} 
                    placeholder="Détails du règlement..."
                  />
                </div>

                {order.payment.confirmedAt && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle size={12} />
                    Validé le {new Date(order.payment.confirmedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-400 font-bold italic py-4">Aucun paiement lié.</p>
            )}
          </div>

          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="btn btn-primary w-full py-8 text-xl font-black shadow-2xl shadow-emerald-900/30 flex items-center justify-center gap-4 disabled:opacity-50 group hover:scale-[1.02] transition-transform"
          >
            {saving ? (
              <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Enregistrer les modifications
                <Save size={24} className="group-hover:scale-110 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
