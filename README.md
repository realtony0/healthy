# Healthy - Site Web Dakar

Site web de commande de repas healthy avec système d'abonnements nutritionnels. 100% halal.

## 🚀 Technologies

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **PostgreSQL** + **Prisma**
- **NextAuth** (authentification)
- **Zod** + **React Hook Form** (validation)

## 📋 Prérequis

- Node.js 18+
- PostgreSQL
- npm ou yarn

## 🛠️ Installation

1. Cloner le projet et installer les dépendances :
```bash
npm install
```

2. Configurer la base de données :
```bash
# Créer un fichier .env à la racine avec :
DATABASE_URL="postgresql://user:password@localhost:5432/healthy"
NEXTAUTH_SECRET="votre-secret-nextauth"
NEXTAUTH_URL="http://localhost:3000"
```

3. Initialiser la base de données :
```bash
npx prisma migrate dev
npx prisma generate
```

4. (Optionnel) Seed la base de données avec des données de test :
```bash
npm run db:seed
```

5. Lancer le serveur de développement :
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
healthy/
├── app/                    # Pages Next.js (App Router)
│   ├── api/               # API Routes
│   ├── auth/              # Pages d'authentification
│   ├── menu/              # Pages menu
│   ├── abonnements/       # Pages abonnements
│   └── ...
├── components/            # Composants React
│   ├── bowl/             # Composants Bowl Builder
│   └── layout/           # Header, Footer
├── lib/                   # Utilitaires
│   ├── prisma.ts         # Client Prisma
│   ├── auth.ts           # Configuration NextAuth
│   ├── constants.ts      # Constantes
│   └── utils.ts          # Fonctions utilitaires
├── prisma/                # Schéma Prisma
│   └── schema.prisma
└── public/                # Fichiers statiques
```

## 🎯 Fonctionnalités

### ✅ Implémentées

- ✅ Structure de base du projet (Next.js 14+, TypeScript, Tailwind)
- ✅ Authentification complète (NextAuth avec email/mot de passe)
- ✅ Schéma de base de données complet (Prisma + PostgreSQL)
- ✅ Toutes les pages principales (Accueil, Menu, Abonnements, Contact, etc.)
- ✅ Module "Crée ton Bowl" avec validation complète des règles
- ✅ Système de panier fonctionnel
- ✅ Page de checkout complète
- ✅ API routes pour panier, commandes et abonnements
- ✅ Pages d'authentification (connexion/inscription)
- ✅ Gestion des abonnements avec calculs de prix automatiques
- ✅ Règles spéciales pour les fruits (composant FruitSelector)
- ✅ Utilitaires WhatsApp (structure prête pour intégration API)
- ✅ Script de seed pour données initiales
- ✅ Navigation complète avec Header/Footer

### 🔄 À compléter

- ⏳ Espace client détaillé (historique commandes, gestion adresses)
- ⏳ Back-office admin complet
- ⏳ Intégration API WhatsApp (nécessite service externe)
- ⏳ Page de détail produit avec intégration FruitSelector
- ⏳ Gestion des images produits
- ⏳ Système d'avis clients

## 🗄️ Base de données

Le schéma Prisma inclut :
- Users (utilisateurs)
- Categories (catégories de produits)
- Products (produits)
- Ingredients (ingrédients pour bowls)
- BowlConfig (configurations de bowls)
- Cart & CartItem (panier)
- Order & OrderItem (commandes)
- Subscription (abonnements)
- Payment (paiements)
- Address (adresses)

## 🔐 Authentification

L'authentification utilise NextAuth avec :
- Provider : Credentials (email + mot de passe)
- Session : JWT
- Rôles : USER, ADMIN

## 📝 Notes importantes

- Tous les produits sont **100% halal** (aucun porc ni dérivé)
- Les paiements sont manuels (Cash, Wave, Orange Money)
- Les notifications WhatsApp seront implémentées via une API externe
- Les images sont stockées localement dans `/public`

## 🚧 Prochaines étapes

1. ✅ Configurer la base de données PostgreSQL
2. ✅ Exécuter les migrations Prisma
3. ✅ Seed les données initiales
4. ⏳ Compléter l'espace client (pages de détails)
5. ⏳ Créer le back-office admin
6. ⏳ Intégrer l'API WhatsApp (Twilio ou autre)
7. ⏳ Ajouter les images produits dans `/public`
8. ⏳ Tester le flux complet de commande

## 📚 Documentation

Consultez `FONCTIONNALITES.md` pour une liste détaillée de toutes les fonctionnalités implémentées.

## 📞 Support

Pour toute question, contactez l'équipe de développement.
