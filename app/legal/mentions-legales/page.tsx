import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales | Healthy Dakar',
  description: 'Mentions légales de Healthy Dakar - Informations légales et contact',
}

export default function MentionsLegalesPage() {
  return (
    <div className="pt-16 md:pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black text-[#1a472a] mb-4">Mentions Légales</h1>
        <p className="text-gray-500 mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">1. Éditeur du Site</h2>
            <div className="space-y-2">
              <p><strong>Raison sociale :</strong> Healthy Dakar</p>
              <p><strong>Activité :</strong> Livraison de repas équilibrés et healthy</p>
              <p><strong>Site web :</strong> www.healthy.sn</p>
              <p><strong>Email :</strong> <a href="mailto:contact@healthy.sn" className="text-[#1a472a] font-semibold hover:underline">contact@healthy.sn</a></p>
              <p><strong>Téléphone :</strong> <a href="tel:+221785987143" className="text-[#1a472a] font-semibold hover:underline">+221 78 598 71 43</a></p>
              <p><strong>Adresse :</strong> Dakar, Sénégal</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">2. Directeur de Publication</h2>
            <p>
              Le directeur de la publication est le représentant légal de Healthy Dakar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">3. Hébergement</h2>
            <p>
              Le site healthy.sn est hébergé par un prestataire d'hébergement web. Pour toute question concernant l'hébergement, 
              veuillez nous contacter à l'adresse indiquée ci-dessus.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">4. Propriété Intellectuelle</h2>
            <p className="mb-3">
              L'ensemble du contenu du site healthy.sn (textes, images, vidéos, logos, design, structure) est la propriété exclusive 
              de Healthy Dakar et est protégé par les lois sénégalaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="mb-3">Sont notamment protégés :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Les textes et contenus rédactionnels</li>
              <li>Les images, photographies et visuels</li>
              <li>Le logo et l'identité visuelle</li>
              <li>La structure et le design du site</li>
              <li>Les bases de données</li>
              <li>Les marques et signes distinctifs</li>
            </ul>
            <p className="mt-4">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, 
              quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de Healthy Dakar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">5. Données Personnelles</h2>
            <p>
              Conformément à la législation sénégalaise sur la protection des données personnelles, vous disposez d'un droit d'accès, 
              de rectification, de suppression et d'opposition aux données personnelles vous concernant.
            </p>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@healthy.sn" className="text-[#1a472a] font-semibold hover:underline">contact@healthy.sn</a>
            </p>
            <p className="mt-4">
              Pour plus d'informations, consultez notre <a href="/legal/confidentialite" className="text-[#1a472a] font-semibold hover:underline">Politique de Confidentialité</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">6. Cookies</h2>
            <p>
              Le site healthy.sn utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. 
              Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez notre site.
            </p>
            <p className="mt-4 mb-3">Types de cookies utilisés :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
              <li><strong>Cookies de performance :</strong> pour analyser l'utilisation du site</li>
              <li><strong>Cookies de préférences :</strong> pour mémoriser vos choix</li>
            </ul>
            <p className="mt-4">
              Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur. 
              La désactivation de certains cookies peut affecter le fonctionnement du site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">7. Liens Externes</h2>
            <p>
              Le site healthy.sn peut contenir des liens vers des sites externes. Healthy Dakar n'exerce aucun contrôle sur ces sites 
              et décline toute responsabilité quant à leur contenu, leur accessibilité ou leurs pratiques en matière de protection des données.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">8. Limitation de Responsabilité</h2>
            <p className="mb-3">
              Healthy Dakar s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site healthy.sn. 
              Cependant, nous ne pouvons garantir :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>L'exactitude, la complétude ou l'actualité des informations</li>
              <li>L'absence d'interruption ou d'erreur dans le fonctionnement du site</li>
              <li>L'absence de virus ou autres éléments nuisibles</li>
            </ul>
            <p className="mt-4">
              L'utilisation du site se fait sous la responsabilité de l'utilisateur. Healthy Dakar ne saurait être tenu responsable 
              des dommages directs ou indirects résultant de l'utilisation du site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">9. Droit Applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit sénégalais. Tout litige relatif à l'utilisation du site 
              healthy.sn est de la compétence exclusive des tribunaux de Dakar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">10. Contact</h2>
            <p className="mb-3">Pour toute question concernant les mentions légales :</p>
            <div className="space-y-2">
              <p><strong>Email :</strong> <a href="mailto:contact@healthy.sn" className="text-[#1a472a] font-semibold hover:underline">contact@healthy.sn</a></p>
              <p><strong>Téléphone :</strong> <a href="tel:+221785987143" className="text-[#1a472a] font-semibold hover:underline">+221 78 598 71 43</a></p>
              <p><strong>WhatsApp :</strong> +221 78 598 71 43</p>
              <p><strong>Adresse :</strong> Dakar, Sénégal</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">11. Modifications</h2>
            <p>
              Healthy Dakar se réserve le droit de modifier les présentes mentions légales à tout moment. 
              Les utilisateurs sont invités à les consulter régulièrement.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
