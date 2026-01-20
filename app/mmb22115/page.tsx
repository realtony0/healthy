import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Package, ChefHat, Truck, ArrowRight, Activity, TrendingUp, Users, Calendar, ShoppingBag, Settings } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default async function AdminHomePage() {
  // Récupérer les vraies stats
  const [ordersCount, totalRevenue, usersCount, activeSubs] = await Promise.all([
    prisma.order.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        }
      }
    }),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: {
        payment: { status: 'CONFIRMED' }
      }
    }),
    prisma.user.count(),
    prisma.subscription.count({
      where: { status: 'ACTIVE' }
    })
  ])

  const stats = [
    { label: 'Commandes du jour', value: ordersCount.toString(), icon: <ShoppingBag />, color: 'text-blue-600 bg-blue-50' },
    { label: 'Chiffre d\'affaires total', value: formatPrice(totalRevenue._sum.totalAmount || 0), icon: <TrendingUp />, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Abonnés actifs', value: activeSubs.toString(), icon: <Calendar />, color: 'text-orange-600 bg-orange-50' },
    { label: 'Total Clients', value: usersCount.toString(), icon: <Users />, color: 'text-purple-600 bg-purple-50' },
  ]

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="food-badge">Back-office</div>
          <h1 className="text-4xl font-black text-[#1a472a] tracking-tight">Vue d&apos;ensemble</h1>
          <p className="text-gray-500 font-medium italic">Tableau de bord de votre activité Healthy Dakar.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 font-bold text-xs uppercase tracking-widest">
          <Activity size={14} />
          Système en ligne
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col gap-4 group hover:border-[#1a472a] transition-all duration-500">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color} shadow-inner group-hover:scale-110 transition-transform`}>
              {s.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-2xl font-black text-gray-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {[
          { 
            href: '/mmb22115/commandes', 
            icon: <Package size={32} />, 
            title: 'Commandes', 
            desc: 'Gérez les repas à la carte et les paiements.',
            color: 'bg-white' 
          },
          { 
            href: '/mmb22115/abonnements', 
            icon: <Calendar size={32} />, 
            title: 'Abonnements', 
            desc: 'Suivez vos abonnés et leurs programmes.',
            color: 'bg-white'
          },
          { 
            href: '/mmb22115/catalogue', 
            icon: <Settings size={32} />, 
            title: 'Catalogue', 
            desc: 'Modifiez les prix, produits et catégories.',
            color: 'bg-white'
          },
        ].map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="p-10 rounded-[4rem] border border-gray-100 shadow-xl shadow-gray-200/50 group hover:border-[#1a472a] hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-80"
          >
            <div className="space-y-6">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#1a472a] group-hover:scale-110 transition-transform shadow-inner">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-gray-900 leading-none">{item.title}</h2>
                <p className="text-gray-500 font-medium leading-relaxed italic">{item.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#1a472a] font-black uppercase text-[10px] tracking-widest group-hover:gap-4 transition-all">
              Gérer <ArrowRight size={14} strokeWidth={3} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

