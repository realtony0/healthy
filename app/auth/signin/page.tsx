'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LogIn, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email ou mot de passe incorrect')
      } else {
        router.push('/compte')
        router.refresh()
      }
    } catch (err) {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffdfa] py-32 px-4">
      <div className="max-w-md w-full space-y-10 bg-white p-10 lg:p-16 rounded-[4rem] border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden">
        <div className="text-center space-y-4 relative z-10">
          <Link href="/" className="inline-block mb-4">
            <Image src="/img/logo.jpeg" alt="Healthy" width={140} height={56} className="h-12 w-auto mix-blend-multiply" />
          </Link>
          <h2 className="text-4xl font-black text-[#1a472a] tracking-tight">Bon retour !</h2>
          <p className="text-gray-500 font-medium italic">
            Pas encore de compte ?{' '}
            <Link href="/auth/signup" className="text-emerald-600 font-bold hover:underline underline-offset-4">
              Rejoignez-nous
            </Link>
          </p>
        </div>

        <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-2 border-red-100 text-red-700 px-6 py-4 rounded-3xl flex items-center gap-3 font-bold text-sm">
              <AlertCircle size={20} />
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Votre Email</label>
              <div className="relative flex items-center">
                <div className="absolute left-6 text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner"
                  placeholder="nom@exemple.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Mot de passe</label>
              <div className="relative flex items-center">
                <div className="absolute left-6 text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-6 text-xl font-black shadow-2xl shadow-emerald-900/20 flex items-center justify-center gap-3 group disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Se connecter
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
        
        {/* Decor */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-emerald-50 rounded-full blur-[80px] -z-0" />
      </div>
    </div>
  )
}
