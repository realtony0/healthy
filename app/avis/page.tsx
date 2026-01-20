import { Star, Quote, MessageSquare } from 'lucide-react'
import Image from 'next/image'

export default function AvisPage() {
  const testimonials = [
    {
      name: 'Aminata Diop',
      role: 'Sportive',
      text: 'Les meilleurs bowls de Dakar ! Frais, savoureux et les portions sont généreuses. Le service de livraison est top.',
      rating: 5,
      date: 'Il y a 2 jours'
    },
    {
      name: 'Moussa Sy',
      role: 'Entrepreneur',
      text: 'Parfait pour mon rééquilibrage alimentaire. Je commande chaque semaine depuis 3 mois et je ne m\'en lasse pas.',
      rating: 5,
      date: 'Il y a 1 semaine'
    },
    {
      name: 'Fatou Ndiaye',
      role: 'Cadre',
      text: 'Enfin une solution saine et rapide pour mes déjeuners au bureau. Les produits sont de qualité, ça se sent.',
      rating: 5,
      date: 'Il y a 2 semaines'
    },
    {
      name: 'Omar Fall',
      role: 'Coach sportif',
      text: 'Je recommande Healthy Dakar à tous mes clients. C\'est le meilleur rapport qualité-prix en nutrition à Dakar.',
      rating: 5,
      date: 'Il y a 1 mois'
    }
  ]

  return (
    <div className="pt-32 pb-32 bg-[#fffdfa]">
      <div className="container-wide">
        <div className="max-w-2xl mb-24 space-y-6 text-center md:text-left">
          <div className="food-badge mx-auto md:mx-0 w-fit">
            <Star size={14} className="fill-emerald-600 text-emerald-600" />
            4.9/5 sur plus de 500 avis
          </div>
          <h1 className="text-6xl font-black tracking-tight text-[#1a472a]">Vos Témoignages</h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Découvrez pourquoi la communauté Healthy Dakar nous fait confiance chaque jour.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <Quote className="absolute top-10 right-10 text-emerald-50 w-24 h-24 -z-0" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={20} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <p className="text-2xl font-black text-gray-900 leading-tight italic font-serif">
                  &ldquo;{t.text}&rdquo;
                </p>
                
                <div className="flex justify-between items-end pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#1a472a] font-black text-xl shadow-inner">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-gray-900">{t.name}</p>
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-[#1a472a] rounded-[4rem] p-12 lg:p-24 text-center text-white space-y-10 relative overflow-hidden shadow-2xl shadow-emerald-900/30">
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black leading-none">Partagez votre expérience.</h2>
            <p className="text-xl text-white/70 font-medium">
              Votre avis est précieux pour nous aider à nous améliorer chaque jour.
            </p>
            <button className="btn bg-white text-[#1a472a] btn-lg px-12 py-6 text-xl flex items-center gap-3 mx-auto group">
              <MessageSquare className="group-hover:scale-110 transition-transform" />
              Laisser un avis
            </button>
          </div>
          <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px]" />
        </div>
      </div>
    </div>
  )
}
