import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  Img,
  staticFile,
  Easing,
  Sequence,
} from 'remotion';

// ============================================
// DA: EDITORIAL BRUTALIST × KINETIC TYPE
// ============================================
// Inspiration: Balenciaga, Off-White, Apple, Spotify Wrapped
// Style: Raw, Bold, Typographic, Unexpected
// Colors: Monochrome + Neon accents
// Motion: Kinetic, Rhythmic, Impactful
// ============================================

const COLORS = {
  black: '#000000',
  white: '#ffffff',
  neon: '#00ff87',
  hot: '#ff3366',
  electric: '#00d4ff',
  yellow: '#ffee00',
};

// Glitch effect component
const Glitch: React.FC<{ frame: number; children: React.ReactNode }> = ({
  frame,
  children,
}) => {
  const glitchActive = frame % 30 < 3;
  const offsetX = glitchActive ? Math.sin(frame * 10) * 8 : 0;
  const offsetY = glitchActive ? Math.cos(frame * 10) * 4 : 0;

  return (
    <div style={{ position: 'relative' }}>
      {glitchActive && (
        <>
          <div
            style={{
              position: 'absolute',
              top: offsetY,
              left: offsetX,
              color: COLORS.hot,
              opacity: 0.8,
              mixBlendMode: 'screen',
            }}
          >
            {children}
          </div>
          <div
            style={{
              position: 'absolute',
              top: -offsetY,
              left: -offsetX,
              color: COLORS.electric,
              opacity: 0.8,
              mixBlendMode: 'screen',
            }}
          >
            {children}
          </div>
        </>
      )}
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
};

// Kinetic text - text that moves with energy
const KineticText: React.FC<{
  frame: number;
  text: string;
  delay?: number;
  size?: number;
  color?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
}> = ({
  frame,
  text,
  delay = 0,
  size = 200,
  color = COLORS.white,
  direction = 'up',
  duration = 20,
}) => {
  const f = frame - delay;

  const getTransform = () => {
    const progress = interpolate(f, [0, duration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.exp),
    });

    switch (direction) {
      case 'left':
        return `translateX(${(1 - progress) * 100}%)`;
      case 'right':
        return `translateX(${(1 - progress) * -100}%)`;
      case 'down':
        return `translateY(${(1 - progress) * -100}%)`;
      default:
        return `translateY(${(1 - progress) * 100}%)`;
    }
  };

  const opacity = interpolate(f, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontSize: size,
        fontWeight: 900,
        color,
        letterSpacing: '-0.06em',
        lineHeight: 0.85,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textTransform: 'uppercase',
        opacity,
        transform: getTransform(),
        overflow: 'hidden',
      }}
    >
      {text}
    </div>
  );
};

// Counter animation
const Counter: React.FC<{
  frame: number;
  from: number;
  to: number;
  delay?: number;
  duration?: number;
  suffix?: string;
  size?: number;
  color?: string;
}> = ({
  frame,
  from,
  to,
  delay = 0,
  duration = 30,
  suffix = '',
  size = 200,
  color = COLORS.neon,
}) => {
  const f = frame - delay;
  const value = Math.round(
    interpolate(f, [0, duration], [from, to], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    })
  );

  const opacity = interpolate(f, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontSize: size,
        fontWeight: 900,
        color,
        letterSpacing: '-0.04em',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontVariantNumeric: 'tabular-nums',
        opacity,
      }}
    >
      {value.toLocaleString()}
      {suffix}
    </div>
  );
};

// Split screen component
const SplitScreen: React.FC<{
  frame: number;
  left: React.ReactNode;
  right: React.ReactNode;
  splitPosition?: number;
}> = ({ frame, left, right, splitPosition = 50 }) => {
  const split = interpolate(frame, [0, 25], [100, splitPosition], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${split}%`,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {left}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: `${100 - split}%`,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {right}
      </div>
      {/* Split line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${split}%`,
          width: 4,
          height: '100%',
          backgroundColor: COLORS.neon,
          boxShadow: `0 0 30px ${COLORS.neon}`,
        }}
      />
    </AbsoluteFill>
  );
};

// Stripe pattern
const Stripes: React.FC<{ color?: string; opacity?: number }> = ({
  color = COLORS.white,
  opacity = 0.03,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `repeating-linear-gradient(
        -45deg,
        ${color} 0px,
        ${color} 1px,
        transparent 1px,
        transparent 20px
      )`,
      opacity,
      pointerEvents: 'none',
    }}
  />
);

