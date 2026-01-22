import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, ChefHat, Truck, Home, Settings, LayoutDashboard, Calendar, Sparkles, Users } from 'lucide-react'
import AdminNotifications from '@/components/admin/AdminNotifications'
import AdminCodeGate from '@/components/admin/AdminCodeGate'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin?callbackUrl=/mmb22115')
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/')
  }

  const menu = [
    { href: '/mmb22115', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { href: '/mmb22115/commandes', icon: <Package size={18} />, label: 'Commandes' },
    { href: '/mmb22115/abonnements', icon: <Calendar size={18} />, label: 'Abonnements' },
    { href: '/mmb22115/catalogue', icon: <Settings size={18} />, label: 'Catalogue' },
    { href: '/mmb22115/ingredients', icon: <Sparkles size={18} />, label: 'Ingrédients' },
    { href: '/mmb22115/utilisateurs', icon: <Users size={18} />, label: 'Utilisateurs' },
    { href: '/mmb22115/production', icon: <ChefHat size={18} />, label: 'Production' },
    { href: '/mmb22115/livraisons', icon: <Truck size={18} />, label: 'Livraisons' },
  ]

  return (
    <AdminCodeGate>
      <div className="min-h-screen bg-gray-50 pt-14 md:pt-16">
        <div className="flex">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 fixed top-14 md:top-16 left-0 h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin</p>
                <AdminNotifications />
              </div>
              
              <nav className="space-y-1">
                {menu.map(item => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#1a472a] transition-colors"
                  >
                    <span className="text-gray-400">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link 
                  href="/" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <Home size={18} />
                  Retour au site
                </Link>
              </div>
            </div>
          </aside>

          {/* Mobile Navigation */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
            <div className="flex items-center justify-around py-2">
              {menu.slice(0, 5).map(item => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600"
                >
                  <span className="text-gray-500">{item.icon}</span>
                  <span className="text-[10px] font-medium">{item.label.split(' ')[0]}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 lg:ml-64 min-h-screen pb-20 lg:pb-0">
            <div className="p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminCodeGate>
  )
}
