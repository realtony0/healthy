'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { ShoppingCart, User, Menu, X, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getLogoPath } from '@/lib/logo'
import { useTheme } from '@/components/ThemeProvider'

// Composant séparé pour le toggle dark mode (client-only)
function DarkModeToggle() {
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')
  
  useEffect(() => {
    setMounted(true)
    // Vérifier le thème actuel
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setCurrentTheme(savedTheme || systemTheme)
    
    // Écouter les changements de thème
    const handleThemeChange = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setCurrentTheme(isDark ? 'dark' : 'light')
    }
    
    window.addEventListener('themechange', handleThemeChange)
    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => {
      window.removeEventListener('themechange', handleThemeChange)
      observer.disconnect()
    }
  }, [])
  
  const handleToggle = () => {
    const isDark = document.documentElement.classList.contains('dark')
    const newTheme = isDark ? 'light' : 'dark'
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    localStorage.setItem('theme', newTheme)
    setCurrentTheme(newTheme)
    
    // Déclencher l'événement pour synchroniser avec ThemeProvider
    window.dispatchEvent(new Event('themechange'))
  }
  
  if (!mounted) {
    return (
      <button
        className="p-2 text-gray-600 rounded-full"
        aria-label="Toggle dark mode"
        disabled
      >
        <Moon className="w-5 h-5" />
      </button>
    )
  }
  
  return (
    <button
      onClick={handleToggle}
      className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#1a472a] dark:hover:text-emerald-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle dark mode"
    >
      {currentTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

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

  // Fermer le menu quand on scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const links = [
    { href: '/menu', label: 'Menu' },
    { href: '/abonnements', label: 'Abonnements' },
    { href: '/comment-ca-marche', label: 'Concept' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/50' 
        : 'bg-white dark:bg-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={() => setIsOpen(false)}>
            <Image
              src={getLogoPath()}
              alt="Healthy"
              width={300}
              height={120}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#1a472a] dark:hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
            
            <Link href="/panier" className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-[#1a472a] dark:hover:text-emerald-400 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1a472a] dark:bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            
            {session ? (
              <Link href="/compte" className="p-2 text-gray-600 hover:text-[#1a472a] transition-colors">
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Link href="/auth/signin" className="text-sm font-medium text-gray-600 hover:text-[#1a472a] transition-colors">
                Connexion
              </Link>
            )}
            
            <Link 
              href="/commander" 
              className="ml-2 px-5 py-2 bg-[#1a472a] text-white text-sm font-semibold rounded-full hover:bg-[#143d23] transition-colors"
            >
              Commander
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <DarkModeToggle />
            
            <Link href="/panier" className="relative p-2 text-gray-600 dark:text-gray-300">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#1a472a] dark:bg-emerald-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            
            <button 
              className="p-2 text-gray-600" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Simple & Clean */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-white dark:bg-gray-900 z-50">
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-4 text-xl font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            {/* Bottom Actions */}
            <div className="px-6 py-6 border-t border-gray-100 dark:border-gray-800 space-y-3 bg-gray-50 dark:bg-gray-800/50">
              <Link 
                href="/commander" 
                className="block w-full py-4 bg-[#1a472a] text-white text-center text-base font-bold rounded-xl" 
                onClick={() => setIsOpen(false)}
              >
                Commander
              </Link>
              
              {session ? (
                <Link 
                  href="/compte" 
                  className="block w-full py-4 text-center text-base font-semibold text-gray-700 bg-white rounded-xl border border-gray-200" 
                  onClick={() => setIsOpen(false)}
                >
                  Mon Compte
                </Link>
              ) : (
                <div className="flex gap-3">
                  <Link 
                    href="/auth/signin" 
                    className="flex-1 py-4 text-center text-base font-semibold text-gray-700 bg-white rounded-xl border border-gray-200" 
                    onClick={() => setIsOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link 
                    href="/auth/signup" 
                    className="flex-1 py-4 text-center text-base font-semibold text-[#1a472a] bg-emerald-50 rounded-xl" 
                    onClick={() => setIsOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
