'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCart, User, Menu, X, LayoutDashboard } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getLogoPath } from '@/lib/logo'

export default function Header() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/menu', label: 'Le Menu' },
    { href: '/abonnements', label: 'Abonnements' },
    { href: '/comment-ca-marche', label: 'Concept' },
    { href: '/avis', label: 'Avis' },
  ]

  // Déterminer le lien du compte selon le rôle
  const accountLink = session?.user?.role === 'ADMIN' ? '/mmb22115' : '/compte'
  const accountLabel = session?.user?.role === 'ADMIN' ? 'Admin' : 'Mon Compte'

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white md:bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm py-0.5' 
        : 'bg-white md:bg-transparent py-1 md:py-1.5'
    }`}>
      <div className="container-wide h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center active:scale-95 transition-transform flex-shrink-0">
          <Image
            src={getLogoPath()}
            alt="Healthy"
            width={500}
            height={200}
            className="h-14 md:h-16 w-auto object-contain"
            style={{ 
              mixBlendMode: 'normal',
              backgroundColor: 'transparent'
            }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs xl:text-sm font-black text-gray-500 hover:text-[#1a472a] uppercase tracking-wider transition-colors relative group py-1"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#1a472a] transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 md:gap-3">
          <Link href="/panier" className="p-2 md:p-2.5 text-gray-600 hover:text-[#1a472a] bg-gray-50 md:bg-transparent rounded-xl transition-all relative active:scale-90">
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-[#1a472a] text-white text-[9px] md:text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              0
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <Link href={accountLink} className="flex items-center gap-1.5 text-[10px] xl:text-xs font-black uppercase tracking-wider bg-gray-50 px-3 xl:px-4 py-2 rounded-xl hover:bg-emerald-50 hover:text-[#1a472a] transition-all">
                {session.user.role === 'ADMIN' ? <LayoutDashboard size={14} /> : <User size={14} />}
                <span className="hidden xl:inline">{accountLabel}</span>
              </Link>
            ) : (
              <Link href="/auth/signin" className="text-[10px] xl:text-xs font-black uppercase tracking-wider text-gray-500 hover:text-black transition-colors px-3">
                Connexion
              </Link>
            )}
            <Link href="/commander" className="btn btn-primary px-4 xl:px-6 py-2 text-[10px] xl:text-xs uppercase font-black tracking-wider rounded-xl shadow-lg shadow-emerald-900/10">
              Commander
            </Link>
          </div>

          <button 
            className="lg:hidden p-2 bg-gray-50 rounded-xl text-[#1a472a] active:scale-90 transition-all flex-shrink-0" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Optimized */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[55]"
            onClick={() => setIsOpen(false)}
          />
          {/* Menu Panel */}
          <div className="lg:hidden fixed inset-y-0 right-0 top-[48px] md:top-[56px] w-[85%] max-w-sm bg-white z-[60] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="flex flex-col p-4 space-y-1">
              <div className="px-4 py-2 mb-2">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Navigation</p>
              </div>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-black text-[#1a472a] tracking-tight px-4 py-2.5 rounded-xl active:bg-emerald-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="mt-auto space-y-3 pt-4 pb-6 px-4 border-t border-gray-100">
              <Link 
                href="/commander" 
                className="btn btn-primary w-full py-4 text-sm font-black shadow-xl shadow-emerald-900/20" 
                onClick={() => setIsOpen(false)}
              >
                Commander maintenant
              </Link>
              {session ? (
                <Link 
                  href={accountLink} 
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-black text-gray-600 bg-gray-50 rounded-xl" 
                  onClick={() => setIsOpen(false)}
                >
                  {session.user.role === 'ADMIN' ? <LayoutDashboard size={18} /> : <User size={18} />}
                  {accountLabel}
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    href="/auth/signin" 
                    className="py-3.5 text-center text-sm font-black text-gray-500 bg-gray-50 rounded-xl" 
                    onClick={() => setIsOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link 
                    href="/auth/signup" 
                    className="py-3.5 text-center text-sm font-black text-emerald-600 bg-emerald-50 rounded-xl" 
                    onClick={() => setIsOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
