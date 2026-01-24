import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// ============================================
// DA: PREMIUM TECH-FOOD VIBRANT (Social Master)
// ============================================
// Format: 1080x1920 (Instagram / Snapchat / TikTok)
// Style: High-Density, Data-Driven, Ultra-Pro
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

const SectionHeader: React.FC<{ text: string; color?: string }> = ({ text, color = COLORS.secondary }) => (
  <div style={{
    fontSize: 22,
    fontWeight: 900,
    color,
    letterSpacing: '0.15em',
    marginBottom: 12,
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    gap: 10
  }}>
    <div style={{ width: 30, height: 4, backgroundColor: color }} />
    {text}
  </div>
);

const MacroTag: React.FC<{ text: string }> = ({ text }) => (
  <div style={{
    backgroundColor: 'rgba(0, 255, 135, 0.15)',
    color: COLORS.secondary,
    padding: '6px 12px',
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 900,
    border: `1px solid ${COLORS.secondary}40`,
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
      
      <rect fill={color} x="35" y="5" width="8" height="8" />
      <rect fill={color} x="50" y="5" width="8" height="8" />
      <rect fill={color} x="35" y="20" width="8" height="8" />
      <rect fill={color} x="55" y="20" width="8" height="8" />
      
      <rect fill={color} x="5" y="40" width="8" height="8" />
      <rect fill={color} x="20" y="40" width="8" height="8" />
      <rect fill={color} x="5" y="55" width="8" height="8" />
      <rect fill={color} x="25" y="55" width="8" height="8" />
      
      <rect fill={color} x="40" y="40" width="8" height="8" />
      <rect fill={color} x="52" y="40" width="8" height="8" />
      <rect fill={color} x="45" y="52" width="8" height="8" />
      
      <rect fill={color} x="70" y="40" width="8" height="8" />
      <rect fill={color} x="85" y="40" width="8" height="8" />
      <rect fill={color} x="70" y="55" width="8" height="8" />
      <rect fill={color} x="80" y="52" width="8" height="8" />
      
      <rect fill={color} x="40" y="70" width="8" height="8" />
      <rect fill={color} x="55" y="70" width="8" height="8" />
      <rect fill={color} x="45" y="85" width="8" height="8" />
      
      <rect fill={color} x="70" y="70" width="8" height="8" />
      <rect fill={color} x="85" y="70" width="8" height="8" />
      <rect fill={color} x="75" y="85" width="8" height="8" />
      <rect fill={color} x="90" y="85" width="8" height="8" />
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
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
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
      {/* Background Photos - Subtle & Aesthetic */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, filter: 'blur(5px)' }}>
        <Img src={staticFile('img/bowl-poulet-mais.jpeg')} style={{ position: 'absolute', top: '10%', left: '-10%', width: '60%', height: 'auto', borderRadius: '50%', transform: 'rotate(-10deg)' }} />
        <Img src={staticFile('img/boeuf-puree-patate-douce.jpeg')} style={{ position: 'absolute', top: '40%', right: '-10%', width: '60%', height: 'auto', borderRadius: '50%', transform: 'rotate(15deg)' }} />
        <Img src={staticFile('img/poisson-blanc-herbes.jpeg')} style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '60%', height: 'auto', borderRadius: '50%', transform: 'rotate(-5deg)' }} />
      </div>

      {/* Background Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 20% 20%, ${COLORS.primary} 0%, transparent 60%), radial-gradient(circle at 80% 80%, ${COLORS.primary} 0%, transparent 60%)`,
        opacity: 0.8
      }} />

      {/* 1. HEADER - BRAND PROMISE */}
      <div style={{ padding: '80px 60px 40px', position: 'relative' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.secondary, letterSpacing: '0.4em', marginBottom: 15 }}>HEALTHY DAKAR</div>
        <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em' }}>TA SANTÉ EN<br /><span style={{ color: COLORS.secondary }}>TEMPS RÉEL.</span></div>
        <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)', marginTop: 30, lineHeight: 1.4, maxWidth: '90%' }}>
          La plateforme qui calcule tout pour toi. Mangez avec précision, vivez avec passion.
        </div>
      </div>

      <div style={{ padding: '0 50px', display: 'flex', flexDirection: 'column', gap: 35, position: 'relative' }}>
        
        {/* 2. BOWL BUILDER - INNOVATION */}
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.05)', 
          borderRadius: 45, 
          padding: 40, 
          border: '1px solid rgba(255,255,255,0.1)', 
          backdropFilter: 'blur(20px)',
          display: 'flex',
          gap: 25,
          alignItems: 'center'
        }}>
          <div style={{ flex: 1 }}>
            <SectionHeader text="Crée ton Bowl" />
            <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 15 }}>LE CHEF, C'EST TOI.</div>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 25 }}>
              Choisis tes ingrédients, le site calcule instantanément tes <b>macros.</b>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <MacroTag text="CALCUL EN DIRECT" />
              <MacroTag text="SUR MESURE" />
            </div>
          </div>
          <div style={{ width: 180, height: 180, borderRadius: 30, overflow: 'hidden', border: `3px solid ${COLORS.secondary}`, boxShadow: `0 0 30px ${COLORS.secondary}40`, flexShrink: 0 }}>
            <Img src={staticFile('img/bowl-poulet-mais.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* 3. ABONNEMENTS - ROUTINE */}
        <div style={{ 
          backgroundColor: COLORS.primary, 
          borderRadius: 45, 
          padding: 40, 
          border: `2px solid ${COLORS.secondary}40`, 
          boxShadow: `0 20px 60px ${COLORS.primary}`,
          display: 'flex',
          gap: 25,
          alignItems: 'center'
        }}>
          <div style={{ width: 180, height: 180, borderRadius: 30, overflow: 'hidden', border: `3px solid white`, flexShrink: 0 }}>
            <Img src={staticFile('img/boeuf-puree-patate-douce.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <SectionHeader text="Abonnements" color={COLORS.secondary} />
            <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 15 }}>PLANIFIE TA SEMAINE.</div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
              Reçois tes repas sans y penser. Idéal pour tes objectifs sportifs.
            </div>
            <div style={{ marginTop: 15, fontSize: 14, fontWeight: 900, color: COLORS.secondary }}>✓ ÉCONOMISE -20%</div>
          </div>
        </div>

        {/* 4. BOOST & SHOTS (Row) */}
        <div style={{ display: 'flex', gap: 25 }}>
          <div style={{ flex: 1, backgroundColor: COLORS.accent, borderRadius: 40, padding: 30, color: COLORS.dark, display: 'flex', flexDirection: 'column', gap: 15 }}>
            <div style={{ fontSize: 20, fontWeight: 900 }}>SHOTS & ENERGY</div>
            <div style={{ width: '100%', height: 100, borderRadius: 20, overflow: 'hidden' }}>
              <Img src={staticFile('img/shot-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, opacity: 0.8 }}>Boost naturel quotidien.</div>
          </div>
          <div style={{ flex: 1, backgroundColor: 'white', borderRadius: 40, padding: 30, color: COLORS.dark, display: 'flex', flexDirection: 'column', gap: 15 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: COLORS.primary }}>SNACKS FIT</div>
            <div style={{ width: '100%', height: 100, borderRadius: 20, overflow: 'hidden' }}>
              <Img src={staticFile('img/energy-balls-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>Energy Balls & Fit Snacks.</div>
          </div>
        </div>

        {/* 5. QUICK VALUES */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            { icon: '🥦', text: '100% Frais' },
            { icon: '✅', text: '100% Halal' },
            { icon: '🚀', text: 'Express' },
            { icon: '⏰', text: 'Gain Temps' },
          ].map((item, i) => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 15, backgroundColor: 'rgba(255,255,255,0.05)', padding: '15px 20px', borderRadius: 25 }}>
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 800 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. FOOTER - CONVERSION */}
      <div style={{ marginTop: 'auto', backgroundColor: COLORS.white, padding: '60px 50px 80px', borderTopLeftRadius: 70, borderTopRightRadius: 70, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, position: 'relative' }}>
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
          <div style={{ fontSize: 20, color: COLORS.primary, fontWeight: 800, letterSpacing: '0.1em', marginTop: 30 }}>COMMANDEZ VOTRE SANTÉ EN 1 CLIC</div>
        </div>
        
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          <QRCode size={200} color={COLORS.primary} />
          <div style={{ textAlign: 'left', color: COLORS.primary }}>
            <div style={{ fontSize: 22, fontWeight: 900 }}>📞 +221 78 598 71 43</div>
            <div style={{ fontSize: 16, fontWeight: 700, opacity: 0.7, marginTop: 5 }}>Livraison Dakar • 6h - 23h</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.secondary, marginTop: 10 }}>#HealthyDakar #NutritionPro</div>
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
