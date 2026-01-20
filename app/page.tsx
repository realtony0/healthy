import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, ShieldCheck, Leaf, Sparkles, Plus, Clock, MapPin, Heart, ShoppingBag, Utensils, Timer, ChevronRight } from 'lucide-react'

export default function HomePage() {
  const bestSellers = [
    { name: 'Bowl Poulet Signature', price: '3.500 F', img: '/img/Boulettes de Poulet-Signature.jpeg', cal: '450 kcal', tag: 'Le favori' },
    { name: 'Saumon & Quinoa', price: '4.500 F', img: '/img/Poisson blanc et légumes.jpeg', cal: '480 kcal', tag: 'Omega 3' },
    { name: 'Bœuf Patate Douce', price: '4.500 F', img: '/img/Bœuf saisi accompagné de purée de patate douce.jpeg', cal: '520 kcal', tag: 'Protéiné' },
  ]

  const categories = [
    { name: 'Petit-Déj', img: '/img/yaourt grec energie.jpeg', count: '5 plats' },
    { name: 'Signature', img: '/img/Poulet grillé et légumes.jpeg', count: '8 plats' },
    { name: 'Snacks', img: '/img/energy balls: mix.jpeg', count: '12 options' },
    { name: 'Shots', img: '/img/shot mix.jpeg', count: '6 jus' },
  ]

  return (
    <div className="relative bg-[#fffdfa] selection:bg-emerald-100 selection:text-emerald-900">
      {/* Immersive Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-48 overflow-hidden">
        {/* Animated Background Decor */}
        <div className="bg-blob top-[-100px] right-[-100px] opacity-30 animate-blob-float" />
        <div className="bg-blob bottom-[10%] left-[-200px] opacity-20 animate-blob-float" style={{ background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)', animationDelay: '2s' }} />
        
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-16 lg:gap-24 items-center">
            <div className="space-y-12 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-emerald-100 shadow-xl shadow-emerald-900/5 animate-fade-in">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-brand">Cuisiné ce matin à Dakar</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-7xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] text-[#1a472a] animate-slide-up">
                  Mangez <br />
                  <span className="text-emerald-500 italic font-serif relative">
                    mieux.
                    <svg className="absolute -bottom-4 left-0 w-full h-4 text-emerald-200/60" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" /></svg>
                  </span>
                </h1>
                <p className="text-xl lg:text-3xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-tight font-medium animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  L&apos;excellence nutritionnelle livrée <br className="hidden lg:block" /> chez vous, sans aucun compromis.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Link href="/menu" className="btn btn-primary btn-lg px-14 py-8 text-2xl shadow-2xl shadow-emerald-900/30 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    Explorer la carte
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" size={28} />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
                <Link href="/abonnements" className="btn btn-outline btn-lg px-14 py-8 text-2xl border-emerald-100 bg-white/50 backdrop-blur-sm hover:bg-white transition-all shadow-xl shadow-gray-200/20">
                  S&apos;abonner
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10 pt-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                    <Timer size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Livraison</p>
                    <p className="font-bold text-gray-900 leading-none tracking-tight">~45 min</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-100 hidden sm:block" />
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Qualité</p>
                    <p className="font-bold text-gray-900 leading-none tracking-tight">100% Halal</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group hidden lg:block animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {/* Complex Image Composite */}
              <div className="relative aspect-[4/5] perspective-2000">
                <div className="absolute inset-0 bg-emerald-100 rounded-[5rem] rotate-6 scale-95 opacity-50 group-hover:rotate-2 transition-all duration-1000" />
                <div className="relative h-full w-full rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(26,71,42,0.3)] border-[16px] border-white group-hover:scale-[1.02] transition-all duration-1000">
                  <Image 
                    src="/img/Bowl de poulet au Maïs Doré.jpeg" 
                    alt="Plat Healthy de Chef" 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/40 via-transparent to-transparent" />
                </div>

                {/* Floating UI Elements */}
                <div className="absolute -top-12 -right-12 bg-white/90 backdrop-blur-2xl p-8 rounded-[3rem] shadow-2xl border border-white animate-bounce-slow">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100" />
                      ))}
                    </div>
                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">+500 Clients</p>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" className="text-yellow-400" />)}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-12 -left-12 bg-[#1a472a] p-10 rounded-[4rem] shadow-2xl text-white space-y-4 max-w-[240px] animate-float">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Sparkles className="text-emerald-400" />
                  </div>
                  <p className="text-xl font-black leading-tight italic font-serif">
                    &ldquo;Le goût du frais sans compromis.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Explorer - New Design */}
      <section className="py-20 lg:py-32 overflow-hidden">
        <div className="container-wide space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-brand">Parcourir par <span className="italic font-serif text-emerald-500">envie</span></h2>
            <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Du matin au soir, nous avons ce qu&apos;il vous faut</p>
          </div>

          <div className="flex overflow-x-auto no-scrollbar gap-8 pb-12 px-4 -mx-4">
            {categories.map((cat, i) => (
              <Link key={i} href="/menu" className="flex-shrink-0 group">
                <div className="relative w-64 h-80 rounded-[4rem] overflow-hidden mb-6 shadow-2xl transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-emerald-900/20 border-4 border-transparent group-hover:border-emerald-100">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-10 left-10 text-white space-y-1">
                    <p className="text-2xl font-black tracking-tight">{cat.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">{cat.count}</p>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/menu" className="flex-shrink-0 group">
              <div className="w-64 h-80 rounded-[4rem] bg-brand text-white flex flex-col items-center justify-center gap-6 group-hover:bg-emerald-600 transition-all duration-500 shadow-2xl shadow-emerald-900/20">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight size={40} className="text-white" />
                </div>
                <p className="text-xl font-black tracking-tight uppercase tracking-widest text-center">Voir toute <br />la carte</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Grid - More Artistic */}
      <section className="py-32 lg:py-48 bg-white relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="space-y-6 max-w-2xl text-center md:text-left">
              <div className="food-badge">Best-Sellers</div>
              <h2 className="text-6xl lg:text-8xl font-black tracking-tighter text-[#1a472a] leading-[0.85]">Les Incontournables <br /><span className="italic font-serif text-emerald-500">Dakarois</span></h2>
            </div>
            <Link href="/menu" className="btn btn-outline btn-lg px-10 group bg-gray-50 border-none hover:bg-brand hover:text-white transition-all">
              Menu Complet
              <Plus className="ml-3 group-hover:rotate-180 transition-transform" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16 lg:gap-24">
            {bestSellers.map((p, i) => (
              <div key={i} className="group flex flex-col gap-8">
                <Link href="/menu" className="relative block">
                  <div className="aspect-[4/5] rounded-[5rem] overflow-hidden relative shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 group-hover:shadow-[0_50px_100px_-25px_rgba(26,71,42,0.2)] group-hover:-translate-y-4">
                    <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-[#1a472a] shadow-sm">
                      {p.tag}
                    </div>
                    <div className="absolute bottom-10 left-10 right-10 bg-[#1a472a]/90 backdrop-blur-xl p-6 rounded-[2.5rem] flex items-center justify-between opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <div className="text-white space-y-1">
                        <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Apport Énergie</p>
                        <p className="text-xl font-black italic font-serif leading-none">{p.cal}</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-[#1a472a] flex items-center justify-center">
                        <ShoppingBag size={24} strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="px-6 space-y-2">
                  <h3 className="text-3xl font-black text-gray-900 group-hover:text-brand transition-colors">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black text-emerald-600 italic font-serif tracking-tight">{p.price}</p>
                    <div className="flex items-center gap-2 text-gray-300 font-bold uppercase tracking-widest text-[8px]">
                      <Utensils size={10} />
                      Portion Individuelle
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background Text Decor */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.02] translate-y-1/2">
          <p className="text-[30rem] font-black text-brand leading-none whitespace-nowrap">HEALTHY DAKAR HEALTHY DAKAR</p>
        </div>
      </section>

      {/* Hero-like Bento Section */}
      <section className="py-20 container-wide">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-10">
          <div className="bg-[#1a472a] rounded-[5rem] p-16 lg:p-28 text-white relative overflow-hidden shadow-2xl flex flex-col justify-center space-y-10 group">
            <div className="space-y-6 relative z-10">
              <h3 className="text-6xl lg:text-8xl font-black leading-[0.85] tracking-tighter animate-slide-up">Votre cuisine, <br />notre <span className="text-emerald-400 italic font-serif">passion.</span></h3>
              <p className="text-xl lg:text-2xl text-white/60 font-medium max-w-lg italic animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Rejoignez la révolution de l&apos;alimentation saine à Dakar. Livraison automatique, plaisir garanti.
              </p>
            </div>
            <Link href="/abonnements" className="btn bg-white text-brand btn-lg w-fit px-16 py-8 text-2xl font-black group relative z-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              S&apos;abonner maintenant
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
            {/* Decor */}
            <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[120px] group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px]" />
          </div>
          
          <div className="bg-emerald-50 rounded-[5rem] p-16 flex flex-col justify-between items-center text-center space-y-10 shadow-xl border-4 border-white group">
            <div className="w-28 h-28 bg-white rounded-[3rem] flex items-center justify-center text-brand shadow-2xl rotate-6 group-hover:rotate-0 transition-transform duration-700">
              <Sparkles size={48} className="text-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-brand tracking-tighter">Composez <br />sur mesure</h3>
              <p className="text-gray-500 font-bold italic max-w-xs mx-auto">L&apos;expérience ultime du bowl personnalisé selon vos besoins.</p>
            </div>
            <Link href="/menu/cree-ton-bowl" className="btn btn-outline w-full py-8 text-xl font-black border-emerald-200 bg-white/50 backdrop-blur-sm group hover:bg-brand hover:text-white transition-all">
              Créer mon Bowl
              <ChevronRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Footer Section */}
      <section className="py-32 container-wide">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: 'Ingrédients', title: '100% Locaux', sub: 'Circuit court direct', icon: <Leaf className="text-emerald-500" /> },
            { label: 'Cuisine', title: 'Zéro Congelé', sub: 'Frais tous les matins', icon: <Utensils className="text-blue-500" /> },
            { label: 'Vitesse', title: 'Livraison Express', sub: 'Chaque jour avant midi', icon: <Timer className="text-orange-500" /> },
            { label: 'Éthique', title: 'Certifié Halal', sub: 'Traçabilité garantie', icon: <ShieldCheck className="text-purple-500" /> }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-20 h-20 rounded-[2rem] bg-gray-50 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-2xl">
                {item.icon}
              </div>
              <div className="space-y-1">
                <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em]">{item.label}</p>
                <p className="text-xl font-black text-brand leading-none">{item.title}</p>
                <p className="text-xs font-medium text-gray-400 italic">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
