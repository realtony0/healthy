import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  Img,
  staticFile,
  Easing,
  Audio,
} from 'remotion';

// ============================================
// DIRECTION ARTISTIQUE: CINEMATIC LUXURY FOOD
// ============================================
// Inspiration: Apple, high-end food brands, Netflix intros
// Palette: Deep greens, warm golds, clean whites
// Typography: Bold, minimal, impactful
// Motion: Smooth, elegant, satisfying
// ============================================

const COLORS = {
  dark: '#0a0a0a',
  forest: '#0d2818',
  emerald: '#10b981',
  gold: '#d4a574',
  cream: '#faf7f2',
  white: '#ffffff',
};

// Grain/noise overlay for cinematic feel
const FilmGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.03 }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      opacity,
      pointerEvents: 'none',
      zIndex: 1000,
    }}
  />
);

// Animated gradient background
const GradientBg: React.FC<{ frame: number; colors: string[] }> = ({
  frame,
  colors,
}) => {
  const rotation = interpolate(frame, [0, 300], [0, 360], {
    extrapolateRight: 'extend',
  });
  return (
    <div
      style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        right: '-50%',
        bottom: '-50%',
        background: `conic-gradient(from ${rotation}deg at 50% 50%, ${colors.join(', ')})`,
        filter: 'blur(100px)',
        opacity: 0.6,
      }}
    />
  );
};

// Cinematic text reveal
const CinematicText: React.FC<{
  frame: number;
  text: string;
  delay?: number;
  size?: number;
  color?: string;
  weight?: number;
  tracking?: number;
}> = ({
  frame,
  text,
  delay = 0,
  size = 120,
  color = COLORS.white,
  weight = 900,
  tracking = -0.04,
}) => {
  const f = frame - delay;
  
  const clipProgress = interpolate(f, [0, 30], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  const opacity = interpolate(f, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const y = interpolate(f, [0, 30], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        fontSize: size,
        fontWeight: weight,
        color,
        letterSpacing: `${tracking}em`,
        lineHeight: 1,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        opacity,
        transform: `translateY(${y}px)`,
        clipPath: `inset(0 ${100 - clipProgress}% 0 0)`,
      }}
    >
      {text}
    </div>
  );
};

// Horizontal line reveal
const LineReveal: React.FC<{
  frame: number;
  delay?: number;
  color?: string;
  width?: number;
}> = ({ frame, delay = 0, color = COLORS.gold, width = 200 }) => {
  const f = frame - delay;
  const progress = interpolate(f, [0, 25], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: width * (progress / 100),
        height: 3,
        backgroundColor: color,
        marginTop: 30,
        marginBottom: 30,
      }}
    />
  );
};

// Image with cinematic reveal
const CinematicImage: React.FC<{
  frame: number;
  src: string;
  delay?: number;
  scale?: number;
}> = ({ frame, src, delay = 0, scale = 1 }) => {
  const f = frame - delay;
  
  const clipProgress = interpolate(f, [0, 40], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  const imageScale = interpolate(f, [0, 60], [1.3, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  
  const opacity = interpolate(f, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: 380 * scale,
        height: 380 * scale,
        borderRadius: 40,
        overflow: 'hidden',
        opacity,
        clipPath: `inset(${clipProgress}% 0 0 0)`,
        boxShadow: '0 60px 120px rgba(0,0,0,0.5)',
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${imageScale})`,
        }}
      />
    </div>
  );
};

// Badge component
const Badge: React.FC<{
  frame: number;
  text: string;
  delay?: number;
  variant?: 'light' | 'dark';
}> = ({ frame, text, delay = 0, variant = 'dark' }) => {
  const f = frame - delay;
  const scale = spring({
    frame: f,
    fps: 30,
    config: { damping: 12, stiffness: 150 },
  });
  const opacity = interpolate(f, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${0.8 + scale * 0.2})`,
        backgroundColor: variant === 'dark' ? COLORS.forest : COLORS.cream,
        color: variant === 'dark' ? COLORS.white : COLORS.forest,
        padding: '16px 32px',
        borderRadius: 50,
        fontSize: 18,
        fontWeight: 800,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
    >
      {text}
    </div>
  );
};

// ============================================
// SCENE 1: CINEMATIC INTRO (4s)
// ============================================
const Scene1: React.FC<{ frame: number }> = ({ frame }) => {
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const logoScale = spring({
    frame: frame - 15,
    fps: 30,
    config: { damping: 15, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <GradientBg frame={frame} colors={[COLORS.forest, COLORS.dark, COLORS.emerald, COLORS.dark]} />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity: fadeIn,
        }}
      >
        <div
          style={{
            transform: `scale(${0.9 + logoScale * 0.1})`,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: COLORS.gold,
              letterSpacing: '0.3em',
              marginBottom: 30,
              textTransform: 'uppercase',
            }}
          >
            Dakar • Sénégal
          </div>
          <CinematicText frame={frame} text="HEALTHY" delay={20} size={160} />
          <LineReveal frame={frame} delay={40} />
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: COLORS.cream,
              opacity: 0.8,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            L'art de bien manger
          </div>
        </div>
      </AbsoluteFill>
      <FilmGrain />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 2: HERO DISH REVEAL (6s)
// ============================================
const Scene2: React.FC<{ frame: number }> = ({ frame }) => {
  const bgFade = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.cream, opacity: bgFade }}>
      <AbsoluteFill
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 80,
          padding: 80,
        }}
      >
        <div style={{ flex: 1, maxWidth: 500 }}>
          <Badge frame={frame} text="Signature" delay={15} variant="dark" />
          <div style={{ height: 40 }} />
          <CinematicText
            frame={frame}
            text="Bowl"
            delay={25}
            size={100}
            color={COLORS.forest}
          />
          <CinematicText
            frame={frame}
            text="Poulet"
            delay={35}
            size={100}
            color={COLORS.forest}
          />
          <LineReveal frame={frame} delay={50} color={COLORS.emerald} />
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: COLORS.emerald,
              marginTop: 20,
            }}
          >
            3 500 F
          </div>
          <div
            style={{
              fontSize: 22,
              color: COLORS.forest,
              opacity: 0.6,
              marginTop: 15,
              fontWeight: 500,
            }}
          >
            450 kcal • 35g protéines
          </div>
        </div>
        <CinematicImage
          frame={frame}
          src="img/bowl-poulet-mais.jpeg"
          delay={20}
          scale={1.2}
        />
      </AbsoluteFill>
      <FilmGrain opacity={0.02} />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 3: MULTI-DISH SHOWCASE (8s)
