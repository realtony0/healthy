import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// ============================================
// DA: LUXURY TECH-GASTRONOMY (MASTER)
// ============================================
// Format: 1080x1920 (Instagram / Snapchat / TikTok)
// Style: Elite, Minimalist, Data-Dense, High-End
// ============================================

const COLORS = {
  primary: '#0d2818',   // Deep Forest
  gold: '#d4a574',      // Warm Gold
  secondary: '#00ff87', // Neon Mint
  dark: '#050505',
  light: '#f8fafc',
  white: '#ffffff',
  cream: '#faf7f2',
};

const SectionDivider: React.FC<{ text: string }> = ({ text }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    margin: '20px 0',
    opacity: 0.6
  }}>
    <div style={{ fontSize: 12, fontWeight: 900, color: COLORS.gold, letterSpacing: '0.3em', textTransform: 'uppercase' }}>{text}</div>
    <div style={{ flex: 1, height: 1, backgroundColor: COLORS.gold, opacity: 0.3 }} />
  </div>
);

const MacroRing: React.FC<{ value: string; label: string; color?: string }> = ({ value, label, color = COLORS.secondary }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ 
      width: 80, 
      height: 80, 
      borderRadius: '50%', 
      border: `3px solid ${color}20`,
      borderTopColor: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    }}>
      <div style={{ fontSize: 18, fontWeight: 900, color: COLORS.white }}>{value}</div>
    </div>
    <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>{label}</div>
  </div>
);

const QRCode: React.FC<{ size?: number; color?: string }> = ({ size = 180, color = COLORS.primary }) => (
  <div style={{
    width: size,
    height: size,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
    border: `4px solid ${COLORS.gold}40`
  }}>
    <svg width={size - 30} height={size - 30} viewBox="0 0 100 100">
      <rect fill={color} x="5" y="5" width="25" height="25" rx="4" />
      <rect fill="white" x="10" y="10" width="15" height="15" />
      <rect fill={color} x="13" y="13" width="9" height="9" />
      
      <rect fill={color} x="70" y="5" width="25" height="25" rx="4" />
      <rect fill="white" x="75" y="10" width="15" height="15" />
      <rect fill={color} x="78" y="13" width="9" height="9" />
      
      <rect fill={color} x="5" y="70" width="25" height="25" rx="4" />
      <rect fill="white" x="10" y="75" width="15" height="15" />
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
      filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
      transform: 'rotate(-10deg)'
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
    <AbsoluteFill style={{ backgroundColor: COLORS.dark, color: COLORS.white }}>
      {/* 1. CINEMATIC BACKGROUND */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Img 
          src={staticFile('img/bowl-poulet-mais.jpeg')} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3) saturate(0.8)' }} 
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to bottom, transparent 0%, ${COLORS.dark} 80%)`,
        }} />
      </div>

      <AbsoluteFill style={{ padding: 60, display: 'flex', flexDirection: 'column' }}>
        
        {/* 2. HEADER - THE ELITE BRAND */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.gold, letterSpacing: '0.5em' }}>HEALTHY DAKAR</div>
          <div style={{ fontSize: 96, fontWeight: 950, lineHeight: 0.8, letterSpacing: '-0.05em', marginTop: 15 }}>
            SCIENCE OF<br /><span style={{ color: COLORS.secondary }}>HEALTH.</span>
          </div>
          <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)', marginTop: 30, maxWidth: '80%', lineHeight: 1.4 }}>
            Une expérience gastronomique orchestrée par la donnée nutritionnelle.
          </div>
        </div>

        {/* 3. CORE TECHNOLOGY - BOWL BUILDER */}
        <div style={{ marginTop: 60 }}>
          <SectionDivider text="Ingénierie Nutritionnelle" />
          <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 15 }}>BUILDER 2.0</div>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                Prenez le contrôle total. Notre algorithme calcule vos **Macros & Kcal** en temps réel lors de la création de votre bowl.
              </div>
              <div style={{ marginTop: 25, display: 'flex', gap: 20 }}>
                <MacroRing value="450" label="KCAL" />
                <MacroRing value="35g" label="PROT." color={COLORS.gold} />
                <MacroRing value="42g" label="GLUC." />
              </div>
            </div>
            <div style={{ width: 220, height: 280, borderRadius: 30, overflow: 'hidden', border: `1px solid ${COLORS.gold}40`, boxShadow: `0 20px 50px rgba(0,0,0,0.5)` }}>
              <Img src={staticFile('img/boeuf-puree-patate-douce.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* 4. ECOSYSTEM - THE FULL SUITE */}
        <div style={{ marginTop: 60 }}>
          <SectionDivider text="L'Écosystème Digital" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 25 }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 35, padding: 30, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 40, marginBottom: 15 }}>🗓️</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.secondary }}>ABONNEMENTS</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 10 }}>Routine automatisée. -20% de réduction permanente.</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 35, padding: 30, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 40, marginBottom: 15 }}>🔋</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.gold }}>BOOST & SHOTS</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 10 }}>Optimisation métabolique. Détox & Énergie pure.</div>
            </div>
          </div>
        </div>

        {/* 5. LOGISTICS - PRECISION DELIVERY */}
        <div style={{ marginTop: 60, display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
          {[
            { icon: '🚀', label: 'EXPRESS', val: '45 MIN' },
            { icon: '💳', label: 'DIGITAL', val: 'WAVE/OM' },
            { icon: '📍', label: 'DAKAR', val: 'TOUT QUARTIER' },
          ].map(item => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 900, color: COLORS.gold, letterSpacing: '0.1em' }}>{item.label}</div>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{item.val}</div>
            </div>
          ))}
        </div>

        {/* 6. CONVERSION - THE GATEWAY */}
        <div style={{ marginTop: 'auto', marginBottom: 20 }}>
          <div style={{ backgroundColor: COLORS.white, borderRadius: 50, padding: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ flex: 1 }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ fontSize: 64, fontWeight: 950, color: COLORS.primary, letterSpacing: '-0.04em' }}>www.healthy.sn</div>
                <div style={{ position: 'absolute', bottom: -15, right: -30 }}>
                  <MouseCursor size={50} />
                </div>
              </div>
              <div style={{ fontSize: 18, color: COLORS.primary, fontWeight: 800, marginTop: 15, letterSpacing: '0.1em' }}>COMMANDEZ VOTRE SANTÉ EN LIGNE</div>
            </div>
            <QRCode size={160} color={COLORS.primary} />
          </div>
          
          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: COLORS.gold, fontWeight: 900, fontSize: 24 }}>📞 78 598 71 43</div>
            <div style={{ display: 'flex', gap: 15 }}>
              {['100% FRAIS', '100% HALAL'].map(tag => (
                <div key={tag} style={{ fontSize: 12, fontWeight: 900, color: COLORS.secondary, border: `1px solid ${COLORS.secondary}`, padding: '6px 12px', borderRadius: 8 }}>{tag}</div>
              ))}
            </div>
          </div>
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Default exports
export const Flyer1_Brand = FlyerSocial;
export const Flyer2_Menu = FlyerSocial;
export const Flyer3_Benefits = FlyerSocial;
export const Flyer4_Subscriptions = FlyerSocial;
export const Flyer5_HowItWorks = FlyerSocial;
