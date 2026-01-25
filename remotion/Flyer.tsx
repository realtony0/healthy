import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// ============================================
// DA: ORGANIC PREMIUM LUXURY (THE MASTER v2)
// ============================================
// Format: 1080x1920 (Instagram / Snapchat / TikTok)
// Style: Image-Rich, Fresh, Minimalist, High-End
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
      {/* QR Code for healthy.sn (updated pattern) */}
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
      {/* 1. HERO SECTION - MULTI PHOTO GRID */}
      <div style={{ height: '45%', position: 'relative', display: 'flex', gap: 10, padding: 10 }}>
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

      <div style={{ flex: 1, padding: '20px 40px 40px', display: 'flex', flexDirection: 'column', gap: 25 }}>
        
        {/* 2. CONCEPTS WITH MORE PHOTOS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Concept 1: Bowl Builder */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', backgroundColor: 'white', padding: 20, borderRadius: 30, boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <div style={{ flex: 1 }}>
              <SectionTitle number="1" title="CRÉE TON BOWL" />
              <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>
                <b>Le chef, c'est vous.</b> Composez sur le site, les <b>Kcal & Macros</b> se calculent en direct.
              </div>
            </div>
            <div style={{ width: 120, height: 120, borderRadius: 20, overflow: 'hidden', border: '3px solid #f1f5f9' }}>
              <Img src={staticFile('img/poulet-signature.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Concept 2: Abonnements */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', backgroundColor: COLORS.primary, padding: 20, borderRadius: 30, color: 'white' }}>
            <div style={{ width: 120, height: 120, borderRadius: 20, overflow: 'hidden', border: '3px solid rgba(255,255,255,0.2)' }}>
              <Img src={staticFile('img/poisson-blanc-herbes.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: COLORS.secondary, marginBottom: 8 }}>2. ABONNEMENTS</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                Planifiez votre semaine. Livraison automatique. <b>Économisez 20%</b> sur vos repas.
              </div>
            </div>
          </div>

          {/* Concept 3: Energy & Shots */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', backgroundColor: 'white', padding: 20, borderRadius: 30, boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <div style={{ flex: 1 }}>
              <SectionTitle number="3" title="ENERGY & SHOTS" />
              <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>
                <b>Boost vitalité.</b> Shots détox, Energy Balls et Smoothies pour une performance maximale.
              </div>
            </div>
            <div style={{ width: 120, height: 120, borderRadius: 20, overflow: 'hidden', border: '3px solid #f1f5f9' }}>
              <Img src={staticFile('img/shot-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* 3. EXTRA PHOTOS ROW */}
        <div style={{ display: 'flex', gap: 15, height: 100 }}>
          <div style={{ flex: 1, borderRadius: 15, overflow: 'hidden' }}><Img src={staticFile('img/energy-balls-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          <div style={{ flex: 1, borderRadius: 15, overflow: 'hidden' }}><Img src={staticFile('img/smoothie-proteine.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          <div style={{ flex: 1, borderRadius: 15, overflow: 'hidden' }}><Img src={staticFile('img/overnight-oats.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
          <div style={{ flex: 1, borderRadius: 15, overflow: 'hidden' }}><Img src={staticFile('img/shot-detox.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
        </div>
      </div>

      {/* 4. FOOTER - THE CONVERSION */}
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
          <div style={{ fontSize: 16, color: COLORS.secondary, fontWeight: 800, letterSpacing: '0.1em', marginTop: 25 }}>VOTRE PARTENAIRE SANTÉ À DAKAR</div>
        </div>
        
        <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
          <QRCode size={160} color={COLORS.primary} />
          <div style={{ textAlign: 'left', color: 'white' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.secondary }}>78 598 71 43</div>
            <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.8, marginTop: 5 }}>Livraison Express • Dakar</div>
            <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.8 }}>100% Halal Certifié</div>
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
