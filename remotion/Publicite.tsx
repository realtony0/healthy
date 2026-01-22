import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Img,
  staticFile,
} from 'remotion';

// Composant pour texte animé énergique
const AnimatedText: React.FC<{
  frame: number;
  text: string;
  fontSize: number;
  color: string;
  delay?: number;
}> = ({ frame, text, fontSize, color, delay = 0 }) => {
  const animatedFrame = frame - delay;
  const opacity = interpolate(animatedFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const scale = spring({
    frame: animatedFrame,
    fps: 30,
    config: { damping: 8, stiffness: 100 },
  });
  const translateY = interpolate(
    animatedFrame,
    [0, 15],
    [30, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  return (
    <div
      style={{
        opacity,
        transform: `scale(${0.8 + scale * 0.2}) translateY(${translateY}px)`,
        fontSize,
        fontWeight: 900,
        color,
        textAlign: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {text}
    </div>
  );
};

// Badge animé
const Badge: React.FC<{ frame: number; text: string; delay: number }> = ({
  frame,
  text,
  delay,
}) => {
  const animatedFrame = frame - delay;
  const opacity = interpolate(animatedFrame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const scale = spring({
    frame: animatedFrame,
    fps: 30,
    config: { damping: 10 },
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${0.5 + scale * 0.5})`,
        backgroundColor: '#1a472a',
        color: 'white',
        padding: '12px 24px',
        borderRadius: 30,
        fontSize: 18,
        fontWeight: 900,
        display: 'inline-block',
        boxShadow: '0 8px 30px rgba(26, 71, 42, 0.4)',
      }}
    >
      {text}
    </div>
  );
};

// Scène 1: Hook accrocheur (3s)
const Scene1: React.FC<{ frame: number }> = ({ frame }) => {
  const bgRotation = interpolate(frame, [0, 90], [0, 360]);
  const bgScale = interpolate(frame, [0, 90], [1, 1.2], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${bgRotation}deg, #1a472a 0%, #10b981 50%, #1a472a 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${bgScale})`,
      }}
    >
      <AnimatedText
        frame={frame}
        text="HEALTHY DAKAR"
        fontSize={72}
        color="white"
        delay={0}
      />
      <AnimatedText
        frame={frame}
        text="Votre nutrition livrée"
        fontSize={36}
        color="white"
        delay={20}
      />
    </AbsoluteFill>
  );
};

// Scène 2: Plats avec images (8s)
const Scene2: React.FC<{ frame: number }> = ({ frame }) => {
  const plats = [
    { name: 'Bowl Poulet', price: '3 500 FCFA', img: 'img/bowl-poulet-mais.jpeg' },
    { name: 'Bœuf & Patate', price: '4 200 FCFA', img: 'img/boeuf-puree-patate-douce.jpeg' },
    { name: 'Poisson Herbes', price: '3 900 FCFA', img: 'img/poisson-blanc-herbes.jpeg' },
  ];

  const currentPlatIndex = Math.floor((frame / 60) % plats.length);
  const platFrame = frame % 60;
  const plat = plats[currentPlatIndex];

  const imageOpacity = interpolate(platFrame, [0, 10, 50, 60], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  const imageScale = spring({
    frame: platFrame,
    fps: 30,
    config: { damping: 10 },
  });

  const textOpacity = interpolate(platFrame, [10, 20, 40, 50], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#fffdfa',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Img
          src={staticFile(plat.img)}
          style={{
            width: '80%',
            height: '60%',
            objectFit: 'cover',
            borderRadius: 40,
            opacity: imageOpacity,
            transform: `scale(${0.9 + imageScale * 0.1})`,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            left: 0,
            right: 0,
            opacity: textOpacity,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: '#1a472a',
              marginBottom: 10,
            }}
          >
            {plat.name}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: '#10b981',
            }}
          >
            {plat.price}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scène 3: Avantages (Frais, Halal) (6s)
const Scene3: React.FC<{ frame: number }> = ({ frame }) => {
  const items = [
    { icon: '🥗', text: '100% FRAIS', desc: 'Cuisiné chaque matin', color: '#10b981' },
    { icon: '✅', text: '100% HALAL', desc: 'Certifié authentique', color: '#1a472a' },
  ];

  const currentIndex = Math.floor((frame / 90) % items.length);
  const itemFrame = frame % 90;
  const item = items[currentIndex];

  const opacity = interpolate(itemFrame, [0, 15, 75, 90], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  const scale = spring({
    frame: itemFrame,
    fps: 30,
    config: { damping: 8 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${0.8 + scale * 0.2})`,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 120, marginBottom: 30 }}>{item.icon}</div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            marginBottom: 20,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          {item.text}
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            opacity: 0.95,
          }}
        >
          {item.desc}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scène 4: Site en action - Navigation rapide (8s)
const Scene4: React.FC<{ frame: number }> = ({ frame }) => {
  const scrollProgress = interpolate(frame, [0, 240], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Simuler un téléphone */}
      <div
        style={{
          width: 360,
          height: 780,
          backgroundColor: '#1a1a1a',
          borderRadius: 40,
          padding: 8,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fffdfa',
            borderRadius: 32,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div
            style={{
              height: 60,
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 900, color: '#1a472a' }}>
              Healthy
            </div>
            <div
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#1a472a',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 20,
                fontWeight: 900,
              }}
            >
              3
            </div>
          </div>

          {/* Contenu scrollable */}
          <div
            style={{
              transform: `translateY(${-scrollProgress * 400}px)`,
              transition: 'transform 0.1s',
            }}
          >
            <div style={{ padding: 20 }}>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 900,
                  color: '#1a472a',
                  marginBottom: 20,
                }}
              >
                Le Menu
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 15,
                    marginBottom: 15,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: 150,
                      backgroundColor: '#e6f5ed',
                      borderRadius: 15,
                      marginBottom: 10,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 900,
                      color: '#1a472a',
                      marginBottom: 5,
                    }}
                  >
                    Plat {i}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 900,
                      color: '#10b981',
                    }}
                  >
                    {3000 + i * 500} FCFA
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Texte overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}
      >
        <Badge frame={frame} text="Commandez en 3 clics" delay={30} />
      </div>
    </AbsoluteFill>
  );
};

// Scène 5: Prix et offres (6s)
const Scene5: React.FC<{ frame: number }> = ({ frame }) => {
  const offers = [
    { text: 'À partir de', price: '3 500', unit: 'FCFA', highlight: 'BOWLS' },
    { text: 'Abonnements', price: 'Sur mesure', highlight: 'ÉCONOMISEZ' },
  ];

  const currentIndex = Math.floor((frame / 90) % offers.length);
  const offerFrame = frame % 90;
  const offer = offers[currentIndex];

  const opacity = interpolate(offerFrame, [0, 15, 75, 90], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  const scale = spring({
    frame: offerFrame,
    fps: 30,
    config: { damping: 8 },
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #1a472a 0%, #10b981 100%)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${0.8 + scale * 0.2})`,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 20,
            opacity: 0.9,
          }}
        >
          {offer.text}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            marginBottom: 10,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          {offer.price}
          {offer.unit && (
            <span style={{ fontSize: 48, marginLeft: 10 }}>{offer.unit}</span>
          )}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '12px 30px',
            borderRadius: 30,
            display: 'inline-block',
            marginTop: 20,
          }}
        >
          {offer.highlight}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scène 6: Call to Action final (4s)
const Scene6: React.FC<{ frame: number }> = ({ frame }) => {
  const bgPulse = interpolate(
    frame,
    [0, 30, 60, 90, 120],
    [1, 1.1, 1, 1.1, 1],
    { extrapolateRight: 'clamp' }
  );
  const textScale = spring({
    frame,
    fps: 30,
    config: { damping: 8, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1a472a 0%, #10b981 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${bgPulse})`,
      }}
    >
      <div
        style={{
          transform: `scale(${0.9 + textScale * 0.1})`,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <AnimatedText
          frame={frame}
          text="COMMANDEZ MAINTENANT"
          fontSize={64}
          color="white"
          delay={0}
        />
        <AnimatedText
          frame={frame}
          text="healthy.sn"
          fontSize={48}
          color="white"
          delay={20}
        />
        <div style={{ marginTop: 40 }}>
          <Badge frame={frame} text="Livraison partout à Dakar" delay={40} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Publicite: React.FC = () => {
  const frame = useCurrentFrame();

  // Durée de chaque scène (en frames à 30fps)
  const scene1Duration = 90; // 3s - Hook
  const scene2Duration = 240; // 8s - Plats
  const scene3Duration = 180; // 6s - Avantages
  const scene4Duration = 240; // 8s - Site navigation
  const scene5Duration = 180; // 6s - Prix/Offres
  const scene6Duration = 120; // 4s - CTA

  if (frame < scene1Duration) {
    return <Scene1 frame={frame} />;
  } else if (frame < scene1Duration + scene2Duration) {
    return <Scene2 frame={frame - scene1Duration} />;
  } else if (frame < scene1Duration + scene2Duration + scene3Duration) {
    return <Scene3 frame={frame - scene1Duration - scene2Duration} />;
  } else if (
    frame <
    scene1Duration + scene2Duration + scene3Duration + scene4Duration
  ) {
    return (
      <Scene4
        frame={frame - scene1Duration - scene2Duration - scene3Duration}
      />
    );
  } else if (
    frame <
    scene1Duration +
      scene2Duration +
      scene3Duration +
      scene4Duration +
      scene5Duration
  ) {
    return (
      <Scene5
        frame={
          frame -
          scene1Duration -
          scene2Duration -
          scene3Duration -
          scene4Duration
        }
      />
    );
  } else {
    return (
      <Scene6
        frame={
          frame -
          scene1Duration -
          scene2Duration -
          scene3Duration -
          scene4Duration -
          scene5Duration
        }
      />
    );
  }
};
