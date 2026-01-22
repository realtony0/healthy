import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Img,
  staticFile,
  Easing,
} from 'remotion';

// Composant pour texte animé premium
const PremiumText: React.FC<{
  frame: number;
  text: string;
  fontSize: number;
  color: string;
  delay?: number;
  weight?: number;
}> = ({ frame, text, fontSize, color, delay = 0, weight = 900 }) => {
  const animatedFrame = frame - delay;
  const opacity = interpolate(
    animatedFrame,
    [0, 20],
    [0, 1],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );
  const scale = spring({
    frame: animatedFrame,
    fps: 30,
    config: { damping: 12, stiffness: 150 },
  });
  const blur = interpolate(
    animatedFrame,
    [0, 20],
    [10, 0],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    }
  );

  return (
    <div
      style={{
        opacity,
        transform: `scale(${0.85 + scale * 0.15})`,
        filter: `blur(${blur}px)`,
        fontSize,
        fontWeight: weight,
        color,
        textAlign: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textShadow: '0 8px 32px rgba(0,0,0,0.4)',
        letterSpacing: '-0.02em',
      }}
    >
      {text}
    </div>
  );
};

// Badge premium avec glow
const PremiumBadge: React.FC<{ frame: number; text: string; delay: number }> = ({
  frame,
  text,
  delay,
}) => {
  const animatedFrame = frame - delay;
  const opacity = interpolate(animatedFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const scale = spring({
    frame: animatedFrame,
    fps: 30,
    config: { damping: 10, stiffness: 200 },
  });
  const glow = interpolate(
    animatedFrame,
    [0, 15, 30],
    [0, 1, 0.5],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    }
  );

  return (
    <div
      style={{
        opacity,
        transform: `scale(${0.7 + scale * 0.3})`,
        backgroundColor: '#1a472a',
        color: 'white',
        padding: '16px 32px',
        borderRadius: 50,
        fontSize: 20,
        fontWeight: 900,
        display: 'inline-block',
        boxShadow: `0 0 ${glow * 40}px rgba(26, 71, 42, 0.8), 0 12px 40px rgba(0,0,0,0.3)`,
        border: '2px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {text}
    </div>
  );
};

// Particules animées en arrière-plan
const Particles: React.FC<{ frame: number }> = ({ frame }) => {
  const particles = Array.from({ length: 20 }, (_, i) => {
    const x = (i * 37) % 100;
    const y = (i * 23 + frame * 0.5) % 100;
    const size = 2 + (i % 3);
    const opacity = 0.1 + (i % 3) * 0.1;
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          backgroundColor: 'white',
          borderRadius: '50%',
          opacity,
        }}
      />
    );
  });

  return <>{particles}</>;
};

