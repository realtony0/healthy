import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Img,
  staticFile,
  Easing,
  Sequence,
} from 'remotion';
import React from 'react';

// ============================================
// DA: PASTEL / FUN / CALM
// ============================================
const COLORS = {
  bgGreen: '#e6f5ed',
  bgYellow: '#fff9e6',
  primary: '#1a472a',
  secondary: '#10b981',
  accent: '#ffbe0b',
  text: '#1a472a',
  white: '#ffffff',
};

// --- Helper Components ---

const FloatingIngredient: React.FC<{ 
  icon: string; 
  frame: number; 
  top: string; 
  left: string; 
  delay: number 
}> = ({ icon, frame, top, left, delay }) => {
  const f = frame - delay;
  const float = Math.sin(f / 20) * 10;
  const opacity = interpolate(f, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  
  return (
    <div style={{
      position: 'absolute',
      top,
      left,
      fontSize: 40,
      opacity,
      transform: `translateY(${float}px)`,
    }}>
      {icon}
    </div>
  );
};

const MobileFrame: React.FC<{ children: React.ReactNode; frame: number }> = ({ children, frame }) => {
  const scale = spring({
    frame,
    fps: 30,
    config: { damping: 12 },
  });

  return (
    <div style={{
      width: '85%',
      height: '80%',
      backgroundColor: 'white',
      borderRadius: 40,
      border: `8px solid ${COLORS.primary}`,
      overflow: 'hidden',
      position: 'relative',
      transform: `scale(${scale})`,
      boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
    }}>
      {/* Notch */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 120,
        height: 25,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        zIndex: 10,
      }} />
      {children}
    </div>
  );
};

// ============================================
// SCENES
// ============================================

// 1. Intro (0-5s)
const Scene1: React.FC<{ frame: number }> = ({ frame }) => {
  const logoZoom = interpolate(frame, [0, 150], [0.8, 1.1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgGreen, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ opacity, transform: `scale(${logoZoom})`, textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 100, fontWeight: 900, color: COLORS.primary, marginBottom: 20 }}>Healthy</div>
        <div style={{ 
          opacity: textOpacity, 
          fontSize: 32, 
          fontWeight: 700, 
          color: COLORS.primary,
          lineHeight: 1.4 
        }}>
          Healthy Dakar –<br />Repas sains, simples et rapides
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 2. Découverte du site (5-20s)
const Scene2: React.FC<{ frame: number }> = ({ frame }) => {
  const scrollY = interpolate(frame, [0, 450], [0, -800], { extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' });
  
  const dishes = [
    { name: 'Bowl Poulet', img: 'img/bowl-poulet-mais.jpeg' },
    { name: 'Poisson aux Herbes', img: 'img/poisson-blanc-herbes.jpeg' },
    { name: 'Bœuf Patate', img: 'img/boeuf-puree-patate-douce.jpeg' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgYellow, justifyContent: 'center', alignItems: 'center' }}>
      <MobileFrame frame={frame}>
        <div style={{ transform: `translateY(${scrollY}px)`, padding: '60px 20px' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.primary, marginBottom: 30, textAlign: 'center' }}>www.healthy.sn</div>
          {dishes.map((dish, i) => (
            <div key={i} style={{ marginBottom: 30, borderRadius: 20, overflow: 'hidden', backgroundColor: '#f9f9f9' }}>
              <Img src={staticFile(dish.img)} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: 15, fontWeight: 800, color: COLORS.primary }}>{dish.name}</div>
            </div>
          ))}
          <div style={{ 
            backgroundColor: COLORS.accent, 
            padding: '20px', 
            borderRadius: 15, 
            textAlign: 'center', 
            fontWeight: 900,
            color: COLORS.primary,
            marginTop: 20,
            animation: 'pulse 1s infinite'
          }}>
            Commander maintenant
          </div>
        </div>
      </MobileFrame>
      
      <div style={{
        position: 'absolute',
        top: 80,
        width: '80%',
        textAlign: 'center',
        opacity: textOpacity,
        fontSize: 40,
        fontWeight: 900,
        color: COLORS.primary,
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: '20px',
        borderRadius: 20,
        backdropFilter: 'blur(10px)',
      }}>
        Tout ce que vous aimez,<br />à portée de clic !
      </div>
    </AbsoluteFill>
  );
};

