# Configuration du Favicon - Healthy Dakar

## Favicon Actuel

Le favicon est configuré pour utiliser le logo Healthy Dakar (`/img/logo.jpeg`).

## Fichiers Créés

- `app/icon.svg` - Favicon SVG moderne (utilisé automatiquement par Next.js)
- `public/favicon.svg` - Favicon SVG pour compatibilité
- `scripts/generate-favicon.ts` - Script pour générer des favicons à partir du logo

## Génération de Favicons à partir du Logo

Pour générer des favicons PNG/ICO à partir du logo, vous pouvez utiliser le script fourni :

### Installation de Sharp (optionnel)

```bash
npm install sharp
```

### Génération

```bash
tsx scripts/generate-favicon.ts
```

Ce script générera :
- `favicon-16x16.png`
- `favicon-32x32.png`
- `favicon-96x96.png`
- `icon-192.png` (pour PWA)
- `icon-512.png` (pour PWA)
- `apple-touch-icon.png`
- `favicon.ico`

## Configuration Next.js

Next.js 13+ détecte automatiquement :
- `app/icon.svg` ou `app/icon.png` ou `app/favicon.ico`
- Ces fichiers sont automatiquement servis comme favicon

## Alternative : Utiliser le Logo Directement

Le layout est configuré pour utiliser directement le logo comme favicon :
- `/favicon.svg` (SVG moderne)
- `/img/logo.jpeg` (fallback)

## Recommandations

1. **Pour production** : Générer les favicons PNG/ICO à partir du logo pour une meilleure compatibilité
2. **Tailles recommandées** :
   - 16x16 (favicon standard)
   - 32x32 (favicon haute résolution)
   - 180x180 (Apple Touch Icon)
   - 192x192 (PWA Android)
   - 512x512 (PWA Android)

## Outils en Ligne

Si vous préférez utiliser un outil en ligne :
- [Favicon Generator](https://realfavicongenerator.net/)
- [Favicon.io](https://favicon.io/)

Uploadez votre logo et téléchargez les fichiers générés dans `/public/`.
