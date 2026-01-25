'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, Clock, CheckCircle, Truck, XCircle, ArrowLeft, Eye } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'FAILED'
type PaymentMethod = 'CASH' | 'WAVE' | 'ORANGE_MONEY'

type Order = {
  id: string
  orderNumber: string
  status: OrderStatus
  totalAmount: number
  deliveryAddress: string
  deliveryPhone: string
  deliveryFee: number
  createdAt: string
  items: Array<{
    id: string
    quantity: number
    price: number
    product: {
      name: string
      image: string | null
    }
    bowlConfig: {
      size: string
    } | null
  }>
  payment: {
    method: PaymentMethod
    status: PaymentStatus
  } | null
  deliveryZone: {
    name: string
    price: number
  } | null
}

type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  PENDING: {
    label: 'En attente',
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    icon: <Clock size={16} />,
  },
  CONFIRMED: {
    label: 'Confirmée',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    icon: <CheckCircle size={16} />,
  },
  PREPARING: {
    label: 'En préparation',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
    icon: <Package size={16} />,
  },
  READY: {
    label: 'Prête',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    icon: <Package size={16} />,
  },
  DELIVERED: {
    label: 'Livrée',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    icon: <Truck size={16} />,
  },
  CANCELLED: {
    label: 'Annulée',
    color: 'bg-red-50 text-red-600 border-red-200',
    icon: <XCircle size={16} />,
  },
}

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  CASH: 'Espèces',
  WAVE: 'Wave',
  ORANGE_MONEY: 'Orange Money',
}

export default function CompteCommandesPage() {
  const { data: session, status: authStatus } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<Pagination | null>(null)

  useEffect(() => {
    if (session) {
      fetchOrders()
    }
  }, [session, statusFilter, page])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.set('status', statusFilter)
      params.set('page', page.toString())
      params.set('limit', '20')

      const response = await fetch(`/api/user/orders?${params.toString()}`)
      const data = await response.json()

      if (data.orders && Array.isArray(data.orders)) {
        setOrders(data.orders)
        setPagination(data.pagination)
      } else {
        setOrders([])
        setPagination(null)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

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
      <div className="container-wide max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <Link
              href="/compte"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1a472a] font-bold mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Retour au compte
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-[#1a472a] tracking-tight">
              Mes commandes
            </h1>
            <p className="text-gray-500 font-medium mt-2">
              Historique et suivi de vos commandes
            </p>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter('')}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                !statusFilter
                  ? 'bg-[#1a472a] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Toutes
            </button>
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  statusFilter === key
                    ? 'bg-[#1a472a] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-emerald-100 border-t-[#1a472a] rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-16 rounded-[3rem] border border-gray-100 shadow-xl text-center">
            <Package size={64} className="text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-gray-900 mb-2">Aucune commande</h2>
            <p className="text-gray-500 font-medium mb-8">
              Vous n'avez pas encore passé de commande.
            </p>
            <Link
              href="/menu"
              className="btn bg-[#1a472a] text-white px-8 py-4 inline-block"
            >
              Découvrir le menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusConfig = STATUS_CONFIG[order.status]
              return (
                <div
                  key={order.id}
                  className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    {/* Order Info */}
                    <div className="flex-grow space-y-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <div>
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                            Commande
                          </p>
                          <p className="text-2xl font-black text-[#1a472a]">#{order.orderNumber}</p>
                        </div>
                        <div
                          className={`px-4 py-2 rounded-xl border font-bold text-sm flex items-center gap-2 ${statusConfig.color}`}
                        >
                          {statusConfig.icon}
                          {statusConfig.label}
                        </div>
                        {order.payment && (
                          <div className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 font-bold text-sm text-gray-600">
                            {PAYMENT_METHOD_LABELS[order.payment.method]}
                            {order.payment.status === 'CONFIRMED' && (
                              <span className="ml-2 text-emerald-600">✓</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              {item.product.image && (
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-12 h-12 rounded-xl object-cover"
                                />
                              )}
                              <div>
                                <p className="font-black text-gray-900 leading-tight">
                                  {item.product.name}
                                  {item.bowlConfig && (
                                    <span className="text-xs font-normal text-gray-500 ml-2">
                                      ({item.bowlConfig.size})
                                    </span>
                                  )}
                                </p>
                                <p className="text-xs font-bold text-gray-400 uppercase">
                                  x{item.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="font-black text-[#1a472a]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Info */}
                      <div className="pt-4 border-t border-gray-100 space-y-2">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                          Livraison
                        </p>
                        <p className="font-bold text-gray-900">{order.deliveryAddress}</p>
                        {order.deliveryZone && (
                          <p className="text-sm text-gray-500">
                            Zone: {order.deliveryZone.name} ({formatPrice(order.deliveryZone.price)})
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="md:w-64 space-y-4">
                      <div className="bg-gray-50 p-6 rounded-2xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-black text-gray-400 uppercase tracking-widest">
                            Sous-total
                          </span>
                          <span className="font-black text-gray-900">
                            {formatPrice(order.totalAmount - order.deliveryFee)}
                          </span>
                        </div>
                        {order.deliveryFee > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-black text-gray-400 uppercase tracking-widest">
                              Livraison
                            </span>
                            <span className="font-black text-gray-900">
                              {formatPrice(order.deliveryFee)}
                            </span>
                          </div>
                        )}
                        <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                          <span className="text-sm font-black text-gray-400 uppercase tracking-widest">
                            Total
                          </span>
                          <span className="text-2xl font-black text-[#1a472a]">
                            {formatPrice(order.totalAmount)}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 font-medium">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>

                      <Link
                        href={`/commande/${order.orderNumber}`}
                        className="btn btn-outline w-full flex items-center justify-center gap-2"
                      >
                        <Eye size={18} />
                        Voir les détails
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl font-bold text-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Précédent
                </button>
                <span className="text-sm font-bold text-gray-600">
                  Page {pagination.page} sur {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 rounded-xl font-bold text-sm bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Suivant
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
