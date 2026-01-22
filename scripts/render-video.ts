#!/usr/bin/env tsx
/**
 * Script pour générer la vidéo de promo Healthy Dakar
 * 
 * Usage:
 *   npm run render:video
 * 
 * La vidéo sera générée dans: out/healthy-promo.mp4
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const outputDir = path.join(process.cwd(), 'out');
const outputFile = path.join(outputDir, 'healthy-promo.mp4');

// Créer le dossier out s'il n'existe pas
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

console.log('🎬 Génération de la vidéo Healthy Dakar...\n');

try {
  execSync(
    `npx remotion render HealthyPromo ${outputFile}`,
    {
      stdio: 'inherit',
      cwd: process.cwd(),
    }
  );
  
  console.log(`\n✅ Vidéo générée avec succès: ${outputFile}`);
  console.log(`📁 Taille du fichier: ${Math.round(require('fs').statSync(outputFile).size / 1024 / 1024)} MB`);
} catch (error) {
  console.error('\n❌ Erreur lors de la génération de la vidéo');
  process.exit(1);
}
