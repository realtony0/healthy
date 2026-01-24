import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// ============================================
// DIRECTION ARTISTIQUE: PREMIUM FOOD MARKETING
// ============================================
// Inspiration: Deliveroo, UberEats, HelloFresh, Apple
// Style: Clean, Bold, Informative, Trust-building
// ============================================

const COLORS = {
  primary: '#1a472a',
  secondary: '#10b981',
  accent: '#f59e0b',
  dark: '#0f172a',
  light: '#f8fafc',
  cream: '#fffbf5',
};

// QR Code component
const QRCode: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <div
    style={{
      width: size,
      height: size,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width={size - 16} height={size - 16} viewBox="0 0 100 100">
      <rect fill={COLORS.primary} x="5" y="5" width="25" height="25" rx="3" />
      <rect fill="white" x="10" y="10" width="15" height="15" rx="2" />
      <rect fill={COLORS.primary} x="13" y="13" width="9" height="9" />
      
      <rect fill={COLORS.primary} x="70" y="5" width="25" height="25" rx="3" />
      <rect fill="white" x="75" y="10" width="15" height="15" rx="2" />
      <rect fill={COLORS.primary} x="78" y="13" width="9" height="9" />
      
      <rect fill={COLORS.primary} x="5" y="70" width="25" height="25" rx="3" />
      <rect fill="white" x="10" y="75" width="15" height="15" rx="2" />
      <rect fill={COLORS.primary} x="13" y="78" width="9" height="9" />
      
      <rect fill={COLORS.primary} x="35" y="5" width="8" height="8" />
      <rect fill={COLORS.primary} x="50" y="5" width="8" height="8" />
      <rect fill={COLORS.primary} x="35" y="20" width="8" height="8" />
      <rect fill={COLORS.primary} x="55" y="20" width="8" height="8" />
      
      <rect fill={COLORS.primary} x="5" y="40" width="8" height="8" />
      <rect fill={COLORS.primary} x="20" y="40" width="8" height="8" />
      <rect fill={COLORS.primary} x="5" y="55" width="8" height="8" />
      <rect fill={COLORS.primary} x="25" y="55" width="8" height="8" />
      
      <rect fill={COLORS.primary} x="40" y="40" width="8" height="8" />
      <rect fill={COLORS.primary} x="52" y="40" width="8" height="8" />
      <rect fill={COLORS.primary} x="45" y="52" width="8" height="8" />
      
      <rect fill={COLORS.primary} x="70" y="40" width="8" height="8" />
      <rect fill={COLORS.primary} x="85" y="40" width="8" height="8" />
      <rect fill={COLORS.primary} x="70" y="55" width="8" height="8" />
      <rect fill={COLORS.primary} x="80" y="52" width="8" height="8" />
      
      <rect fill={COLORS.primary} x="40" y="70" width="8" height="8" />
      <rect fill={COLORS.primary} x="55" y="70" width="8" height="8" />
      <rect fill={COLORS.primary} x="45" y="85" width="8" height="8" />
      
      <rect fill={COLORS.primary} x="70" y="70" width="8" height="8" />
      <rect fill={COLORS.primary} x="85" y="70" width="8" height="8" />
      <rect fill={COLORS.primary} x="75" y="85" width="8" height="8" />
      <rect fill={COLORS.primary} x="90" y="85" width="8" height="8" />
    </svg>
  </div>
);

// ============================================
// FLYER 1: BRAND STORY - Who We Are
// ============================================
export const Flyer1_Brand: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.cream }}>
      {/* Left Panel - Dark */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '45%',
          backgroundColor: COLORS.primary,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 60,
        }}
      >
        <div>
          <div style={{ fontSize: 64, fontWeight: 900, color: 'white', marginBottom: 20 }}>
            HEALTHY
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.secondary, letterSpacing: '0.3em' }}>
            DAKAR • SÉNÉGAL
          </div>
        </div>

        <div>
          <div style={{ fontSize: 48, fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: 30 }}>
            La nutrition
            <br />
            <span style={{ color: COLORS.secondary }}>réinventée</span>
            <br />
            pour Dakar
          </div>
          
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, marginBottom: 40 }}>
            Nous cuisinons chaque matin des repas
            <br />
            équilibrés, savoureux et 100% halal,
            <br />
            livrés directement chez vous.
          </div>

          <div style={{ display: 'flex', gap: 20 }}>
            <QRCode size={100} />
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, color: 'white' }}>healthy.sn</div>
              <div style={{ fontSize: 14, color: COLORS.secondary }}>Scannez pour commander</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Content */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '55%',
          padding: 60,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.primary, letterSpacing: '0.2em', marginBottom: 40 }}>
          POURQUOI HEALTHY ?
        </div>

        {[
          { num: '01', title: 'Fraîcheur Garantie', desc: 'Tous nos plats sont préparés le matin même avec des ingrédients frais et de qualité.' },
          { num: '02', title: '100% Halal Certifié', desc: 'Nous respectons strictement les normes halal. Aucun compromis sur vos valeurs.' },
          { num: '03', title: 'Nutrition Optimisée', desc: 'Chaque repas est calculé pour apporter le bon équilibre en protéines, glucides et lipides.' },
          { num: '04', title: 'Livraison Express', desc: 'Recevez vos repas partout à Dakar, de 6h à 23h, 7 jours sur 7.' },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 35, display: 'flex', gap: 20 }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.secondary, opacity: 0.3, lineHeight: 1 }}>
              {item.num}
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.dark, marginBottom: 8 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6 }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}

        {/* Stats */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: 40, paddingTop: 30, borderTop: '2px solid #e2e8f0' }}>
          {[
            { value: '80+', label: 'Clients satisfaits' },
            { value: '6h-23h', label: 'Disponibilité' },
            { value: '100%', label: 'Halal certifié' },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: 36, fontWeight: 900, color: COLORS.primary }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// FLYER 2: MENU SHOWCASE - Our Dishes
// ============================================
export const Flyer2_Menu: React.FC = () => {
  const dishes = [
    { name: 'Bowl Poulet Signature', price: '3 500', kcal: '450', img: 'img/bowl-poulet-mais.jpeg' },
    { name: 'Bœuf & Patate Douce', price: '4 200', kcal: '520', img: 'img/boeuf-puree-patate-douce.jpeg' },
    { name: 'Poisson aux Herbes', price: '3 900', kcal: '380', img: 'img/poisson-blanc-herbes.jpeg' },
    { name: 'Poulet Grillé Légumes', price: '3 500', kcal: '420', img: 'img/poulet-grille-legumes.jpeg' },
  ];

  const snacks = [
    { name: 'Energy Balls Mix', price: '2 500', img: 'img/energy-balls-mix.jpeg' },
    { name: 'Smoothie Protéiné', price: '2 000', img: 'img/smoothie-proteine.jpeg' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      {/* Header */}
      <div style={{ padding: '50px 60px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 48, fontWeight: 900, color: 'white' }}>NOTRE MENU</div>
          <div style={{ fontSize: 18, color: COLORS.secondary, fontWeight: 600 }}>Des plats préparés avec passion, livrés avec soin</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: 'white' }}>HEALTHY</div>
          <div style={{ fontSize: 14, color: COLORS.secondary, letterSpacing: '0.2em' }}>DAKAR</div>
        </div>
      </div>

      {/* Main Dishes Grid */}
      <div style={{ padding: '20px 60px', display: 'flex', gap: 25 }}>
        {dishes.map((dish, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ height: 180, overflow: 'hidden' }}>
              <Img
                src={staticFile(dish.img)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'white', marginBottom: 8 }}>
                {dish.name}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.secondary }}>
                  {dish.price} F
                </div>
                <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>
                  {dish.kcal} kcal
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Snacks Section */}
      <div style={{ padding: '20px 60px', display: 'flex', gap: 25 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.secondary, letterSpacing: '0.15em', marginBottom: 15 }}>
            SNACKS & ENERGY
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {snacks.map((snack, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 16,
                  padding: 15,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{ width: 70, height: 70, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                  <Img src={staticFile(snack.img)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 4 }}>{snack.name}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: COLORS.secondary }}>{snack.price} F</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Your Bowl */}
        <div
          style={{
            width: 300,
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
            borderRadius: 20,
            padding: 25,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 800, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.15em', marginBottom: 10 }}>
            EXCLUSIF
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: 'white', marginBottom: 10 }}>
            Crée ton Bowl
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
            Composez votre bowl sur mesure avec vos ingrédients préférés
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 'auto',
          padding: '30px 60px',
          backgroundColor: 'rgba(0,0,0,0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          <QRCode size={80} />
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: 'white' }}>healthy.sn</div>
            <div style={{ fontSize: 14, color: '#94a3b8' }}>Commandez en ligne 24h/24</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 40 }}>
          {[
            { icon: '📞', text: '+221 XX XXX XX XX' },
            { icon: '📍', text: 'Livraison Dakar' },
            { icon: '⏰', text: '6h - 23h' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 15, color: 'white', fontWeight: 600 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// FLYER 3: BENEFITS - Why Choose Us
// ============================================
export const Flyer3_Benefits: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {/* Diagonal Split Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${COLORS.primary} 50%, white 50%)`,
        }}
      />

      {/* Content */}
      <AbsoluteFill style={{ padding: 60, display: 'flex' }}>
        {/* Left Side - Dark */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: 60 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.secondary, letterSpacing: '0.2em', marginBottom: 20 }}>
              HEALTHY DAKAR
            </div>
            <div style={{ fontSize: 56, fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 30 }}>
              Mangez sain,
              <br />
              <span style={{ color: COLORS.secondary }}>vivez mieux</span>
            </div>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, maxWidth: 400 }}>
              Plus qu'un service de livraison, Healthy est votre partenaire nutrition au quotidien. Découvrez une nouvelle façon de manger sainement à Dakar.
            </div>
          </div>

          {/* Image */}
          <div style={{ width: 350, height: 350, borderRadius: 30, overflow: 'hidden', border: '4px solid white', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
            <Img
              src={staticFile('img/bowl-poulet-mais.jpeg')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Right Side - Light */}
        <div style={{ flex: 1, paddingLeft: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.primary, letterSpacing: '0.2em', marginBottom: 40 }}>
            NOS ENGAGEMENTS
          </div>

          {[
            { icon: '🥗', title: 'Frais du Jour', desc: 'Cuisinés chaque matin avec des produits locaux de qualité' },
            { icon: '✓', title: '100% Halal', desc: 'Certification stricte, respect total de vos convictions' },
            { icon: '📊', title: 'Nutrition Équilibrée', desc: 'Chaque repas calculé par nos experts en nutrition' },
            { icon: '🚀', title: 'Livraison Rapide', desc: 'Partout à Dakar en moins de 45 minutes' },
            { icon: '💰', title: 'Prix Justes', desc: 'La qualité premium accessible à tous, dès 3 500 F' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: COLORS.cream,
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  flexShrink: 0,
                  border: `2px solid ${COLORS.primary}`,
                }}
              >
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.dark, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}

          {/* CTA */}
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
            <QRCode size={90} />
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.primary }}>Commandez maintenant</div>
              <div style={{ fontSize: 16, color: '#64748b' }}>healthy.sn</div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================
