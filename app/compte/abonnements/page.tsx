'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Calendar, CheckCircle, Clock, ArrowLeft, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

type Subscription = {
  id: string
  goal: string
  mealPlan: string
  duration: string
  startDate: string
  endDate: string
  price: number
  status: string
  createdAt: string
  payments: Array<{
    status: string
    method: string
  }>
}

export default function CompteAbonnementsPage() {
  const { data: session, status: authStatus } = useSession()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetchSubscriptions()
    }
  }, [session])

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('/api/subscriptions')
      const data = await response.json()
      setSubscriptions(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen pt-14 md:pt-16 pb-32 container-wide flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-100 border-t-[#1a472a] rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="pt-14 md:pt-16 pb-32 bg-[#fffdfa]">
      <div className="container-wide">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/compte" className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#1a472a] transition-all shadow-sm">
            <ArrowLeft size={24} />
          </Link>
          <div className="space-y-1">
            <div className="food-badge">Mes programmes</div>
            <h1 className="text-4xl font-black tracking-tight text-[#1a472a]">Mes Abonnements</h1>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-4 border-emerald-50 border-t-[#1a472a] rounded-full animate-spin" />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Chargement de vos abonnements...</p>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="bg-white p-12 lg:p-20 rounded-[4rem] border border-gray-100 shadow-2xl shadow-gray-200/50 text-center space-y-8">
            <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-200 mx-auto">
              <Zap size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-gray-900">Aucun abonnement actif</h2>
              <p className="text-gray-500 font-medium max-w-sm mx-auto">Simplifiez-vous la vie avec nos programmes nutritionnels sur mesure.</p>
            </div>
            <Link href="/abonnements" className="btn btn-primary btn-lg px-12">
              Découvrir les formules
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="bg-white rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden flex flex-col md:flex-row">
                <div className="p-10 md:w-1/3 bg-emerald-50/50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-emerald-100/50">
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
                      sub.status === 'ACTIVE' ? 'bg-[#1a472a] text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      <Calendar size={28} />
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        sub.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-100 text-gray-400 border-gray-200'
                      }`}>
                        {sub.status === 'ACTIVE' ? 'Programme Actif' : sub.status}
                      </span>
                      <h2 className="text-2xl font-black text-gray-900 mt-3 leading-tight">{sub.mealPlan}</h2>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Objectif</p>
                    <p className="text-xl font-black text-[#1a472a] italic font-serif leading-none">{sub.goal}</p>
                  </div>
                </div>

                <div className="p-10 flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shadow-inner">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Durée</p>
                        <p className="font-bold text-gray-900">{sub.duration === 'SEVEN_DAYS' ? '7 Jours' : '4 Semaines'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shadow-inner">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Période</p>
                        <p className="font-bold text-gray-900 text-sm">
                          Du {new Date(sub.startDate).toLocaleDateString('fr-FR')} au {new Date(sub.endDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Paiement</p>
                        <p className="font-bold text-gray-900">
                          {sub.payments[0]?.status === 'CONFIRMED' ? 'Validé' : 'En attente'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shadow-inner">
                        <Zap size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Méthode</p>
                        <p className="font-bold text-gray-900">{sub.payments[0]?.method}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center lg:text-right space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Montant</p>
                      <p className="text-4xl font-black text-[#1a472a] italic font-serif leading-none">{formatPrice(sub.price)}</p>
                    </div>
                    <button className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] border-b-2 border-emerald-100 pb-1 hover:border-[#1a472a] transition-all">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 bg-[#1a472a] rounded-[4rem] p-12 lg:p-24 text-center text-white space-y-10 relative overflow-hidden shadow-2xl shadow-emerald-900/30">
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black leading-none">Besoin d&apos;aide ?</h2>
            <p className="text-xl text-white/70 font-medium italic">
              Notre équipe nutrition est là pour vous accompagner dans votre programme.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="btn bg-white text-[#1a472a] btn-lg px-12 py-6 text-xl flex items-center gap-3 group">
                Contacter un nutritionniste
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px]" />
        </div>
      </div>
    </div>
  )
}