// Scène 1: Hook premium avec logo (3s)
const Scene1: React.FC<{ frame: number }> = ({ frame }) => {
  const bgGradient = interpolate(frame, [0, 90], [0, 360], {
    extrapolateRight: 'clamp',
  });
  const logoScale = spring({
    frame,
    fps: 30,
    config: { damping: 10, stiffness: 100 },
  });
  const logoOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${bgGradient}deg, #1a472a 0%, #10b981 50%, #1a472a 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Particles frame={frame} />
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${0.8 + logoScale * 0.2})`,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <PremiumText
          frame={frame}
          text="HEALTHY"
          fontSize={96}
          color="white"
          delay={0}
        />
        <PremiumText
          frame={frame}
          text="DAKAR"
          fontSize={64}
          color="rgba(255,255,255,0.95)"
          delay={15}
          weight={700}
        />
        <div style={{ marginTop: 30 }}>
          <PremiumBadge frame={frame} text="Votre nutrition livrée" delay={30} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scène 2: Plats avec carousel premium (8s)
const Scene2: React.FC<{ frame: number }> = ({ frame }) => {
  const plats = [
    { name: 'Bowl Poulet Signature', price: '3 500 FCFA', img: 'img/bowl-poulet-mais.jpeg', kcal: '450 kcal' },
    { name: 'Bœuf & Patate Douce', price: '4 200 FCFA', img: 'img/boeuf-puree-patate-douce.jpeg', kcal: '520 kcal' },
    { name: 'Poisson aux Herbes', price: '3 900 FCFA', img: 'img/poisson-blanc-herbes.jpeg', kcal: '410 kcal' },
  ];

  const currentIndex = Math.floor((frame / 80) % plats.length);
  const platFrame = frame % 80;
  const plat = plats[currentIndex];

  const slideProgress = interpolate(platFrame, [0, 80], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const imageOpacity = interpolate(platFrame, [0, 15, 65, 80], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  const imageScale = interpolate(platFrame, [0, 15, 65, 80], [0.9, 1, 1, 0.9], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const textOpacity = interpolate(platFrame, [20, 30, 50, 60], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#fffdfa',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Fond avec gradient animé */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, rgba(26, 71, 42, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)`,
        }}
      />
      
      <div
        style={{
          width: '90%',
          maxWidth: 600,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: 'relative',
            borderRadius: 50,
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.2)',
            backgroundColor: 'white',
          }}
        >
          <Img
            src={staticFile(plat.img)}
            style={{
              width: '100%',
              height: '60%',
              objectFit: 'cover',
              opacity: imageOpacity,
              transform: `scale(${imageScale})`,
            }}
          />
          <div
            style={{
              padding: '40px',
              backgroundColor: 'white',
              opacity: textOpacity,
            }}
          >
            <div
              style={{
                fontSize: 42,
                fontWeight: 900,
                color: '#1a472a',
                marginBottom: 12,
                textAlign: 'center',
              }}
            >
              {plat.name}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  color: '#10b981',
                }}
              >
                {plat.price}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: '#666',
                  fontWeight: 600,
                }}
              >
                {plat.kcal}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateurs de slide */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          zIndex: 20,
        }}
      >
        {plats.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === currentIndex ? '#1a472a' : '#ddd',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scène 3: Avantages avec design premium (6s)
const Scene3: React.FC<{ frame: number }> = ({ frame }) => {
  const items = [
    { icon: '🥗', text: '100% FRAIS', desc: 'Cuisiné chaque matin', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    { icon: '✅', text: '100% HALAL', desc: 'Certifié authentique', color: '#1a472a', bg: 'rgba(26, 71, 42, 0.1)' },
  ];

  const currentIndex = Math.floor((frame / 90) % items.length);
  const itemFrame = frame % 90;
  const item = items[currentIndex];

  const opacity = interpolate(itemFrame, [0, 20, 70, 90], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  const scale = spring({
    frame: itemFrame,
    fps: 30,
    config: { damping: 10, stiffness: 150 },
  });
  const rotation = interpolate(itemFrame, [0, 90], [0, 5], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Effet de lumière animé */}
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
          transform: `rotate(${frame * 2}deg) translate(-50%, -50%)`,
          top: '50%',
          left: '50%',
        }}
      />
      
      <div
        style={{
          opacity,
          transform: `scale(${0.85 + scale * 0.15}) rotate(${rotation}deg)`,
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 140,
            marginBottom: 40,
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
          }}
        >
          {item.icon}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            marginBottom: 24,
            textShadow: '0 8px 32px rgba(0,0,0,0.4)',
            letterSpacing: '-0.02em',
          }}
        >
          {item.text}
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            opacity: 0.95,
            textShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          {item.desc}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scène 4: Aperçu du site amélioré (10s)
