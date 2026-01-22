'use client'

import { useState } from 'react'
import { Star, Quote, MessageSquare, X } from 'lucide-react'

export default function AvisPage() {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const testimonials = [
    {
      name: 'Aminata Diop',
      role: 'Sportive',
      text: 'Les meilleurs bowls de Dakar ! Frais, savoureux et les portions sont généreuses. Le service de livraison est top.',
      rating: 5,
      date: 'Il y a 2 jours'
    },
    {
      name: 'Moussa Sy',
      role: 'Entrepreneur',
      text: 'Parfait pour mon rééquilibrage alimentaire. Je commande chaque semaine depuis 3 mois et je ne m\'en lasse pas.',
      rating: 5,
      date: 'Il y a 1 semaine'
    },
    {
      name: 'Fatou Ndiaye',
      role: 'Cadre',
      text: 'Enfin une solution saine et rapide pour mes déjeuners au bureau. Les produits sont de qualité, ça se sent.',
      rating: 5,
      date: 'Il y a 2 semaines'
    },
    {
      name: 'Omar Fall',
      role: 'Coach sportif',
      text: 'Je recommande Healthy Dakar à tous mes clients. C\'est le meilleur rapport qualité-prix en nutrition à Dakar.',
      rating: 5,
      date: 'Il y a 1 mois'
    }
  ]

  return (
    <div className="pt-32 pb-32 bg-[#fffdfa]">
      <div className="container-wide">
        <div className="max-w-2xl mb-24 space-y-6 text-center md:text-left">
          <div className="food-badge mx-auto md:mx-0 w-fit">
            <Star size={14} className="fill-emerald-600 text-emerald-600" />
            4.9/5 sur plus de 500 avis
          </div>
          <h1 className="text-6xl font-black tracking-tight text-[#1a472a]">Vos Témoignages</h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Découvrez pourquoi la communauté Healthy Dakar nous fait confiance chaque jour.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <Quote className="absolute top-10 right-10 text-emerald-50 w-24 h-24 -z-0" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={20} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <p className="text-2xl font-black text-gray-900 leading-tight italic font-serif">
                  &ldquo;{t.text}&rdquo;
                </p>
                
                <div className="flex justify-between items-end pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#1a472a] font-black text-xl shadow-inner">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-gray-900">{t.name}</p>
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-[#1a472a] rounded-[4rem] p-12 lg:p-24 text-center text-white space-y-10 relative overflow-hidden shadow-2xl shadow-emerald-900/30">
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black leading-none">Partagez votre expérience.</h2>
            <p className="text-xl text-white/70 font-medium">
              Votre avis est précieux pour nous aider à nous améliorer chaque jour.
            </p>
            <button 
              onClick={() => setShowModal(true)}
              className="btn bg-white text-[#1a472a] btn-lg px-12 py-6 text-xl flex items-center gap-3 mx-auto group cursor-pointer"
            >
              <MessageSquare className="group-hover:scale-110 transition-transform" />
              Laisser un avis
            </button>
          </div>
          <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px]" />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-3xl font-black text-[#1a472a]">Laisser un avis</h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-2xl bg-gray-50 text-gray-400 hover:text-gray-900 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <form 
              onSubmit={async (e) => {
                e.preventDefault()
                setSubmitting(true)
                try {
                  // Ici tu peux ajouter un appel API pour sauvegarder l'avis
                  // await fetch('/api/reviews', { method: 'POST', body: JSON.stringify(form) })
                  alert('Merci pour votre avis ! Il sera publié après modération.')
                  setForm({ name: '', email: '', rating: 5, comment: '' })
                  setShowModal(false)
                } catch (error) {
                  console.error(error)
                  alert('Erreur lors de l\'envoi de votre avis.')
                } finally {
                  setSubmitting(false)
                }
              }}
              className="p-8 space-y-6"
            >
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Nom</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none font-bold"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none font-bold"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Note</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setForm({ ...form, rating })}
                      className="focus:outline-none"
                    >
                      <Star
                        size={32}
                        className={rating <= form.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Votre avis</label>
                <textarea
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1a472a] outline-none font-bold min-h-[150px]"
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline w-full md:w-auto"
                  disabled={submitting}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="btn bg-[#1a472a] text-white w-full md:flex-1" 
                  disabled={submitting}
                >
                  {submitting ? 'Envoi en cours...' : 'Envoyer mon avis'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
