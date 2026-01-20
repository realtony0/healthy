'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { RefreshCcw, Truck, MapPin, ChevronRight, Package, Phone } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

type AdminOrder = {
  id: string
  orderNumber: string
  status: string
  deliveryAddress: string
  deliveryPhone: string
  totalAmount: number
  createdAt: string
  items: Array<{ id: string; quantity: number; product: { name: string } }>
}

export default function AdminDeliveriesPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      const all = Array.isArray(data) ? (data as AdminOrder[]) : []
      setOrders(all.filter((o) => !['DELIVERED', 'CANCELLED'].includes(o.status)))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const groups = useMemo(() => {
    const map = new Map<string, AdminOrder[]>()
    for (const o of orders) {
      const key = (o.deliveryAddress || '').trim() || 'Adresse inconnue'
      map.set(key, [...(map.get(key) ?? []), o])
    }

    return Array.from(map.entries())
      .map(([address, list]) => {
        const total = list.reduce((sum, x) => sum + (x.totalAmount ?? 0), 0)
        return { address, list, total }
      })
      .sort((a, b) => b.list.length - a.list.length)
  }, [orders])

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="food-badge">Tournées</div>
          <h1 className="text-4xl font-black text-[#1a472a] tracking-tight">Livraisons</h1>
          <p className="text-gray-500 font-medium italic">Commandes en attente de livraison groupées par adresse.</p>
        </div>
        
        <button 
          onClick={fetchOrders}
          className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-[#1a472a] hover:rotate-180 transition-all duration-500"
        >
          <RefreshCcw size={20} />
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-emerald-50 border-t-[#1a472a] rounded-full animate-spin" />
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Chargement...</p>
        </div>
      ) : groups.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200 mx-auto">
            <Truck size={40} />
          </div>
          <p className="text-xl font-bold text-gray-400">Aucune livraison prévue</p>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((g) => (
            <div key={g.address} className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/30 overflow-hidden">
              <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#1a472a] shadow-sm">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 leading-tight">{g.address}</h3>
                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mt-1">
                      {g.list.length} commande(s) à livrer
                    </p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Total à encaisser</p>
                  <p className="text-3xl font-black text-[#1a472a] italic font-serif leading-none">{formatPrice(g.total)}</p>
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-4">
                  {g.list.map((o) => (
                    <div key={o.id} className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-[2rem] border border-gray-50 shadow-sm group hover:border-[#1a472a] transition-all duration-300">
                      <div className="flex-1 space-y-1 w-full text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                          <p className="font-black text-gray-900">#{o.orderNumber}</p>
                          <span className="px-2 py-0.5 rounded-lg bg-gray-100 text-[10px] font-black text-gray-400 uppercase">{o.status}</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 font-medium italic">
                          <Phone size={14} className="text-gray-300" />
                          {o.deliveryPhone}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-lg font-black text-gray-900 italic font-serif">
                          {formatPrice(o.totalAmount)}
                        </div>
                        <Link 
                          href={`/mmb22115/commandes/${o.orderNumber}`}
                          className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#1a472a] group-hover:text-white transition-all"
                        >
                          <ChevronRight size={20} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
