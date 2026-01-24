import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'path';

const compositionId = process.argv[2] || 'FlyerA5';

async function renderFlyer() {
  console.log(`🎨 Génération du flyer: ${compositionId}...`);

  const bundleLocation = await bundle({
    entryPoint: path.resolve('./remotion/index.ts'),
    webpackOverride: (config) => config,
  });

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compositionId,
  });

  const outputPath = path.resolve(`./out/${compositionId.toLowerCase()}.png`);

  await renderStill({
    composition,
    serveUrl: bundleLocation,
    output: outputPath,
    imageFormat: 'png',
  });

  console.log(`✅ Flyer généré: ${outputPath}`);
  console.log(`📐 Dimensions: ${composition.width}x${composition.height}px`);
}

renderFlyer().catch((err) => {
  console.error('Erreur:', err);
  process.exit(1);
});
