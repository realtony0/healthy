'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, CreditCard, ShieldCheck, Zap, Clock, Save, RefreshCcw, CheckCircle } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

type AdminSubscriptionDetail = {
  id: string
  status: string
  mealPlan: string
  goal: string
  duration: string
  price: number
  startDate: string
  endDate: string
  user: {
    firstName: string | null
    lastName: string | null
    email: string
    phone: string | null
  }
  payments: Array<{
    id: string
    status: string
    method: string
    amount: number
    createdAt: string
  }>
}

export default function AdminSubscriptionDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const subId = params?.id

  const [sub, setSub] = useState<AdminSubscriptionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [newStatus, setNewStatus] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')

  const fetchSub = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/subscriptions/${subId}`)
      const data = await res.json()
      setSub(data)
      setNewStatus(data.status)
      setPaymentStatus(data.payments[0]?.status || 'PENDING')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (subId) fetchSub()
  }, [subId])

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/subscriptions/${subId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          paymentStatus: paymentStatus
        })
      })
      if (res.ok) {
        await fetchSub()
        router.refresh()
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-emerald-50 border-t-[#1a472a] rounded-full animate-spin" />
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Chargement de l&apos;abonnement...</p>
      </div>
    )
  }

  if (!sub) return <div>Abonnement introuvable.</div>

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href="/mmb22115/abonnements" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#1a472a] transition-all">
            <ArrowLeft size={24} />
          </Link>
          <div className="space-y-1">
            <div className="food-badge">Détails programme</div>
            <h1 className="text-4xl font-black text-[#1a472a] tracking-tight">{sub.mealPlan}</h1>
          </div>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Montant Contrat</p>
          <p className="text-4xl font-black text-[#1a472a] italic font-serif leading-none">{formatPrice(sub.price)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* User & Goal */}
          <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100 shadow-inner grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1a472a] shadow-sm">
                  <User size={20} />
                </div>
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Client</h2>
              </div>
              <div className="space-y-1 ml-14">
                <p className="text-2xl font-black text-gray-900 leading-none">{sub.user.firstName} {sub.user.lastName}</p>
                <p className="text-sm font-medium text-gray-400 italic">{sub.user.email}</p>
                <p className="text-lg font-black text-gray-900 pt-2">+221 {sub.user.phone || 'N/A'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                  <Zap size={20} />
                </div>
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Objectif</h2>
              </div>
              <div className="space-y-1 ml-14">
                <p className="text-2xl font-black text-[#1a472a] italic font-serif leading-none">{sub.goal}</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">{sub.duration === 'SEVEN_DAYS' ? '7 Jours' : '4 Semaines'}</p>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                <Calendar size={24} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Calendrier du programme</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-3xl space-y-2 border border-white">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Début</p>
                <p className="text-2xl font-black text-gray-900 italic font-serif">{new Date(sub.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl space-y-2 border border-white">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fin prévue</p>
                <p className="text-2xl font-black text-[#1a472a] italic font-serif">{new Date(sub.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
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
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Gestion</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Statut Abonnement</label>
                <select 
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-black text-gray-900 shadow-inner text-sm" 
                  value={newStatus} 
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="ACTIVE">ACTIF</option>
                  <option value="PAUSED">EN PAUSE</option>
                  <option value="CANCELLED">ANNULÉ</option>
                  <option value="COMPLETED">TERMINÉ</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">État Paiement</label>
                <select 
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-black text-gray-900 shadow-inner text-sm" 
                  value={paymentStatus} 
                  onChange={(e) => setPaymentStatus(e.target.value)}
                >
                  <option value="PENDING">ATTENTE PAIEMENT</option>
                  <option value="CONFIRMED">ENCAISSÉ</option>
                  <option value="FAILED">ÉCHEC</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={save}
            disabled={saving}
            className="btn btn-primary w-full py-8 text-xl font-black shadow-2xl shadow-emerald-900/30 flex items-center justify-center gap-4 disabled:opacity-50 group hover:scale-[1.02] transition-transform"
          >
            {saving ? (
              <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Mettre à jour
                <Save size={24} className="group-hover:scale-110 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