// ============================================
// SCENE 1: EXPLOSIVE INTRO (3s)
// ============================================
const Scene1: React.FC<{ frame: number }> = ({ frame }) => {
  const flash = frame < 5 ? 1 : 0;
  const scale = spring({
    frame,
    fps: 30,
    config: { damping: 8, stiffness: 200 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Stripes />
      {/* Flash */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: COLORS.white,
          opacity: flash,
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${0.5 + scale * 0.5})`,
        }}
      >
        <Glitch frame={frame}>
          <div style={{ textAlign: 'center' }}>
            <KineticText frame={frame} text="HEALTHY" size={180} delay={5} />
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                color: COLORS.neon,
                letterSpacing: '0.5em',
                marginTop: 30,
              }}
            >
              DAKAR
            </div>
          </div>
        </Glitch>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 2: MANIFESTO (4s)
// ============================================
const Scene2: React.FC<{ frame: number }> = ({ frame }) => {
  const words = ['FRAIS.', 'HALAL.', 'LIVRÉ.'];
  const wordIndex = Math.min(Math.floor(frame / 40), words.length - 1);
  const wordFrame = frame % 40;

  const bgColors = [COLORS.neon, COLORS.hot, COLORS.electric];
  const textColors = [COLORS.black, COLORS.white, COLORS.black];

  return (
    <AbsoluteFill style={{ backgroundColor: bgColors[wordIndex] }}>
      <Stripes color={COLORS.black} opacity={0.1} />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <KineticText
          frame={wordFrame}
          text={words[wordIndex]}
          size={220}
          color={textColors[wordIndex]}
          direction={wordIndex % 2 === 0 ? 'left' : 'right'}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 3: SPLIT SCREEN DISHES (6s)
// ============================================
const Scene3: React.FC<{ frame: number }> = ({ frame }) => {
  const dish1 = 'img/bowl-poulet-mais.jpeg';
  const dish2 = 'img/boeuf-puree-patate-douce.jpeg';

  const zoom1 = interpolate(frame, [0, 180], [1, 1.2], {
    extrapolateRight: 'clamp',
  });
  const zoom2 = interpolate(frame, [0, 180], [1.2, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <SplitScreen
      frame={frame}
      left={
        <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
          <Img
            src={staticFile(dish1)}
            style={{
              width: '200%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${zoom1})`,
              filter: 'contrast(1.1) saturate(1.2)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 100,
              left: 40,
              right: 0,
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: COLORS.white,
                textShadow: '0 4px 30px rgba(0,0,0,0.8)',
              }}
            >
              BOWL
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: COLORS.neon,
              }}
            >
              3500F
            </div>
          </div>
        </AbsoluteFill>
      }
      right={
        <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
          <Img
            src={staticFile(dish2)}
            style={{
              width: '200%',
              height: '100%',
              objectFit: 'cover',
              marginLeft: '-100%',
              transform: `scale(${zoom2})`,
              filter: 'contrast(1.1) saturate(1.2)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 100,
              right: 40,
              textAlign: 'right',
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: COLORS.white,
                textShadow: '0 4px 30px rgba(0,0,0,0.8)',
              }}
            >
              BŒUF
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: COLORS.hot,
              }}
            >
              4200F
            </div>
          </div>
        </AbsoluteFill>
      }
    />
  );
};

// ============================================
// SCENE 4: STATISTICS (5s)
// ============================================
const Scene4: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Stripes />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 60,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Counter
            frame={frame}
            from={0}
            to={80}
            delay={0}
            suffix="+"
            size={180}
            color={COLORS.neon}
          />
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: COLORS.white,
              letterSpacing: '0.2em',
              marginTop: 10,
            }}
          >
            CLIENTS SATISFAITS
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Counter
            frame={frame}
            from={0}
            to={100}
            delay={20}
            suffix="%"
            size={120}
            color={COLORS.hot}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: COLORS.white,
              letterSpacing: '0.2em',
              marginTop: 10,
            }}
          >
            HALAL CERTIFIÉ
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Counter
            frame={frame}
            from={0}
            to={6}
            delay={40}
            suffix="H"
            size={120}
            color={COLORS.electric}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: COLORS.white,
              letterSpacing: '0.2em',
              marginTop: 10,
            }}
          >
            CUISINÉS CE MATIN
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 5: RAPID FIRE DISHES (6s)
// ============================================
const Scene5: React.FC<{ frame: number }> = ({ frame }) => {
  const dishes = [
    { img: 'img/poisson-blanc-herbes.jpeg', name: 'POISSON', color: COLORS.electric },
    { img: 'img/energy-balls-mix.jpeg', name: 'ENERGY', color: COLORS.yellow },
    { img: 'img/smoothie-proteine.jpeg', name: 'SMOOTHIE', color: COLORS.hot },
    { img: 'img/poulet-grille-legumes.jpeg', name: 'POULET', color: COLORS.neon },
  ];

  const dishDuration = 45;
  const currentDish = Math.min(
    Math.floor(frame / dishDuration),
    dishes.length - 1
  );
  const dishFrame = frame % dishDuration;
  const dish = dishes[currentDish];

  const scale = interpolate(dishFrame, [0, 10], [1.3, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back),
  });

  const textY = interpolate(dishFrame, [5, 20], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Img
        src={staticFile(dish.img)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale})`,
          filter: 'contrast(1.2) brightness(0.8)',
        }}
      />
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(to top, ${COLORS.black} 0%, transparent 60%)`,
        }}
      />
      {/* Text */}
      <div
        style={{
          position: 'absolute',
          bottom: 150,
          left: 0,
          right: 0,
          textAlign: 'center',
          transform: `translateY(${textY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: 900,
            color: dish.color,
            letterSpacing: '-0.04em',
            textShadow: `0 0 60px ${dish.color}`,
          }}
        >
          {dish.name}
        </div>
      </div>
      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
        }}
      >
        {dishes.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentDish ? 60 : 20,
              height: 6,
              backgroundColor:
                i === currentDish ? dishes[i].color : 'rgba(255,255,255,0.3)',
              borderRadius: 3,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 6: DELIVERY ZONES GRID (4s)
// ============================================
const Scene6: React.FC<{ frame: number }> = ({ frame }) => {
  const zones = [
    'ALMADIES',
    'MERMOZ',
    'OUAKAM',
    'PLATEAU',
    'POINT E',
    'FANN',
    'LIBERTÉ',
    'YOFF',
    'PARCELLES',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Stripes />
      <AbsoluteFill
        style={{
          padding: 60,
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: 40 }}>
          <KineticText
            frame={frame}
            text="LIVRAISON"
            size={80}
            color={COLORS.neon}
            delay={0}
          />
          <KineticText
            frame={frame}
            text="EXPRESS"
            size={80}
            color={COLORS.white}
            delay={10}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            flex: 1,
            alignContent: 'center',
          }}
        >
          {zones.map((zone, i) => {
            const delay = 20 + i * 5;
            const f = frame - delay;
            const opacity = interpolate(f, [0, 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const x = interpolate(f, [0, 15], [50, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.exp),
            });

            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateX(${x}px)`,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: `2px solid ${COLORS.neon}`,
                  padding: '18px 28px',
                  fontSize: 22,
                  fontWeight: 800,
                  color: COLORS.white,
                  letterSpacing: '0.05em',
                }}
              >
                {zone}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 7: BUILD YOUR BOWL (4s)
