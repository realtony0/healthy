'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { UserPlus, Mail, Lock, User, Phone, ArrowRight, AlertCircle } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Une erreur est survenue')
        return
      }

      router.push('/auth/signin')
    } catch (err) {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffdfa] py-32 px-4">
      <div className="max-w-2xl w-full space-y-10 bg-white p-10 lg:p-16 rounded-[4rem] border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden">
        <div className="text-center space-y-4 relative z-10">
          <Link href="/" className="inline-block mb-4">
            <Image src="/img/logo.jpeg" alt="Healthy" width={140} height={56} className="h-12 w-auto mix-blend-multiply" />
          </Link>
          <h2 className="text-4xl font-black text-[#1a472a] tracking-tight">Bienvenue parmi nous !</h2>
          <p className="text-gray-500 font-medium italic">
            Déjà un compte ?{' '}
            <Link href="/auth/signin" className="text-emerald-600 font-bold hover:underline underline-offset-4">
              Connectez-vous
            </Link>
          </p>
        </div>

        <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-2 border-red-100 text-red-700 px-6 py-4 rounded-3xl flex items-center gap-3 font-bold text-sm">
              <AlertCircle size={20} />
              {error}
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Prénom</label>
              <div className="relative flex items-center">
                <div className="absolute left-6 text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full pl-16 pr-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner"
                  placeholder="Votre prénom"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nom</label>
              <div className="relative flex items-center">
                <div className="absolute left-6 text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full pl-16 pr-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email professionnel ou personnel</label>
              <div className="relative flex items-center">
                <div className="absolute left-6 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-16 pr-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Téléphone</label>
              <div className="relative flex items-center">
                <div className="absolute left-6 text-gray-400">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-16 pr-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner"
                  placeholder="77 000 00 00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Mot de passe</label>
              <div className="relative flex items-center">
                <div className="absolute left-6 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                Créer mon compte
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
