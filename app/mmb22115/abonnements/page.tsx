'use client'

import { useEffect, useState, useCallback } from 'react'
import { RefreshCcw, Calendar, User, CreditCard, ChevronRight, Search } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

type AdminSubscription = {
  id: string
  status: string
  mealPlan: string
  goal: string
  price: number
  startDate: string
  endDate: string
  user: {
    firstName: string | null
    lastName: string | null
    email: string
  }
  payments: Array<{
    status: string
    method: string
  }>
}

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<AdminSubscription[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('')

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filterStatus) params.set('status', filterStatus)
      const res = await fetch(`/api/admin/subscriptions?${params.toString()}`)
      const data = await res.json()
      setSubscriptions(Array.isArray(data.subscriptions) ? data.subscriptions : [])
    } finally {
      setLoading(false)
    }
  }, [filterStatus])

  useEffect(() => {
    fetchSubscriptions()
  }, [fetchSubscriptions])

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="food-badge">Gestion</div>
          <h1 className="text-4xl font-black text-[#1a472a] tracking-tight">Abonnements</h1>
          <p className="text-gray-500 font-medium italic">Suivez et gérez les programmes nutritionnels des clients.</p>
        </div>
        
        <button 
          onClick={fetchSubscriptions}
          className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-[#1a472a] hover:rotate-180 transition-all duration-500"
        >
          <RefreshCcw size={20} />
        </button>
      </div>

      {/* Filters */}
      <div className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-inner">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <select
              className="w-full pl-6 pr-10 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#1a472a] font-bold text-sm appearance-none shadow-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="ACTIVE">Actifs</option>
              <option value="PAUSED">En pause</option>
              <option value="CANCELLED">Annulés</option>
              <option value="COMPLETED">Terminés</option>
            </select>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-emerald-50 border-t-[#1a472a] rounded-full animate-spin" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Chargement...</p>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200 mx-auto">
              <Calendar size={40} />
            </div>
            <p className="text-xl font-bold text-gray-400">Aucun abonnement trouvé</p>
          </div>
        ) : (
          subscriptions.map((sub) => (
            <Link 
              key={sub.id} 
              href={`/mmb22115/abonnements/${sub.id}`}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-xl shadow-gray-200/30 flex flex-col lg:flex-row items-center gap-8 group hover:border-[#1a472a] transition-all duration-500"
            >
              <div className="flex items-center gap-6 flex-1 w-full text-center md:text-left">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#1a472a] shadow-inner font-black italic relative overflow-hidden">
                  {sub.user.firstName?.charAt(0) || sub.user.email.charAt(0)}
                  <div className="absolute inset-0 bg-emerald-500/5" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                    <h3 className="text-xl font-black text-gray-900 leading-none">
                      {sub.user.firstName} {sub.user.lastName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                      sub.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{sub.mealPlan} • {sub.goal}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 lg:gap-12 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-gray-50">
                <div className="flex-1 lg:flex-none">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Période</p>
                  <p className="text-sm font-black text-gray-900 whitespace-nowrap">
                    {new Date(sub.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - {new Date(sub.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                
                <div className="flex-1 lg:flex-none">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Montant</p>
                  <p className="text-xl font-black text-[#1a472a] italic font-serif leading-none">{formatPrice(sub.price)}</p>
                </div>

                <div className="flex-1 lg:flex-none">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Paiement</p>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    sub.payments[0]?.status === 'CONFIRMED' ? 'text-emerald-600' : 'text-orange-500'
                  }`}>
                    {sub.payments[0]?.status || 'N/A'}
                  </span>
                </div>

                <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#1a472a] group-hover:text-white transition-all duration-300">
                  <ChevronRight size={24} />
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
