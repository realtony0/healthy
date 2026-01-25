import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  Img,
  staticFile,
  Easing,
  Series,
} from 'remotion';
import React from 'react';

// ============================================
// PREMIUM ART DIRECTION: TECH-FOOD VIBRANT
// ============================================
const COLORS = {
  primary: '#0d2818',   // Deep Forest
  secondary: '#00ff87', // Neon Mint
  accent: '#ffbe0b',    // Golden Yellow
  dark: '#050505',
  light: '#f8fafc',
  white: '#ffffff',
  glass: 'rgba(255, 255, 255, 0.1)',
};

// --- Professional UI Components ---

const GrainOverlay: React.FC = () => (
  <div style={{
    position: 'absolute',
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    opacity: 0.04,
    pointerEvents: 'none',
    zIndex: 100,
  }} />
);

const MovingGradient: React.FC<{ frame: number }> = ({ frame }) => {
  const rot = interpolate(frame, [0, 300], [0, 360], { extrapolateRight: 'extend' });
  return (
    <div style={{
      position: 'absolute',
      inset: '-50%',
      background: `conic-gradient(from ${rot}deg at 50% 50%, ${COLORS.primary}, ${COLORS.dark}, ${COLORS.primary})`,
      filter: 'blur(80px)',
      opacity: 0.6,
    }} />
  );
};

