import Link from 'next/link'
import { Check, ArrowRight, Calendar, Target, Zap, Clock, ChevronRight } from 'lucide-react'
import { SUBSCRIPTION_GOALS, SUBSCRIPTION_MEAL_PLANS, SUBSCRIPTION_PRICES } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Abonnements Nutritionnels | Votre Coach Repas à Dakar',
  description: 'Simplifiez votre alimentation avec nos programmes hebdomadaires. Perte de poids, rééquilibrage ou prise de masse. Livraison gratuite partout à Dakar.',
}

export default function AbonnementsPage() {
  const plans = [
    {
      id: 'DEJEUNER_SEUL',
      name: SUBSCRIPTION_MEAL_PLANS.DEJEUNER_SEUL,
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      features: ['1 repas par jour', 'Livraison incluse', 'Recettes variées'],
      popular: false
    },
    {
      id: 'DEJEUNER_DINER',
      name: SUBSCRIPTION_MEAL_PLANS.DEJEUNER_DINER,
      icon: <Target className="w-5 h-5 text-red-500" />,
      features: ['2 repas par jour', 'Livraison incluse', 'Économie par repas'],
      popular: true
    },
    {
      id: 'PETIT_DEJEUNER_DEJEUNER_DINER',
      name: SUBSCRIPTION_MEAL_PLANS.PETIT_DEJEUNER_DEJEUNER_DINER,
      icon: <Calendar className="w-5 h-5 text-green-500" />,
      features: ['3 repas par jour', 'Livraison incluse', 'Solution complète'],
      popular: false
    }
  ]

  return (
    <div className="pt-14 md:pt-16 pb-32">
      <div className="container-wide px-4 md:px-0">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-20 text-center md:text-left">
          <div className="food-badge mx-auto md:mx-0">Programmes</div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6 text-brand">Abonnements</h1>
          <p className="text-gray-500 text-lg leading-relaxed font-medium italic max-w-sm mx-auto md:mx-0">
            Plus besoin de réfléchir à vos repas. Choisissez votre formule et votre objectif.
          </p>
        </div>

        {/* Formules 7 jours */}
        <div className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-black text-brand uppercase tracking-widest text-xs">Formules 7 jours</h2>
            <div className="h-px bg-gray-100 flex-grow" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.id} className={`p-8 md:p-10 rounded-[2.5rem] border ${plan.popular ? 'border-brand ring-4 ring-emerald-50 shadow-2xl shadow-emerald-900/10' : 'border-gray-100 bg-white shadow-xl shadow-gray-200/50'} flex flex-col transition-all duration-500 hover:scale-[1.02]`}>
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.popular ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-400'}`}>
                    {plan.icon}
                  </div>
                  {plan.popular && (
                    <span className="bg-brand text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Populaire</span>
                  )}
                </div>

                <h3 className="text-2xl font-black mb-6 leading-tight text-gray-900 tracking-tighter">{plan.name}</h3>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-3 text-sm text-gray-600 font-bold italic">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <Check className="w-3 h-3" strokeWidth={4} />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-8 border-t border-gray-50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-2">Sélectionnez un objectif</p>
                  {Object.entries(SUBSCRIPTION_PRICES.SEVEN_DAYS[plan.id as keyof typeof SUBSCRIPTION_PRICES.SEVEN_DAYS]).map(([goal, price]) => (
                    <Link 
                      key={goal}
                      href={`/abonnements/commander?plan=${plan.id}&goal=${goal}&duration=SEVEN_DAYS`}
                      className="flex justify-between items-center py-4 px-5 rounded-2xl bg-gray-50 hover:bg-brand group transition-all"
                    >
                      <span className="text-sm font-black text-gray-500 group-hover:text-white transition-colors">{SUBSCRIPTION_GOALS[goal as keyof typeof SUBSCRIPTION_GOALS]}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-gray-900 group-hover:text-white italic font-serif transition-colors">{formatPrice(price)}</span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <section className="bg-emerald-50 rounded-[3.5rem] p-10 lg:p-24 border border-emerald-100 shadow-xl shadow-emerald-900/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <div className="space-y-4 text-center md:text-left">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto md:mx-0 text-brand shadow-sm"><Clock /></div>
              <h4 className="text-xl font-black text-[#1a472a] tracking-tight">Zéro Stress</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium italic">Plus de courses, plus de cuisine. On s&apos;occupe de tout.</p>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto md:mx-0 text-brand shadow-sm"><Zap /></div>
              <h4 className="text-xl font-black text-[#1a472a] tracking-tight">100% Frais</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium italic">Cuisiné chaque matin avec des produits locaux.</p>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto md:mx-0 text-brand shadow-sm"><Target /></div>
              <h4 className="text-xl font-black text-[#1a472a] tracking-tight">Sur Mesure</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium italic">Les portions sont adaptées à vos besoins précis.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
