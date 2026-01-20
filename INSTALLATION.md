# Guide d'Installation - Healthy Dakar

## 🚀 Installation Rapide

### 1. Prérequis

Assurez-vous d'avoir installé :
- **Node.js** 18+ ([télécharger](https://nodejs.org/))
- **PostgreSQL** 14+ ([télécharger](https://www.postgresql.org/download/))
- **npm** ou **yarn**

### 2. Configuration de la Base de Données

1. Créez une base de données PostgreSQL :
```bash
createdb healthy
```

2. Créez un fichier `.env` à la racine du projet :
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/healthy"

# NextAuth
NEXTAUTH_SECRET="changez-ceci-par-une-cle-secrete-aleatoire"
NEXTAUTH_URL="http://localhost:3000"

# WhatsApp (optionnel pour l'instant)
WHATSAPP_API_URL=""
WHATSAPP_API_TOKEN=""
```

**Important** : Remplacez `user` et `password` par vos identifiants PostgreSQL.

Pour générer un `NEXTAUTH_SECRET` sécurisé :
```bash
openssl rand -base64 32
```

### 3. Installation des Dépendances

```bash
npm install
```

### 4. Initialisation de la Base de Données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables dans la base de données
npx prisma migrate dev --name init

# (Optionnel) Ajouter des données de test
npm run db:seed
```

### 5. Lancer le Serveur de Développement

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🔧 Commandes Utiles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint

# Seed la base de données
npm run db:seed

# Prisma Studio (interface graphique pour la DB)
npx prisma studio
```

## 🐛 Dépannage

### Erreur de connexion à la base de données

Vérifiez que :
1. PostgreSQL est bien démarré
2. La base de données `healthy` existe
3. Les identifiants dans `.env` sont corrects
4. Le port PostgreSQL (par défaut 5432) est accessible

### Erreur NextAuth

Vérifiez que `NEXTAUTH_SECRET` est bien défini dans `.env` et qu'il s'agit d'une chaîne aléatoire sécurisée.

### Erreur Prisma

Si vous modifiez le schéma Prisma :
```bash
npx prisma migrate dev
npx prisma generate
```

## 📝 Première Utilisation

1. Créez un compte utilisateur via `/auth/signup`
2. Connectez-vous via `/auth/signin`
3. Explorez le menu via `/menu`
4. Testez le Bowl Builder via `/menu/cree-ton-bowl`
5. Consultez les abonnements via `/abonnements`

## 🔐 Créer un Compte Admin

Pour créer un compte administrateur, utilisez Prisma Studio ou une requête SQL :

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'votre-email@example.com';
```

Ou via Prisma Studio :
1. Lancez `npx prisma studio`
2. Ouvrez la table `users`
3. Modifiez le champ `role` de `USER` à `ADMIN`

## 📦 Structure des Données

Après le seed, vous aurez :
- 6 catégories de produits
- Des ingrédients pour les bowls
- Quelques produits exemple

Vous pouvez ajouter vos propres produits via Prisma Studio ou le back-office admin (à venir).

## 🚀 Déploiement

Pour déployer en production :

1. Configurez les variables d'environnement sur votre plateforme
2. Build le projet : `npm run build`
3. Démarrez le serveur : `npm start`

**Recommandations** :
- Utilisez une base de données PostgreSQL hébergée (ex: Supabase, Railway, Neon)
- Configurez `NEXTAUTH_URL` avec votre URL de production
- Utilisez un `NEXTAUTH_SECRET` différent en production
- Activez HTTPS