const ProMobile: React.FC<{ frame: number; children: React.ReactNode; scrollY?: number }> = ({ frame, children, scrollY = 0 }) => {
  const scale = spring({
    frame,
    fps: 30,
    config: { damping: 15, stiffness: 120 },
  });

  return (
    <div style={{
      width: 420,
      height: 860,
      backgroundColor: COLORS.dark,
      borderRadius: 60,
      border: `12px solid #1a1a1a`,
      position: 'relative',
      transform: `scale(${scale})`,
      boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
      overflow: 'hidden',
    }}>
      {/* Notch / Dynamic Island */}
      <div style={{
        position: 'absolute',
        top: 15,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 120,
        height: 35,
        backgroundColor: '#000',
        borderRadius: 20,
        zIndex: 50,
      }} />
      
      {/* Screen Content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: COLORS.white,
        transform: `translateY(${scrollY}px)`,
      }}>
        {children}
      </div>
    </div>
  );
};

const KineticTitle: React.FC<{ text: string; frame: number; delay?: number; color?: string; size?: number }> = ({ 
  text, frame, delay = 0, color = COLORS.white, size = 80 
}) => {
  const f = frame - delay;
  const opacity = interpolate(f, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(f, [0, 20], [40, 0], { 
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp)
  });

  return (
    <div style={{
      fontSize: size,
      fontWeight: 900,
      color,
      lineHeight: 0.9,
      letterSpacing: '-0.04em',
      opacity,
      transform: `translateY(${y}px)`,
      textShadow: '0 10px 30px rgba(0,0,0,0.3)'
    }}>
      {text.toUpperCase()}
    </div>
  );
};

const MacroBadge: React.FC<{ frame: number; delay: number; text: string }> = ({ frame, delay, text }) => {
  const f = frame - delay;
  const scale = spring({ frame: f, fps: 30, config: { damping: 10 } });
  const opacity = interpolate(f, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      backgroundColor: COLORS.secondary,
      color: COLORS.primary,
      padding: '8px 16px',
      borderRadius: 12,
      fontSize: 16,
      fontWeight: 900,
      opacity,
      transform: `scale(${scale})`,
      display: 'inline-block',
      boxShadow: '0 4px 15px rgba(0,255,135,0.3)'
    }}>
      {text}
    </div>
  );
};

// --- Scenes ---

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <MovingGradient frame={frame} />
      <GrainOverlay />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 60 }}>
        <div style={{ textAlign: 'center' }}>
          <KineticTitle text="Healthy" frame={frame} delay={10} color={COLORS.secondary} />
          <div style={{ height: 20 }} />
          <div style={{
            fontSize: 24,
            fontWeight: 600,
            color: COLORS.white,
            letterSpacing: '0.3em',
            opacity: interpolate(frame, [30, 50], [0, 0.8], { extrapolateRight: 'clamp' })
          }}>
            DAKAR • SÉNÉGAL
          </div>
          <div style={{ 
            marginTop: 40,
            fontSize: 32,
            fontWeight: 800,
            color: COLORS.white,
            maxWidth: 600,
            lineHeight: 1.2,
            opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: 'clamp' })
          }}>
            L'EXCELLENCE NUTRITIONNELLE<br />À CHAQUE REPAS
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const NutritionDetail: React.FC = () => {
  const frame = useCurrentFrame();
  const scrollY = interpolate(frame, [30, 300], [0, -400], { 
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad)
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.primary }}>
      <MovingGradient frame={frame} />
      <div style={{ padding: '80px 60px' }}>
        <KineticTitle text="Nutrition" frame={frame} delay={0} size={60} />
        <KineticTitle text="Maîtrisée" frame={frame} delay={10} color={COLORS.secondary} size={100} />
        <div style={{ height: 30 }} />
        <div style={{ fontSize: 24, color: COLORS.white, opacity: 0.8, maxWidth: 500, fontWeight: 500 }}>
          Chaque plat est analysé. Kcal, protéines, glucides : vous savez exactement ce que vous mangez.
        </div>
      </div>

      <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', bottom: -100 }}>
        <ProMobile frame={frame} scrollY={scrollY}>
          <div style={{ padding: '80px 30px' }}>
            <div style={{ borderRadius: 30, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: 30 }}>
              <Img src={staticFile('img/bowl-poulet-mais.jpeg')} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.primary, marginBottom: 20 }}>Bowl Poulet Signature</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 15 }}>
              <MacroBadge frame={frame} delay={60} text="450 kcal" />
              <MacroBadge frame={frame} delay={70} text="35g Protéines" />
              <MacroBadge frame={frame} delay={80} text="42g Glucides" />
            </div>
          </div>
        </ProMobile>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const BowlBuilder: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <MovingGradient frame={frame} />
      <div style={{ padding: 80, textAlign: 'right' }}>
        <KineticTitle text="Crée ton" frame={frame} delay={0} size={60} />
        <KineticTitle text="Bowl" frame={frame} delay={10} color={COLORS.secondary} size={120} />
        <div style={{ height: 30 }} />
        <div style={{ fontSize: 24, color: COLORS.white, opacity: 0.8, fontWeight: 500 }}>
          Le chef, c'est vous. Choisissez vos ingrédients,<br />nous calculons vos macros en temps réel.
        </div>
      </div>

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'flex-start', left: 60, top: 250 }}>
        <ProMobile frame={frame}>
          <div style={{ padding: '80px 20px' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.primary, marginBottom: 30 }}>Composez votre Bowl</div>
            {['Base: Riz Complet', 'Protéine: Bœuf', 'Légumes: Brocolis', 'Sauce: Healthy'].map((item, i) => (
              <div key={i} style={{ 
                padding: 20, 
                backgroundColor: i === (Math.floor(frame / 30) % 4) ? COLORS.secondary : '#f1f5f9', 
                borderRadius: 15, 
                marginBottom: 10,
                fontWeight: 800,
                color: COLORS.primary,
                transition: 'all 0.3s'
              }}>
                {item}
              </div>
            ))}
            <div style={{ marginTop: 40, padding: 25, backgroundColor: COLORS.primary, borderRadius: 20, color: 'white' }}>
              <div style={{ fontSize: 14, opacity: 0.7 }}>TOTAL CALCULÉ</div>
              <div style={{ fontSize: 32, fontWeight: 900 }}>520 kcal</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.secondary }}>42g Protéines</div>
            </div>
          </div>
        </ProMobile>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Subscriptions: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.primary }}>
      <MovingGradient frame={frame} />
      <div style={{ padding: 80 }}>
        <KineticTitle text="Abonnements" frame={frame} delay={0} color={COLORS.secondary} size={80} />
        <div style={{ height: 20 }} />
        <div style={{ fontSize: 32, color: COLORS.white, fontWeight: 800, lineHeight: 1.2 }}>
          PLANIFIEZ VOTRE SEMAINE,<br />ON S'OCCUPE DU RESTE.
        </div>
      </div>

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', top: 150 }}>
        <div style={{ display: 'flex', gap: 30, transform: `scale(${spring({ frame, fps: 30 })})` }}>
          {[
            { day: 'LUN', dish: 'Bowl Poulet' },
            { day: 'MAR', dish: 'Poisson Herbes' },
            { day: 'MER', dish: 'Bœuf Patate' },
          ].map((item, i) => (
            <div key={i} style={{ 
              width: 180, 
              backgroundColor: 'white', 
              borderRadius: 30, 
              padding: 25, 
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: COLORS.secondary, marginBottom: 10 }}>{item.day}</div>
              <div style={{ width: 100, height: 100, borderRadius: 20, overflow: 'hidden', margin: '0 auto 15px' }}>
                <Img src={staticFile('img/bowl-poulet-mais.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.primary }}>{item.dish}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ 
          display: 'inline-block', 
          padding: '20px 40px', 
          backgroundColor: COLORS.white, 
          borderRadius: 50, 
          fontSize: 24, 
          fontWeight: 900, 
          color: COLORS.primary,
          boxShadow: `0 10px 30px ${COLORS.secondary}40`
        }}>
          LIVRAISON AUTOMATIQUE 🚀
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Concept: React.FC = () => {
  const frame = useCurrentFrame();
  const items = [
    { title: '100% FRAIS', desc: 'Cuisiné chaque matin', icon: '🥗' },
    { title: '100% HALAL', desc: 'Certifié & authentique', icon: '✅' },
    { title: 'LIVRAISON EXPRESS', desc: 'Partout à Dakar', icon: '🚀' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <MovingGradient frame={frame} />
      <div style={{ padding: 80 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.secondary, letterSpacing: '0.2em', marginBottom: 20 }}>NOS ENGAGEMENTS</div>
        {items.map((item, i) => {
          const f = frame - (i * 20);
          return (
            <div key={i} style={{ 
              display: 'flex', 
              gap: 40, 
              alignItems: 'center', 
              marginBottom: 60,
              opacity: interpolate(f, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
              transform: `translateX(${interpolate(f, [0, 20], [-50, 0], { extrapolateRight: 'clamp' })}px)`
            }}>
              <div style={{ 
                fontSize: 60, 
                width: 120, 
                height: 120, 
                backgroundColor: COLORS.glass, 
                borderRadius: 30, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 36, fontWeight: 900, color: COLORS.white }}>{item.title}</div>
                <div style={{ fontSize: 24, color: COLORS.secondary, fontWeight: 600 }}>{item.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const FinalCTA: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <MovingGradient frame={frame} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ 
          transform: `scale(${interpolate(frame, [0, 30], [0.8, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.exp) })})`,
          opacity: interpolate(frame, [0, 20], [0, 1])
        }}>
          <div style={{ fontSize: 120, fontWeight: 900, color: COLORS.secondary, letterSpacing: '-0.05em' }}>HEALTHY</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.white, letterSpacing: '0.2em', marginBottom: 60 }}>DAKAR</div>
          
          <div style={{ 
            backgroundColor: COLORS.white, 
            padding: '30px 60px', 
            borderRadius: 60, 
            fontSize: 40, 
            fontWeight: 900, 
            color: COLORS.primary,
            boxShadow: `0 0 50px ${COLORS.secondary}60`
          }}>
            www.healthy.sn
          </div>
          
          <div style={{ 
            marginTop: 40, 
            fontSize: 24, 
            color: COLORS.white, 
            opacity: 0.6,
            fontWeight: 600
          }}>
            COMMANDEZ VOTRE SANTÉ EN 1 CLIC.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Publicite: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: 'system-ui, sans-serif', overflow: 'hidden' }}>
      <Series>
        <Series.Sequence durationInFrames={150}>
          <Intro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={360}>
          <NutritionDetail />
        </Series.Sequence>
        <Series.Sequence durationInFrames={360}>
          <BowlBuilder />
        </Series.Sequence>
        <Series.Sequence durationInFrames={360}>
          <Subscriptions />
        </Series.Sequence>
        <Series.Sequence durationInFrames={300}>
          <Concept />
        </Series.Sequence>
        <Series.Sequence durationInFrames={270}>
          <FinalCTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
