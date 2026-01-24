import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'path';

const compositionId = process.argv[2];

const ALL_FLYERS = [
  'Flyer1-Brand',
  'Flyer2-Menu', 
  'Flyer3-Benefits',
  'Flyer4-Subscriptions',
  'Flyer5-HowItWorks',
];

async function renderFlyer(id: string, bundleLocation: string) {
  console.log(`\n🎨 Génération: ${id}...`);

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id,
  });

  const outputPath = path.resolve(`./out/${id.toLowerCase()}.png`);

  await renderStill({
    composition,
    serveUrl: bundleLocation,
    output: outputPath,
    imageFormat: 'png',
  });

  console.log(`✅ ${id} → ${outputPath}`);
  console.log(`   📐 ${composition.width}x${composition.height}px`);
}

async function main() {
  console.log('📦 Préparation du bundle Remotion...');
  
  const bundleLocation = await bundle({
    entryPoint: path.resolve('./remotion/index.ts'),
    webpackOverride: (config) => config,
  });

  if (compositionId) {
    // Render single flyer
    await renderFlyer(compositionId, bundleLocation);
  } else {
    // Render all flyers
    console.log('\n🖨️ Génération des 5 flyers professionnels...\n');
    
    for (const id of ALL_FLYERS) {
      await renderFlyer(id, bundleLocation);
    }
    
    console.log('\n✅ Tous les flyers ont été générés dans /out/');
    console.log('\n📁 Fichiers créés:');
    ALL_FLYERS.forEach(id => {
      console.log(`   • ${id.toLowerCase()}.png`);
    });
  }
}

main().catch((err) => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
