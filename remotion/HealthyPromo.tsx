import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from 'remotion';

// Scène 1: Introduction avec titre
const Scene1: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const scale = spring({ frame, fps: 30, config: { damping: 10 } });
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a472a',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      <div
        style={{
          transform: `scale(${0.8 + scale * 0.2})`,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1
          style={{
            fontSize: 140,
            fontWeight: 900,
            marginBottom: 30,
            letterSpacing: '-0.02em',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Healthy Dakar
        </h1>
        <p
          style={{
            fontSize: 52,
            fontWeight: 600,
            opacity: 0.95,
            letterSpacing: '0.02em',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Votre nutrition, livrée chaque jour
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scène 2: Avantages
const Scene2: React.FC<{ frame: number }> = ({ frame }) => {
  const sceneFrame = frame;
  const opacity = interpolate(sceneFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  
  const items = [
    { icon: '🥗', text: '100% Frais', desc: 'Cuisiné chaque matin' },
    { icon: '✅', text: '100% Halal', desc: 'Certifié et authentique' },
    { icon: '🚚', text: 'Livraison Express', desc: 'Partout à Dakar' },
  ];
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#fffdfa',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        padding: 80,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 1200 }}>
        <h2
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#1a472a',
            marginBottom: 60,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Pourquoi Healthy Dakar ?
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 60,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {items.map((item, i) => {
            const itemOpacity = interpolate(
              sceneFrame,
              [20 + i * 30, 40 + i * 30],
              [0, 1],
              { extrapolateRight: 'clamp' }
            );
            const translateY = interpolate(
              sceneFrame,
              [20 + i * 30, 40 + i * 30],
              [30, 0],
              { extrapolateRight: 'clamp' }
            );
            
            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `translateY(${translateY}px)`,
                  backgroundColor: 'white',
                  padding: '40px 50px',
                  borderRadius: 30,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                  minWidth: 280,
                }}
              >
                <div style={{ fontSize: 80, marginBottom: 20 }}>{item.icon}</div>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    color: '#1a472a',
                    marginBottom: 10,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {item.text}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    color: '#666',
                    fontWeight: 500,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scène 3: Produits
const Scene3: React.FC<{ frame: number }> = ({ frame }) => {
  const sceneFrame = frame;
  const opacity = interpolate(sceneFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  
  const products = [
    { name: 'Bowls Personnalisés', price: 'À partir de 3 500 FCFA' },
    { name: 'Plats Signature', price: '3 500 - 4 500 FCFA' },
    { name: 'Abonnements', price: 'Sur mesure' },
  ];
  
  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        padding: 80,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 1200 }}>
        <h2
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: 'white',
            marginBottom: 60,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Nos Produits
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 40,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {products.map((product, i) => {
            const itemOpacity = interpolate(
              sceneFrame,
              [20 + i * 25, 40 + i * 25],
              [0, 1],
              { extrapolateRight: 'clamp' }
            );
            
            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  padding: '40px 50px',
                  borderRadius: 25,
                  border: '2px solid rgba(255,255,255,0.2)',
                  minWidth: 300,
                }}
              >
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 900,
                    color: 'white',
                    marginBottom: 15,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {product.name}
                </div>
                <div
                  style={{
                    fontSize: 28,
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {product.price}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scène 4: Call to Action
const Scene4: React.FC<{ frame: number }> = ({ frame }) => {
  const sceneFrame = frame;
  const opacity = interpolate(sceneFrame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const scale = spring({ frame: sceneFrame, fps: 30, config: { damping: 8 } });
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a472a',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      <div
        style={{
          transform: `scale(${0.9 + scale * 0.1})`,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h2
          style={{
            fontSize: 100,
            fontWeight: 900,
            marginBottom: 40,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Commandez maintenant
        </h2>
        <p
          style={{
            fontSize: 48,
            fontWeight: 600,
            opacity: 0.95,
            marginBottom: 60,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Rejoignez 80 clients satisfaits à Dakar
        </p>
        <div
          style={{
            fontSize: 36,
            opacity: 0.9,
            fontWeight: 500,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          healthy.sn
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const HealthyPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Durée de chaque scène (en frames)
  const scene1Duration = 90; // 3 secondes
  const scene2Duration = 150; // 5 secondes
  const scene3Duration = 150; // 5 secondes
  const scene4Duration = 90; // 3 secondes

  // Déterminer quelle scène afficher
  if (frame < scene1Duration) {
    return <Scene1 frame={frame} />;
  } else if (frame < scene1Duration + scene2Duration) {
    return <Scene2 frame={frame - scene1Duration} />;
  } else if (frame < scene1Duration + scene2Duration + scene3Duration) {
    return <Scene3 frame={frame - scene1Duration - scene2Duration} />;
  } else {
    return <Scene4 frame={frame - scene1Duration - scene2Duration - scene3Duration} />;
  }
};
