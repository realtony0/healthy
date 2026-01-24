import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// ============================================
// DA: ORGANIC PREMIUM LUXURY (THE MASTER)
// ============================================
// Format: 1080x1920 (Instagram / Snapchat / TikTok)
// Style: Clean, Fresh, Minimalist, High-End
// Colors: Cream, Forest Green, Soft Gold
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
  <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 15 }}>
    <div style={{ 
      fontSize: 14, 
      fontWeight: 900, 
      color: COLORS.accent, 
      border: `1px solid ${COLORS.accent}`,
      width: 28,
      height: 28,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {number}
    </div>
    <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.primary, letterSpacing: '-0.02em' }}>
      {title}
    </div>
  </div>
);

const InfoBadge: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: 10, 
    backgroundColor: 'white', 
    padding: '12px 20px', 
    borderRadius: 15,
    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
    border: '1px solid #f1f5f9'
  }}>
    <span style={{ fontSize: 20 }}>{icon}</span>
    <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{text}</span>
  </div>
);

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
    <svg width={size - 30} height={size - 30} viewBox="0 0 100 100">
      <rect fill={color} x="5" y="5" width="25" height="25" rx="3" />
      <rect fill="white" x="10" y="10" width="15" height="15" rx="2" />
      <rect fill={color} x="13" y="13" width="9" height="9" />
      <rect fill={color} x="70" y="5" width="25" height="25" rx="3" />
      <rect fill="white" x="75" y="10" width="15" height="15" rx="2" />
      <rect fill={color} x="78" y="13" width="9" height="9" />
      <rect fill={color} x="5" y="70" width="25" height="25" rx="3" />
      <rect fill="white" x="10" y="75" width="15" height="15" rx="2" />
      <rect fill={color} x="13" y="78" width="9" height="9" />
      <rect fill={color} x="35" y="5" width="8" height="8" /><rect fill={color} x="50" y="5" width="8" height="8" />
      <rect fill={color} x="35" y="20" width="8" height="8" /><rect fill={color} x="55" y="20" width="8" height="8" />
      <rect fill={color} x="5" y="40" width="8" height="8" /><rect fill={color} x="20" y="40" width="8" height="8" />
      <rect fill={color} x="40" y="40" width="8" height="8" /><rect fill={color} x="52" y="40" width="8" height="8" />
      <rect fill={color} x="70" y="40" width="8" height="8" /><rect fill={color} x="85" y="40" width="8" height="8" />
      <rect fill={color} x="40" y="70" width="8" height="8" /><rect fill={color} x="55" y="70" width="8" height="8" />
      <rect fill={color} x="70" y="70" width="8" height="8" /><rect fill={color} x="85" y="70" width="8" height="8" />
      <rect fill={color} x="75" y="85" width="8" height="8" /><rect fill={color} x="90" y="85" width="8" height="8" />
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
      {/* 1. HERO SECTION - THE VIBE */}
      <div style={{ height: '40%', position: 'relative', overflow: 'hidden' }}>
        <Img 
          src={staticFile('img/bowl-poulet-mais.jpeg')} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, #fffdfa 95%)'
        }} />
        
        <div style={{ position: 'absolute', top: 80, left: 60, right: 60, textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'white', letterSpacing: '0.5em', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>HEALTHY DAKAR</div>
          <div style={{ fontSize: 80, fontWeight: 950, color: 'white', lineHeight: 0.9, marginTop: 15, textShadow: '0 5px 20px rgba(0,0,0,0.4)' }}>
            L'ART DE BIEN<br />MANGER.
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 60px 40px', marginTop: -40, display: 'flex', flexDirection: 'column', gap: 40, position: 'relative' }}>
        
        {/* 2. CONCEPTS GRID */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 35 }}>
          
          {/* Concept 1: Bowl Builder */}
          <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <SectionTitle number="1" title="CRÉE TON BOWL" />
              <div style={{ fontSize: 16, color: '#64748b', lineHeight: 1.6 }}>
                <b>Le chef, c'est vous.</b> Composez votre repas idéal sur le site. Nos algorithmes calculent vos <b>Kcal & Macros</b> en temps réel.
              </div>
            </div>
            <div style={{ width: 180, height: 180, borderRadius: 35, overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', border: '4px solid white' }}>
              <Img src={staticFile('img/boeuf-puree-patate-douce.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Concept 2: Abonnements */}
          <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
            <div style={{ width: 180, height: 180, borderRadius: 35, overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', border: '4px solid white' }}>
              <Img src={staticFile('img/poisson-blanc-herbes.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <SectionTitle number="2" title="ABONNEMENTS" />
              <div style={{ fontSize: 16, color: '#64748b', lineHeight: 1.6 }}>
                <b>Discipline simplifiée.</b> Planifiez vos repas de la semaine et recevez-les automatiquement. <b>Économisez 20%</b> sur chaque commande.
              </div>
            </div>
          </div>

          {/* Concept 3: Energy & Shots */}
          <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <SectionTitle number="3" title="ENERGY & SHOTS" />
              <div style={{ fontSize: 16, color: '#64748b', lineHeight: 1.6 }}>
                <b>Boostez votre vitalité.</b> Shots détox pressés à froid, Energy Balls et Smoothies protéinés pour une performance maximale.
              </div>
            </div>
            <div style={{ width: 180, height: 180, borderRadius: 35, overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', border: '4px solid white' }}>
              <Img src={staticFile('img/shot-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* 3. SITE INFO BADGES */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
          <InfoBadge icon="🚀" text="Livraison Express" />
          <InfoBadge icon="💳" text="Wave / OM / Cash" />
          <InfoBadge icon="📍" text="Partout à Dakar" />
          <InfoBadge icon="⏰" text="6h00 - 23h00" />
        </div>
      </div>

      {/* 4. FOOTER - THE CONVERSION */}
      <div style={{ 
        marginTop: 'auto', 
        backgroundColor: COLORS.primary, 
        padding: '60px 60px 80px', 
        borderTopLeftRadius: 60, 
        borderTopRightRadius: 60, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 40 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ 
              fontSize: 56, 
              fontWeight: 950, 
              color: COLORS.primary,
              backgroundColor: COLORS.white,
              padding: '15px 45px',
              borderRadius: '25px',
              boxShadow: `0 15px 30px rgba(0,0,0,0.2)`,
              letterSpacing: '-0.02em'
            }}>
              www.healthy.sn
            </div>
            <div style={{ position: 'absolute', bottom: -20, right: -15 }}>
              <MouseCursor size={45} />
            </div>
          </div>
          <div style={{ fontSize: 18, color: COLORS.secondary, fontWeight: 800, letterSpacing: '0.15em', marginTop: 35 }}>VOTRE PARTENAIRE SANTÉ À DAKAR</div>
        </div>
        
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          <QRCode size={180} color={COLORS.primary} />
          <div style={{ textAlign: 'left', color: 'white' }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.secondary }}>78 598 71 43</div>
            <div style={{ fontSize: 16, fontWeight: 600, opacity: 0.8, marginTop: 5 }}>Cuisiné frais chaque matin</div>
            <div style={{ fontSize: 16, fontWeight: 600, opacity: 0.8 }}>100% Halal Certifié</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.accent, marginTop: 15 }}>#HEALTHYDAKAR</div>
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
