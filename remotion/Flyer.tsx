import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// ============================================
// DA: EDITORIAL BRUTALIST × TECH-FOOD (MASTER)
// ============================================
// Format: 1080x1920 (Instagram / Snapchat / TikTok)
// Style: High Impact, Kinetic Feel, Data-Dense
// ============================================

const COLORS = {
  black: '#000000',
  white: '#ffffff',
  neon: '#00ff87', // Neon Mint
  hot: '#ff3366',  // Hot Pink
  gold: '#ffbe0b', // Accent Gold
  darkGreen: '#0d2818',
};

const Sticker: React.FC<{ text: string; bg?: string; color?: string; rotate?: number }> = ({ 
  text, bg = COLORS.neon, color = COLORS.black, rotate = -5 
}) => (
  <div style={{
    backgroundColor: bg,
    color,
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: 16,
    fontWeight: 900,
    transform: `rotate(${rotate}deg)`,
    display: 'inline-block',
    boxShadow: '4px 4px 0px rgba(0,0,0,0.2)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    zIndex: 10
  }}>
    {text}
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode; bg?: string; border?: string }> = ({ 
  title, children, bg = 'rgba(255,255,255,0.03)', border = `1px solid rgba(255,255,255,0.1)` 
}) => (
  <div style={{
    backgroundColor: bg,
    border,
    borderRadius: 35,
    padding: 30,
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{ fontSize: 12, fontWeight: 900, color: COLORS.neon, letterSpacing: '0.2em', marginBottom: 15, textTransform: 'uppercase' }}>
      // {title}
    </div>
    {children}
  </div>
);

const QRCode: React.FC<{ size?: number; color?: string }> = ({ size = 180, color = COLORS.black }) => (
  <div style={{
    width: size,
    height: size,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '8px 8px 0px rgba(0,0,0,0.1)'
  }}>
    <svg width={size - 24} height={size - 24} viewBox="0 0 100 100">
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

const MouseCursor: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    style={{ 
      filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,1))',
      transform: 'rotate(-10deg)'
    }}
  >
    <path 
      d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" 
      fill="white" 
      stroke="black" 
      strokeWidth="2" 
    />
  </svg>
);

