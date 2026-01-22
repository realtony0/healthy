import { CheckCircle, ShoppingBag, Truck, Calendar, CreditCard, Sparkles, Target, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CommentCaMarchePage() {
  return (
    <div className="pt-14 md:pt-16 pb-32 bg-[#fffdfa]">
      <div className="container-wide">
        <div className="max-w-2xl mb-24 space-y-6 text-center md:text-left">
          <div className="food-badge">Notre Concept</div>
          <h1 className="text-6xl font-black tracking-tight text-[#1a472a]">Comment ça <br />marche ?</h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Manger sainement n&apos;a jamais été aussi simple. Découvrez les étapes pour transformer votre quotidien.
          </p>
        </div>

        <div className="space-y-32">
          {/* Commande à la carte */}
          <section>
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2 space-y-10">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 shadow-inner">
                    <ShoppingBag size={32} />
                  </div>
                  <h2 className="text-4xl font-black text-[#1a472a]">La commande <br />à la carte</h2>
                  <p className="text-lg text-gray-500 font-medium">Parfait pour vos envies du moment, sans engagement.</p>
                </div>

                <div className="grid gap-8">
                  {[
                    { title: '1. Parcourez le menu', desc: 'Découvrez nos plats healthy et leurs valeurs nutritionnelles détaillées.' },
                    { title: '2. Composez votre panier', desc: 'Sélectionnez vos plats ou créez votre propre bowl sur mesure.' },
                    { title: '3. Validez & Détendez-vous', desc: 'Renseignez votre adresse. Nos chefs s\'activent déjà en cuisine.' },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a472a] text-white flex items-center justify-center font-black italic">
                        {i + 1}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-black text-gray-900 leading-none">{step.title}</h3>
                        <p className="text-gray-500 font-medium">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link href="/menu" className="btn btn-primary px-10 py-5 text-lg">
                  Voir le menu maintenant
                </Link>
              </div>
              
              <div className="md:w-1/2 bg-emerald-50 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden border-4 border-white shadow-xl">
                <div className="bg-white rounded-[3rem] p-8 shadow-2xl space-y-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                      <CheckCircle />
                    </div>
                    <p className="font-black text-gray-900 uppercase tracking-tighter">Fraîcheur Garantie</p>
                  </div>
                  <p className="text-gray-500 font-medium italic">
                    &ldquo;Chaque plat est cuisiné à la commande avec des ingrédients frais du marché de Dakar.&rdquo;
                  </p>
                </div>
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/30 rounded-full blur-3xl" />
              </div>
            </div>
          </section>

          {/* Abonnements */}
          <section>
            <div className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="md:w-1/2 space-y-10">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shadow-inner">
                    <Calendar size={32} />
                  </div>
                  <h2 className="text-4xl font-black text-[#1a472a]">Nos abonnements <br />nutritionnels</h2>
                  <p className="text-lg text-gray-500 font-medium">La solution clé en main pour vos objectifs de santé.</p>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-500 font-medium leading-relaxed italic border-l-4 border-emerald-100 pl-6">
                    Nos chefs s&apos;occupent de tout. Vous choisissez votre objectif calorique, et nous adaptons les portions de nos plats pour vous garantir des résultats sans frustration.
                  </p>
                  <div className="grid gap-4 pt-4">
                    {[
                      { title: 'Perte de poids', desc: 'Portions légères mais nutritives.', icon: <Target className="text-emerald-500" /> },
                      { title: 'Rééquilibrage', desc: 'Le mix parfait entre macros.', icon: <Target className="text-blue-500" /> },
                      { title: 'Prise de masse', desc: 'Portions généreuses en protéines.', icon: <Target className="text-orange-500" /> },
                    ].map((goal, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">{goal.icon}</div>
                        <div>
                          <p className="font-black text-gray-900 leading-none">{goal.title}</p>
                          <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-widest">{goal.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Link href="/abonnements" className="btn btn-outline w-full py-5 text-lg">
                  Découvrir les formules
                </Link>
              </div>
              
              <div className="md:w-1/2 grid grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-[3rem] p-8 text-center space-y-4 flex flex-col justify-center">
                  <p className="text-4xl font-black text-[#1a472a] italic font-serif leading-none">7j/7</p>
                  <p className="text-xs font-black text-emerald-900/40 uppercase tracking-widest leading-tight">Disponibilité totale</p>
                </div>
                <div className="bg-gray-900 rounded-[3rem] p-8 text-center space-y-4 text-white flex flex-col justify-center">
                  <p className="text-4xl font-black italic font-serif leading-none text-emerald-400">-15%</p>
                  <p className="text-xs font-black text-white/40 uppercase tracking-widest leading-tight">Économie moyenne</p>
                </div>
                <div className="col-span-2 bg-[#1a472a] rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-center gap-2">
                  <p className="text-2xl font-black italic font-serif relative z-10">Livraison à domicile</p>
                  <p className="text-sm font-medium text-white/60 relative z-10">Partout à Dakar selon votre zone (1000 à 3000 FCFA).</p>
                  <div className="absolute right-[-20px] top-[-20px] text-white/10 rotate-12">
                    <Truck size={120} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Paiement */}
          <section className="bg-white rounded-[4rem] p-12 lg:p-24 border border-gray-100 shadow-2xl shadow-gray-200/50">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2 space-y-8">
                <div className="w-16 h-16 bg-orange-50 rounded-3xl flex items-center justify-center text-orange-500 shadow-inner">
                  <CreditCard size={32} />
                </div>
                <h2 className="text-4xl font-black text-[#1a472a]">Paiement à la <br />livraison</h2>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Pas besoin de carte bancaire en ligne. Payez en toute sécurité au moment où vous recevez votre repas.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Cash', 'Wave', 'Orange Money'].map(m => (
                    <div key={m} className="px-6 py-3 bg-gray-50 rounded-2xl font-black text-sm uppercase tracking-widest text-gray-400">
                      {m}
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2 bg-gray-50 rounded-[3rem] p-10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-emerald-500 shadow-xl mx-auto border-4 border-emerald-50">
                    <CheckCircle size={40} strokeWidth={3} />
                  </div>
                  <p className="text-2xl font-black text-[#1a472a]">Simple & Sûr</p>
                  <p className="text-gray-400 font-bold">Zéro risque, 100% confiance.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* CTA final */}
        <div className="mt-32 text-center space-y-10">
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-[#1a472a]">Prêt à essayer ?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/menu" className="btn btn-primary btn-lg px-12 group">
              Voir la carte
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/abonnements" className="btn btn-outline btn-lg px-12">
              S&apos;abonner
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
