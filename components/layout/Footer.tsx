import Link from 'next/link'
import Image from 'next/image'
import { getLogoPath } from '@/lib/logo'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src={getLogoPath()} 
                alt="Healthy" 
                width={500} 
                height={200} 
                className="h-20 md:h-24 w-auto object-contain"
                style={{ 
                  mixBlendMode: 'normal',
                  backgroundColor: 'transparent'
                }}
              />
            </Link>
            <p className="text-gray-500 max-w-sm text-lg leading-relaxed font-medium">
              La meilleure nutrition de Dakar, livrée chez vous chaque jour. 100% frais, 100% halal.
            </p>
          </div>
          
          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">Produits</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><Link href="/menu" className="hover:text-[#1a472a] transition-colors">Le Menu</Link></li>
              <li><Link href="/abonnements" className="hover:text-[#1a472a] transition-colors">Abonnements</Link></li>
              <li><Link href="/menu/cree-ton-bowl" className="hover:text-[#1a472a] transition-colors">Crée ton Bowl</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">Société</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><Link href="/comment-ca-marche" className="hover:text-[#1a472a] transition-colors">Concept</Link></li>
              <li><Link href="/avis" className="hover:text-[#1a472a] transition-colors">Avis</Link></li>
              <li><Link href="/contact" className="hover:text-[#1a472a] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">Légal</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><Link href="/legal/cgv" className="hover:text-[#1a472a] transition-colors">CGV</Link></li>
              <li><Link href="/legal/confidentialite" className="hover:text-[#1a472a] transition-colors">Confidentialité</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm font-medium">
            © {new Date().getFullYear()} Healthy Dakar. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm font-medium">
            <span>Ouvert de 6h à 23h</span>
            <span>•</span>
            <a href="https://wa.me/221785987143" className="hover:text-emerald-600 transition-colors">WhatsApp: +221 78 598 71 43</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
