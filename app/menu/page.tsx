import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { ArrowRight, Flame, Dumbbell, Sparkles, Plus } from 'lucide-react'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Menu Healthy Dakar | Bowls, Plats Signature & Jus Frais',
  description: 'Découvrez notre menu varié : des bowls personnalisables, des plats équilibrés riches en protéines et des shots détox. Cuisiné frais chaque jour à Dakar.',
}

export default async function MenuPage() {
  const categories = await prisma.category.findMany({
    where: { isVisiblePublic: true },
    include: {
      products: {
        where: { isVisible: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div className="pt-24 pb-32">
      <div className="container-wide">
        <div className="max-w-2xl mb-20 space-y-4 text-center md:text-left">
          <div className="food-badge mx-auto md:mx-0">Le Menu</div>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-brand">Notre Carte</h1>
          <p className="text-gray-500 text-lg font-medium italic">
            Des recettes fraîches cuisinées chaque jour, livrées à Dakar.
          </p>
        </div>

        {categories.map((category) => (
          <section key={category.id} className="mb-24 last:mb-0">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-black text-brand uppercase tracking-widest text-xs">{category.name}</h2>
              <div className="h-px bg-gray-100 flex-grow" />
            </div>

            {category.type === 'BOWL_BUILDER' ? (
              <div className="bg-emerald-50 rounded-[32px] p-8 lg:p-16 flex flex-col md:flex-row items-center gap-12 border border-emerald-100 shadow-xl shadow-emerald-900/5">
                <div className="flex-grow space-y-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand shadow-md">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-3xl font-black text-brand">{category.name}</h3>
                  <p className="text-gray-500 text-lg max-w-lg leading-relaxed italic">
                    Créez votre propre repas en choisissant votre base, vos protéines, vos légumes et vos sauces préférées.
                  </p>
                  <Link href="/menu/cree-ton-bowl" className="btn btn-primary btn-lg px-10">
                    Lancer la création
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
                <div className="w-full md:w-1/3 aspect-square rounded-[24px] overflow-hidden shadow-2xl border-4 border-white">
                  <Image 
                    src="/img/bowl-lentilles-veggie.jpeg" 
                    alt="Custom Bowl" 
                    width={400} 
                    height={400} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {category.products.map((product) => (
                  <Link key={product.id} href={`/menu/${product.slug}`} className="group block">
                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100 mb-6 relative shadow-xl shadow-gray-200/50">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">Image bientôt disponible</div>
                      )}
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        {product.kcal && (
                          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-brand border border-white flex items-center gap-1">
                            <Flame size={12} className="text-orange-500" />
                            {product.kcal} cal
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-3 px-2">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-black text-xl text-gray-900 group-hover:text-brand transition-colors leading-tight">{product.name}</h3>
                        <span className="font-black text-emerald-600 italic font-serif text-lg whitespace-nowrap">{formatPrice(product.price)}</span>
                      </div>
                      <p className="text-gray-400 text-sm font-medium line-clamp-2 leading-relaxed italic">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 text-brand font-black uppercase text-[10px] tracking-widest pt-2">
                        Commander <ArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
