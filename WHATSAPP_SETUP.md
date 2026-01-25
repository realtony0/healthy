ya# Configuration WhatsApp pour les Notifications

## 📱 Pourquoi les notifications ne fonctionnent pas ?

Les notifications WhatsApp nécessitent une API externe pour envoyer des messages. Actuellement, le système est configuré pour utiliser une API générique, mais les variables d'environnement ne sont pas configurées.

## 🔧 Options pour activer les notifications

### Option 1 : Twilio WhatsApp API (Recommandé)

1. Créez un compte sur [Twilio](https://www.twilio.com/)
2. Activez WhatsApp Sandbox (gratuit pour les tests)
3. Obtenez votre `Account SID` et `Auth Token`
4. Configurez les variables d'environnement sur Vercel :

```env
WHATSAPP_API_URL=https://api.twilio.com/2010-04-01/Accounts/{AccountSID}/Messages.json
WHATSAPP_API_TOKEN={AccountSID}:{AuthToken}  # Format: SID:Token
```

**Note** : Vous devrez modifier `lib/whatsapp.ts` pour utiliser l'API Twilio correctement.

### Option 2 : WhatsApp Business API (via Meta)

1. Créez une application sur [Meta for Developers](https://developers.facebook.com/)
2. Configurez WhatsApp Business API
3. Obtenez votre `Access Token`
4. Configurez les variables d'environnement :

```env
WHATSAPP_API_URL=https://graph.facebook.com/v18.0/{PHONE_NUMBER_ID}/messages
WHATSAPP_API_TOKEN={AccessToken}
```

### Option 3 : API personnalisée

Si vous avez votre propre service WhatsApp, configurez simplement :

```env
WHATSAPP_API_URL=https://votre-api.com/send
WHATSAPP_API_TOKEN={votre-token}
```

L'API doit accepter des requêtes POST avec ce format :
```json
{
  "to": "221785987143",
  "message": "Votre message ici"
}
```

## 🚀 Configuration sur Vercel

1. Allez dans votre projet Vercel
2. Cliquez sur **Settings** → **Environment Variables**
3. Ajoutez :
   - `WHATSAPP_API_URL` : L'URL de votre API WhatsApp
   - `WHATSAPP_API_TOKEN` : Votre token d'authentification
4. Redéployez l'application

## ⚠️ Important

- Les notifications sont envoyées **uniquement si** ces variables sont configurées
- Si les variables ne sont pas définies, les notifications sont silencieusement ignorées (pas d'erreur)
- Vérifiez les logs Vercel pour voir si les notifications sont envoyées avec succès

## 🧪 Tester les notifications

Une fois configuré, testez en créant une commande. Les notifications devraient être envoyées à :
- **Admin** : +221 78 598 71 43 (pour les nouvelles commandes et abonnements)
- **Client** : Le numéro fourni lors de la commande (pour les confirmations)
