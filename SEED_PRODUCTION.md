# Guide pour relancer le seed en production

## 📋 Étapes

### Option 1 : Via Vercel Dashboard (Recommandé)

1. Allez sur [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet "healthy"
3. Allez dans **Settings** > **Environment Variables**
4. Trouvez `DATABASE_URL` et copiez sa valeur
5. Sur votre machine locale, exécutez :
   ```bash
   DATABASE_URL="votre-url-copiée" npm run db:seed:production
   ```

### Option 2 : Via Vercel CLI

1. Connectez-vous à Vercel CLI :
   ```bash
   vercel login
   ```

2. Récupérez les variables d'environnement :
   ```bash
   vercel env pull .env.production
   ```

3. Relancez le seed :
   ```bash
   source .env.production
   npm run db:seed:production
   ```

### Option 3 : Via Neon.tech Dashboard

Si vous utilisez Neon.tech :

1. Allez sur [https://console.neon.tech](https://console.neon.tech)
2. Sélectionnez votre projet
3. Allez dans **Connection Details**
4. Copiez la connection string
5. Exécutez :
   ```bash
   DATABASE_URL="votre-connection-string" npm run db:seed:production
   ```

## ⚠️ Important

- Le seed va **supprimer** tous les produits qui ne sont pas dans la liste autorisée
- Le seed va **mettre à jour** tous les produits existants avec les nouvelles descriptions
- Assurez-vous d'avoir une sauvegarde de votre base de données avant de lancer le seed

## ✅ Vérification

Après avoir lancé le seed, vérifiez que :
- Les 24 produits sont présents (7 Plats Signature, 4 L'Essentiel, 5 Rituel du Matin, 4 Shots, 4 Energy Balls)
- Les descriptions sont correctes
- Les valeurs nutritionnelles sont à jour