export const FlyerSocial: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, color: COLORS.white }}>
      {/* Dynamic Background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', background: `radial-gradient(circle at 20% 20%, ${COLORS.darkGreen} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${COLORS.darkGreen} 0%, transparent 50%)` }} />
      </div>

      {/* Grid Pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.5 }} />

      {/* 1. HEADER - IMPACT */}
      <div style={{ padding: '80px 60px 40px', position: 'relative' }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.neon, letterSpacing: '0.4em' }}>WWW.HEALTHY.SN</div>
        <div style={{ fontSize: 110, fontWeight: 950, lineHeight: 0.8, letterSpacing: '-0.06em', marginTop: 20 }}>
          DOMINE TA<br /><span style={{ color: COLORS.neon }}>NUTRITION.</span>
        </div>
        <div style={{ position: 'absolute', top: 120, right: 40 }}>
          <Sticker text="DAKAR • SN" bg={COLORS.hot} color="white" rotate={15} />
        </div>
      </div>

      <div style={{ padding: '0 40px', display: 'flex', flexDirection: 'column', gap: 30, position: 'relative' }}>
        
        {/* 2. CONCEPT: CRÉE TON BOWL */}
        <Section title="TECHNOLOGIE BOWL BUILDER">
          <div style={{ display: 'flex', gap: 25, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 36, fontWeight: 950, lineHeight: 1, marginBottom: 15 }}>LE CHEF,<br />C'EST TOI.</div>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 20 }}>
                Choisis tes ingrédients sur le site. Les <b>Kcal & Macros</b> sont calculés en <b>temps réel</b> selon tes choix.
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ backgroundColor: COLORS.white, color: COLORS.black, padding: '6px 12px', borderRadius: 4, fontSize: 11, fontWeight: 900 }}>DATA-DRIVEN</div>
                <div style={{ border: `1px solid ${COLORS.neon}`, color: COLORS.neon, padding: '6px 12px', borderRadius: 4, fontSize: 11, fontWeight: 900 }}>100% CUSTOM</div>
              </div>
            </div>
            <div style={{ width: 180, height: 180, borderRadius: 20, overflow: 'hidden', border: `4px solid ${COLORS.neon}`, boxShadow: `0 0 40px ${COLORS.neon}40` }}>
              <Img src={staticFile('img/bowl-poulet-mais.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </Section>

        {/* 3. CONCEPT: ABONNEMENTS */}
        <Section title="DISCIPLINE & PERFORMANCE" bg={COLORS.darkGreen} border={`2px solid ${COLORS.neon}40`}>
          <div style={{ display: 'flex', gap: 25, alignItems: 'center' }}>
            <div style={{ width: 180, height: 180, borderRadius: 20, overflow: 'hidden', border: `4px solid white` }}>
              <Img src={staticFile('img/boeuf-puree-patate-douce.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 36, fontWeight: 950, lineHeight: 1, marginBottom: 15 }}>ABONNE-TOI<br />À TA SANTÉ.</div>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                Planifie ta semaine. Livraison automatique. <b>Atteins tes objectifs</b> sans cuisiner.
              </div>
              <div style={{ marginTop: 15, fontSize: 18, fontWeight: 900, color: COLORS.neon }}>-20% SUR TON PACK</div>
            </div>
          </div>
        </Section>

        {/* 4. BOOST & SNACKS */}
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1, backgroundColor: COLORS.hot, borderRadius: 30, padding: 25, color: 'white', position: 'relative' }}>
            <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>SHOTS<br />DÉTOX</div>
            <div style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', border: '3px solid white', margin: '10px 0' }}>
              <Img src={staticFile('img/shot-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 800 }}>VITALITÉ NON-STOP</div>
          </div>
          <div style={{ flex: 1, backgroundColor: COLORS.gold, borderRadius: 30, padding: 25, color: COLORS.black }}>
            <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>ENERGY<br />BALLS</div>
            <div style={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', border: '3px solid black', margin: '10px 0' }}>
              <Img src={staticFile('img/energy-balls-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 800 }}>SNACK FIT PRO</div>
          </div>
        </div>

        {/* 5. LOGISTICS BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.2)' }}>
          {[
            { icon: '🚀', text: 'EXPRESS' },
            { icon: '💳', text: 'WAVE/OM' },
            { icon: '📍', text: 'DAKAR' },
            { icon: '⏰', text: '6H-23H' },
          ].map(item => (
            <div key={item.text} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 900 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. THE CONVERSION FOOTER */}
      <div style={{ 
        marginTop: 'auto', 
        backgroundColor: COLORS.white, 
        padding: '60px 50px 80px', 
        borderTopLeftRadius: 60, 
        borderTopRightRadius: 60, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 40,
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: -30 }}>
          <Sticker text="COMMANDE ICI" bg={COLORS.neon} color={COLORS.black} rotate={0} />
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ 
              fontSize: 64, 
              fontWeight: 950, 
              color: COLORS.black,
              letterSpacing: '-0.04em',
              lineHeight: 1
            }}>
              healthy.sn
            </div>
            <div style={{ position: 'absolute', bottom: -10, right: -25 }}>
              <MouseCursor size={45} />
            </div>
          </div>
          <div style={{ fontSize: 18, color: COLORS.black, fontWeight: 800, opacity: 0.6, marginTop: 15, letterSpacing: '0.1em' }}>TA SANTÉ EN UN CLIC</div>
        </div>
        
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          <QRCode size={200} color={COLORS.black} />
          <div style={{ textAlign: 'left', color: COLORS.black }}>
            <div style={{ fontSize: 24, fontWeight: 950 }}>78 598 71 43</div>
            <div style={{ fontSize: 14, fontWeight: 700, opacity: 0.6, marginTop: 5 }}>LIVRAISON PARTOUT</div>
            <div style={{ fontSize: 14, fontWeight: 900, color: COLORS.hot, marginTop: 10 }}>#HEALTHYDAKAR</div>
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
