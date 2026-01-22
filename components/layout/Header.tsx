'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
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
    { href: '/menu', label: 'Menu' },
    { href: '/abonnements', label: 'Abonnements' },
    { href: '/comment-ca-marche', label: 'Concept' },
    { href: '/avis', label: 'Avis' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/98 backdrop-blur-md shadow-sm' 
        : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={getLogoPath()}
              alt="Healthy"
              width={400}
              height={160}
              className="h-12 md:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-gray-700 hover:text-[#1a472a] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Panier */}
            <Link 
              href="/panier" 
              className="relative p-2.5 text-gray-700 hover:text-[#1a472a] hover:bg-gray-100 rounded-full transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#1a472a] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            
            {/* Desktop: Compte / Connexion */}
            <div className="hidden md:flex items-center gap-3">
              {session ? (
                <Link 
                  href="/compte" 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#1a472a] hover:bg-gray-100 rounded-full transition-all"
                >
                  <User className="w-4 h-4" />
                  Mon Compte
                </Link>
              ) : (
                <Link 
                  href="/auth/signin" 
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#1a472a] transition-colors"
                >
                  Connexion
                </Link>
              )}
              <Link 
                href="/commander" 
                className="px-6 py-2.5 bg-[#1a472a] text-white text-sm font-bold rounded-full hover:bg-[#143d23] transition-colors shadow-lg shadow-emerald-900/20"
              >
                Commander
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2.5 text-gray-700 hover:bg-gray-100 rounded-full transition-all" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="md:hidden fixed top-16 left-0 right-0 bg-white z-50 border-t border-gray-100 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="p-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-base font-semibold text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className="p-4 pt-2 border-t border-gray-100 space-y-3">
              <Link 
                href="/commander" 
                className="block w-full py-3.5 bg-[#1a472a] text-white text-center text-base font-bold rounded-xl shadow-lg" 
                onClick={() => setIsOpen(false)}
              >
                Commander
              </Link>
              {session ? (
                <Link 
                  href="/compte" 
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-base font-semibold text-gray-700 bg-gray-100 rounded-xl" 
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-5 h-5" />
                  Mon Compte
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    href="/auth/signin" 
                    className="py-3.5 text-center text-base font-semibold text-gray-700 bg-gray-100 rounded-xl" 
                    onClick={() => setIsOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link 
                    href="/auth/signup" 
                    className="py-3.5 text-center text-base font-semibold text-[#1a472a] bg-emerald-50 rounded-xl" 
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
    </header>
  )
}