// ============================================
const Scene3: React.FC<{ frame: number }> = ({ frame }) => {
  const dishes = [
    { img: 'img/boeuf-puree-patate-douce.jpeg', name: 'Bœuf Signature', price: '4 200 F' },
    { img: 'img/poisson-blanc-herbes.jpeg', name: 'Poisson Herbes', price: '3 900 F' },
    { img: 'img/poulet-grille-legumes.jpeg', name: 'Poulet Grillé', price: '3 500 F' },
  ];

  const currentDish = Math.floor(frame / 80) % dishes.length;
  const dishFrame = frame % 80;

  const fadeIn = interpolate(dishFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(dishFrame, [60, 80], [1, 0], {
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(fadeIn, fadeOut);

  const scale = interpolate(dishFrame, [0, 80], [1.1, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <AbsoluteFill style={{ opacity }}>
        <Img
          src={staticFile(dishes[currentDish].img)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${scale})`,
            filter: 'brightness(0.7)',
          }}
        />
      </AbsoluteFill>
      
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
        }}
      />
      
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 200,
          opacity,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: COLORS.white,
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}
          >
            {dishes[currentDish].name}
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: COLORS.gold,
            }}
          >
            {dishes[currentDish].price}
          </div>
        </div>
      </AbsoluteFill>
      
      {/* Progress dots */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 12,
        }}
      >
        {dishes.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentDish ? 40 : 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: i === currentDish ? COLORS.gold : 'rgba(255,255,255,0.3)',
              transition: 'width 0.3s ease',
            }}
          />
        ))}
      </div>
      <FilmGrain />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 4: FEATURES / VALUES (6s)
// ============================================
const Scene4: React.FC<{ frame: number }> = ({ frame }) => {
  const features = [
    { icon: '🌿', title: 'Frais', desc: 'Cuisiné ce matin' },
    { icon: '✓', title: 'Halal', desc: '100% certifié' },
    { icon: '⚡', title: 'Express', desc: 'Livré chez vous' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.forest }}>
      <GradientBg
        frame={frame}
        colors={[COLORS.forest, COLORS.dark, COLORS.emerald + '40', COLORS.forest]}
      />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 60,
            alignItems: 'center',
          }}
        >
          {features.map((feature, i) => {
            const delay = i * 25;
            const f = frame - delay;
            const opacity = interpolate(f, [0, 20], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const x = interpolate(f, [0, 25], [-50, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            });

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 40,
                  opacity,
                  transform: `translateX(${x}px)`,
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 30,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 50,
                  }}
                >
                  {feature.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 56,
                      fontWeight: 900,
                      color: COLORS.white,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {feature.title}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      color: COLORS.gold,
                      fontWeight: 500,
                    }}
                  >
                    {feature.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <FilmGrain />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 5: SNACKS & ENERGY (5s)
// ============================================
const Scene5: React.FC<{ frame: number }> = ({ frame }) => {
  const snacks = [
    { img: 'img/energy-balls-mix.jpeg', name: 'Energy Balls' },
    { img: 'img/smoothie-proteine.jpeg', name: 'Smoothies' },
    { img: 'img/overnight-oats.jpeg', name: 'Overnight Oats' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.cream }}>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 60,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Badge frame={frame} text="Snacks & Energy" delay={0} />
          <div style={{ height: 30 }} />
          <CinematicText
            frame={frame}
            text="Le plein"
            delay={15}
            size={80}
            color={COLORS.forest}
          />
          <CinematicText
            frame={frame}
            text="d'énergie"
            delay={25}
            size={80}
            color={COLORS.forest}
          />
        </div>

        <div style={{ display: 'flex', gap: 30, marginTop: 40 }}>
          {snacks.map((snack, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <CinematicImage
                frame={frame}
                src={snack.img}
                delay={40 + i * 15}
                scale={0.7}
              />
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: COLORS.forest,
                  marginTop: 20,
                }}
              >
                {snack.name}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
      <FilmGrain opacity={0.02} />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 6: DELIVERY ZONES (4s)
// ============================================
const Scene6: React.FC<{ frame: number }> = ({ frame }) => {
  const zones = [
    'Almadies', 'Mermoz', 'Ouakam', 'Plateau', 'Point E',
    'Fann', 'Liberté', 'Yoff', 'Parcelles', 'Sacré-Cœur',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <GradientBg
        frame={frame}
        colors={[COLORS.emerald + '30', COLORS.dark, COLORS.forest, COLORS.dark]}
      />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: COLORS.gold,
            letterSpacing: '0.2em',
            marginBottom: 30,
            textTransform: 'uppercase',
          }}
        >
          Livraison Express
        </div>
        <CinematicText frame={frame} text="Partout" delay={10} size={100} />
        <CinematicText frame={frame} text="à Dakar" delay={20} size={100} />
        
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 15,
            maxWidth: 800,
            marginTop: 60,
          }}
        >
          {zones.map((zone, i) => {
            const delay = 40 + i * 5;
            const f = frame - delay;
            const opacity = interpolate(f, [0, 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const scale = spring({
              frame: f,
              fps: 30,
              config: { damping: 15 },
            });

            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `scale(${0.8 + scale * 0.2})`,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  padding: '12px 24px',
                  borderRadius: 30,
                  fontSize: 18,
                  fontWeight: 600,
                  color: COLORS.white,
                }}
              >
                {zone}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <FilmGrain />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 7: FINAL CTA (5s)
// ============================================
const Scene7: React.FC<{ frame: number }> = ({ frame }) => {
  const pulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [1, 1.05, 1],
    { extrapolateRight: 'clamp' }
  );

  const glowOpacity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.3, 0.6, 0.3]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <GradientBg
        frame={frame}
        colors={[COLORS.emerald, COLORS.forest, COLORS.dark, COLORS.emerald]}
      />
      
      {/* Glow effect */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.emerald}60 0%, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />
      
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 40,
        }}
      >
        <CinematicText frame={frame} text="Commandez" delay={0} size={90} />
        <CinematicText frame={frame} text="maintenant" delay={15} size={90} />
        
        <LineReveal frame={frame} delay={35} width={300} />
        
        <div
          style={{
            transform: `scale(${pulse})`,
            marginTop: 20,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.white,
              padding: '30px 60px',
              borderRadius: 60,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              boxShadow: `0 20px 60px ${COLORS.emerald}40`,
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: COLORS.forest,
                letterSpacing: '-0.02em',
              }}
            >
              healthy.sn
            </div>
          </div>
        </div>
        
        <div
          style={{
            fontSize: 22,
            color: COLORS.cream,
            opacity: 0.7,
            marginTop: 30,
            fontWeight: 500,
          }}
        >
          Rejoint par 80 clients satisfaits
        </div>
      </AbsoluteFill>
      <FilmGrain />
    </AbsoluteFill>
  );
};

// ============================================
// MAIN COMPOSITION
// ============================================
export const Publicite: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene durations (in frames at 30fps)
  const scenes = [
    { duration: 120, Component: Scene1 },  // 4s - Intro
    { duration: 180, Component: Scene2 },  // 6s - Hero dish
    { duration: 240, Component: Scene3 },  // 8s - Multi dishes
    { duration: 180, Component: Scene4 },  // 6s - Features
    { duration: 150, Component: Scene5 },  // 5s - Snacks
    { duration: 120, Component: Scene6 },  // 4s - Delivery
    { duration: 150, Component: Scene7 },  // 5s - CTA
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

  // Fallback to last scene
  const lastScene = scenes[scenes.length - 1];
  return <lastScene.Component frame={frame - accumulatedFrames + lastScene.duration} />;
};
