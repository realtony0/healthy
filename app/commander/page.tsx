import Link from 'next/link'
import { ArrowRight, ShoppingBag, Calendar, Sparkles } from 'lucide-react'

export default function CommanderPage() {
  return (
    <div className="pt-32 pb-32 bg-[#fffdfa]">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto text-center mb-20 space-y-6">
          <div className="food-badge mx-auto">Prêt à déguster ?</div>
          <h1 className="text-6xl font-black tracking-tight text-[#1a472a]">Comment souhaitez-vous commander ?</h1>
          <p className="text-xl text-gray-500 font-medium">Choisissez l&apos;option qui correspond le mieux à votre style de vie.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* A la carte */}
          <Link
            href="/menu"
            className="bg-white border border-gray-100 rounded-[4rem] p-12 lg:p-16 shadow-xl shadow-gray-200/50 group hover:border-[#1a472a] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform">
                <ShoppingBag size={40} />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-[#1a472a] leading-none transition-colors">À la carte</h2>
                <p className="text-lg text-gray-500 font-medium leading-relaxed italic">
                  Choisissez vos plats préférés, créez votre bowl sur mesure et commandez quand vous voulez.
                </p>
              </div>
            </div>
            <div className="mt-12 flex items-center gap-3 text-[#1a472a] font-black uppercase tracking-widest text-sm border-b-2 border-emerald-100 pb-2 w-fit group-hover:border-[#1a472a] transition-all">
              Voir toute la carte
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          {/* Abonnement */}
          <Link
            href="/abonnements"
            className="bg-[#1a472a] rounded-[4rem] p-12 lg:p-16 shadow-2xl shadow-emerald-900/20 group hover:scale-[1.02] transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-8 relative z-10">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-emerald-400 shadow-xl group-hover:scale-110 transition-transform">
                <Calendar size={40} />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-white leading-none">Abonnement</h2>
                <p className="text-lg text-white/70 font-medium leading-relaxed italic">
                  Simplifiez votre quotidien. Recevez vos repas chaque jour selon vos objectifs nutritionnels.
                </p>
              </div>
            </div>
            <div className="mt-12 flex items-center gap-3 text-emerald-400 font-black uppercase tracking-widest text-sm border-b-2 border-white/10 pb-2 w-fit group-hover:border-emerald-400 transition-all relative z-10">
              Découvrir les formules
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </div>
            
            {/* Decor */}
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-10 right-10 text-white/5 rotate-12">
              <Sparkles size={160} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