// FLYER 4: SUBSCRIPTIONS - Meal Plans
// ============================================
export const Flyer4_Subscriptions: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.cream }}>
      {/* Header */}
      <div style={{ padding: '50px 60px', textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.secondary, letterSpacing: '0.2em', marginBottom: 15 }}>
          ABONNEMENTS HEALTHY
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, color: COLORS.dark, marginBottom: 15 }}>
          Vos repas de la semaine,
          <br />
          <span style={{ color: COLORS.primary }}>planifiés et livrés</span>
        </div>
        <div style={{ fontSize: 18, color: '#64748b', maxWidth: 600, margin: '0 auto' }}>
          Économisez du temps et de l'argent avec nos formules d'abonnement sur mesure
        </div>
      </div>

      {/* Plans Grid */}
      <div style={{ padding: '0 60px', display: 'flex', gap: 30, justifyContent: 'center' }}>
        {[
          { name: 'Petit-déjeuner', desc: 'Smoothies, overnight oats, energy balls', icon: '🌅', popular: false },
          { name: 'Déjeuner', desc: 'Bowls complets, plats signature', icon: '☀️', popular: false },
          { name: 'Dîner', desc: 'Repas légers et équilibrés', icon: '🌙', popular: false },
          { name: '3 Repas/Jour', desc: 'Formule complète tout inclus', icon: '⭐', popular: true },
        ].map((plan, i) => (
          <div
            key={i}
            style={{
              width: 260,
              backgroundColor: plan.popular ? COLORS.primary : 'white',
              borderRadius: 30,
              padding: 35,
              textAlign: 'center',
              border: plan.popular ? 'none' : '2px solid #e2e8f0',
              boxShadow: plan.popular ? '0 30px 60px rgba(26, 71, 42, 0.3)' : '0 10px 30px rgba(0,0,0,0.05)',
              transform: plan.popular ? 'scale(1.05)' : 'none',
            }}
          >
            {plan.popular && (
              <div
                style={{
                  backgroundColor: COLORS.accent,
                  color: 'white',
                  fontSize: 11,
                  fontWeight: 800,
                  padding: '6px 16px',
                  borderRadius: 20,
                  display: 'inline-block',
                  marginBottom: 20,
                  letterSpacing: '0.1em',
                }}
              >
                POPULAIRE
              </div>
            )}
            <div style={{ fontSize: 48, marginBottom: 15 }}>{plan.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: plan.popular ? 'white' : COLORS.dark, marginBottom: 10 }}>
              {plan.name}
            </div>
            <div style={{ fontSize: 14, color: plan.popular ? 'rgba(255,255,255,0.8)' : '#64748b', lineHeight: 1.6, marginBottom: 20 }}>
              {plan.desc}
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: plan.popular ? COLORS.secondary : COLORS.primary }}>
              Sur mesure →
            </div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div style={{ padding: '40px 60px', display: 'flex', justifyContent: 'center', gap: 60 }}>
        {[
          { icon: '💰', text: 'Économisez jusqu\'à 20%' },
          { icon: '📅', text: 'Planning personnalisé' },
          { icon: '🔄', text: 'Modifiable à tout moment' },
          { icon: '🚫', text: 'Sans engagement' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>{item.icon}</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.dark }}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div
        style={{
          marginTop: 'auto',
          padding: '40px 60px',
          backgroundColor: COLORS.primary,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: 32, fontWeight: 900, color: 'white', marginBottom: 5 }}>
            Commencez votre abonnement
          </div>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>
            Configurez votre programme en quelques clics sur healthy.sn
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <QRCode size={100} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: 'white' }}>healthy.sn</div>
            <div style={{ fontSize: 14, color: COLORS.secondary }}>Scannez pour commencer</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// FLYER 5: HOW IT WORKS - Simple Steps
