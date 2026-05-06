export interface WhatsAppMessage {
  to: string
  message: string
}

export async function sendWhatsAppNotification(message: WhatsAppMessage): Promise<boolean> {
  try {
    const apiKey = process.env.CALLMEBOT_API_KEY
    const phone = process.env.WHATSAPP_ADMIN_PHONE || message.to

    if (!apiKey) {
      console.warn('WhatsApp (CallMeBot) not configured: CALLMEBOT_API_KEY missing')
      return false
    }

    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(message.message)}&apikey=${apiKey}`

    const response = await fetch(url, { method: 'GET' })
    const text = await response.text()

    if (!response.ok || text.toLowerCase().includes('error')) {
      console.error('CallMeBot error:', text)
      return false
    }

    return true
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error)
    return false
  }
}
