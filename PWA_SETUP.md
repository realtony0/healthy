# Configuration PWA - Healthy Dakar

## Icônes requises

Pour que la PWA fonctionne complètement, vous devez créer deux icônes à partir de votre logo :

1. **icon-192.png** - 192x192 pixels
2. **icon-512.png** - 512x512 pixels

### Instructions

1. Prenez votre logo (`/img/logo.jpeg`)
2. Redimensionnez-le aux dimensions suivantes :
   - 192x192 px → `/public/icon-192.png`
   - 512x512 px → `/public/icon-512.png`
3. Assurez-vous que les icônes ont un fond transparent ou un fond adapté

### Outils recommandés

- [Figma](https://figma.com) - Design gratuit
- [Canva](https://canva.com) - Outil en ligne
- [ImageMagick](https://imagemagick.org) - Ligne de commande
  ```bash
  convert img/logo.jpeg -resize 192x192 public/icon-192.png
  convert img/logo.jpeg -resize 512x512 public/icon-512.png
  ```

## Test de la PWA

1. Build le projet : `npm run build`
2. Démarrer en production : `npm start`
3. Ouvrir Chrome DevTools → Application → Manifest
4. Vérifier que le manifest est chargé
5. Tester l'installation sur mobile

## Fonctionnalités PWA

✅ Manifest.json configuré
✅ Service Worker pour mode offline
✅ Installation sur écran d'accueil
✅ Thème et couleurs configurés
✅ Raccourcis (Menu, Commander)

## Prochaines étapes

- [ ] Créer les icônes 192x192 et 512x512
- [ ] Tester l'installation sur iOS (Safari)
- [ ] Tester l'installation sur Android (Chrome)
- [ ] Optimiser le cache du Service Worker