// ============================================
export const Flyer5_HowItWorks: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.primary }}>
      {/* Header */}
      <div style={{ padding: '50px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 56, fontWeight: 900, color: 'white', marginBottom: 10 }}>
            Commander sur
            <br />
            <span style={{ color: COLORS.secondary }}>Healthy</span>, c'est simple
          </div>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)' }}>
            En 3 étapes, recevez vos repas sains chez vous
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: 'white' }}>HEALTHY</div>
          <div style={{ fontSize: 16, color: COLORS.secondary, letterSpacing: '0.2em' }}>DAKAR</div>
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: '20px 60px', display: 'flex', gap: 40 }}>
        {[
          {
            step: '01',
            title: 'Choisissez',
            desc: 'Parcourez notre menu et sélectionnez vos plats préférés ou créez votre propre bowl personnalisé.',
            icon: '📱',
          },
          {
            step: '02',
            title: 'Commandez',
            desc: 'Validez votre panier, choisissez votre zone de livraison et payez en toute sécurité.',
            icon: '🛒',
          },
          {
            step: '03',
            title: 'Savourez',
            desc: 'Recevez vos repas frais chez vous et profitez d\'une alimentation saine et délicieuse.',
            icon: '🍽️',
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 30,
              padding: 40,
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <div style={{ fontSize: 80, fontWeight: 900, color: COLORS.secondary, opacity: 0.3, marginBottom: 20 }}>
              {item.step}
            </div>
            <div style={{ fontSize: 56, marginBottom: 20 }}>{item.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: 'white', marginBottom: 15 }}>{item.title}</div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Delivery Zones */}
      <div style={{ padding: '30px 60px' }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.secondary, letterSpacing: '0.15em', marginBottom: 20 }}>
          ZONES DE LIVRAISON À DAKAR
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {['Almadies', 'Mermoz', 'Ouakam', 'Plateau', 'Point E', 'Fann', 'Liberté', 'Yoff', 'Parcelles', 'Sacré-Cœur', 'Ngor', 'Médina'].map((zone, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '10px 20px',
                borderRadius: 25,
                fontSize: 14,
                fontWeight: 700,
                color: 'white',
              }}
            >
              {zone}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 'auto',
          padding: '40px 60px',
          backgroundColor: 'rgba(0,0,0,0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 25 }}>
          <QRCode size={100} />
          <div>
            <div style={{ fontSize: 32, fontWeight: 900, color: 'white' }}>healthy.sn</div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>Votre première commande vous attend</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 50 }}>
          {[
            { label: 'Livraison', value: '1000-2000 F' },
            { label: 'Bowls dès', value: '3 500 F' },
            { label: 'Horaires', value: '6h - 23h' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 5 }}>{item.label}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'white' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Export par défaut pour compatibilité
export const Flyer = Flyer1_Brand;
export const FlyerA5 = Flyer1_Brand;
