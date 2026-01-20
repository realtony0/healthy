import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, ShieldCheck, Leaf, Sparkles, Clock, MapPin, Heart, Truck, Zap } from 'lucide-react'

export default function HomePage() {
  const bestSellers = [
    { name: 'Bowl Poulet Signature', price: '3 500', img: '/img/Bowl de poulet au Maïs Doré.jpeg', tag: 'Best-seller' },
    { name: 'Bœuf & Patate Douce', price: '4 200', img: '/img/Bœuf saisi accompagné de purée de patate douce.jpeg', tag: 'Protéiné' },
    { name: 'Poisson aux Herbes', price: '3 900', img: '/img/Poisson blanc aux herbes et citron.jpeg', tag: 'Léger' },
  ]

  return (
    <div className="bg-[#fafaf8]">
      {/* Hero Section - Clean & Impactful */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/img/Bowl de poulet au Maïs Doré.jpeg" 
            alt="Healthy Dakar" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="container-wide relative z-10 py-32">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-medium border border-white/20">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Livraison à Dakar • 7j/7
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight">
              Mangez sain,<br />
              <span className="text-emerald-400">sans effort.</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 max-w-xl leading-relaxed">
              Des repas frais, équilibrés et 100% halal préparés chaque matin et livrés chez vous à Dakar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/menu" 
                className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg shadow-emerald-500/30"
              >
                Voir le menu
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="/abonnements" 
                className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border border-white/20"
              >
                Nos abonnements
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 pt-8 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-400" />
                <span>100% Halal</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf size={18} className="text-emerald-400" />
                <span>Produits frais</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-emerald-400" />
                <span>Livraison rapide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="bg-[#1a472a] py-8">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-white text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold">500+</p>
              <p className="text-emerald-300 text-sm">Clients satisfaits</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">30+</p>
              <p className="text-emerald-300 text-sm">Plats au menu</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">4.9</p>
              <p className="text-emerald-300 text-sm flex items-center justify-center gap-1">
                <Star size={14} fill="currentColor" /> Avis
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">~45min</p>
              <p className="text-emerald-300 text-sm">Temps de livraison</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 md:py-32">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3">Nos best-sellers</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Les plats préférés</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {bestSellers.map((item, i) => (
              <Link key={i} href="/menu" className="group">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={item.img} 
                      alt={item.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                      {item.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-emerald-600">{item.price} <span className="text-sm font-normal text-gray-500">FCFA</span></p>
                      <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/menu" 
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              Voir tout le menu
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-32 bg-emerald-50">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3">Simple & rapide</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Comment ça marche ?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Choisissez', desc: 'Parcourez notre menu et sélectionnez vos plats préférés', icon: <Sparkles /> },
              { step: '2', title: 'Commandez', desc: 'Validez votre commande et choisissez votre mode de paiement', icon: <Heart /> },
              { step: '3', title: 'Savourez', desc: 'Recevez votre repas frais directement chez vous', icon: <Zap /> },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bowl Builder CTA */}
      <section className="py-20 md:py-32">
        <div className="container-wide">
          <div className="bg-[#1a472a] rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-10 md:p-16 text-white">
                <p className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4">Nouveau</p>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  Créez votre bowl sur mesure
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-md">
                  Choisissez votre base, vos protéines, vos légumes et votre sauce. 
                  Un bowl unique, selon vos goûts et vos objectifs.
                </p>
                <Link 
                  href="/menu/cree-ton-bowl" 
                  className="inline-flex items-center gap-3 bg-white text-[#1a472a] px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-colors"
                >
                  Créer mon bowl
                  <ArrowRight size={20} />
                </Link>
              </div>
              <div className="relative h-80 md:h-full min-h-[400px]">
                <Image 
                  src="/img/Bowl de lentilles & Pommes de Terre Croustillantes Veggie.jpeg" 
                  alt="Bowl personnalisé" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3">Abonnements</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simplifiez-vous la vie
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Recevez vos repas automatiquement chaque jour. 
              Plus de courses, plus de cuisine, juste du plaisir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/abonnements" 
                className="inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
              >
                Voir les formules
                <ArrowRight size={20} />
              </Link>
            </div>
            <p className="text-gray-500 mt-6 text-sm">À partir de 15 000 FCFA / semaine</p>
          </div>
        </div>
      </section>

      {/* Delivery zones */}
      <section className="py-16 border-t border-gray-100">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-emerald-600" />
              <span className="font-medium">Zones de livraison :</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {['Almadies', 'Ngor', 'Ouakam', 'Point E', 'Plateau', 'Mermoz', 'Sacré-Cœur'].map((zone) => (
                <span key={zone} className="bg-gray-100 px-4 py-1.5 rounded-full text-sm">{zone}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
