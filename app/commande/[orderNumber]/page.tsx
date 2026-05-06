import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { CheckCircle, Package, Truck, Clock, MapPin, Phone, MessageCircle, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { extractDeliveryTimeFromNotes, formatDeliveryTime, formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const ADMIN_WHATSAPP = '221784294949'

interface OrderSuccessPageProps {
  params: Promise<{ orderNumber: string }>
}

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const { orderNumber } = await params

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: { include: { product: true, bowlConfig: true } },
      payment: true,
      deliveryZone: true,
    },
  })

  if (!order) notFound()

  const deliveryTime = extractDeliveryTimeFromNotes(order.deliveryNotes)
  const paymentLabel =
    order.payment?.method === 'CASH' ? 'Cash à la livraison'
    : order.payment?.method === 'WAVE' ? 'Wave'
    : 'Orange Money'

  const itemsText = order.items
    .map((item: any) => `  - ${item.quantity}x ${item.product.name} → ${formatPrice(item.price * item.quantity)}`)
    .join('\n')

  const whatsappMessage = `🛒 *NOUVELLE COMMANDE #${order.orderNumber}*

📦 *Produits :*
${itemsText}

💰 *Total : ${formatPrice(order.totalAmount)}*
💳 Paiement : ${paymentLabel}

📍 *Livraison :*
  Adresse : ${order.deliveryAddress}
  Téléphone : +221 ${order.deliveryPhone}
  Délai : ${deliveryTime || 'Dès que possible'}${order.deliveryZone ? `\n  Zone : ${(order.deliveryZone as any).name}` : ''}

Merci ! 🙏`

  const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="pt-16 md:pt-20 pb-32 bg-[#fffdfa]">
      <div className="container-wide max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto shadow-xl border-4 border-emerald-50">
            <CheckCircle size={48} strokeWidth={3} />
          </div>
          <div className="space-y-2">
            <div className="food-badge mx-auto">Commande enregistrée</div>
            <h1 className="text-5xl font-black text-[#1a472a] tracking-tight">Presque terminé !</h1>
            <p className="text-xl text-gray-500 font-medium italic">
              Confirmez votre commande #{order.orderNumber} en envoyant un message WhatsApp.
            </p>
          </div>
        </div>

        {/* WhatsApp CTA — action principale */}
        <div className="bg-[#1a472a] p-10 lg:p-14 rounded-[3rem] text-white shadow-2xl shadow-emerald-900/30 text-center space-y-6 mb-12 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center mx-auto">
              <MessageCircle size={32} className="text-emerald-300" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-black leading-tight">
              Envoyez votre commande<br />
              <span className="text-emerald-400 italic font-serif">sur WhatsApp</span>
            </h2>
            <p className="text-white/60 font-medium max-w-sm mx-auto">
              Appuyez sur le bouton — votre commande est déjà pré-remplie, il suffit d&apos;envoyer.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-[#25D366] text-white font-black text-xl px-10 py-6 rounded-2xl shadow-xl hover:bg-[#20c05c] transition-colors mt-2"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Envoyer ma commande
            </a>
          </div>
          <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-emerald-400/5 rounded-full blur-[100px]" />
        </div>

        {/* Order Summary */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#1a472a]">
                <Package size={20} />
              </div>
              <h2 className="text-xl font-black text-gray-900">Votre commande</h2>
            </div>
            <div className="space-y-3">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0">
                  <div>
                    <p className="font-black text-gray-900 text-sm leading-tight">{item.product.name}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase">x{item.quantity}</p>
                  </div>
                  <span className="font-black italic font-serif text-[#1a472a] text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total</span>
              <span className="text-2xl font-black italic font-serif text-[#1a472a]">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Truck size={20} />
              </div>
              <h2 className="text-xl font-black text-gray-900">Livraison</h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="text-gray-300 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">Adresse</p>
                  <p className="font-bold text-gray-900 text-sm">{order.deliveryAddress}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="text-gray-300 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">Téléphone</p>
                  <p className="font-bold text-gray-900 text-sm">+221 {order.deliveryPhone}</p>
                </div>
              </div>
              {deliveryTime && (
                <div className="flex gap-3">
                  <Clock className="text-gray-300 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">Délai</p>
                    <p className="font-bold text-gray-900 text-sm">{formatDeliveryTime(deliveryTime)}</p>
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <CreditCard className="text-gray-300 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">Paiement</p>
                  <p className="font-bold text-gray-900 text-sm">{paymentLabel}</p>
                </div>
              </div>
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
