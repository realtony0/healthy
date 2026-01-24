import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// ============================================
// DA: THE MASTER INFOGRAPHIC (9:16)
// ============================================
// Style: High-Density, Data-Rich, Ultra-Premium
// Format: 1080x1920 (Instagram / Snapchat / TikTok)
// ============================================

const COLORS = {
  primary: '#0d2818',   // Forest Deep
  secondary: '#00ff87', // Neon Mint
  accent: '#ffbe0b',    // Golden Yellow
  dark: '#050505',
  white: '#ffffff',
  cream: '#fffdfa',
};

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 30,
    padding: 25,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    ...style
  }}>
    {children}
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
      {/* 1. MASTER HEADER */}
      <div style={{ padding: '80px 60px 40px', background: `linear-gradient(to bottom, ${COLORS.primary} 0%, transparent 100%)` }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.secondary, letterSpacing: '0.5em' }}>HEALTHY DAKAR</div>
        <div style={{ fontSize: 90, fontWeight: 950, lineHeight: 0.85, letterSpacing: '-0.05em', marginTop: 15 }}>L'ÉCOSYSTÈME<br /><span style={{ color: COLORS.secondary }}>NUTRITION.</span></div>
        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.6)', marginTop: 30, fontWeight: 600 }}>Tout ce dont votre corps a besoin, réuni sur www.healthy.sn</div>
      </div>

      <div style={{ padding: '0 40px', display: 'flex', flexDirection: 'column', gap: 30 }}>
        
        {/* 2. CONCEPT 1: CRÉE TON BOWL (L'Innovation) */}
        <Card style={{ display: 'flex', gap: 25, alignItems: 'center', backgroundColor: 'rgba(0, 255, 135, 0.05)', border: `1px solid ${COLORS.secondary}30` }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: COLORS.secondary, letterSpacing: '0.1em', marginBottom: 8 }}>CONCEPT #01</div>
            <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 10 }}>CRÉE TON BOWL</div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
              <b>Le site calcule tout pour toi.</b> Choisis ta base, tes protéines et tes légumes. Vois tes <b>Kcal & Macros</b> s'ajuster en temps réel.
            </div>
          </div>
          <div style={{ width: 160, height: 160, borderRadius: 25, overflow: 'hidden', border: '3px solid white' }}>
            <Img src={staticFile('img/bowl-poulet-mais.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </Card>

        {/* 3. CONCEPT 2: ABONNEMENTS (La Routine) */}
        <Card style={{ display: 'flex', gap: 25, alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <div style={{ width: 160, height: 160, borderRadius: 25, overflow: 'hidden', border: '3px solid white' }}>
            <Img src={staticFile('img/boeuf-puree-patate-douce.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: COLORS.accent, letterSpacing: '0.1em', marginBottom: 8 }}>CONCEPT #02</div>
            <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 10 }}>ABONNEMENTS</div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
              <b>Zéro stress, 100% santé.</b> Planifie tes repas de la semaine. Livraison automatique à l'heure de ton choix. <b>-20% de réduction.</b>
            </div>
          </div>
        </Card>

        {/* 4. CONCEPT 3: BOOST & SHOTS (L'Énergie) */}
        <div style={{ display: 'flex', gap: 20 }}>
          <Card style={{ flex: 1, textAlign: 'center', backgroundColor: COLORS.primary }}>
            <Img src={staticFile('img/shot-mix.jpeg')} style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 15px', border: '2px solid white' }} />
            <div style={{ fontSize: 18, fontWeight: 900, color: COLORS.secondary }}>SHOTS DÉTOX</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 5 }}>Boost naturel & Immunité.</div>
          </Card>
          <Card style={{ flex: 1, textAlign: 'center', backgroundColor: COLORS.accent, color: COLORS.dark }}>
            <Img src={staticFile('img/energy-balls-mix.jpeg')} style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 15px', border: '2px solid black' }} />
            <div style={{ fontSize: 18, fontWeight: 900 }}>ENERGY BALLS</div>
            <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.8, marginTop: 5 }}>Le snack fit par excellence.</div>
          </Card>
        </div>

        {/* 5. INFOS PRATIQUES (Le Site) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 15 }}>
          {[
            { icon: '🚀', label: 'LIVRAISON', text: 'Express' },
            { icon: '💳', label: 'PAIEMENT', text: 'Wave / OM' },
            { icon: '⏰', label: 'HORAIRES', text: '6h - 23h' },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 5 }}>{item.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 900, color: COLORS.secondary }}>{item.label}</div>
              <div style={{ fontSize: 13, fontWeight: 800 }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. MASTER FOOTER - CONVERSION */}
      <div style={{ 
        marginTop: 'auto', 
        backgroundColor: COLORS.white, 
        padding: '60px 50px 80px', 
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
          <div style={{ fontSize: 20, color: COLORS.primary, fontWeight: 800, letterSpacing: '0.1em', marginTop: 30 }}>COMMANDEZ VOTRE SANTÉ EN LIGNE</div>
        </div>
        
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          <QRCode size={180} color={COLORS.primary} />
          <div style={{ textAlign: 'left', color: COLORS.primary }}>
            <div style={{ fontSize: 24, fontWeight: 950 }}>📞 78 598 71 43</div>
            <div style={{ fontSize: 14, fontWeight: 700, opacity: 0.7, marginTop: 5 }}>Cuisiné le matin • 100% Halal</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.secondary, marginTop: 10 }}>#HealthyDakar #NutritionPro</div>
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
