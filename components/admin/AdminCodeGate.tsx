'use client'

import { useState, useEffect } from 'react'
import { Lock, ArrowRight } from 'lucide-react'

const STORAGE_KEY = 'healthy_admin_access'

export default function AdminCodeGate({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà entré le code
    const storedAccess = localStorage.getItem(STORAGE_KEY)
    if (storedAccess === 'true') {
      setIsAuthorized(true)
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError('')
    
    try {
      const response = await fetch('/api/admin/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (data.valid) {
        localStorage.setItem(STORAGE_KEY, 'true')
        setIsAuthorized(true)
        setError('')
        setCode('')
      } else {
        setError(data.error || 'Code incorrect')
        setCode('')
      }
    } catch (error) {
      console.error('Error verifying code:', error)
      setError('Erreur de connexion. Réessayez.')
      setCode('')
    } finally {
      setIsVerifying(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1a472a] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#1a472a] rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-xl font-bold text-center text-gray-900 mb-2">
              Accès Restreint
            </h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Entrez le code d'accès pour continuer
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, ''))
                    setError('')
                  }}
                  placeholder="••••••"
                  className="w-full px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a472a] focus:border-transparent"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={code.length < 6 || isVerifying}
                className="w-full py-4 bg-[#1a472a] text-white font-bold rounded-xl hover:bg-[#143d23] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isVerifying ? 'Vérification...' : 'Accéder'}
                {!isVerifying && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            Zone réservée aux administrateurs
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
