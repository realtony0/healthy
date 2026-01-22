import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, ChefHat, Truck, Home, Settings, LogOut, LayoutDashboard, Calendar, Sparkles, Users } from 'lucide-react'
import AdminNotifications from '@/components/admin/AdminNotifications'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin?callbackUrl=/mmb22115')
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/')
  }

  const menu = [
    { href: '/mmb22115', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { href: '/mmb22115/commandes', icon: <Package size={20} />, label: 'Commandes' },
    { href: '/mmb22115/abonnements', icon: <Calendar size={20} />, label: 'Abonnements' },
    { href: '/mmb22115/catalogue', icon: <Settings size={20} />, label: 'Catalogue / Menu' },
    { href: '/mmb22115/ingredients', icon: <Sparkles size={20} />, label: 'Ingrédients Bowl' },
    { href: '/mmb22115/utilisateurs', icon: <Users size={20} />, label: 'Utilisateurs' },
    { href: '/mmb22115/production', icon: <ChefHat size={20} />, label: 'Production' },
    { href: '/mmb22115/livraisons', icon: <Truck size={20} />, label: 'Livraisons' },
  ]

  return (
    <div className="min-h-screen bg-[#fffdfa] pt-14 md:pt-16 pb-16 md:pb-32">
      <div className="container-wide flex flex-col lg:flex-row gap-6 md:gap-12 items-start">
        {/* Sidebar - Mobile optimized */}
        <aside className="w-full lg:w-80 bg-white p-4 md:p-8 rounded-[2rem] md:rounded-[3.5rem] border border-gray-100 shadow-xl md:shadow-2xl shadow-gray-200/50 lg:sticky lg:top-32 space-y-4 md:space-y-6 lg:space-y-10 max-h-[calc(100vh-7rem)] lg:max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 md:px-4">Gestion</p>
            <div className="flex-shrink-0">
              <AdminNotifications />
            </div>
          </div>
          <div>
            <nav className="space-y-1 md:space-y-2">
              {menu.map(item => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base text-gray-600 hover:bg-emerald-50 hover:text-[#1a472a] transition-all duration-300 group"
                >
                  <span className="text-gray-400 group-hover:text-[#1a472a] transition-colors flex-shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 md:pt-8 border-t border-gray-100 space-y-4">
            <Link href="/" className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base text-gray-400 hover:text-gray-900 transition-colors">
              <Home size={18} className="md:w-5 md:h-5 flex-shrink-0" />
              <span className="truncate">Retour au site</span>
            </Link>
          </div>
        </aside>

        {/* Main Content - Mobile optimized */}
        <main className="flex-1 w-full bg-white p-4 md:p-10 lg:p-16 rounded-[2rem] md:rounded-[4rem] border border-gray-100 shadow-xl md:shadow-2xl shadow-gray-200/50 relative overflow-hidden min-w-0">
          {children}
          {/* Decor */}
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-0 hidden md:block" />
        </main>
      </div>
    </div>
  )
}
