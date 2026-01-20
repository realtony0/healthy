'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, Filter, RefreshCcw, ChevronRight, Package, CreditCard, Clock } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'FAILED'

type AdminOrder = {
  id: string
  orderNumber: string
  status: OrderStatus
  totalAmount: number
  deliveryAddress: string
  deliveryPhone: string
  createdAt: string
  payment: null | {
    method: 'CASH' | 'WAVE' | 'ORANGE_MONEY'
    status: PaymentStatus
    reference: string | null
  }
  items: Array<{ id: string; quantity: number; product: { name: string } }>
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<string>('')
  const [paymentStatus, setPaymentStatus] = useState<string>('')

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (status) params.set('status', status)
      if (paymentStatus) params.set('paymentStatus', paymentStatus)
      const res = await fetch(`/api/admin/orders?${params.toString()}`)
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [status, paymentStatus])

  const getStatusColor = (s: OrderStatus) => {
    switch (s) {
      case 'PENDING': return 'bg-orange-50 text-orange-600 border-orange-100'
      case 'CONFIRMED': return 'bg-blue-50 text-blue-600 border-blue-100'
      case 'PREPARING': return 'bg-emerald-50 text-emerald-600 border-emerald-100'
      case 'READY': return 'bg-purple-50 text-purple-600 border-purple-100'
      case 'DELIVERED': return 'bg-gray-50 text-gray-600 border-gray-100'
      case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-100'
      default: return 'bg-gray-50 text-gray-600'
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="food-badge">Gestion</div>
          <h1 className="text-4xl font-black text-[#1a472a] tracking-tight">Commandes</h1>
          <p className="text-gray-500 font-medium italic">Suivez et gérez les commandes clients en temps réel.</p>
        </div>
        
        <button 
          onClick={fetchOrders}
          className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-[#1a472a] hover:rotate-180 transition-all duration-500"
        >
          <RefreshCcw size={20} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-inner">
        <div className="flex-1 min-w-[200px] relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Filter size={16} />
          </div>
          <select
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#1a472a] font-bold text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Tous les statuts</option>
            <option value="PENDING">En attente</option>
            <option value="CONFIRMED">Confirmée</option>
            <option value="PREPARING">En cuisine</option>
            <option value="READY">Prête</option>
            <option value="DELIVERED">Livrée</option>
            <option value="CANCELLED">Annulée</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px] relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <CreditCard size={16} />
          </div>
          <select
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#1a472a] font-bold text-sm"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="">Tous les paiements</option>
            <option value="PENDING">Paiement en attente</option>
            <option value="CONFIRMED">Paiement validé</option>
            <option value="FAILED">Paiement échoué</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-emerald-50 border-t-[#1a472a] rounded-full animate-spin" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Chargement...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200 mx-auto">
              <Package size={40} />
            </div>
            <p className="text-xl font-bold text-gray-400">Aucune commande trouvée</p>
          </div>
        ) : (
          orders.map((o) => (
            <Link 
              key={o.id} 
              href={`/mmb22115/commandes/${o.orderNumber}`}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-xl shadow-gray-200/30 flex flex-col lg:flex-row items-center gap-8 group hover:border-[#1a472a] hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-center gap-6 flex-1 w-full">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#1a472a] shadow-inner font-black italic">
                  #{o.orderNumber.slice(-3)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-[#1a472a] transition-colors leading-none">#{o.orderNumber}</h3>
                    <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusColor(o.status)}`}>
                      {o.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{o.items?.length ?? 0} article(s) • {new Date(o.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 lg:gap-12 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-gray-50">
                <div className="flex-1 lg:flex-none">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Livraison</p>
                  <p className="text-sm font-black text-gray-900 line-clamp-1">{o.deliveryAddress}</p>
                </div>
                
                <div className="flex-1 lg:flex-none">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Total</p>
                  <p className="text-xl font-black text-[#1a472a] italic font-serif leading-none">{formatPrice(o.totalAmount)}</p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#1a472a] group-hover:text-white transition-all duration-300">
                  <ChevronRight size={24} />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