const Scene4: React.FC<{ frame: number }> = ({ frame }) => {
  // Simuler différentes pages du site
  const pages = [
    { name: 'Accueil', scroll: 0 },
    { name: 'Menu', scroll: 200 },
    { name: 'Panier', scroll: 400 },
  ];

  const currentPageIndex = Math.floor((frame / 100) % pages.length);
  const pageFrame = frame % 100;
  const currentPage = pages[currentPageIndex];

  const scrollY = interpolate(
    pageFrame,
    [0, 100],
    [currentPage.scroll, currentPage.scroll + 100],
    {
      extrapolateRight: 'clamp',
    }
  );

  const pageTransition = interpolate(pageFrame, [0, 20, 80, 100], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  const phoneScale = spring({
    frame: frame - currentPageIndex * 100,
    fps: 30,
    config: { damping: 10 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Téléphone avec design premium */}
      <div
        style={{
          width: 400,
          height: 850,
          backgroundColor: '#000',
          borderRadius: 50,
          padding: 12,
          boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
          transform: `scale(${0.9 + phoneScale * 0.1})`,
          position: 'relative',
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 30,
            backgroundColor: '#000',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            zIndex: 20,
          }}
        />
        
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fffdfa',
            borderRadius: 38,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Header avec logo */}
          <div
            style={{
              height: 70,
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              borderBottom: '1px solid #f0f0f0',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: '#1a472a',
                letterSpacing: '-0.02em',
              }}
            >
              Healthy
            </div>
            <div
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: '#f0f0f0',
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 900,
                    color: '#1a472a',
                  }}
                >
                  🛒
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    width: 20,
                    height: 20,
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 900,
                    color: 'white',
                    border: '2px solid white',
                  }}
                >
                  3
                </div>
              </div>
            </div>
          </div>

          {/* Contenu scrollable selon la page */}
          <div
            style={{
              height: 'calc(100% - 70px)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {currentPageIndex === 0 && (
              <div
                style={{
                  transform: `translateY(${-scrollY * 0.5}px)`,
                  padding: '40px 24px',
                  opacity: pageTransition,
                }}
              >
                {/* Hero Section */}
                <div
                  style={{
                    textAlign: 'center',
                    marginBottom: 40,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: '#1a472a',
                      backgroundColor: '#e6f5ed',
                      padding: '10px 20px',
                      borderRadius: 25,
                      display: 'inline-block',
                      marginBottom: 24,
                      fontWeight: 700,
                    }}
                  >
                    ✨ Cuisiné ce matin
                  </div>
                  <div
                    style={{
                      fontSize: 56,
                      fontWeight: 900,
                      color: '#1a472a',
                      marginBottom: 20,
                      lineHeight: 1.1,
                    }}
                  >
                    Sain.<br />Frais.<br />
                    <span style={{ color: '#10b981', fontStyle: 'italic' }}>
                      Prêt.
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      color: '#666',
                      marginBottom: 30,
                      lineHeight: 1.6,
                    }}
                  >
                    L'excellence nutritionnelle livrée chez vous
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 12,
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        backgroundColor: '#1a472a',
                        color: 'white',
                        padding: '18px',
                        borderRadius: 20,
                        textAlign: 'center',
                        fontWeight: 900,
                        fontSize: 16,
                      }}
                    >
                      Commander
                    </div>
                    <div
                      style={{
                        flex: 1,
                        border: '2px solid #1a472a',
                        color: '#1a472a',
                        padding: '18px',
                        borderRadius: 20,
                        textAlign: 'center',
                        fontWeight: 900,
                        fontSize: 16,
                      }}
                    >
                      S'abonner
                    </div>
                  </div>
                </div>

                {/* Plats populaires */}
                <div style={{ marginTop: 50 }}>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 900,
                      color: '#1a472a',
                      marginBottom: 24,
                    }}
                  >
                    Nos Favoris
                  </div>
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 24,
                        padding: 16,
                        marginBottom: 16,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: 140,
                          backgroundColor: '#e6f5ed',
                          borderRadius: 16,
                          marginBottom: 12,
                        }}
                      />
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 900,
                          color: '#1a472a',
                          marginBottom: 6,
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
            )}

            {currentPageIndex === 1 && (
              <div
                style={{
                  transform: `translateY(${-scrollY * 0.5}px)`,
                  padding: '40px 24px',
                  opacity: pageTransition,
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: '#1a472a',
                    marginBottom: 30,
                    textAlign: 'center',
                  }}
                >
                  Le Menu
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 24,
                      padding: 20,
                      marginBottom: 20,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: 160,
                        backgroundColor: '#e6f5ed',
                        borderRadius: 20,
                        marginBottom: 16,
                      }}
                    />
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: '#1a472a',
                        marginBottom: 8,
                      }}
                    >
                      Plat Signature {i}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 900,
                          color: '#10b981',
                        }}
                      >
                        {3000 + i * 400} FCFA
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: '#666',
                          fontWeight: 600,
                        }}
                      >
                        {400 + i * 50} kcal
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentPageIndex === 2 && (
              <div
                style={{
                  transform: `translateY(${-scrollY * 0.5}px)`,
                  padding: '40px 24px',
                  opacity: pageTransition,
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: '#1a472a',
                    marginBottom: 30,
                    textAlign: 'center',
                  }}
                >
                  Mon Panier
                </div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 24,
                      padding: 20,
                      marginBottom: 16,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      display: 'flex',
                      gap: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        backgroundColor: '#e6f5ed',
                        borderRadius: 16,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 900,
                          color: '#1a472a',
                          marginBottom: 8,
                        }}
                      >
                        Plat {i}
                      </div>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 900,
                          color: '#10b981',
                        }}
                      >
                        {3000 + i * 500} FCFA
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 30,
                    padding: 24,
                    backgroundColor: '#1a472a',
                    borderRadius: 24,
                    color: 'white',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 16,
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    <span>Total</span>
                    <span>12 500 FCFA</span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: '#1a472a',
                      padding: '18px',
                      borderRadius: 16,
                      textAlign: 'center',
                      fontWeight: 900,
                      fontSize: 18,
                    }}
                  >
                    Commander
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Badge overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 30,
        }}
      >
        <PremiumBadge frame={frame} text="Navigation fluide • Commandez en 3 clics" delay={20} />
      </div>
    </AbsoluteFill>
  );
};