// ============================================
const Scene7: React.FC<{ frame: number }> = ({ frame }) => {
  const ingredients = ['FÉCULENT', 'PROTÉINE', 'LÉGUMES', 'SAUCE'];
  
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.neon }}>
      <Stripes color={COLORS.black} opacity={0.15} />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: COLORS.black,
            letterSpacing: '0.3em',
            marginBottom: 20,
          }}
        >
          CRÉE TON
        </div>
        <Glitch frame={frame}>
          <KineticText
            frame={frame}
            text="BOWL"
            size={200}
            color={COLORS.black}
            delay={10}
          />
        </Glitch>

        <div
          style={{
            display: 'flex',
            gap: 20,
            marginTop: 60,
          }}
        >
          {ingredients.map((ing, i) => {
            const delay = 30 + i * 10;
            const f = frame - delay;
            const scale = spring({
              frame: f,
              fps: 30,
              config: { damping: 10 },
            });
            const opacity = interpolate(f, [0, 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `scale(${0.5 + scale * 0.5})`,
                  backgroundColor: COLORS.black,
                  color: COLORS.neon,
                  padding: '16px 20px',
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: '0.05em',
                }}
              >
                {ing}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 8: FINAL CTA (4s)
// ============================================
const Scene8: React.FC<{ frame: number }> = ({ frame }) => {
  const pulse = Math.sin(frame * 0.15) * 0.05 + 1;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <Stripes />
      {/* Animated gradient */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.neon}30 0%, transparent 70%)`,
          animation: 'pulse 2s infinite',
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <KineticText
          frame={frame}
          text="COMMANDE"
          size={100}
          color={COLORS.white}
          delay={0}
        />
        <KineticText
          frame={frame}
          text="MAINTENANT"
          size={100}
          color={COLORS.neon}
          delay={10}
        />

        <div
          style={{
            marginTop: 60,
            transform: `scale(${pulse})`,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.neon,
              padding: '30px 60px',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: COLORS.black,
                borderRadius: '50%',
              }}
            />
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: COLORS.black,
                letterSpacing: '-0.02em',
              }}
            >
              HEALTHY.SN
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 20,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.2em',
          }}
        >
          DAKAR • SÉNÉGAL
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================
// MAIN COMPOSITION
// ============================================
export const Publicite: React.FC = () => {
  const frame = useCurrentFrame();

  const scenes = [
    { duration: 90, Component: Scene1 },   // 3s - Intro explosive
    { duration: 120, Component: Scene2 },  // 4s - Manifesto
    { duration: 180, Component: Scene3 },  // 6s - Split screen
    { duration: 150, Component: Scene4 },  // 5s - Statistics
    { duration: 180, Component: Scene5 },  // 6s - Rapid fire
    { duration: 120, Component: Scene6 },  // 4s - Delivery grid
    { duration: 120, Component: Scene7 },  // 4s - Build bowl
    { duration: 120, Component: Scene8 },  // 4s - CTA
  ];

  let accumulatedFrames = 0;
  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    if (frame < accumulatedFrames + scene.duration) {
      const sceneFrame = frame - accumulatedFrames;
      return <scene.Component frame={sceneFrame} />;
    }
    accumulatedFrames += scene.duration;
  }

  const lastScene = scenes[scenes.length - 1];
  return <lastScene.Component frame={lastScene.duration - 1} />;
};
