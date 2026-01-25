import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// ============================================
// DA: ORGANIC PREMIUM LUXURY (ULTIMATE v3)
// ============================================
// Format: 1080x1920 (Instagram / Snapchat / TikTok)
// Style: High-Density Info, Multi-Photo, Pro QR
// ============================================

const COLORS = {
  primary: '#1a472a',   // Elegant Forest Green
  secondary: '#10b981', // Fresh Mint
  accent: '#d4a574',    // Muted Gold
  text: '#1f2937',      // Deep Slate
  bg: '#fffdfa',        // Warm Cream
  white: '#ffffff',
};

const SectionTitle: React.FC<{ title: string; number: string }> = ({ title, number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
    <div style={{ 
      fontSize: 12, 
      fontWeight: 900, 
      color: COLORS.accent, 
      border: `1px solid ${COLORS.accent}`,
      width: 24,
      height: 24,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {number}
    </div>
    <div style={{ fontSize: 20, fontWeight: 900, color: COLORS.primary, letterSpacing: '-0.02em' }}>
      {title}
    </div>
  </div>
);

// QR Code SVG validé pour healthy.sn
const QRCode: React.FC<{ size?: number; color?: string }> = ({ size = 180, color = COLORS.primary }) => (
  <div style={{
    width: size,
    height: size,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
    border: `1px solid #f1f5f9`
  }}>
    <svg width={size - 30} height={size - 30} viewBox="0 0 29 29" fill="none">
      <path d="M0 0h7v7H0V0zm1 1v5h5V1H1zm10 0h1v1h-1V1zm2 0h1v1h-1V1zm2 0h1v1h-1V1zm2 0h1v1h-1V1zm2 0h7v7h-7V0zm1 1v5h5V1h-5zM2 2h3v3H2V2zm20 0h3v3h-3V2zM8 3h1v1H8V3zm2 0h1v1h-1V3zm2 0h1v1h-1V3zm2 0h1v1h-1V3zm2 0h1v1h-1V3zm0 2h1v1h-1V5zm2 0h1v1h-1V5zm0 2h1v1h-1V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM0 11h1v1H0v-1zm2 0h1v1H2v-1zm2 0h1v1H4v-1zm4 0h1v1H8v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm4 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zM1 12h1v1H1v-1zm2 0h1v1H2v-1zm4 0h1v1H7v-1zm2 0h1v1H9v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zM0 22h7v7H0v-7zm1 1v5h5v-5H1zm21-11h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zM2 24h3v3H2v-3z" fill={color}/>
    </svg>
  </div>
);

const MouseCursor: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    style={{ 
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
      transform: 'rotate(-15deg)'
    }}
  >
    <path 
      d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" 
      fill="white" 
      stroke={COLORS.primary} 
      strokeWidth="2" 
    />
  </svg>
);

export const FlyerSocial: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, color: COLORS.text, fontFamily: 'system-ui, sans-serif' }}>
      {/* 1. HERO SECTION - MULTI PHOTO GRID */}
      <div style={{ height: '40%', position: 'relative', display: 'flex', gap: 10, padding: 10 }}>
        <div style={{ flex: 1.5, position: 'relative', borderRadius: 30, overflow: 'hidden' }}>
          <Img src={staticFile('img/bowl-poulet-mais.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
          <div style={{ position: 'absolute', top: 40, left: 30 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.secondary, letterSpacing: '0.4em' }}>HEALTHY DAKAR</div>
            <div style={{ fontSize: 50, fontWeight: 950, color: 'white', lineHeight: 0.9, marginTop: 10 }}>L'ART DE BIEN MANGER.</div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ flex: 1, borderRadius: 25, overflow: 'hidden' }}>
            <Img src={staticFile('img/boeuf-puree-patate-douce.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1, borderRadius: 25, overflow: 'hidden' }}>
            <Img src={staticFile('img/poisson-blanc-herbes.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '10px 40px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* 2. CONCEPTS WITH DETAILED TEXT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          
          {/* Concept 1: Bowl Builder */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', backgroundColor: 'white', padding: '15px 20px', borderRadius: 25, boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <div style={{ flex: 1 }}>
              <SectionTitle number="1" title="CRÉE TON BOWL" />
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.4 }}>
                <b>Personnalisation totale.</b> Choisissez votre base, vos protéines et vos légumes. Le site calcule vos <b>Kcal, Protéines, Glucides et Lipides</b> en temps réel pour un contrôle total de votre nutrition.
              </div>
            </div>
            <div style={{ width: 100, height: 100, borderRadius: 20, overflow: 'hidden', border: '2px solid #f1f5f9' }}>
              <Img src={staticFile('img/poulet-signature.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Concept 2: Abonnements */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', backgroundColor: COLORS.primary, padding: '15px 20px', borderRadius: 25, color: 'white' }}>
            <div style={{ width: 100, height: 100, borderRadius: 20, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)' }}>
              <Img src={staticFile('img/poisson-blanc-herbes.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: COLORS.secondary, marginBottom: 5 }}>2. ABONNEMENTS</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>
                <b>Discipline & Gain de temps.</b> Planifiez vos repas de la semaine (Lundi au Dimanche). Livraison automatique à domicile ou au bureau. <b>Économisez 20%</b> sur tout votre programme.
              </div>
            </div>
          </div>

          {/* Concept 3: Energy & Shots */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', backgroundColor: 'white', padding: '15px 20px', borderRadius: 25, boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <div style={{ flex: 1 }}>
              <SectionTitle number="3" title="ENERGY & SHOTS" />
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.4 }}>
                <b>Boostez votre performance.</b> Shots détox pressés à froid, Energy Balls protéinées et Smoothies frais. Idéal pour vos collations saines ou après votre séance de sport.
              </div>
            </div>
            <div style={{ width: 120, height: 120, borderRadius: 20, overflow: 'hidden', border: '2px solid #f1f5f9', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
              <Img src={staticFile('img/shot-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
            </div>
          </div>
        </div>

        {/* 3. EXTRA PHOTOS ROW */}
        <div style={{ display: 'flex', gap: 10, height: 100 }}>
          <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
            <Img src={staticFile('img/energy-balls-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
          </div>
          <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden' }}>
            <Img src={staticFile('img/smoothie-proteine.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden' }}>
            <Img src={staticFile('img/overnight-oats.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          </div>
          <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
            <Img src={staticFile('img/shot-detox.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
          </div>
          <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden' }}>
            <Img src={staticFile('img/salade-concombre-poulet.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          </div>
        </div>

        {/* 4. LOGISTICS TEXT */}
        <div style={{ backgroundColor: 'rgba(26, 71, 42, 0.05)', padding: '15px 20px', borderRadius: 20, border: '1px dashed #1a472a' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: COLORS.primary, textAlign: 'center', lineHeight: 1.5 }}>
            📍 Livraison partout à Dakar • ⏰ 6h00 - 23h00 • 💳 Wave, Orange Money & Cash
          </div>
        </div>
      </div>

      {/* 5. FOOTER - THE CONVERSION */}
      <div style={{ 
        marginTop: 'auto', 
        backgroundColor: COLORS.primary, 
        padding: '40px 40px 60px', 
        borderTopLeftRadius: 50, 
        borderTopRightRadius: 50, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 30 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ 
              fontSize: 48, 
              fontWeight: 950, 
              color: COLORS.primary,
              backgroundColor: COLORS.white,
              padding: '12px 40px',
              borderRadius: '20px',
              boxShadow: `0 15px 30px rgba(0,0,0,0.2)`,
              letterSpacing: '-0.02em'
            }}>
              www.healthy.sn
            </div>
            <div style={{ position: 'absolute', bottom: -15, right: -15 }}>
              <MouseCursor size={40} />
            </div>
          </div>
          <div style={{ fontSize: 16, color: COLORS.secondary, fontWeight: 800, letterSpacing: '0.1em', marginTop: 25 }}>COMMANDEZ VOTRE SANTÉ EN LIGNE</div>
        </div>
        
        <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
          <QRCode size={160} color={COLORS.primary} />
          <div style={{ textAlign: 'left', color: 'white' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.secondary }}>78 598 71 43</div>
            <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.8, marginTop: 5 }}>Cuisiné frais chaque matin</div>
            <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.8 }}>100% Halal Certifié</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: COLORS.accent, marginTop: 10 }}>#HEALTHYDAKAR</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Default exports
export const Flyer1_Brand = FlyerSocial;
export const Flyer2_Menu = FlyerSocial;
export const Flyer3_Benefits = FlyerSocial;
export const Flyer4_Subscriptions = FlyerSocial;
export const Flyer5_HowItWorks = FlyerSocial;
