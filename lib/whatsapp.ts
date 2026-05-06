export interface WhatsAppMessage {
  to: string
  message: string
}

export async function sendWhatsAppNotification(message: WhatsAppMessage): Promise<boolean> {
  try {
    const idInstance = process.env.GREENAPI_ID_INSTANCE
    const apiToken = process.env.GREENAPI_API_TOKEN

    if (!idInstance || !apiToken) {
      console.warn('WhatsApp (GreenAPI) not configured: GREENAPI_ID_INSTANCE or GREENAPI_API_TOKEN missing')
      return false
    }

    // Format phone: must be international without + (ex: 221784294949)
    const phone = message.to.replace(/^\+/, '')

    const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiToken}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: `${phone}@c.us`,
        message: message.message,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('GreenAPI error:', text)
      return false
    }

    return true
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error)
    return false
  }
}
