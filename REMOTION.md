# Remotion - Vidéo de Présentation Healthy Dakar

Remotion est intégré pour créer la vidéo de présentation/promo du site Healthy Dakar.

## 🎬 Générer la vidéo de promo

Pour créer le fichier MP4 de la vidéo de présentation :

```bash
npm run render:video
```

La vidéo sera générée dans `out/healthy-promo.mp4` (format 1920x1080, 16 secondes).

## 🎨 Contenu de la vidéo

La vidéo `HealthyPromo` contient 4 scènes :

1. **Introduction** (3s) - Titre "Healthy Dakar" avec animation
2. **Avantages** (5s) - 3 points clés : 100% Frais, 100% Halal, Livraison Express
3. **Produits** (5s) - Présentation des Bowls, Plats Signature, Abonnements
4. **Call to Action** (3s) - "Commandez maintenant" avec le site web

## 🛠️ Éditer la vidéo

Pour visualiser et modifier la vidéo avant de la générer :

```bash
npm run remotion:studio
```

Cela ouvrira Remotion Studio où tu peux :
- Prévisualiser la vidéo en temps réel
- Modifier les textes, couleurs, durées
- Tester différentes animations

## 📁 Structure

```
remotion/
├── Root.tsx          # Point d'entrée, enregistre la composition
├── HealthyPromo.tsx  # Vidéo de présentation (4 scènes)
└── index.ts          # Export du Root
```

## 📚 Documentation

- [Remotion Docs](https://www.remotion.dev/docs)
- [Remotion Examples](https://github.com/remotion-dev/remotion/tree/main/packages/example)

## 💡 Personnalisation

Pour modifier la vidéo :
1. Édite `remotion/HealthyPromo.tsx`
2. Lance `npm run remotion:studio` pour prévisualiser
3. Génère le MP4 avec `npm run render:video`
