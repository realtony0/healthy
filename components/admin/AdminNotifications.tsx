'use client'

import { useEffect, useState } from 'react'
import { Bell, Package, Calendar, X, CheckCircle } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

type Notification = {
  id: string
  type: 'order' | 'subscription'
  title: string
  message: string
  link: string
  createdAt: Date
}

type NotificationData = {
  orders: Array<{
    id: string
    orderNumber: string
    totalAmount: number
    status: string
    paymentStatus: string
    createdAt: string
    customerName: string
    itemPreview: string
  }>
  subscriptions: Array<{
    id: string
    customerName: string
    goal: string
    mealPlan: string
    createdAt: string
  }>
  pendingPaymentsCount: number
  newOrdersCount: number
  newSubscriptionsCount: number
}

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [lastFetch, setLastFetch] = useState<Date | null>(() => {
    // Récupérer le dernier fetch depuis localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('admin_last_notification_fetch')
      return stored ? new Date(stored) : new Date() // Si pas de valeur, utiliser maintenant pour ne pas spammer
    }
    return new Date()
  })
  const [toasts, setToasts] = useState<Notification[]>([])
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')

  // Demander la permission pour les notifications navigateur
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
      
      // Si la permission n'a pas encore été demandée, on peut la demander automatiquement
      // ou attendre que l'utilisateur clique sur le bouton
      if (Notification.permission === 'default') {
        // On peut demander automatiquement ou attendre une action utilisateur
      }
    }
  }, [])

  // Fonction pour demander la permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)
      
      if (permission === 'granted') {
        // Afficher une notification de test
        new Notification('Notifications activées', {
          body: 'Vous recevrez maintenant des notifications sonores pour les nouvelles commandes.',
          icon: '/img/logo.jpeg',
          badge: '/img/logo.jpeg',
        })
      }
    }
  }

  // Fonction pour jouer un son de notification
  const playNotificationSound = () => {
    try {
      // Créer un contexte audio pour jouer un son
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Son de notification (beep court)
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (error) {
      console.error('Error playing notification sound:', error)
    }
  }

  // Fonction pour envoyer une notification navigateur
  const sendBrowserNotification = (notif: Notification) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const browserNotification = new window.Notification(notif.title, {
        body: notif.message,
        icon: '/img/logo.jpeg',
        badge: '/img/logo.jpeg',
        tag: notif.id, // Évite les doublons
        requireInteraction: false,
        silent: false, // Active le son système
      })

      // Ouvrir la page quand on clique sur la notification
      browserNotification.onclick = () => {
        window.focus()
        window.location.href = notif.link
        browserNotification.close()
      }

      // Jouer un son personnalisé en plus
      playNotificationSound()
    }
  }

  const fetchNotifications = async () => {
    try {
      const currentFetchTime = new Date()
      const res = await fetch('/api/admin/notifications')
      const data: NotificationData = await res.json()

      const newNotifications: Notification[] = []

      // Convertir les commandes en notifications - seulement celles créées APRÈS le dernier fetch
      data.orders.forEach(order => {
        const orderDate = new Date(order.createdAt)
        // Vérifier que la commande est vraiment nouvelle (créée après le dernier fetch)
        if (lastFetch && orderDate > lastFetch) {
          newNotifications.push({
            id: `order-${order.id}`,
            type: 'order',
            title: `Nouvelle commande #${order.orderNumber}`,
            message: `${order.customerName} • ${formatPrice(order.totalAmount)} • ${order.itemPreview}`,
            link: `/mmb22115/commandes/${order.orderNumber}`,
            createdAt: orderDate,
          })
        }
      })

      // Convertir les abonnements en notifications - seulement ceux créés APRÈS le dernier fetch
      data.subscriptions.forEach(sub => {
        const subDate = new Date(sub.createdAt)
        // Vérifier que l'abonnement est vraiment nouveau (créé après le dernier fetch)
        if (lastFetch && subDate > lastFetch) {
          newNotifications.push({
            id: `sub-${sub.id}`,
            type: 'subscription',
            title: `Nouvel abonnement`,
            message: `${sub.customerName} • ${sub.goal} • ${sub.mealPlan}`,
            link: `/mmb22115/abonnements/${sub.id}`,
            createdAt: subDate,
          })
        }
      })

      if (newNotifications.length > 0) {
        setNotifications(prev => [...newNotifications, ...prev].slice(0, 20))
        setUnreadCount(prev => prev + newNotifications.length)
        
        // Afficher les toasts pour les nouvelles notifications
        setToasts(prev => [...newNotifications, ...prev].slice(0, 3))
        
        // Envoyer les notifications navigateur avec son
        newNotifications.forEach(notif => {
          sendBrowserNotification(notif)
        })
        
        // Jouer un son même si les notifications navigateur ne sont pas activées
        if (Notification.permission !== 'granted') {
          playNotificationSound()
        }
        
        // Supprimer les toasts après 5 secondes
        setTimeout(() => {
          setToasts([])
        }, 5000)
      }

      // Mettre à jour le dernier fetch et le sauvegarder dans localStorage
      setLastFetch(currentFetchTime)
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_last_notification_fetch', currentFetchTime.toISOString())
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }


  useEffect(() => {
    // Fetch immédiat
    fetchNotifications()
    
    // Poll toutes les 30 secondes
    const interval = setInterval(fetchNotifications, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const markAsRead = () => {
    setUnreadCount(0)
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'À l\'instant'
    if (minutes < 60) return `Il y a ${minutes}min`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `Il y a ${hours}h`
    return date.toLocaleDateString('fr-FR')
  }

  return (
    <>
      {/* Toast Notifications */}
          <div className="fixed top-28 md:top-24 right-2 md:right-6 z-[60] space-y-2 md:space-y-3 max-w-[calc(100vw-1rem)] md:max-w-sm">
            {toasts.map(toast => (
              <div
                key={toast.id}
                className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl border-2 border-emerald-200 shadow-2xl animate-in slide-in-from-right duration-300"
              >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                toast.type === 'order' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
              }`}>
                {toast.type === 'order' ? <Package size={20} /> : <Calendar size={20} />}
              </div>
              <div className="flex-1">
                <p className="font-black text-gray-900 text-sm mb-1">{toast.title}</p>
                <p className="text-xs text-gray-500">{toast.message}</p>
              </div>
              <button
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="text-gray-300 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Bouton de permission si pas encore accordée */}
          {notificationPermission !== 'granted' && 'Notification' in window && (
            <button
              onClick={requestNotificationPermission}
              className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 hover:bg-orange-100 transition-all flex-shrink-0"
              title="Activer les notifications sonores"
            >
              <Bell size={14} className="md:w-4 md:h-4" />
            </button>
          )}
          
          <button
            onClick={() => {
              setIsOpen(!isOpen)
              if (isOpen) markAsRead()
            }}
            className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-[#1a472a] hover:border-[#1a472a] transition-all duration-300 flex-shrink-0"
          >
            <Bell size={18} className="md:w-5 md:h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white text-[10px] md:text-xs font-black rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-12 md:top-14 w-[calc(100vw-2rem)] md:w-96 bg-white rounded-[1.5rem] md:rounded-3xl border-2 border-gray-100 shadow-2xl z-50 max-h-[calc(100vh-10rem)] md:max-h-[600px] overflow-hidden flex flex-col">
            <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-black text-gray-900 text-base md:text-lg">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-12 text-center">
                  <CheckCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">Aucune notification</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {notifications.map(notif => (
                    <Link
                      key={notif.id}
                      href={notif.link}
                      onClick={() => setIsOpen(false)}
                      className="block p-6 hover:bg-emerald-50 transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          notif.type === 'order' 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'bg-orange-50 text-orange-600'
                        }`}>
                          {notif.type === 'order' ? <Package size={18} /> : <Calendar size={18} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-gray-900 text-sm mb-1 group-hover:text-[#1a472a] transition-colors">
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-500 mb-2">{notif.message}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            {formatTime(notif.createdAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 border-t border-gray-100">
                <Link
                  href="/mmb22115/commandes"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-sm font-black text-[#1a472a] hover:text-emerald-600 transition-colors"
                >
                  Voir toutes les commandes
                </Link>
              </div>
            )}
          </div>
        </>
      )}
      </div>
    </>
  )
}
