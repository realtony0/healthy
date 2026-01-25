import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | Healthy Dakar',
  description: 'Conditions générales de vente de Healthy Dakar - Livraison de repas healthy à Dakar',
}

export default function CGVPage() {
  return (
    <div className="pt-16 md:pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black text-[#1a472a] mb-4">Conditions Générales de Vente</h1>
        <p className="text-gray-500 mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent la vente de repas et services de livraison proposés par 
              Healthy Dakar via le site web healthy.sn. Toute commande implique l'acceptation sans réserve de ces CGV.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">2. Informations Légales</h2>
            <div className="space-y-2">
              <p><strong>Raison sociale :</strong> Healthy Dakar</p>
              <p><strong>Site web :</strong> www.healthy.sn</p>
              <p><strong>Email :</strong> contact@healthy.sn</p>
              <p><strong>Téléphone :</strong> +221 78 598 71 43</p>
              <p><strong>Zone de livraison :</strong> Dakar et environs</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">3. Produits et Services</h2>
            <p className="mb-3">Healthy Dakar propose :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Repas équilibrés et healthy (bowls, plats signature)</li>
              <li>Création de bowls personnalisés</li>
              <li>Abonnements hebdomadaires</li>
              <li>Shots détox, Energy Balls, Smoothies</li>
              <li>Livraison à domicile ou au bureau</li>
            </ul>
            <p className="mt-4">
              Tous nos produits sont 100% halal, cuisinés frais chaque matin avec des ingrédients de qualité.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">4. Commandes</h2>
            <p className="mb-3"><strong>4.1 Processus de commande :</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>La commande se fait via le site web healthy.sn</li>
              <li>Le client sélectionne ses produits, quantités et options</li>
              <li>Le client renseigne ses informations de livraison</li>
              <li>Le client choisit son mode de paiement</li>
              <li>La commande est confirmée par email/SMS/WhatsApp</li>
            </ul>
            <p className="mt-4 mb-3"><strong>4.2 Validation :</strong></p>
            <p>
              Toute commande vaut acceptation des prix et descriptions des produits. Healthy Dakar se réserve le droit de refuser 
              toute commande pour motif légitime (rupture de stock, zone non desservie, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">5. Prix</h2>
            <p className="mb-3">Les prix sont indiqués en FCFA (Franc CFA) et incluent :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Le prix du produit</li>
              <li>La TVA si applicable</li>
              <li>Les frais de livraison selon la zone (voir tarifs de livraison)</li>
            </ul>
            <p className="mt-4">
              Les prix peuvent être modifiés à tout moment. Le prix applicable est celui indiqué au moment de la commande.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">6. Paiement</h2>
            <p className="mb-3">Les modes de paiement acceptés sont :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Wave :</strong> paiement mobile via l'application Wave</li>
              <li><strong>Orange Money :</strong> paiement mobile via Orange Money</li>
              <li><strong>Espèces :</strong> paiement à la livraison (cash)</li>
            </ul>
            <p className="mt-4">
              Le paiement est effectué au moment de la commande (en ligne) ou à la livraison (espèces uniquement). 
              En cas de paiement à la livraison, le client doit avoir la somme exacte ou proche.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">7. Livraison</h2>
            <p className="mb-3"><strong>7.1 Zones et délais :</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Livraison dans toute la zone de Dakar</li>
              <li>Délai moyen : 45 minutes à 1h30 selon la zone</li>
              <li>Horaires : 6h00 - 23h00, 7j/7</li>
              <li>Frais de livraison variables selon la zone (voir tarifs)</li>
            </ul>
            <p className="mt-4 mb-3"><strong>7.2 Conditions de livraison :</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Le client doit être présent à l'adresse indiquée</li>
              <li>En cas d'absence, la commande peut être reportée (frais supplémentaires possibles)</li>
              <li>Healthy Dakar n'est pas responsable des retards dus à des circonstances indépendantes de sa volonté</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">8. Droit de Rétractation</h2>
            <p>
              Conformément à la législation sénégalaise, le client dispose d'un droit de rétractation de 7 jours à compter de la réception 
              de la commande. Cependant, ce droit ne s'applique pas aux produits alimentaires périssables (repas préparés) qui ne peuvent 
              être retournés pour des raisons d'hygiène et de sécurité alimentaire.
            </p>
            <p className="mt-4">
              Pour les abonnements, le client peut annuler son abonnement à tout moment. Les repas déjà préparés et livrés ne sont pas remboursables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">9. Réclamations et Service Client</h2>
            <p className="mb-3">Pour toute réclamation :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Email :</strong> <a href="mailto:contact@healthy.sn" className="text-[#1a472a] font-semibold hover:underline">contact@healthy.sn</a></li>
              <li><strong>Téléphone :</strong> <a href="tel:+221785987143" className="text-[#1a472a] font-semibold hover:underline">+221 78 598 71 43</a></li>
              <li><strong>WhatsApp :</strong> +221 78 598 71 43</li>
            </ul>
            <p className="mt-4">
              Toute réclamation doit être formulée dans les 24 heures suivant la livraison. Nous nous engageons à répondre dans les meilleurs délais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">10. Responsabilité</h2>
            <p>
              Healthy Dakar s'engage à fournir des produits de qualité, frais et conformes aux descriptions. En cas de non-conformité, 
              nous nous réservons le droit de remplacer le produit ou de rembourser le client.
            </p>
            <p className="mt-4">
              Healthy Dakar ne saurait être tenu responsable des dommages indirects résultant de l'utilisation de nos produits ou services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">11. Propriété Intellectuelle</h2>
            <p>
              Tous les éléments du site healthy.sn (textes, images, logos, design) sont la propriété exclusive de Healthy Dakar et sont 
              protégés par les lois sur la propriété intellectuelle. Toute reproduction est interdite sans autorisation préalable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">12. Données Personnelles</h2>
            <p>
              Les données personnelles collectées sont traitées conformément à notre <a href="/legal/confidentialite" className="text-[#1a472a] font-semibold hover:underline">Politique de Confidentialité</a>. 
              En passant commande, le client accepte le traitement de ses données personnelles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">13. Droit Applicable et Juridiction</h2>
            <p>
              Les présentes CGV sont régies par le droit sénégalais. En cas de litige, les parties s'engagent à rechercher une solution 
              amiable. À défaut, les tribunaux de Dakar sont seuls compétents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#1a472a] mb-4">14. Modifications</h2>
            <p>
              Healthy Dakar se réserve le droit de modifier les présentes CGV à tout moment. Les modifications sont applicables aux 
              commandes passées après leur publication. Il est conseillé de consulter régulièrement cette page.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
