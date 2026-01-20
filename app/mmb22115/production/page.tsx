'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { RefreshCcw, ChefHat, ChevronRight, User, MapPin } from 'lucide-react'

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'

type AdminOrder = {
  id: string
  orderNumber: string
  status: OrderStatus
  deliveryAddress: string
  deliveryPhone: string
  createdAt: string
  items: Array<{
    id: string
    quantity: number
    fruitChoices: string[]
    product: { name: string }
    bowlConfig: null | { size: string }
  }>
}

export default function AdminProductionPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/orders?limit=100', {
        next: { revalidate: 0 },
      })
      const data = await res.json()
      const all = Array.isArray(data.orders) ? (data.orders as AdminOrder[]) : []
      setOrders(all.filter((o) => ['CONFIRMED', 'PREPARING', 'READY'].includes(o.status)))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const sets = useMemo(() => {
    return orders.map((o) => ({
      key: o.orderNumber,
      order: o,
      lines: o.items.map((it) => {
        const base = it.product.name
        const details = it.bowlConfig
          ? `Bowl ${it.bowlConfig.size}`
          : it.fruitChoices?.length
          ? `Fruits: ${it.fruitChoices.join(', ')}`
          : ''
        return { label: base, qty: it.quantity, details }
      }),
    }))
  }, [orders])

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="food-badge">Cuisine</div>
          <h1 className="text-4xl font-black text-[#1a472a] tracking-tight">Production</h1>
          <p className="text-gray-500 font-medium italic">Liste des repas à préparer groupés par commande.</p>
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
      ) : sets.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200 mx-auto">
            <ChefHat size={40} />
          </div>
          <p className="text-xl font-bold text-gray-400">Rien à préparer pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sets.map((s) => (
            <div key={s.key} className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/30 overflow-hidden flex flex-col">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-emerald-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#1a472a] shadow-sm font-black italic">
                    #{s.order.orderNumber.slice(-3)}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 leading-none">#{s.order.orderNumber}</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                      {new Date(s.order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                  s.order.status === 'READY' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {s.order.status}
                </div>
              </div>

              <div className="p-8 space-y-6 flex-grow">
                <div className="space-y-4">
                  <p className="text-xs font-black text-[#1a472a] uppercase tracking-widest">À préparer :</p>
                  <div className="space-y-3">
                    {s.lines.map((l, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#1a472a] font-black italic text-sm shadow-sm">
                          {l.qty}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 leading-tight">{l.label}</p>
                          {l.details && <p className="text-xs font-bold text-emerald-600 uppercase mt-1 tracking-tighter">{l.details}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 space-y-3">
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin size={14} />
                    <p className="text-xs font-bold truncate">{s.order.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              <Link 
                href={`/mmb22115/commandes/${s.order.orderNumber}`}
                className="p-6 bg-gray-50 text-center text-xs font-black text-gray-400 uppercase tracking-[0.2em] hover:bg-[#1a472a] hover:text-white transition-all duration-300"
              >
                Gérer la commande
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