// 3. Page Concept (20-35s)
const Scene3: React.FC<{ frame: number }> = ({ frame }) => {
  const text1 = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const text2 = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: 'clamp' });
  const text3 = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgGreen, padding: 60, justifyContent: 'center' }}>
      <div style={{ fontSize: 40, fontWeight: 900, color: COLORS.primary, marginBottom: 60, textAlign: 'center' }}>Notre Concept</div>
      
      <div style={{ spaceY: 40 }}>
        {[
          { text: "Repas frais et équilibrés préparés chaque jour", opacity: text1, icon: '🥗' },
          { text: "100% Halal et nutritifs", opacity: text2, icon: '✅' },
          { text: "Livraison rapide partout à Dakar", opacity: text3, icon: '🚀' },
        ].map((v, i) => (
          <div key={i} style={{ opacity: v.opacity, display: 'flex', gap: 20, alignItems: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 50 }}>{v.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.primary, lineHeight: 1.3 }}>{v.text}</div>
          </div>
        ))}
      </div>

      <FloatingIngredient icon="🍅" frame={frame} top="15%" left="10%" delay={0} />
      <FloatingIngredient icon="🥑" frame={frame} top="20%" left="80%" delay={30} />
      <FloatingIngredient icon="🥕" frame={frame} top="75%" left="15%" delay={60} />
      <FloatingIngredient icon="🥦" frame={frame} top="80%" left="75%" delay={90} />
    </AbsoluteFill>
  );
};

// 4. Fonctionnalités (35-45s)
const Scene4: React.FC<{ frame: number }> = ({ frame }) => {
  const items = [
    { icon: '💳', title: 'Paiement facile', desc: 'Cash, Wave, Orange Money', delay: 0 },
    { icon: '🚚', title: 'Livraison rapide', desc: 'À domicile ou au bureau', delay: 20 },
    { icon: '🍱', title: 'Choix variés', desc: 'Pour tous les goûts', delay: 40 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgYellow, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
      <div style={{ width: '100%', spaceY: 40 }}>
        {items.map((item, i) => {
          const f = frame - item.delay;
          const opacity = interpolate(f, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
          const y = interpolate(f, [0, 20], [30, 0], { extrapolateRight: 'clamp' });
          
          return (
            <div key={i} style={{ opacity, transform: `translateY(${y}px)`, textAlign: 'center', marginBottom: 50 }}>
              <div style={{ fontSize: 80, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: COLORS.primary }}>{item.title}</div>
              <div style={{ fontSize: 20, color: '#666', fontWeight: 600 }}>{item.desc}</div>
            </div>
          );
        })}
      </div>
      
      {frame > 100 && (
        <div style={{ 
          marginTop: 20, 
          fontSize: 40, 
          fontWeight: 900, 
          color: COLORS.secondary,
          animation: 'bounce 1s infinite'
        }}>
          Simple, rapide et pratique !
        </div>
      )}
    </AbsoluteFill>
  );
};

// 5. Appel à l’action final (45-60s)
const Scene5: React.FC<{ frame: number }> = ({ frame }) => {
  const pulse = Math.sin(frame / 10) * 0.05 + 1;
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const logoFade = interpolate(frame, [400, 450], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgGreen, justifyContent: 'center', alignItems: 'center', opacity: logoFade }}>
      <div style={{ opacity, textAlign: 'center', padding: 40 }}>
        <div style={{ 
          fontSize: 50, 
          fontWeight: 900, 
          color: COLORS.primary, 
          marginBottom: 60,
          transform: `scale(${pulse})` 
        }}>
          Commander maintenant
        </div>
        
        <div style={{ fontSize: 36, fontWeight: 800, color: COLORS.primary, marginBottom: 20 }}>
          Visitez www.healthy.sn et commandez dès maintenant !
        </div>
        
        <div style={{ fontSize: 80, fontWeight: 900, color: COLORS.primary, marginTop: 40 }}>Healthy</div>
      </div>
    </AbsoluteFill>
  );
};

export const Publicite: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={150}>
        <Scene1 frame={frame} />
      </Sequence>
      <Sequence from={150} durationInFrames={450}>
        <Scene2 frame={frame - 150} />
      </Sequence>
      <Sequence from={600} durationInFrames={450}>
        <Scene3 frame={frame - 600} />
      </Sequence>
      <Sequence from={1050} durationInFrames={300}>
        <Scene4 frame={frame - 1050} />
      </Sequence>
      <Sequence from={1350} durationInFrames={450}>
        <Scene5 frame={frame - 1350} />
      </Sequence>
    </AbsoluteFill>
  );
};
