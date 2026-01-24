import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// ============================================
// DA: CYBER-GASTRONOMY 3.0 (THE APEX)
// ============================================
// Style: Dark Mode, Neon Overlays, 3D Depth, Data-Visuals
// Inspiration: Cyberpunk 2077 UI, High-end Gaming Tech, Michelin Guide
// ============================================

const COLORS = {
  black: '#020202',
  deep: '#0a0f0c',
  neon: '#00ff87', // The signature mint neon
  gold: '#ffbe0b',
  electric: '#00d4ff',
  white: '#ffffff',
  glass: 'rgba(255, 255, 255, 0.03)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

const Glow: React.FC<{ color: string; size: number; opacity?: number }> = ({ color, size, opacity = 0.3 }) => (
  <div style={{
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: color,
    filter: 'blur(100px)',
    opacity,
    pointerEvents: 'none',
  }} />
);

const TechCard: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  icon?: string;
  borderColor?: string;
}> = ({ title, children, icon, borderColor = COLORS.glassBorder }) => (
  <div style={{
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(20px)',
    borderRadius: 30,
    padding: 30,
    border: `1px solid ${borderColor}`,
    position: 'relative',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  }}>
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 12, 
      marginBottom: 20,
      borderBottom: `1px solid ${borderColor}`,
      paddingBottom: 15
    }}>
      {icon && <span style={{ fontSize: 24 }}>{icon}</span>}
      <div style={{ 
        fontSize: 14, 
        fontWeight: 900, 
        color: COLORS.neon, 
        letterSpacing: '0.2em',
        textTransform: 'uppercase'
      }}>
        {title}
      </div>
    </div>
    {children}
  </div>
);

const MacroDisplay: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color = COLORS.neon }) => (
  <div style={{ flex: 1, textAlign: 'center' }}>
    <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: 5 }}>{label}</div>
    <div style={{ fontSize: 24, fontWeight: 950, color }}>{value}</div>
    <div style={{ height: 3, width: '40%', backgroundColor: color, margin: '8px auto', borderRadius: 2 }} />
  </div>
);

