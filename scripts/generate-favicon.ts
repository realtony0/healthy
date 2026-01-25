/**
 * Script pour générer le favicon à partir du logo
 * 
 * Ce script nécessite ImageMagick ou Sharp pour convertir le logo en favicon
 * 
 * Installation:
 * npm install sharp
 * 
 * Usage:
 * tsx scripts/generate-favicon.ts
 */

import sharp from 'sharp'
import { existsSync } from 'fs'
import { join } from 'path'

const logoPath = join(process.cwd(), 'public', 'img', 'logo.jpeg')
const outputDir = join(process.cwd(), 'public')

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 96, name: 'favicon-96x96.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
]

async function generateFavicon() {
  if (!existsSync(logoPath)) {
    console.error(`❌ Logo not found at ${logoPath}`)
    process.exit(1)
  }

  console.log('🎨 Génération des favicons à partir du logo...\n')

  try {
    for (const { size, name } of sizes) {
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .toFile(join(outputDir, name))
      
      console.log(`✅ ${name} (${size}x${size})`)
    }

    // Générer favicon.ico (16x16 et 32x32 combinés)
    const favicon16 = await sharp(logoPath)
      .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer()
    
    const favicon32 = await sharp(logoPath)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer()

    // Note: Pour créer un vrai .ico, il faudrait utiliser une bibliothèque spécialisée
    // Pour l'instant, on copie le 32x32 comme favicon.ico
    await sharp(favicon32).toFile(join(outputDir, 'favicon.ico'))
    console.log(`✅ favicon.ico`)

    console.log('\n✨ Tous les favicons ont été générés avec succès!')
  } catch (error) {
    console.error('❌ Erreur lors de la génération:', error)
    process.exit(1)
  }
}

generateFavicon()
