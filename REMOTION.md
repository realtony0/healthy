# Remotion - Création de Vidéos

Remotion est intégré dans le projet Healthy Dakar pour créer des vidéos programmatiquement avec React.

## 🚀 Utilisation

### Lancer Remotion Studio

Pour visualiser et éditer vos vidéos en temps réel :

```bash
npm run remotion:studio
```

Cela ouvrira Remotion Studio sur `http://localhost:3000` (ou un autre port si 3000 est occupé).

### Rendre une vidéo (Générer un MP4)

Pour générer un fichier vidéo MP4 :

```bash
npm run remotion:render HealthyPromo out/video.mp4
```

### Visualiser dans le navigateur

Accédez à `/remotion` dans votre application Next.js pour voir un player de la vidéo.

## 📁 Structure

```
remotion/
├── Root.tsx          # Point d'entrée, enregistre toutes les compositions
├── HealthyPromo.tsx  # Exemple de composition vidéo
└── index.ts          # Export du Root
```

## 🎬 Créer une nouvelle vidéo

1. Créez un nouveau composant dans `remotion/` (ex: `MyVideo.tsx`)
2. Utilisez les hooks Remotion : `useCurrentFrame()`, `useVideoConfig()`
3. Enregistrez la composition dans `Root.tsx`
4. Lancez `npm run remotion:studio` pour la visualiser

## 📚 Documentation

- [Remotion Docs](https://www.remotion.dev/docs)
- [Remotion Examples](https://github.com/remotion-dev/remotion/tree/main/packages/example)

## 🎨 Exemple : HealthyPromo

La vidéo `HealthyPromo` est un exemple simple qui affiche :
- Le titre "Healthy Dakar"
- Le sous-titre "Votre nutrition, livrée chaque jour"
- Des animations d'entrée et de sortie

Vous pouvez personnaliser les props dans `Root.tsx` ou via l'interface Remotion Studio.
