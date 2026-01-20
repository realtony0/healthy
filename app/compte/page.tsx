'use client'

import { useSession, signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, Calendar, MapPin, User, LogOut, ChevronRight, ShieldCheck, LayoutDashboard } from 'lucide-react'

export default function ComptePage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen pt-32 pb-32 container-wide flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-100 border-t-[#1a472a] rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  // Si l'utilisateur est ADMIN, on le redirige vers son espace dédié
  if (session.user.role === 'ADMIN') {
    redirect('/mmb22115')
  }

  const menuItems = [
    { 
      href: '/compte/commandes', 
      icon: <Package size={24} />, 
      title: 'Mes commandes', 
      desc: 'Historique et suivi de vos repas',
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      href: '/compte/abonnements', 
      icon: <Calendar size={24} />, 
      title: 'Mes abonnements', 
      desc: 'Gérez vos formules nutritionnelles',
      color: 'bg-emerald-50 text-emerald-600'
    },
    { 
      href: '/compte/adresses', 
      icon: <MapPin size={24} />, 
      title: 'Mes adresses', 
      desc: 'Vos lieux de livraison favoris',
      color: 'bg-orange-50 text-orange-600'
    },
  ]

  return (
    <div className="pt-32 pb-32 bg-[#fffdfa]">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* User Header */}
          <div className="bg-white p-10 lg:p-16 rounded-[4rem] border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-[#1a472a] text-4xl font-black shadow-inner relative z-10">
              {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
            </div>
            
            <div className="flex-grow text-center md:text-left relative z-10 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-4xl font-black text-[#1a472a] tracking-tight">{session.user?.name || 'Bienvenue'}</h1>
              </div>
              <p className="text-gray-500 font-medium italic">{session.user?.email}</p>
              <div className="pt-2 flex items-center justify-center md:justify-start gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                <ShieldCheck size={14} />
                Client Privilégié
              </div>
            </div>

            <button 
              onClick={() => signOut()}
              className="px-6 py-3 bg-red-50 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center gap-2 relative z-10 shadow-sm"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
            
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-emerald-50 rounded-full blur-3xl" />
          </div>

          {/* Menu Grid */}
          <div className="grid gap-6">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 group flex items-center gap-8 hover:border-[#1a472a] hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.color} shadow-inner group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-black text-gray-900 leading-none">{item.title}</h2>
                  <p className="text-gray-500 font-medium mt-1">{item.desc}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#1a472a] group-hover:text-white transition-all duration-300">
                  <ChevronRight size={24} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
