// Service Worker pour PWA
const CACHE_NAME = 'healthy-dakar-v2'
const urlsToCache = [
  '/',
  '/menu',
  '/abonnements',
  '/commander',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
]

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert')
        return cache.addAll(urlsToCache)
      })
  )
})

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression de l\'ancien cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Stratégie: Network First, puis Cache
self.addEventListener('fetch', (event) => {
  // Forcer HTTPS pour toutes les requêtes
  const url = new URL(event.request.url)
  if (url.protocol === 'http:' && url.hostname !== 'localhost') {
    url.protocol = 'https:'
    event.respondWith(fetch(url))
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Ne mettre en cache que les réponses HTTPS réussies
        if (response.status === 200 && event.request.url.startsWith('https://')) {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })
        }
        return response
      })
      .catch(() => {
        // Si le réseau échoue, utiliser le cache
        return caches.match(event.request)
      })
  )
})
