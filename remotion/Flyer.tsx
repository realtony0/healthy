import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// ============================================
// DA: EDITORIAL FOOD MAGAZINE (Premium Visual)
// ============================================
// Format: 1080x1920 (Instagram / Snapchat / TikTok)
// Style: Image-Led, Luxury, Data-Infused
// ============================================

const COLORS = {
  primary: '#0d2818',   // Forest Deep
  secondary: '#00ff87', // Neon Mint
  accent: '#ffbe0b',    // Golden Yellow
  dark: '#050505',
  light: '#f8fafc',
  white: '#ffffff',
  cream: '#fffdfa',
};

const GlassBox: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{
    backgroundColor: 'rgba(13, 40, 24, 0.85)',
    backdropFilter: 'blur(15px)',
    borderRadius: 35,
    padding: 30,
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    ...style
  }}>
    {children}
  </div>
);

const SectionLabel: React.FC<{ text: string; color?: string }> = ({ text, color = COLORS.secondary }) => (
  <div style={{
    fontSize: 14,
    fontWeight: 900,
    color,
    letterSpacing: '0.2em',
    marginBottom: 8,
    textTransform: 'uppercase',
  }}>
    {text}
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
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
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
      <rect fill={color} x="5" y="55" width="8" height="8" /><rect fill={color} x="25" y="55" width="8" height="8" />
      <rect fill={color} x="40" y="40" width="8" height="8" /><rect fill={color} x="52" y="40" width="8" height="8" />
      <rect fill={color} x="45" y="52" width="8" height="8" />
      <rect fill={color} x="70" y="40" width="8" height="8" /><rect fill={color} x="85" y="40" width="8" height="8" />
      <rect fill={color} x="70" y="55" width="8" height="8" /><rect fill={color} x="80" y="52" width="8" height="8" />
      <rect fill={color} x="40" y="70" width="8" height="8" /><rect fill={color} x="55" y="70" width="8" height="8" />
      <rect fill={color} x="45" y="85" width="8" height="8" />
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
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
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
    <AbsoluteFill style={{ backgroundColor: COLORS.dark, color: 'white' }}>
      {/* 1. HERO IMAGE (Main visual) */}
      <div style={{ height: '55%', position: 'relative', overflow: 'hidden' }}>
        <Img 
          src={staticFile('img/bowl-poulet-mais.jpeg')} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 20%, rgba(5,5,5,1) 95%)'
        }} />
        
        {/* Brand Overlay */}
        <div style={{ position: 'absolute', top: 80, left: 60 }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.secondary, letterSpacing: '0.4em' }}>HEALTHY DAKAR</div>
          <div style={{ fontSize: 90, fontWeight: 950, lineHeight: 0.85, letterSpacing: '-0.05em', marginTop: 10 }}>BIEN MANGER,<br />SANS EFFORT.</div>
        </div>

        {/* Floating Macro Data */}
        <div style={{ position: 'absolute', bottom: 100, right: 60, textAlign: 'right' }}>
          <GlassBox style={{ padding: '15px 25px', borderRadius: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.secondary }}>MACROS CALCULÉS</div>
            <div style={{ fontSize: 32, fontWeight: 900 }}>450 kcal • 35g Prot.</div>
          </GlassBox>
        </div>
      </div>

      {/* 2. GRID CONTENT (Builder & Subs) */}
      <div style={{ flex: 1, padding: '0 50px 50px', marginTop: -40, display: 'flex', flexDirection: 'column', gap: 25 }}>
        
        {/* Row 1: Builder & Subs */}
        <div style={{ display: 'flex', gap: 20 }}>
          {/* Bowl Builder */}
          <GlassBox style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 15, position: 'relative', overflow: 'hidden' }}>
            <SectionLabel text="Crée ton Bowl" />
            <div style={{ fontSize: 24, fontWeight: 900 }}>LE CHEF,<br />C'EST TOI.</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>Compose, le site calcule tes macros en direct.</div>
            <div style={{ height: 100, borderRadius: 20, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
              <Img src={staticFile('img/boeuf-puree-patate-douce.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </GlassBox>

          {/* Abonnements */}
          <GlassBox style={{ flex: 1, backgroundColor: COLORS.primary, border: `2px solid ${COLORS.secondary}40` }}>
            <SectionLabel text="Abonnements" color={COLORS.secondary} />
            <div style={{ fontSize: 24, fontWeight: 900 }}>DISCIPLINE<br />ZEN.</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, marginBottom: 15 }}>Reçois tes repas chaque jour automatiquement.</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.secondary }}>✓ -20% RÉDUCTION</div>
          </GlassBox>
        </div>

        {/* Row 2: Energy & Snacks */}
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1.5, backgroundColor: COLORS.accent, borderRadius: 35, padding: 25, color: COLORS.dark, display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ width: 100, height: 100, borderRadius: 20, overflow: 'hidden', flexShrink: 0 }}>
              <Img src={staticFile('img/shot-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900 }}>SHOTS DÉTOX</div>
              <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.8 }}>Boost naturel & vitalité au quotidien.</div>
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: COLORS.white, borderRadius: 35, padding: 25, color: COLORS.primary, textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 900 }}>ENERGY BALLS</div>
            <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', margin: '10px auto' }}>
              <Img src={staticFile('img/energy-balls-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.6 }}>LE SNACK FIT</div>
          </div>
        </div>

        {/* Values Footer Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: 30 }}>
          {['100% FRAIS', '100% HALAL', 'LIVRAISON EXPRESS'].map(v => (
            <div key={v} style={{ fontSize: 13, fontWeight: 900, color: COLORS.secondary }}>{v}</div>
          ))}
        </div>
      </div>

      {/* 3. CTA FOOTER */}
      <div style={{ 
        marginTop: 'auto', 
        backgroundColor: COLORS.white, 
        padding: '50px 60px 80px', 
        borderTopLeftRadius: 70, 
        borderTopRightRadius: 70, 
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
              backgroundColor: COLORS.cream,
              padding: '15px 45px',
              borderRadius: '25px',
              border: `3px solid ${COLORS.primary}`,
              boxShadow: `0 10px 30px rgba(0,0,0,0.1)`,
              letterSpacing: '-0.02em'
            }}>
              www.healthy.sn
            </div>
            <div style={{ position: 'absolute', bottom: -20, right: -15 }}>
              <MouseCursor size={40} />
            </div>
          </div>
          <div style={{ fontSize: 20, color: COLORS.primary, fontWeight: 800, letterSpacing: '0.1em', marginTop: 30 }}>TA SANTÉ EN UN CLIC</div>
        </div>
        
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          <QRCode size={180} color={COLORS.primary} />
          <div style={{ textAlign: 'left', color: COLORS.primary }}>
            <div style={{ fontSize: 24, fontWeight: 950 }}>📞 78 598 71 43</div>
            <div style={{ fontSize: 16, fontWeight: 700, opacity: 0.7, marginTop: 5 }}>Livraison Dakar • 6h - 23h</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.secondary, marginTop: 10 }}>@healthy.sn</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Default exports for compatibility
export const Flyer1_Brand = FlyerSocial;
export const Flyer2_Menu = FlyerSocial;
export const Flyer3_Benefits = FlyerSocial;
export const Flyer4_Subscriptions = FlyerSocial;
export const Flyer5_HowItWorks = FlyerSocial;
