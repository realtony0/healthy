'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCart, User, Menu, X, LayoutDashboard } from 'lucide-react'
import { useState, useEffect } from 'react'

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
      scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container-wide h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/img/logo.jpeg"
            alt="Healthy"
            width={100}
            height={40}
            className="h-9 w-auto mix-blend-multiply"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/panier" className="p-2 text-gray-600 hover:text-black transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-[#1a472a] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              0
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <Link href={accountLink} className="flex items-center gap-2 text-sm font-bold bg-gray-50 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
                {session.user.role === 'ADMIN' ? <LayoutDashboard size={16} className="text-[#1a472a]" /> : <User size={16} className="text-[#1a472a]" />}
                {accountLabel}
              </Link>
            ) : (
              <Link href="/auth/signin" className="text-sm font-medium hover:underline">
                Connexion
              </Link>
            )}
            <Link href="/commander" className="btn btn-primary px-5 py-2 text-sm rounded-full">
              Commander
            </Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4 shadow-xl">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
            <Link href="/commander" className="btn btn-primary w-full" onClick={() => setIsOpen(false)}>
              Commander
            </Link>
            {session ? (
              <Link href={accountLink} className="text-center font-bold" onClick={() => setIsOpen(false)}>
                {accountLabel}
              </Link>
            ) : (
              <Link href="/auth/signin" className="text-center font-bold" onClick={() => setIsOpen(false)}>
                Se connecter
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