const QRCode: React.FC<{ size?: number; color?: string }> = ({ size = 180, color = COLORS.black }) => (
  <div style={{
    width: size,
    height: size,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 0 40px ${COLORS.neon}20`,
    border: `2px solid ${COLORS.neon}`
  }}>
    <svg width={size - 30} height={size - 30} viewBox="0 0 100 100">
      <rect fill={color} x="5" y="5" width="25" height="25" rx="2" />
      <rect fill="white" x="10" y="10" width="15" height="15" />
      <rect fill={color} x="13" y="13" width="9" height="9" />
      <rect fill={color} x="70" y="5" width="25" height="25" rx="2" />
      <rect fill="white" x="75" y="10" width="15" height="15" />
      <rect fill={color} x="78" y="13" width="9" height="9" />
      <rect fill={color} x="5" y="70" width="25" height="25" rx="2" />
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

export const FlyerSocial: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      {/* 1. LAYERED BACKGROUND */}
      <Glow color={COLORS.neon} size={800} opacity={0.15} />
      <div style={{ position: 'absolute', top: '20%', right: '-10%', transform: 'rotate(5deg)' }}>
        <Img 
          src={staticFile('img/bowl-poulet-mais.jpeg')} 
          style={{ width: 600, height: 600, borderRadius: 300, objectFit: 'cover', opacity: 0.4, filter: 'grayscale(0.5) contrast(1.2)' }} 
        />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, #000 90%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <AbsoluteFill style={{ padding: 60, display: 'flex', flexDirection: 'column', gap: 40 }}>
        
        {/* 2. HEADER - POWER BRANDING */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <div style={{ width: 40, height: 2, backgroundColor: COLORS.neon }} />
            <div style={{ fontSize: 20, fontWeight: 900, color: COLORS.neon, letterSpacing: '0.5em' }}>HEALTHY DAKAR</div>
          </div>
          <div style={{ fontSize: 110, fontWeight: 950, lineHeight: 0.85, letterSpacing: '-0.06em', marginTop: 25 }}>
            PERFECT<br />
            <span style={{ color: 'transparent', WebkitTextStroke: `2px ${COLORS.white}`, opacity: 0.8 }}>NUTRITION</span><br />
            <span style={{ color: COLORS.neon }}>ENGINEERED.</span>
          </div>
          <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.5)', marginTop: 40, maxWidth: 600, lineHeight: 1.4 }}>
            Bienvenue dans le futur de la food. Performance, goût et technologie sur <b>www.healthy.sn</b>.
          </div>
        </div>

        {/* 3. TECHNOLOGY - BOWL BUILDER */}
        <TechCard title="Tech: Bowl Builder v3.0" icon="⚡" borderColor={`${COLORS.neon}40`}>
          <div style={{ display: 'flex', gap: 35 }}>
            <div style={{ flex: 1.2 }}>
              <div style={{ fontSize: 32, fontWeight: 950, marginBottom: 15 }}>LE CHEF, C'EST TOI.</div>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 25 }}>
                Algorithme de calcul nutritionnel en temps réel. Compose ton repas idéal selon tes macros.
              </div>
              <div style={{ display: 'flex', gap: 15, backgroundColor: 'rgba(0,0,0,0.3)', padding: 20, borderRadius: 20 }}>
                <MacroDisplay label="KCAL" value="450" />
                <MacroDisplay label="PROT." value="35g" color={COLORS.gold} />
                <MacroDisplay label="GLUC." value="42g" color={COLORS.electric} />
              </div>
            </div>
            <div style={{ width: 200, height: 240, borderRadius: 25, overflow: 'hidden', border: `3px solid ${COLORS.neon}`, boxShadow: `0 0 30px ${COLORS.neon}30` }}>
              <Img src={staticFile('img/boeuf-puree-patate-douce.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </TechCard>

        {/* 4. ECOSYSTEM - SUBS & BOOSTS */}
        <div style={{ display: 'flex', gap: 30 }}>
          <div style={{ flex: 1 }}>
            <TechCard title="Abonnements" icon="🗓️">
              <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 10 }}>ROUTINE PRO.</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                Planification IA. Livraison auto. <b>-20% Life-time.</b>
              </div>
            </TechCard>
          </div>
          <div style={{ flex: 1 }}>
            <TechCard title="Boost & Shots" icon="🔋" borderColor={`${COLORS.gold}40`}>
              <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 10 }}>BIO-HACKING.</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                Shots détox & Energy Balls pour performance ultime.
              </div>
            </TechCard>
          </div>
        </div>

        {/* 5. LOGISTICS - SYSTEM STATUS */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          backgroundColor: 'rgba(255,255,255,0.03)', 
          padding: '25px 40px', 
          borderRadius: 30,
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          {[
            { label: 'STATUS', val: 'OPEN', color: COLORS.neon },
            { label: 'DELIVERY', val: 'EXPRESS', color: COLORS.white },
            { label: 'PAYMENT', val: 'WAVE/OM', color: COLORS.electric },
            { label: 'DAKAR', val: 'ALL ZONES', color: COLORS.gold },
          ].map(i => (
            <div key={i.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 900, opacity: 0.4, letterSpacing: '0.1em', marginBottom: 5 }}>{i.label}</div>
              <div style={{ fontSize: 16, fontWeight: 950, color: i.color }}>{i.val}</div>
            </div>
          ))}
        </div>

        {/* 6. FOOTER - THE CONVERSION TERMINAL */}
        <div style={{ marginTop: 'auto', marginBottom: 20 }}>
          <div style={{ 
            backgroundColor: COLORS.white, 
            borderRadius: 40, 
            padding: '40px 50px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 40,
            boxShadow: `0 0 60px ${COLORS.neon}20`
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.primary, letterSpacing: '0.2em', marginBottom: 10 }}>ACCESS GRANTED</div>
              <div style={{ fontSize: 64, fontWeight: 1000, color: COLORS.primary, letterSpacing: '-0.05em', lineHeight: 1 }}>www.healthy.sn</div>
              <div style={{ fontSize: 18, color: COLORS.primary, fontWeight: 800, marginTop: 15, opacity: 0.7 }}>TON PARTENAIRE SANTÉ DIGITAL</div>
            </div>
            <QRCode size={180} color={COLORS.primary} />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, padding: '0 20px' }}>
            <div style={{ fontSize: 32, fontWeight: 1000, color: COLORS.neon }}>📞 78 598 71 43</div>
            <div style={{ display: 'flex', gap: 15 }}>
              {['PREMIUM FRESH', '100% HALAL'].map(t => (
                <div key={t} style={{ 
                  fontSize: 12, 
                  fontWeight: 900, 
                  padding: '8px 16px', 
                  borderRadius: 10, 
                  border: `1px solid ${COLORS.neon}`,
                  color: COLORS.neon
                }}>{t}</div>
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