// Scène 5: Prix et offres premium (6s)
const Scene5: React.FC<{ frame: number }> = ({ frame }) => {
  const offers = [
    { text: 'À partir de', price: '3 500', unit: 'FCFA', highlight: 'BOWLS PERSONNALISÉS', color: '#10b981' },
    { text: 'Abonnements', price: 'Sur mesure', highlight: 'ÉCONOMISEZ JUSQU\'À 20%', color: '#1a472a' },
  ];

  const currentIndex = Math.floor((frame / 90) % offers.length);
  const offerFrame = frame % 90;
  const offer = offers[currentIndex];

  const opacity = interpolate(offerFrame, [0, 20, 70, 90], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  const scale = spring({
    frame: offerFrame,
    fps: 30,
    config: { damping: 10, stiffness: 150 },
  });
  const glow = interpolate(
    offerFrame,
    [0, 20, 50, 70],
    [0, 1, 1, 0],
    {
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${offer.color} 0%, ${offer.color}dd 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Effet de particules */}
      <Particles frame={frame} />
      
      <div
        style={{
          opacity,
          transform: `scale(${0.85 + scale * 0.15})`,
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 24,
            opacity: 0.95,
            textShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          {offer.text}
        </div>
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            marginBottom: 16,
            textShadow: `0 0 ${glow * 60}px rgba(255,255,255,0.5), 0 8px 32px rgba(0,0,0,0.4)`,
            letterSpacing: '-0.03em',
          }}
        >
          {offer.price}
          {offer.unit && (
            <span style={{ fontSize: 56, marginLeft: 12 }}>{offer.unit}</span>
          )}
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            backgroundColor: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(10px)',
            padding: '16px 40px',
            borderRadius: 40,
            display: 'inline-block',
            marginTop: 32,
            border: '2px solid rgba(255,255,255,0.3)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          {offer.highlight}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scène 6: Call to Action premium (4s)
const Scene6: React.FC<{ frame: number }> = ({ frame }) => {
  const bgPulse = interpolate(
    frame,
    [0, 30, 60, 90, 120],
    [1, 1.08, 1, 1.08, 1],
    {
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.ease),
    }
  );
  const textScale = spring({
    frame,
    fps: 30,
    config: { damping: 8, stiffness: 120 },
  });
  const glow = interpolate(
    frame,
    [0, 30, 60, 90, 120],
    [0.5, 1, 0.5, 1, 0.5],
    {
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1a472a 0%, #10b981 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${bgPulse})`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Particles frame={frame} />
      
      <div
        style={{
          transform: `scale(${0.9 + textScale * 0.1})`,
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <PremiumText
          frame={frame}
          text="COMMANDEZ"
          fontSize={80}
          color="white"
          delay={0}
        />
        <PremiumText
          frame={frame}
          text="MAINTENANT"
          fontSize={80}
          color="white"
          delay={15}
        />
        <div style={{ marginTop: 40, marginBottom: 30 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              textShadow: `0 0 ${glow * 40}px rgba(255,255,255,0.6), 0 8px 32px rgba(0,0,0,0.4)`,
              letterSpacing: '0.02em',
            }}
          >
            healthy.sn
          </div>
        </div>
        <div style={{ marginTop: 50 }}>
          <PremiumBadge frame={frame} text="Livraison partout à Dakar • 6h-23h" delay={30} />
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            fontWeight: 600,
            opacity: 0.95,
            textShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          Rejoignez 80 clients satisfaits
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Publicite: React.FC = () => {
  const frame = useCurrentFrame();

  // Durée de chaque scène (en frames à 30fps)
  const scene1Duration = 90; // 3s - Hook
  const scene2Duration = 240; // 8s - Plats carousel
  const scene3Duration = 180; // 6s - Avantages
  const scene4Duration = 300; // 10s - Site navigation (amélioré)
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
