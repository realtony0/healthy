import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { CheckCircle, Package, Truck, Clock, MapPin, Phone, MessageCircle, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface OrderSuccessPageProps {
  params: Promise<{
    orderNumber: string
  }>
}

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const { orderNumber } = await params
  
  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: {
          product: true,
          bowlConfig: true,
        },
      },
      payment: true,
    },
  })

  if (!order) {
    notFound()
  }

  return (
    <div className="pt-16 md:pt-20 pb-32 bg-[#fffdfa]">
      <div className="container-wide max-w-4xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto shadow-xl border-4 border-emerald-50">
            <CheckCircle size={48} strokeWidth={3} />
          </div>
          <div className="space-y-2">
            <div className="food-badge mx-auto">Commande confirmée</div>
            <h1 className="text-5xl font-black text-[#1a472a] tracking-tight">Merci pour votre confiance !</h1>
            <p className="text-xl text-gray-500 font-medium italic">Votre commande #{order.orderNumber} est en préparation.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Order Details & Payment Instructions */}
          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/50 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#1a472a]">
                  <Package size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Détails</h2>
              </div>
              
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-start border-b border-gray-50 pb-4 last:border-0">
                    <div className="space-y-1">
                      <p className="font-black text-gray-900 leading-tight">{item.product.name}</p>
                      <p className="text-xs font-bold text-gray-400 uppercase">x{item.quantity}</p>
                    </div>
                    <span className="font-black italic font-serif text-[#1a472a]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Total à régler</span>
                <span className="text-4xl font-black italic font-serif text-[#1a472a]">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>

            {order.payment?.method !== 'CASH' && (
              <div className={`p-10 rounded-[3rem] border-2 shadow-xl space-y-6 relative overflow-hidden ${
                order.payment?.method === 'WAVE'
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
                    order.payment?.method === 'WAVE' ? 'bg-blue-500' : 'bg-orange-500'
                  }`}>
                    <CreditCard size={24} />
                  </div>
                  <h2 className={`text-2xl font-black uppercase tracking-tighter ${
                    order.payment?.method === 'WAVE' ? 'text-blue-700' : 'text-orange-700'
                  }`}>
                    Paiement {order.payment?.method === 'WAVE' ? 'Wave' : 'Orange Money'}
                  </h2>
                </div>
                
                <div className="space-y-4 relative z-10">
                  <p className={`font-bold text-lg ${
                    order.payment?.method === 'WAVE' ? 'text-blue-900' : 'text-orange-900'
                  }`}>
                    Transférez <span className={`text-2xl font-black ${
                      order.payment?.method === 'WAVE' ? 'text-blue-600' : 'text-orange-600'
                    }`}>{formatPrice(order.totalAmount)}</span> FCFA au numéro suivant :
                  </p>
                  
                  <div className={`bg-white p-6 rounded-2xl border-2 text-center ${
                    order.payment?.method === 'WAVE' ? 'border-blue-100' : 'border-orange-100'
                  }`}>
                    <p className={`text-xs font-black uppercase tracking-widest mb-2 ${
                      order.payment?.method === 'WAVE' ? 'text-blue-400' : 'text-orange-400'
                    }`}>
                      Numéro {order.payment?.method === 'WAVE' ? 'Wave' : 'Orange Money'}
                    </p>
                    <p className={`text-4xl font-black tracking-tighter ${
                      order.payment?.method === 'WAVE' ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                      78 598 71 43
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${
                    order.payment?.method === 'WAVE'
                      ? 'bg-blue-100/50 border-blue-200'
                      : 'bg-orange-100/50 border-orange-200'
                  }`}>
                    <p className={`text-sm font-bold leading-relaxed ${
                      order.payment?.method === 'WAVE' ? 'text-blue-900' : 'text-orange-900'
                    }`}>
                      ⚠️ <strong>Important :</strong> Indiquez le numéro de commande <strong className="text-lg">#{order.orderNumber}</strong> en référence du transfert.
                      <br />
                      Votre commande sera validée dès réception du paiement.
                    </p>
                  </div>
                </div>
                <div className={`absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full blur-[40px] ${
                  order.payment?.method === 'WAVE' ? 'bg-blue-100/50' : 'bg-orange-100/50'
                }`} />
              </div>
            )}
          </div>

          {/* Delivery Info */}
          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Truck size={24} />
                </div>
                <h2 className="text-2xl font-black text-gray-900">Livraison</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin className="text-gray-300 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Adresse</p>
                    <p className="font-bold text-gray-900 leading-tight">{order.deliveryAddress}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-gray-300 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Téléphone</p>
                    <p className="font-bold text-gray-900 leading-tight">+221 {order.deliveryPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a472a] p-10 rounded-[3rem] text-white shadow-2xl shadow-emerald-900/30 space-y-6 relative overflow-hidden">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Prochaine étape</h2>
              </div>
              <p className="text-emerald-50/70 font-medium leading-relaxed italic relative z-10">
                Un membre de notre équipe va vous contacter sur WhatsApp pour confirmer le créneau exact de livraison.
              </p>
              <a 
                href="https://wa.me/221785987143" 
                className="btn bg-white text-[#1a472a] w-full py-4 text-lg font-black flex items-center justify-center gap-3 relative z-10 group"
              >
                <MessageCircle className="group-hover:scale-110 transition-transform" />
                Nous contacter
              </a>
              <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-emerald-400/5 rounded-full blur-[60px]" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/menu" className="btn btn-outline px-12 py-5 text-lg">
            Retour au menu
          </Link>
        </div>
      </div>
    </div>
  )
}
