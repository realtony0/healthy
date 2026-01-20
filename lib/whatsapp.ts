/**
 * Utilitaires pour les notifications WhatsApp
 * À intégrer avec une API WhatsApp (ex: Twilio, WhatsApp Business API)
 */

export interface WhatsAppMessage {
  to: string
  message: string
}

export async function sendWhatsAppNotification(message: WhatsAppMessage): Promise<boolean> {
  try {
    // TODO: Intégrer avec l'API WhatsApp choisie
    // Exemple avec Twilio:
    // const client = require('twilio')(accountSid, authToken)
    // await client.messages.create({
    //   body: message.message,
    //   from: 'whatsapp:+14155238886',
    //   to: `whatsapp:${message.to}`
    // })

    const apiUrl = process.env.WHATSAPP_API_URL
    const apiToken = process.env.WHATSAPP_API_TOKEN

    if (!apiUrl || !apiToken) {
      console.warn('WhatsApp API not configured')
      return false
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        to: message.to,
        message: message.message,
      }),
    })

    return response.ok
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error)
    return false
  }
}

export function formatOrderNotification(orderNumber: string, totalAmount: number): string {
  return `✅ Commande confirmée !

Numéro de commande: ${orderNumber}
Montant total: ${totalAmount.toLocaleString('fr-FR')} FCFA

Votre commande est en préparation. Vous recevrez un message lorsque votre commande sera prête pour la livraison.

Merci de votre confiance ! 🌱`
}

export function formatSubscriptionNotification(
  subscriptionId: string,
  startDate: Date,
  endDate: Date
): string {
  return `✅ Abonnement activé !

Votre abonnement nutritionnel a été activé.
Période: ${startDate.toLocaleDateString('fr-FR')} au ${endDate.toLocaleDateString('fr-FR')}

Vous recevrez vos repas selon le planning défini.

Merci de votre confiance ! 🌱`
}
