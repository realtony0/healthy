/**
 * Utilitaires pour les paiements Wave
 * Génération de QR codes et vérification des paiements
 */

export interface WavePaymentData {
  amount: number
  orderNumber: string
  phone: string
  reference?: string
}

/**
 * Génère un lien de paiement Wave avec QR code
 * Format: wave://send?amount=XXX&phone=XXX&reference=XXX
 */
export function generateWavePaymentLink(data: WavePaymentData): string {
  const { amount, phone, orderNumber } = data
  const cleanPhone = phone.replace(/\D/g, '') // Enlever tout sauf les chiffres
  const reference = `CMD-${orderNumber}`
  
  // Format Wave pour Sénégal: wave://send?amount=XXX&phone=XXX&reference=XXX
  return `wave://send?amount=${amount}&phone=${cleanPhone}&reference=${reference}`
}

/**
 * Génère un QR code data URL pour le paiement Wave
 */
export function generateWaveQRCode(data: WavePaymentData): string {
  const paymentLink = generateWavePaymentLink(data)
  
  // Utiliser un service de QR code en ligne (ou intégrer une librairie)
  // Pour l'instant, on retourne l'URL de l'API QR code
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentLink)}`
  
  return qrCodeUrl
}

/**
 * Génère les instructions de paiement Wave formatées
 */
export function generateWaveInstructions(data: WavePaymentData): {
  title: string
  steps: string[]
  qrCodeUrl: string
  paymentLink: string
  phoneNumber: string
} {
  const { amount, orderNumber, phone } = data
  const cleanPhone = phone.replace(/\D/g, '')
  const formattedPhone = cleanPhone.length === 9 
    ? `${cleanPhone.slice(0, 2)} ${cleanPhone.slice(2, 5)} ${cleanPhone.slice(5, 7)} ${cleanPhone.slice(7, 9)}`
    : cleanPhone
  
  return {
    title: `Paiement Wave - ${amount.toLocaleString('fr-FR')} FCFA`,
    steps: [
      'Ouvrez votre application Wave',
      'Scannez le QR code ci-dessous ou cliquez sur le bouton',
      `Ou transférez manuellement ${amount.toLocaleString('fr-FR')} FCFA au ${formattedPhone}`,
      `Important : Indiquez "CMD-${orderNumber}" en référence du transfert`,
      'Une fois le paiement effectué, votre commande sera automatiquement confirmée',
    ],
    qrCodeUrl: generateWaveQRCode(data),
    paymentLink: generateWavePaymentLink(data),
    phoneNumber: formattedPhone,
  }
}

/**
 * Vérifie si un paiement Wave a été effectué
 * Note: Cette fonction nécessiterait une intégration avec l'API Wave
 * Pour l'instant, c'est un placeholder pour la validation manuelle
 */
export async function verifyWavePayment(
  orderNumber: string,
  amount: number,
  reference?: string
): Promise<{ verified: boolean; transactionId?: string }> {
  // TODO: Intégrer avec l'API Wave pour vérification automatique
  // Pour l'instant, retourne false pour forcer la validation manuelle
  
  // Si une API Wave est disponible, on pourrait faire :
  // const response = await fetch(`https://api.wave.com/v1/transactions/verify`, {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.WAVE_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     reference: `CMD-${orderNumber}`,
  //     amount,
  //   }),
  // })
  
  return { verified: false }
}
