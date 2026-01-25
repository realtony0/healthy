'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Plus, ArrowLeft, Trash2, Edit } from 'lucide-react'

type Address = {
  id: string
  label: string
  street: string
  city: string
  postalCode: string | null
  isDefault: boolean
  createdAt: string
}

export default function CompteAdressesPage() {
  const { data: session, status: authStatus } = useSession()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      // Pour l'instant, on affiche juste une interface vide
      // L'implémentation complète nécessiterait un modèle Address dans Prisma
      setLoading(false)
    }
  }, [session])

  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen pt-16 md:pt-20 pb-32 container-wide flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-100 border-t-[#1a472a] rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="pt-16 md:pt-20 pb-32 bg-[#fffdfa]">
      <div className="container-wide max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/compte"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1a472a] font-bold mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Retour au compte
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-[#1a472a] tracking-tight">
            Mes adresses
          </h1>
          <p className="text-gray-500 font-medium mt-2">
            Gérez vos adresses de livraison
          </p>
        </div>

        {/* Addresses List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-emerald-100 border-t-[#1a472a] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {addresses.length === 0 ? (
              <div className="bg-white p-16 rounded-[3rem] border border-gray-100 shadow-xl text-center">
                <MapPin size={64} className="text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-black text-gray-900 mb-2">Aucune adresse</h2>
                <p className="text-gray-500 font-medium mb-8">
                  Vous pouvez ajouter des adresses lors de votre prochaine commande.
                </p>
                <Link
                  href="/menu"
                  className="btn bg-[#1a472a] text-white px-8 py-4 inline-block"
                >
                  Passer une commande
                </Link>
              </div>
            ) : (
              addresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                          <MapPin size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-gray-900">{address.label}</h3>
                          {address.isDefault && (
                            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
                              Adresse par défaut
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="font-bold text-gray-900 mb-1">{address.street}</p>
                      <p className="text-gray-500">
                        {address.city}
                        {address.postalCode && `, ${address.postalCode}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-3 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Add Address Button */}
            <button className="w-full bg-white p-8 rounded-[2.5rem] border-2 border-dashed border-gray-200 hover:border-[#1a472a] hover:bg-emerald-50/30 transition-all duration-300 flex items-center justify-center gap-3 text-gray-600 hover:text-[#1a472a] font-bold">
              <Plus size={24} />
              Ajouter une adresse
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
