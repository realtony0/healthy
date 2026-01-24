import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  Img,
  staticFile,
  Easing,
  Sequence,
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
  const rot = interpolate(frame, [0, 300], [0, 360]);
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

const KineticTitle: React.FC<{ text: string; frame: number; delay?: number; color?: string }> = ({ text, frame, delay = 0, color = COLORS.white }) => {
  const f = frame - delay;
  const opacity = interpolate(f, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(f, [0, 20], [40, 0], { 
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp)
  });

  return (
    <div style={{
      fontSize: 80,
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

// --- Scenes ---

const Intro: React.FC<{ frame: number }> = ({ frame }) => {
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
            REPAS SAINS, SIMPLES<br />ET ULTRA-RAPIDES
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Discovery: React.FC<{ frame: number }> = ({ frame }) => {
  const scrollY = interpolate(frame, [30, 400], [0, -1200], { 
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad)
  });

  const dishes = [
    { name: 'Bowl Poulet Signature', price: '3 500 F', img: 'img/bowl-poulet-mais.jpeg' },
    { name: 'Poisson aux Herbes', price: '3 900 F', img: 'img/poisson-blanc-herbes.jpeg' },
    { name: 'Bœuf Patate Douce', price: '4 200 F', img: 'img/boeuf-puree-patate-douce.jpeg' },
    { name: 'Energy Balls Mix', price: '2 500 F', img: 'img/energy-balls-mix.jpeg' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.primary }}>
      <MovingGradient frame={frame} />
      <div style={{ 
        position: 'absolute', 
        top: 100, 
        left: 0, 
        right: 0, 
        textAlign: 'center',
        zIndex: 10 
      }}>
        <div style={{ 
          fontSize: 48, 
          fontWeight: 900, 
          color: COLORS.white,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })
        }}>
          TOUT À PORTÉE DE CLIC
        </div>
        <div style={{ 
          fontSize: 24, 
          color: COLORS.secondary, 
          fontWeight: 700,
          marginTop: 10,
          opacity: interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' })
        }}>
          www.healthy.sn
        </div>
      </div>

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', top: 150 }}>
        <ProMobile frame={frame} scrollY={scrollY}>
          {/* Mock Site Content */}
          <div style={{ padding: '80px 20px' }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.primary, marginBottom: 40 }}>Menu du Jour</div>
            {dishes.map((dish, i) => (
              <div key={i} style={{ marginBottom: 40, borderRadius: 30, overflow: 'hidden', backgroundColor: COLORS.light, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <Img src={staticFile(dish.img)} style={{ width: '100%', height: 240, objectFit: 'cover' }} />
                <div style={{ padding: 25 }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.primary }}>{dish.name}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.secondary, marginTop: 10 }}>{dish.price}</div>
                </div>
              </div>
            ))}
          </div>
        </ProMobile>
      </AbsoluteFill>
      
      {/* Floating Badge */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        backgroundColor: COLORS.white,
        padding: '25px 50px',
        borderRadius: 50,
        fontSize: 32,
        fontWeight: 900,
        color: COLORS.primary,
        boxShadow: `0 20px 50px ${COLORS.secondary}40`,
        opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' }),
        transform: `scale(${spring({ frame: frame - 20, fps: 30 })})`,
      }}>
        COMMANDER MAINTENANT
      </div>
    </AbsoluteFill>
  );
};

const Concept: React.FC<{ frame: number }> = ({ frame }) => {
  const items = [
    { title: 'FRAIS & ÉQUILIBRÉS', desc: 'Préparés chaque matin', icon: '🥗' },
    { title: '100% HALAL', desc: 'Certifié & nutritif', icon: '✅' },
    { title: 'LIVRAISON EXPRESS', desc: 'Partout à Dakar', icon: '🚀' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <MovingGradient frame={frame} />
      <div style={{ padding: 80 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.secondary, letterSpacing: '0.2em', marginBottom: 20 }}>NOTRE CONCEPT</div>
        <div style={{ fontSize: 80, fontWeight: 900, color: COLORS.white, lineHeight: 1, marginBottom: 80 }}>LA QUALITÉ<br />SANS COMPROMIS</div>

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
      
      {/* Animated Food Overlays */}
      <div style={{ 
        position: 'absolute', 
        bottom: -50, 
        right: -50, 
        width: 400, 
        height: 400, 
        borderRadius: '50%', 
        backgroundColor: COLORS.secondary, 
        opacity: 0.1, 
        filter: 'blur(100px)' 
      }} />
    </AbsoluteFill>
  );
};

const Features: React.FC<{ frame: number }> = ({ frame }) => {
  const cards = [
    { title: 'PAIEMENT FACILE', desc: 'Cash, Wave, Orange Money', icon: '💳' },
    { title: 'RAPIDE & PRATIQUE', desc: 'Livraison 6h - 23h', icon: '⚡' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.primary }}>
      <MovingGradient frame={frame} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', gap: 40 }}>
        <div style={{ fontSize: 64, fontWeight: 900, color: COLORS.white, textAlign: 'center', marginBottom: 40 }}>SIMPLE. RAPIDE.<br />PRATIQUE.</div>
        
        {cards.map((card, i) => (
          <div key={i} style={{ 
            width: '80%', 
            backgroundColor: COLORS.white, 
            borderRadius: 40, 
            padding: 40, 
            display: 'flex', 
            gap: 30, 
            alignItems: 'center',
            transform: `scale(${spring({ frame: frame - (i * 15), fps: 30 })})`,
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: 60 }}>{card.icon}</div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.primary }}>{card.title}</div>
              <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>{card.desc}</div>
            </div>
          </div>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const FinalCTA: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <MovingGradient frame={frame} />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ 
          transform: `scale(${interpolate(frame, [0, 30], [0.8, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.back) })})`,
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
            boxShadow: `0 0 50px ${COLORS.secondary}60`,
            cursor: 'pointer'
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
            REJOIGNEZ LE MOUVEMENT.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Publicite: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ fontFamily: 'system-ui, sans-serif', overflow: 'hidden' }}>
      <Series>
        <Series.Sequence durationInFrames={150}>
          <Intro frame={frame} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
          <Discovery frame={frame - 150} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
          <Concept frame={frame - 600} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={300}>
          <Features frame={frame - 1050} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={450}>
          <FinalCTA frame={frame - 1350} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
