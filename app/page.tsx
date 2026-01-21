import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, ShieldCheck, Leaf, Sparkles, Plus, Clock, MapPin, Heart, ShoppingBag, ChevronRight } from 'lucide-react'

export default function HomePage() {
  const bestSellers = [
    { name: 'Bowl Poulet Signature', price: '3 500', img: '/img/bowl-poulet-mais.jpeg', tag: 'Le favori', kcal: '450' },
    { name: 'Bœuf & Patate Douce', price: '4 200', img: '/img/boeuf-puree-patate-douce.jpeg', tag: 'Énergie', kcal: '520' },
    { name: 'Poisson aux Herbes', price: '3 900', img: '/img/poisson-blanc-herbes.jpeg', tag: 'Léger', kcal: '410' },
  ]

  return (
    <div className="bg-[#fffdfa]">
      {/* Hero Section - Minimalist & Premium */}
      <section className="relative pt-24 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8 md:space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#1a472a] px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border border-emerald-100">
                <Sparkles size={14} className="text-emerald-500" />
                Cuisiné ce matin à Dakar
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-[#1a472a] leading-[0.9] tracking-tighter">
                Sain. <br />
                Frais. <br />
                <span className="text-emerald-500 italic font-serif">Prêt.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                L'excellence nutritionnelle livrée chez vous. Des repas frais, équilibrés et 100% halal préparés chaque jour.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 px-4 sm:px-0">
                <Link href="/menu" className="btn btn-primary btn-lg px-12 py-5 md:py-6 text-lg md:text-xl shadow-2xl shadow-emerald-900/20 group">
                  Commander
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/abonnements" className="btn btn-outline btn-lg px-12 py-5 md:py-6 text-lg md:text-xl border-emerald-100">
                  S'abonner
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 pt-6 text-gray-400">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-white bg-gray-100" />
                  ))}
                </div>
                <p className="text-xs md:text-sm font-bold italic">Rejoint par +500 clients à Dakar</p>
              </div>
            </div>

            <div className="relative px-4 md:px-0">
              <div className="relative aspect-square rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-white md:rotate-2 md:hover:rotate-0 transition-transform duration-700">
                <Image 
                  src="/img/bowl-poulet-mais.jpeg" 
                  alt="Plat Healthy" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-10 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-gray-50 animate-float hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                    <Heart fill="currentColor" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Qualité</p>
                    <p className="font-black text-gray-900">100% Halal</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-10 -left-6 bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-50 animate-bounce-slow hidden md:block">
                <p className="text-4xl font-black text-emerald-500 italic font-serif leading-none">4.9</p>
                <div className="flex gap-0.5 mt-2">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" className="text-yellow-400" />)}
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-3 leading-none">Avis Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Livraison Express', desc: 'Livré partout à Dakar entre 6h et 23h.', icon: <Clock />, color: 'text-blue-500 bg-blue-50' },
              { title: 'Produits Frais', desc: 'Ingrédients sélectionnés chaque matin.', icon: <Leaf />, color: 'text-emerald-500 bg-emerald-50' },
              { title: 'Paiement Facile', desc: 'Cash, Wave ou Orange Money à la livraison.', icon: <ShieldCheck />, color: 'text-orange-500 bg-orange-50' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-6 group">
                <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center ${s.color} transition-transform group-hover:scale-110 duration-500`}>
                  {s.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#1a472a] tracking-tight">{s.title}</h3>
                  <p className="text-gray-500 font-medium italic">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories / Best Sellers */}
      <section className="py-24">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8 px-4 md:px-0">
            <div className="space-y-4 text-center md:text-left w-full md:w-auto">
              <div className="food-badge mx-auto md:mx-0">Best-sellers</div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#1a472a] leading-none tracking-tighter">Nos plats <br className="hidden md:block" /><span className="text-emerald-500 italic font-serif">favoris.</span></h2>
            </div>
            <Link href="/menu" className="btn btn-outline btn-lg px-10 group w-full md:w-auto">
              Voir toute la carte
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 px-4 md:px-0">
            {bestSellers.map((p, i) => (
              <div key={i} className="group">
                <Link href="/menu" className="block space-y-6">
                  <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden relative shadow-2xl shadow-gray-200/50">
                    <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-8 left-8 bg-white md:bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#1a472a] shadow-sm">
                      {p.tag}
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 bg-brand md:bg-brand/90 backdrop-blur-md p-6 rounded-[2.5rem] flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <div className="text-white">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Énergie</p>
                        <p className="text-xl font-black italic font-serif">{p.kcal} cal</p>
                      </div>
                      <div className="w-12 h-12 bg-emerald-400 rounded-2xl flex items-center justify-center text-brand">
                        <Plus size={24} strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 group-hover:text-brand transition-colors">{p.name}</h3>
                      <p className="text-2xl font-black text-emerald-600 italic font-serif tracking-tight">{p.price} <span className="text-sm font-normal text-gray-400 not-italic">FCFA</span></p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-brand group-hover:text-white transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual CTA Section */}
      <section className="py-24 container-wide">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#1a472a] rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden flex flex-col justify-center space-y-8 group shadow-2xl shadow-emerald-900/20">
            <h3 className="text-5xl lg:text-7xl font-black leading-none tracking-tighter relative z-10">Simplifiez <br />votre <span className="text-emerald-400 italic font-serif">routine.</span></h3>
            <p className="text-xl text-white/60 font-medium max-w-sm italic relative z-10">
              Abonnez-vous pour recevoir vos repas chaque jour automatiquement.
            </p>
            <Link href="/abonnements" className="btn bg-white text-brand btn-lg w-fit px-12 py-6 text-xl font-black relative z-10 hover:bg-emerald-50 transition-colors">
              Nos Formules
            </Link>
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-emerald-400/10 rounded-full blur-[100px]" />
          </div>
          
          <div className="bg-emerald-50 rounded-[4rem] p-12 lg:p-20 flex flex-col justify-center space-y-8 group border-4 border-white shadow-xl">
            <h3 className="text-5xl lg:text-7xl font-black text-brand leading-none tracking-tighter">Composez <br /><span className="text-emerald-600 italic font-serif">le vôtre.</span></h3>
            <p className="text-xl text-gray-500 font-medium max-w-sm italic">
              Le module "Crée ton Bowl" pour un repas qui vous ressemble vraiment.
            </p>
            <Link href="/menu/cree-ton-bowl" className="btn btn-primary btn-lg w-fit px-12 py-6 text-xl">
              Créer mon Bowl
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery Zones Mini */}
      <section className="py-12 border-t border-gray-100">
        <div className="container-wide flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">
            <MapPin size={14} />
            <span>Zones desservies :</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Almadies', 'Point E', 'Plateau', 'Ngor', 'Ouakam', 'Mermoz'].map((z) => (
              <span key={z} className="px-4 py-2 bg-gray-50 rounded-full text-xs font-black text-gray-600 uppercase tracking-widest">{z}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
