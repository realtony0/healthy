import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// ============================================
// DA: PREMIUM TECH-FOOD INFOGRAPHIC (Master)
// ============================================
// Format: 1080x1920 (Instagram / Snapchat / TikTok)
// Style: Balanced Visuals + High Info Density
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
    backgroundColor: 'rgba(13, 40, 24, 0.7)',
    backdropFilter: 'blur(12px)',
    borderRadius: 30,
    padding: 25,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
    ...style
  }}>
    {children}
  </div>
);

const SectionHeader: React.FC<{ title: string; subtitle: string; color?: string }> = ({ title, subtitle, color = COLORS.secondary }) => (
  <div style={{ marginBottom: 15 }}>
    <div style={{ fontSize: 12, fontWeight: 900, color, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>{subtitle}</div>
    <div style={{ fontSize: 28, fontWeight: 900, color: 'white', lineHeight: 1 }}>{title}</div>
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
      {/* 1. BRAND HEADER */}
      <div style={{ padding: '60px 60px 20px', background: `linear-gradient(to bottom, ${COLORS.primary} 0%, transparent 100%)` }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.secondary, letterSpacing: '0.4em' }}>HEALTHY DAKAR</div>
        <div style={{ fontSize: 60, fontWeight: 950, lineHeight: 0.9, letterSpacing: '-0.04em', marginTop: 10 }}>VOTRE ALLIÉ<br />NUTRITION.</div>
      </div>

      <div style={{ padding: '0 40px 40px', display: 'flex', flexDirection: 'column', gap: 25 }}>
        
        {/* 2. CRÉE TON BOWL - The Hero Logic */}
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1.2 }}>
            <GlassBox style={{ height: '100%' }}>
              <SectionHeader subtitle="Innovation" title="CRÉE TON BOWL" />
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 20 }}>
                Composez votre repas sur le site. Les <b>Kcal & Protéines</b> s'ajustent en temps réel à chaque ingrédient.
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ backgroundColor: COLORS.secondary, color: COLORS.primary, padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 900 }}>LIVE MACROS</div>
                <div style={{ border: `1px solid ${COLORS.secondary}`, color: COLORS.secondary, padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 900 }}>100% CUSTOM</div>
              </div>
            </GlassBox>
          </div>
          <div style={{ flex: 1, borderRadius: 30, overflow: 'hidden', border: '3px solid rgba(255,255,255,0.1)' }}>
            <Img src={staticFile('img/bowl-poulet-mais.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* 3. ABONNEMENTS - Routine */}
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1, borderRadius: 30, overflow: 'hidden', border: '3px solid rgba(255,255,255,0.1)' }}>
            <Img src={staticFile('img/boeuf-puree-patate-douce.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1.2 }}>
            <GlassBox style={{ height: '100%', backgroundColor: COLORS.primary }}>
              <SectionHeader subtitle="Discipline" title="ABONNEMENTS" color={COLORS.secondary} />
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: 15 }}>
                Planifiez votre semaine. Recevez vos repas automatiquement à domicile ou au bureau.
              </div>
              <div style={{ fontSize: 14, fontWeight: 900, color: COLORS.secondary }}>✓ ÉCONOMISEZ -20%</div>
            </GlassBox>
          </div>
        </div>

        {/* 4. ENERGY & BOOST - Shots & Snacks */}
        <div style={{ display: 'flex', gap: 20 }}>
          <GlassBox style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 20, backgroundColor: COLORS.accent, color: COLORS.dark }}>
            <div style={{ width: 90, height: 90, borderRadius: 20, overflow: 'hidden', flexShrink: 0 }}>
              <Img src={staticFile('img/shot-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900 }}>SHOTS DÉTOX</div>
              <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.8 }}>Immunité & Énergie.</div>
            </div>
          </GlassBox>
          <GlassBox style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 20, backgroundColor: 'white', color: COLORS.primary }}>
            <div style={{ width: 90, height: 90, borderRadius: 20, overflow: 'hidden', flexShrink: 0 }}>
              <Img src={staticFile('img/energy-balls-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 900 }}>SNACKS FIT</div>
              <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.6 }}>Energy Balls.</div>
            </div>
          </GlassBox>
        </div>

        {/* 5. SITE INFO - How it works */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
          {[
            { label: 'ZONES', text: 'Tout Dakar', icon: '📍' },
            { label: 'HORAIRES', text: '6h - 23h', icon: '⏰' },
            { label: 'PAIEMENT', text: 'Wave/OM/Cash', icon: '💳' },
            { label: 'LIVRAISON', text: 'Express', icon: '🚀' },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '15px 20px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 20, marginBottom: 5 }}>{item.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 900, color: COLORS.secondary, letterSpacing: '0.1em' }}>{item.label}</div>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. CTA FOOTER - The Action */}
      <div style={{ 
        marginTop: 'auto', 
        backgroundColor: COLORS.white, 
        padding: '50px 60px 80px', 
        borderTopLeftRadius: 60, 
        borderTopRightRadius: 60, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 35 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ 
              fontSize: 52, 
              fontWeight: 950, 
              color: COLORS.primary,
              backgroundColor: COLORS.cream,
              padding: '12px 40px',
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
          <div style={{ fontSize: 18, color: COLORS.primary, fontWeight: 800, letterSpacing: '0.1em', marginTop: 25 }}>COMMANDEZ VOTRE SANTÉ EN LIGNE</div>
        </div>
        
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          <QRCode size={180} color={COLORS.primary} />
          <div style={{ textAlign: 'left', color: COLORS.primary }}>
            <div style={{ fontSize: 24, fontWeight: 950 }}>📞 78 598 71 43</div>
            <div style={{ fontSize: 14, fontWeight: 700, opacity: 0.7, marginTop: 5 }}>Cuisiné le matin • 100% Halal</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.secondary, marginTop: 10 }}>Suivez-nous @healthy.sn</div>
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
