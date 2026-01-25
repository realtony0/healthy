'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useEffect, Suspense } from 'react'
import { SUBSCRIPTION_GOALS, SUBSCRIPTION_MEAL_PLANS, SUBSCRIPTION_DURATIONS, SUBSCRIPTION_PRICES, PAYMENT_METHODS } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import { addDays } from 'date-fns'
import { ArrowLeft, Calendar, MapPin, Phone, CreditCard, Banknote, Wallet, Check, ShieldCheck, AlertCircle, Sparkles, ChevronRight } from 'lucide-react'
import Link from 'next/link'

function CommanderAbonnementContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const plan = searchParams.get('plan') as keyof typeof SUBSCRIPTION_MEAL_PLANS
  const goal = searchParams.get('goal') as keyof typeof SUBSCRIPTION_GOALS
  const duration = searchParams.get('duration') as 'SEVEN_DAYS' | 'FOUR_WEEKS'

  const [formData, setFormData] = useState({
    deliveryAddress: '',
    deliveryPhone: '',
    paymentMethod: 'CASH' as keyof typeof PAYMENT_METHODS,
    startDate: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (!session && typeof window !== 'undefined') {
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent(window.location.href))
    }
  }, [session, router])

  if (!plan || !goal || !duration) {
    return (
      <div className="min-h-screen pt-16 md:pt-20 pb-32 container-wide flex flex-col items-center justify-center text-center space-y-8">
        <div className="w-24 h-24 bg-red-50 rounded-[2.5rem] flex items-center justify-center text-red-400 border-2 border-red-100 shadow-xl shadow-red-900/5">
          <AlertCircle size={48} />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-gray-900">Choix incomplet</h1>
          <p className="text-gray-500 font-medium max-w-sm mx-auto">Veuillez sélectionner un objectif précis sur la page des abonnements pour continuer.</p>
        </div>
        <Link href="/abonnements" className="btn btn-primary btn-lg px-12">
          Retour aux abonnements
        </Link>
      </div>
    )
  }

  const price =
    duration === 'SEVEN_DAYS'
      ? SUBSCRIPTION_PRICES.SEVEN_DAYS[plan as keyof typeof SUBSCRIPTION_PRICES.SEVEN_DAYS]?.[
          goal as keyof typeof SUBSCRIPTION_PRICES.SEVEN_DAYS.DEJEUNER_SEUL
        ] || 0
      : SUBSCRIPTION_PRICES.FOUR_WEEKS.DEJEUNER_SEUL[
          goal as keyof typeof SUBSCRIPTION_PRICES.FOUR_WEEKS.DEJEUNER_SEUL
        ] || 0

  const endDate =
    duration === 'SEVEN_DAYS'
      ? addDays(new Date(formData.startDate), 7)
      : addDays(new Date(formData.startDate), 28)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal,
          mealPlan: plan,
          duration,
          startDate: formData.startDate,
          deliveryAddress: formData.deliveryAddress,
          deliveryPhone: formData.deliveryPhone,
          paymentMethod: formData.paymentMethod,
          price,
        }),
      })

      if (response.ok) {
        router.push(`/compte/abonnements`)
      } else {
        alert("Erreur lors de la création de l'abonnement")
      }
    } catch (error) {
      console.error('Error creating subscription:', error)
      alert("Erreur lors de la création de l'abonnement")
    } finally {
      setLoading(false)
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

  return (
    <div className="pt-16 md:pt-20 pb-32 bg-[#fffdfa]">
      <div className="container-wide">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/abonnements" className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#1a472a] transition-all shadow-sm">
            <ArrowLeft size={24} />
          </Link>
          <div className="space-y-1">
            <div className="food-badge">Dernière étape</div>
            <h1 className="text-4xl font-black tracking-tight text-[#1a472a]">Détails de l&apos;abonnement</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {/* Summary Mobile Only */}
            <div className="lg:hidden bg-[#1a472a] p-8 rounded-[3rem] text-white space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60">Votre choix</p>
              <h2 className="text-2xl font-black">{SUBSCRIPTION_MEAL_PLANS[plan]}</h2>
              <p className="font-bold italic font-serif text-emerald-400">{SUBSCRIPTION_GOALS[goal]}</p>
            </div>

            {/* Start Date */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                  <Calendar size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Date de début</h2>
              </div>
              
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Choisissez votre premier jour</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner"
                />
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                  <Check size={16} className="text-emerald-600" strokeWidth={4} />
                  <p className="text-xs font-bold text-emerald-800 italic">
                    Fin de période : {endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                  <MapPin size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Lieu de livraison</h2>
              </div>
              
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Adresse précise à Dakar</label>
                  <input
                    type="text"
                    required
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner"
                    placeholder="Ex: Almadies, Ngor, Ouakam, Point E..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Numéro de téléphone</label>
                  <div className="relative flex items-center">
                    <div className="absolute left-8 text-gray-400 font-black border-r border-gray-200 pr-4">+221</div>
                    <input
                      type="tel"
                      required
                      value={formData.deliveryPhone}
                      onChange={(e) => setFormData({ ...formData, deliveryPhone: e.target.value })}
                      className="w-full pl-24 pr-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner"
                      placeholder="77 000 00 00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 shadow-inner">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Mode de paiement</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(PAYMENT_METHODS).map(([key, label]) => (
                  <label
                    key={key}
                    className={`flex flex-col items-center gap-4 p-6 rounded-[2.5rem] border-2 transition-all duration-300 cursor-pointer ${
                      formData.paymentMethod === key
                        ? 'border-[#1a472a] bg-emerald-50 shadow-md'
                        : 'border-gray-50 bg-white hover:border-emerald-100 shadow-sm'
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
                      formData.paymentMethod === key ? 'bg-[#1a472a] text-white shadow-lg' : 'bg-gray-100 text-gray-400'
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
                <div className={`p-8 border-2 rounded-[2.5rem] space-y-5 animate-in fade-in slide-in-from-top-2 duration-300 ${
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
                    <div>
                      <h3 className={`text-base font-black mb-3 ${
                        formData.paymentMethod === 'WAVE' ? 'text-blue-900' : 'text-orange-900'
                      }`}>
                        Étapes de paiement
                      </h3>
                      <div className={`space-y-2.5 text-sm ${
                        formData.paymentMethod === 'WAVE' ? 'text-blue-900' : 'text-orange-900'
                      }`}>
                        <div className="flex items-start gap-2.5">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0 ${
                            formData.paymentMethod === 'WAVE' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'
                          }`}>
                            1
                          </div>
                          <p className="font-black">Ouvrez l'app {formData.paymentMethod === 'WAVE' ? 'Wave' : 'Orange Money'}</p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0 ${
                            formData.paymentMethod === 'WAVE' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'
                          }`}>
                            2
                          </div>
                          <p className="font-black">Allez dans "Envoyer de l'argent"</p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0 ${
                            formData.paymentMethod === 'WAVE' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'
                          }`}>
                            3
                          </div>
                          <p className="font-black">Entrez le numéro : <strong className={`text-lg ${
                            formData.paymentMethod === 'WAVE' ? 'text-blue-600' : 'text-orange-600'
                          }`}>78 598 71 43</strong></p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0 ${
                            formData.paymentMethod === 'WAVE' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'
                          }`}>
                            4
                          </div>
                          <p className="font-black">Montant : <span className={`text-xl ${
                            formData.paymentMethod === 'WAVE' ? 'text-blue-600' : 'text-orange-600'
                          }`}>{formatPrice(price)}</span> FCFA</p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0 ${
                            formData.paymentMethod === 'WAVE' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'
                          }`}>
                            5
                          </div>
                          <p className="font-black">Dans "Référence", mettez votre <strong>nom complet</strong></p>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0 ${
                            formData.paymentMethod === 'WAVE' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'
                          }`}>
                            6
                          </div>
                          <p className="font-black">Confirmez le transfert</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`bg-white p-5 rounded-xl text-center border-2 ${
                      formData.paymentMethod === 'WAVE' ? 'border-blue-200' : 'border-orange-200'
                    }`}>
                      <p className={`text-xs font-black uppercase tracking-widest mb-2 ${
                        formData.paymentMethod === 'WAVE' ? 'text-blue-400' : 'text-orange-400'
                      }`}>
                        Numéro {formData.paymentMethod === 'WAVE' ? 'Wave' : 'Orange Money'}
                      </p>
                      <p className={`text-3xl font-black tracking-tighter mb-2 ${
                        formData.paymentMethod === 'WAVE' ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        78 598 71 43
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText('785987143')
                          alert('Numéro copié !')
                        }}
                        className={`text-xs font-bold uppercase tracking-widest ${
                          formData.paymentMethod === 'WAVE' ? 'text-blue-500 hover:text-blue-600' : 'text-orange-500 hover:text-orange-600'
                        }`}
                      >
                        📋 Copier
                      </button>
                    </div>

                    <div className={`p-4 rounded-xl border-2 ${
                      formData.paymentMethod === 'WAVE' 
                        ? 'bg-blue-100/70 border-blue-300' 
                        : 'bg-orange-100/70 border-orange-300'
                    }`}>
                      <p className={`text-xs font-black mb-2 ${
                        formData.paymentMethod === 'WAVE' ? 'text-blue-900' : 'text-orange-900'
                      }`}>
                        ⚠️ Important
                      </p>
                      <ul className={`text-xs font-bold leading-relaxed space-y-1 ${
                        formData.paymentMethod === 'WAVE' ? 'text-blue-800' : 'text-orange-800'
                      }`}>
                        <li>• Mettez votre <strong>nom complet</strong> en référence (OBLIGATOIRE)</li>
                        <li>• Votre abonnement sera activé dès réception du paiement</li>
                        <li>• Vous recevrez une confirmation par WhatsApp</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a472a] p-10 rounded-[3.5rem] text-white shadow-2xl shadow-emerald-900/30 space-y-10 relative overflow-hidden sticky top-32 border-4 border-white/5">
              <div className="space-y-8 relative z-10">
                <h2 className="text-2xl font-black uppercase tracking-widest text-emerald-400/60">Récapitulatif</h2>
                
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest">Objectif Santé</p>
                    <p className="text-2xl font-black italic font-serif leading-none">{SUBSCRIPTION_GOALS[goal]}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest">Formule Choisie</p>
                    <p className="text-xl font-black leading-tight">{SUBSCRIPTION_MEAL_PLANS[plan]}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest">Durée de l&apos;engagement</p>
                    <p className="text-xl font-black leading-tight">{SUBSCRIPTION_DURATIONS[duration]}</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold uppercase tracking-widest text-emerald-400/60">Total à régler</span>
                    <div className="text-right">
                      <span className="text-5xl font-black italic font-serif leading-none">{formatPrice(price)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="btn bg-white text-[#1a472a] w-full py-6 text-xl font-black shadow-2xl shadow-black/20 flex items-center justify-center gap-3 group relative z-10 disabled:opacity-50 transition-all active:scale-95"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-[#1a472a]/30 border-t-[#1a472a] rounded-full animate-spin" />
                ) : (
                  <>
                    Valider mon programme
                    <Check size={24} strokeWidth={4} className="group-hover:scale-125 transition-transform text-emerald-500" />
                  </>
                )}
              </button>
              
              {/* Decor */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400/5 rounded-full blur-[80px]" />
            </div>
            
            <div className="mt-8 bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center gap-4 shadow-sm">
              <ShieldCheck className="text-emerald-600 flex-shrink-0" size={32} />
              <p className="text-xs font-bold text-emerald-900/60 leading-relaxed italic">
                Paiement à la livraison. Notre équipe nutrition vous contactera pour valider votre planning.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CommanderAbonnementPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-16 md:pt-20 pb-32 container-wide flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-100 border-t-[#1a472a] rounded-full animate-spin" />
      </div>
    }>
      <CommanderAbonnementContent />
    </Suspense>
  )
}
