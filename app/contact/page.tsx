'use client'

import { useState } from 'react'
import { Send, MapPin, Phone, Mail, MessageCircle, ArrowRight, Check } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulation
    setTimeout(() => {
      setLoading(false)
      alert('Message envoyé ! Nous vous répondrons bientôt.')
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 1500)
  }

  return (
    <div className="pt-32 pb-32 bg-[#fffdfa]">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Info Side */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="food-badge">On reste en contact</div>
              <h1 className="text-6xl font-black tracking-tight text-[#1a472a] leading-tight">Parlons de <br />votre santé.</h1>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                Une question sur nos menus, une allergie particulière ou besoin d&apos;un conseil sur votre abonnement ? Notre équipe est à votre écoute.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { icon: <MapPin size={24} />, title: 'Adresse', value: 'Dakar, Sénégal', color: 'bg-emerald-50 text-emerald-600' },
                { icon: <MessageCircle size={24} />, title: 'WhatsApp', value: '+221 77 000 00 00', color: 'bg-green-50 text-green-600' },
                { icon: <Phone size={24} />, title: 'Téléphone', value: '+221 33 000 00 00', color: 'bg-blue-50 text-blue-600' },
                { icon: <Mail size={24} />, title: 'Email', value: 'contact@healthy.sn', color: 'bg-orange-50 text-orange-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 group hover:border-[#1a472a] transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color} shadow-inner group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{item.title}</p>
                    <p className="text-lg font-black text-gray-900 leading-none">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-10 lg:p-16 rounded-[4rem] border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner"
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner"
                    placeholder="77 000 00 00"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#1a472a] outline-none transition-all font-bold text-gray-900 shadow-inner"
                    placeholder="Dites-nous tout..."
                  />
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
                    Envoyer mon message
                    <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
            
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[80px] -z-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
