import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Healthy Dakar',
  description: 'Politique de confidentialité de Healthy Dakar - Protection de vos données personnelles',
}

export default function ConfidentialitePage() {
  return (
    <div className="pt-16 md:pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black text-[#1a472a] mb-4">Politique de Confidentialité</h1>
        <p className="text-gray-500 mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">1. Introduction</h2>
            <p>
              Healthy Dakar (« nous », « notre » ou « nos ») s'engage à protéger la confidentialité de vos informations personnelles. 
              Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos données personnelles 
              lorsque vous utilisez notre site web healthy.sn et nos services de livraison de repas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">2. Données Collectées</h2>
            <p className="mb-3">Nous collectons les informations suivantes :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Données d'identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
              <li><strong>Données de livraison :</strong> adresse postale, zone de livraison, instructions spéciales</li>
              <li><strong>Données de paiement :</strong> informations de paiement (Wave, Orange Money, espèces) - aucune donnée bancaire n'est stockée sur nos serveurs</li>
              <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées, préférences de commande</li>
              <li><strong>Données de commande :</strong> historique des commandes, préférences alimentaires, allergies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">3. Utilisation des Données</h2>
            <p className="mb-3">Vos données personnelles sont utilisées pour :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Traiter et livrer vos commandes</li>
              <li>Gérer votre compte utilisateur</li>
              <li>Vous contacter concernant vos commandes (SMS, WhatsApp, email)</li>
              <li>Améliorer nos services et votre expérience utilisateur</li>
              <li>Vous envoyer des communications marketing (avec votre consentement)</li>
              <li>Respecter nos obligations légales et réglementaires</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">4. Partage des Données</h2>
            <p>
              Nous ne vendons jamais vos données personnelles à des tiers. Nous pouvons partager vos informations uniquement avec :
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Prestataires de services :</strong> services de livraison, services de paiement (Wave, Orange Money)</li>
              <li><strong>Autorités légales :</strong> si requis par la loi sénégalaise</li>
              <li><strong>Partenaires de confiance :</strong> uniquement avec votre consentement explicite</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">5. Sécurité des Données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données 
              contre tout accès non autorisé, perte, destruction ou altération. Cependant, aucune méthode de transmission sur Internet 
              n'est 100% sécurisée.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">6. Conservation des Données</h2>
            <p>
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et respecter nos obligations légales. 
              Les données de commande sont conservées pendant 3 ans conformément à la législation sénégalaise.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">7. Vos Droits</h2>
            <p className="mb-3">Conformément à la loi sénégalaise sur la protection des données, vous avez le droit de :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accéder à vos données personnelles</li>
              <li>Rectifier vos données inexactes</li>
              <li>Demander la suppression de vos données</li>
              <li>Vous opposer au traitement de vos données</li>
              <li>Demander la portabilité de vos données</li>
              <li>Retirer votre consentement à tout moment</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@healthy.sn" className="text-[#1a472a] font-semibold hover:underline">contact@healthy.sn</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">8. Cookies</h2>
            <p>
              Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences de cookies dans les paramètres 
              de votre navigateur. Les cookies essentiels sont nécessaires au fonctionnement du site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">9. Modifications</h2>
            <p>
              Nous pouvons modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page 
              avec une date de mise à jour. Nous vous encourageons à consulter régulièrement cette page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">10. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité, contactez-nous :
            </p>
            <div className="mt-4 space-y-2">
              <p><strong>Email :</strong> <a href="mailto:contact@healthy.sn" className="text-[#1a472a] font-semibold hover:underline">contact@healthy.sn</a></p>
              <p><strong>Téléphone :</strong> <a href="tel:+221785987143" className="text-[#1a472a] font-semibold hover:underline">+221 78 598 71 43</a></p>
              <p><strong>Adresse :</strong> Dakar, Sénégal</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
