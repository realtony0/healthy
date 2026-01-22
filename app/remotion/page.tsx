'use client'

import { Player } from '@remotion/player'
import { HealthyPromo } from '@/remotion/HealthyPromo'
import Link from 'next/link'

export default function RemotionPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-3xl font-black">
            Healthy Dakar - Vidéo Promo
          </h1>
          <Link 
            href="/" 
            className="text-emerald-400 hover:text-emerald-300 font-bold text-sm uppercase tracking-wider"
          >
            ← Retour
          </Link>
        </div>
        <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
          <Player
            component={HealthyPromo}
            durationInFrames={300}
            compositionWidth={1920}
            compositionHeight={1080}
            fps={30}
            controls
            style={{
              width: '100%',
              height: 'auto',
            }}
            inputProps={{
              title: 'Healthy Dakar',
              subtitle: 'Votre nutrition, livrée chaque jour',
            }}
          />
        </div>
        <div className="bg-gray-800 rounded-lg p-6 text-white">
          <h2 className="text-xl font-black mb-4">Comment utiliser Remotion</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Lancez <code className="bg-gray-700 px-2 py-1 rounded">npm run remotion:studio</code> pour éditer vos vidéos</li>
            <li>• Rendez une vidéo avec <code className="bg-gray-700 px-2 py-1 rounded">npm run remotion:render HealthyPromo out/video.mp4</code></li>
            <li>• Consultez <code className="bg-gray-700 px-2 py-1 rounded">REMOTION.md</code> pour plus d'infos</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
