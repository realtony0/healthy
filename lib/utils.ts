import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(price)
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `CMD-${timestamp}-${random}`
}

// Calcul du prix avec réduction (affichage uniquement, ne modifie pas le prix réel)
export function getDiscountedPrice(price: number, discountPercent: number = 15): number {
  return Math.round(price * (1 - discountPercent / 100))
}

const DELIVERY_TIME_PREFIX = 'Heure souhaitée: '

export function isValidDeliveryTime(deliveryTime: string): boolean {
  if (!/^\d{2}:\d{2}$/.test(deliveryTime)) return false
  const [hours, minutes] = deliveryTime.split(':').map(Number)
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return false
  if (hours < 0 || hours > 23) return false
  if (minutes < 0 || minutes > 59) return false

  const totalMinutes = hours * 60 + minutes
  return totalMinutes >= 6 * 60 && totalMinutes <= 23 * 60
}

export function buildDeliveryNotes(deliveryTime: string, deliveryNotes?: string | null): string {
  const base = `${DELIVERY_TIME_PREFIX}${deliveryTime}`
  const notes = (deliveryNotes ?? '').trim()
  if (!notes) return base
  return `${base}\n${notes}`
}

export function extractDeliveryTimeFromNotes(deliveryNotes?: string | null): string | null {
  const notes = (deliveryNotes ?? '').trim()
  if (!notes) return null

  const firstLine = notes.split('\n')[0]?.trim() ?? ''
  if (!firstLine.startsWith(DELIVERY_TIME_PREFIX)) return null

  const deliveryTime = firstLine.slice(DELIVERY_TIME_PREFIX.length).trim()
  return deliveryTime || null
}

export function stripDeliveryTimeFromNotes(deliveryNotes?: string | null): string | null {
  const notes = (deliveryNotes ?? '').trim()
  if (!notes) return null

  const lines = notes.split('\n')
  if (!lines[0]?.trim().startsWith(DELIVERY_TIME_PREFIX)) return deliveryNotes ?? null

  const rest = lines.slice(1).join('\n').trim()
  return rest || null
}

export function formatDeliveryTime(deliveryTime: string): string {
  if (!/^\d{2}:\d{2}$/.test(deliveryTime)) return deliveryTime
  const [h, m] = deliveryTime.split(':')
  return m === '00' ? `${h}h` : `${h}h${m}`
}
