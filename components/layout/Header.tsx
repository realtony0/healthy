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
        ? 'bg-white md:bg-white/90 backdrop-blur-md border-b border-gray-100 py-2' 
        : 'bg-white md:bg-transparent py-4 md:py-6'
    }`}>
      <div className="container-wide h-32 md:h-36 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center active:scale-95 transition-transform">
          <Image
            src={getLogoPath()}
            alt="Healthy"
            width={360}
            height={144}
            className="h-28 md:h-32 w-auto object-contain"
            onError={(e) => {
              // Fallback to JPEG if PNG doesn't exist
              const target = e.target as HTMLImageElement
              if (target.src.includes('logo.png')) {
                target.src = '/img/logo.jpeg'
                target.className = 'h-28 md:h-32 w-auto object-contain filter brightness-110 contrast-110'
                target.style.mixBlendMode = 'multiply'
              }
            }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-black text-gray-500 hover:text-[#1a472a] uppercase tracking-widest transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1a472a] transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/panier" className="p-2.5 md:p-3 text-gray-600 hover:text-[#1a472a] bg-gray-50 md:bg-transparent rounded-2xl transition-all relative active:scale-90">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute top-1 right-1 w-4 h-4 md:w-5 md:h-5 bg-[#1a472a] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg">
              0
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-4">
            {session ? (
              <Link href={accountLink} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-gray-50 px-5 py-3 rounded-2xl hover:bg-emerald-50 hover:text-[#1a472a] transition-all">
                {session.user.role === 'ADMIN' ? <LayoutDashboard size={16} /> : <User size={16} />}
                {accountLabel}
              </Link>
            ) : (
              <Link href="/auth/signin" className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-black transition-colors px-4">
                Connexion
              </Link>
            )}
            <Link href="/commander" className="btn btn-primary px-8 py-3 text-xs uppercase font-black tracking-widest rounded-2xl shadow-xl shadow-emerald-900/10">
              Commander
            </Link>
          </div>

          <button 
            className="lg:hidden p-2.5 bg-gray-50 rounded-2xl text-[#1a472a] active:scale-90 transition-all" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-white z-[60] flex flex-col p-6 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2 px-4">Navigation</p>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-3xl font-black text-[#1a472a] tracking-tighter px-4 py-3 rounded-3xl active:bg-emerald-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto space-y-4 pt-8 border-t border-gray-100">
            <Link 
              href="/commander" 
              className="btn btn-primary w-full py-6 text-xl font-black shadow-2xl shadow-emerald-900/20" 
              onClick={() => setIsOpen(false)}
            >
              Commander maintenant
            </Link>
            {session ? (
              <Link 
                href={accountLink} 
                className="w-full flex items-center justify-center gap-3 py-5 text-lg font-black text-gray-600 bg-gray-50 rounded-[2rem]" 
                onClick={() => setIsOpen(false)}
              >
                {session.user.role === 'ADMIN' ? <LayoutDashboard size={20} /> : <User size={20} />}
                {accountLabel}
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href="/auth/signin" 
                  className="py-5 text-center font-black text-gray-500 bg-gray-50 rounded-[2rem]" 
                  onClick={() => setIsOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="py-5 text-center font-black text-emerald-600 bg-emerald-50 rounded-[2rem]" 
                  onClick={() => setIsOpen(false)}
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
