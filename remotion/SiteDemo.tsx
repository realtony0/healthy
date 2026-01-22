import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from 'remotion';

// Composant pour simuler un écran de téléphone
const PhoneScreen: React.FC<{ frame: number; content: React.ReactNode }> = ({ frame, content }) => {
  const scale = spring({ frame, fps: 30, config: { damping: 10 } });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  
  return (
    <div
      style={{
        width: 375,
        height: 812,
        backgroundColor: '#000',
        borderRadius: 40,
        padding: 8,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        transform: `scale(${0.8 + scale * 0.2})`,
        opacity,
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
        {content}
      </div>
    </div>
  );
};

// Composant pour simuler un écran d'ordinateur
const DesktopScreen: React.FC<{ frame: number; content: React.ReactNode }> = ({ frame, content }) => {
  const scale = spring({ frame, fps: 30, config: { damping: 10 } });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  
  return (
    <div
      style={{
        width: 1200,
        height: 800,
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 12,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        transform: `scale(${0.9 + scale * 0.1})`,
        opacity,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fffdfa',
          borderRadius: 8,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {content}
      </div>
    </div>
  );
};

// Scène 1: Page d'accueil mobile
const Scene1Mobile: React.FC<{ frame: number }> = ({ frame }) => {
  const scrollY = interpolate(frame, [0, 90], [0, -400], { extrapolateRight: 'clamp' });
  
  return (
    <PhoneScreen
      frame={frame}
      content={
        <div style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
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
            <div style={{ fontSize: 24, fontWeight: 900, color: '#1a472a' }}>Healthy</div>
            <div style={{ width: 40, height: 40, backgroundColor: '#f0f0f0', borderRadius: 12 }} />
          </div>
          
          {/* Hero Section */}
          <div
            style={{
              padding: '40px 20px',
              backgroundColor: '#fffdfa',
              transform: `translateY(${scrollY}px)`,
            }}
          >
            <div style={{ fontSize: 12, color: '#1a472a', backgroundColor: '#e6f5ed', padding: '8px 16px', borderRadius: 20, display: 'inline-block', marginBottom: 20, fontWeight: 700 }}>
              ✨ Cuisiné ce matin à Dakar
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 900, color: '#1a472a', marginBottom: 20, lineHeight: 1.1 }}>
              Sain.<br />Frais.<br />
              <span style={{ color: '#10b981', fontStyle: 'italic' }}>Prêt.</span>
            </h1>
            <p style={{ fontSize: 16, color: '#666', marginBottom: 30, lineHeight: 1.6 }}>
              L'excellence nutritionnelle livrée chez vous. Des repas frais, équilibrés et 100% halal.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, backgroundColor: '#1a472a', color: 'white', padding: '16px', borderRadius: 16, textAlign: 'center', fontWeight: 900, fontSize: 14 }}>
                Commander
              </div>
              <div style={{ flex: 1, border: '2px solid #1a472a', color: '#1a472a', padding: '16px', borderRadius: 16, textAlign: 'center', fontWeight: 900, fontSize: 14 }}>
                S'abonner
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

// Scène 2: Page d'accueil desktop
const Scene2Desktop: React.FC<{ frame: number }> = ({ frame }) => {
  const scrollY = interpolate(frame, [0, 90], [0, -300], { extrapolateRight: 'clamp' });
  
  return (
    <DesktopScreen
      frame={frame}
      content={
        <div style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
          {/* Header */}
          <div
            style={{
              height: 80,
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 60px',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 900, color: '#1a472a' }}>Healthy Dakar</div>
            <div style={{ display: 'flex', gap: 30, fontSize: 14, fontWeight: 700, color: '#666' }}>
              <span>Le Menu</span>
              <span>Abonnements</span>
              <span>Concept</span>
              <span>Avis</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 40, height: 40, backgroundColor: '#f0f0f0', borderRadius: 12 }} />
              <div style={{ width: 100, height: 40, backgroundColor: '#1a472a', borderRadius: 12 }} />
            </div>
          </div>
          
          {/* Hero Section */}
          <div
            style={{
              padding: '80px 60px',
              backgroundColor: '#fffdfa',
              transform: `translateY(${scrollY}px)`,
            }}
          >
            <div style={{ fontSize: 14, color: '#1a472a', backgroundColor: '#e6f5ed', padding: '10px 20px', borderRadius: 25, display: 'inline-block', marginBottom: 30, fontWeight: 700 }}>
              ✨ Cuisiné ce matin à Dakar
            </div>
            <h1 style={{ fontSize: 120, fontWeight: 900, color: '#1a472a', marginBottom: 30, lineHeight: 1 }}>
              Sain. Frais.<br />
              <span style={{ color: '#10b981', fontStyle: 'italic' }}>Prêt.</span>
            </h1>
            <p style={{ fontSize: 24, color: '#666', marginBottom: 40, maxWidth: 600, lineHeight: 1.6 }}>
              L'excellence nutritionnelle livrée chez vous. Des repas frais, équilibrés et 100% halal.
            </p>
            <div style={{ display: 'flex', gap: 20 }}>
              <div style={{ backgroundColor: '#1a472a', color: 'white', padding: '20px 40px', borderRadius: 20, fontWeight: 900, fontSize: 18 }}>
                Commander
              </div>
              <div style={{ border: '2px solid #1a472a', color: '#1a472a', padding: '20px 40px', borderRadius: 20, fontWeight: 900, fontSize: 18 }}>
                S'abonner
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

// Scène 3: Menu avec plats
const Scene3Menu: React.FC<{ frame: number }> = ({ frame }) => {
  const scrollY = interpolate(frame, [0, 120], [0, -600], { extrapolateRight: 'clamp' });
  
  const plats = [
    { name: 'Bowl Poulet Signature', price: '3 500 FCFA', kcal: '450 kcal' },
    { name: 'Bœuf & Patate Douce', price: '4 200 FCFA', kcal: '520 kcal' },
    { name: 'Poisson aux Herbes', price: '3 900 FCFA', kcal: '410 kcal' },
    { name: 'Bowl Personnalisé', price: 'À partir de 3 500 FCFA', kcal: 'Variable' },
  ];
  
  return (
    <DesktopScreen
      frame={frame}
      content={
        <div style={{ height: '100%', overflow: 'hidden', position: 'relative', backgroundColor: '#fffdfa' }}>
          {/* Header */}
          <div
            style={{
              height: 80,
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 60px',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 900, color: '#1a472a' }}>Healthy Dakar</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#1a472a' }}>Le Menu</div>
          </div>
          
          {/* Menu Content */}
          <div
            style={{
              padding: '60px',
              transform: `translateY(${scrollY}px)`,
            }}
          >
            <h2 style={{ fontSize: 64, fontWeight: 900, color: '#1a472a', marginBottom: 50 }}>
              Nos Plats
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 30 }}>
              {plats.map((plat, i) => {
                const itemOpacity = interpolate(frame, [20 + i * 20, 40 + i * 20], [0, 1], { extrapolateRight: 'clamp' });
                const translateX = interpolate(frame, [20 + i * 20, 40 + i * 20], [-30, 0], { extrapolateRight: 'clamp' });
                
                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 30,
                      padding: 30,
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      opacity: itemOpacity,
                      transform: `translateX(${translateX}px)`,
                    }}
                  >
                    <div style={{ width: '100%', height: 200, backgroundColor: '#e6f5ed', borderRadius: 20, marginBottom: 20 }} />
                    <h3 style={{ fontSize: 28, fontWeight: 900, color: '#1a472a', marginBottom: 10 }}>
                      {plat.name}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 900, color: '#10b981' }}>{plat.price}</div>
                      <div style={{ fontSize: 16, color: '#666', fontWeight: 600 }}>{plat.kcal}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    />
  );
};

// Scène 4: Zones de livraison
const Scene4Zones: React.FC<{ frame: number }> = ({ frame }) => {
  const scrollY = interpolate(frame, [0, 120], [0, -400], { extrapolateRight: 'clamp' });
  
  const zones = [
    { name: 'Zone 1', quartiers: ['Almadies', 'Mermoz', 'Ouakam'], price: '1 000 FCFA' },
    { name: 'Zone 2', quartiers: ['Plateau', 'Fann', 'Point E'], price: '1 500 FCFA' },
    { name: 'Zone 3', quartiers: ['Parcelles', 'Liberté 6', 'Yoff'], price: '2 000 FCFA' },
  ];
  
  return (
    <DesktopScreen
      frame={frame}
      content={
        <div style={{ height: '100%', overflow: 'hidden', position: 'relative', backgroundColor: '#fffdfa' }}>
          {/* Header */}
          <div
            style={{
              height: 80,
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 60px',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 900, color: '#1a472a' }}>Healthy Dakar</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#1a472a' }}>Zones de Livraison</div>
          </div>
          
          {/* Zones Content */}
          <div
            style={{
              padding: '60px',
              transform: `translateY(${scrollY}px)`,
            }}
          >
            <h2 style={{ fontSize: 64, fontWeight: 900, color: '#1a472a', marginBottom: 50 }}>
              Nos Zones de Livraison
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
              {zones.map((zone, i) => {
                const itemOpacity = interpolate(frame, [20 + i * 25, 45 + i * 25], [0, 1], { extrapolateRight: 'clamp' });
                const scale = spring({ frame: frame - 20 - i * 25, fps: 30, config: { damping: 10 } });
                
                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 30,
                      padding: 40,
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      opacity: itemOpacity,
                      transform: `scale(${0.9 + scale * 0.1})`,
                      border: '3px solid #1a472a',
                    }}
                  >
                    <div style={{ fontSize: 36, fontWeight: 900, color: '#1a472a', marginBottom: 20 }}>
                      {zone.name}
                    </div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: '#10b981', marginBottom: 20 }}>
                      {zone.price}
                    </div>
                    <div style={{ fontSize: 18, color: '#666', lineHeight: 1.8 }}>
                      {zone.quartiers.map((q, j) => (
                        <div key={j}>• {q}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{ marginTop: 50, padding: 30, backgroundColor: '#e6f5ed', borderRadius: 20 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#1a472a', marginBottom: 10 }}>
                📍 Livraison partout à Dakar
              </div>
              <div style={{ fontSize: 16, color: '#666' }}>
                Commandez entre 6h et 23h • Livraison express disponible
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

// Scène 5: Informations et contact
const Scene5Info: React.FC<{ frame: number }> = ({ frame }) => {
  const scrollY = interpolate(frame, [0, 90], [0, -300], { extrapolateRight: 'clamp' });
  
  return (
    <DesktopScreen
      frame={frame}
      content={
        <div style={{ height: '100%', overflow: 'hidden', position: 'relative', backgroundColor: '#fffdfa' }}>
          {/* Header */}
          <div
            style={{
              height: 80,
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 60px',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 900, color: '#1a472a' }}>Healthy Dakar</div>
          </div>
          
          {/* Info Content */}
          <div
            style={{
              padding: '60px',
              transform: `translateY(${scrollY}px)`,
            }}
          >
            <h2 style={{ fontSize: 64, fontWeight: 900, color: '#1a472a', marginBottom: 50 }}>
              Informations
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40 }}>
              <div style={{ backgroundColor: 'white', padding: 40, borderRadius: 30, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#1a472a', marginBottom: 15 }}>
                  100% Halal
                </div>
                <div style={{ fontSize: 18, color: '#666', lineHeight: 1.6 }}>
                  Tous nos produits sont certifiés halal et préparés selon les normes islamiques.
                </div>
              </div>
              
              <div style={{ backgroundColor: 'white', padding: 40, borderRadius: 30, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>🥗</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#1a472a', marginBottom: 15 }}>
                  100% Frais
                </div>
                <div style={{ fontSize: 18, color: '#666', lineHeight: 1.6 }}>
                  Cuisiné chaque matin avec des ingrédients locaux de qualité.
                </div>
              </div>
              
              <div style={{ backgroundColor: 'white', padding: 40, borderRadius: 30, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>🚚</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#1a472a', marginBottom: 15 }}>
                  Livraison Express
                </div>
                <div style={{ fontSize: 18, color: '#666', lineHeight: 1.6 }}>
                  Livré partout à Dakar entre 6h et 23h, 7 jours sur 7.
                </div>
              </div>
              
              <div style={{ backgroundColor: 'white', padding: 40, borderRadius: 30, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>💬</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#1a472a', marginBottom: 15 }}>
                  Contact
                </div>
                <div style={{ fontSize: 18, color: '#666', lineHeight: 1.8 }}>
                  WhatsApp: +221 78 598 71 43<br />
                  Site: healthy.sn<br />
                  Ouvert: 6h - 23h
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

// Scène finale: Call to Action
const Scene6CTA: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const scale = spring({ frame, fps: 30, config: { damping: 8 } });
  
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
          healthy.sn
        </p>
        <div
          style={{
            fontSize: 36,
            opacity: 0.9,
            fontWeight: 500,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Rejoignez 80 clients satisfaits à Dakar
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const SiteDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Durée de chaque scène (en frames)
  const scene1Duration = 120; // 4 secondes - Mobile
  const scene2Duration = 120; // 4 secondes - Desktop
  const scene3Duration = 150; // 5 secondes - Menu
  const scene4Duration = 150; // 5 secondes - Zones
  const scene5Duration = 120; // 4 secondes - Info
  const scene6Duration = 90;  // 3 secondes - CTA

  // Déterminer quelle scène afficher
  if (frame < scene1Duration) {
    return (
      <AbsoluteFill style={{ backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
        <Scene1Mobile frame={frame} />
      </AbsoluteFill>
    );
  } else if (frame < scene1Duration + scene2Duration) {
    return (
      <AbsoluteFill style={{ backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
        <Scene2Desktop frame={frame - scene1Duration} />
      </AbsoluteFill>
    );
  } else if (frame < scene1Duration + scene2Duration + scene3Duration) {
    return (
      <AbsoluteFill style={{ backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
        <Scene3Menu frame={frame - scene1Duration - scene2Duration} />
      </AbsoluteFill>
    );
  } else if (frame < scene1Duration + scene2Duration + scene3Duration + scene4Duration) {
    return (
      <AbsoluteFill style={{ backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
        <Scene4Zones frame={frame - scene1Duration - scene2Duration - scene3Duration} />
      </AbsoluteFill>
    );
  } else if (frame < scene1Duration + scene2Duration + scene3Duration + scene4Duration + scene5Duration) {
    return (
      <AbsoluteFill style={{ backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' }}>
        <Scene5Info frame={frame - scene1Duration - scene2Duration - scene3Duration - scene4Duration} />
      </AbsoluteFill>
    );
  } else {
    return <Scene6CTA frame={frame - scene1Duration - scene2Duration - scene3Duration - scene4Duration - scene5Duration} />;
  }
};
