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

// Curseur de souris animé
const MouseCursor: React.FC<{ x: number; y: number; clicking?: boolean }> = ({
  x,
  y,
  clicking,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 24,
        height: 24,
        pointerEvents: 'none',
        zIndex: 1000,
        transform: 'translate(-12px, -12px)',
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
        }}
      >
        <path
          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
          fill="white"
          stroke="#1a472a"
          strokeWidth="2"
        />
      </svg>
      {clicking && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '2px solid rgba(26, 71, 42, 0.5)',
            animation: 'pulse 0.3s ease-out',
          }}
        />
      )}
    </div>
  );
};

// Badge URL avec curseur
const URLBadge: React.FC<{ frame: number; visible: boolean }> = ({
  frame,
  visible,
}) => {
  const opacity = visible
    ? interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })
    : 0;
  const scale = spring({
    frame: visible ? frame : 0,
    fps: 30,
    config: { damping: 10 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: `translateX(-50%) scale(${0.8 + scale * 0.2})`,
        opacity,
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(26, 71, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '20px 40px',
          borderRadius: 50,
          border: '3px solid rgba(255,255,255,0.3)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            backgroundColor: 'white',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}
        >
          🔗
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '0.02em',
          }}
        >
          healthy.sn
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Scène 1: Introduction avec logo et URL (3s)
const Scene1: React.FC<{ frame: number }> = ({ frame }) => {
  const bgRotation = interpolate(frame, [0, 90], [0, 360]);
  const logoScale = spring({
    frame,
    fps: 30,
    config: { damping: 10 },
  });
  const logoOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const mouseX = interpolate(frame, [30, 60], [50, 50], {
    extrapolateRight: 'clamp',
  });
  const mouseY = interpolate(frame, [30, 60], [50, 85], {
    extrapolateRight: 'clamp',
  });
  const clicking = frame >= 45 && frame <= 50;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${bgRotation}deg, #1a472a 0%, #10b981 50%, #1a472a 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${0.8 + logoScale * 0.2})`,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            marginBottom: 20,
            letterSpacing: '-0.02em',
            textShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          HEALTHY DAKAR
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            opacity: 0.95,
            textShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          Votre nutrition livrée chaque jour
        </div>
      </div>
      <MouseCursor
        x={`${mouseX}%`}
        y={`${mouseY}%`}
        clicking={clicking}
      />
      <URLBadge frame={frame - 30} visible={frame >= 30} />
    </AbsoluteFill>
  );
};

// Scène 2: Page d'accueil avec vraies images (8s)
const Scene2: React.FC<{ frame: number }> = ({ frame }) => {
  const scrollY = interpolate(frame, [0, 240], [0, -500], {
    extrapolateRight: 'clamp',
  });

  const plats = [
    {
      name: 'Bowl Poulet Signature',
      price: '3 500 FCFA',
      img: 'img/bowl-poulet-mais.jpeg',
      kcal: '450 kcal',
    },
    {
      name: 'Bœuf & Patate Douce',
      price: '4 200 FCFA',
      img: 'img/boeuf-puree-patate-douce.jpeg',
      kcal: '520 kcal',
    },
    {
      name: 'Poisson aux Herbes',
      price: '3 900 FCFA',
      img: 'img/poisson-blanc-herbes.jpeg',
      kcal: '410 kcal',
    },
  ];

  // Animation du curseur
  const mouseX = interpolate(
    frame,
    [0, 60, 120, 180, 240],
    [20, 50, 80, 50, 20],
    {
      extrapolateRight: 'clamp',
    }
  );
  const mouseY = interpolate(
    frame,
    [0, 60, 120, 180, 240],
    [30, 40, 50, 60, 70],
    {
      extrapolateRight: 'clamp',
    }
  );
  const clicking = (frame >= 50 && frame <= 55) || (frame >= 130 && frame <= 135);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#fffdfa',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Simuler un écran de téléphone/desktop */}
      <div
        style={{
          width: '95%',
          maxWidth: 500,
          height: '90%',
          backgroundColor: 'white',
          borderRadius: 40,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          style={{
            height: 70,
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: '#1a472a',
            }}
          >
            Healthy
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              backgroundColor: '#1a472a',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 18,
              fontWeight: 900,
            }}
          >
            🛒
          </div>
        </div>

        {/* Contenu scrollable */}
        <div
          style={{
            height: 'calc(100% - 70px)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              transform: `translateY(${scrollY}px)`,
              padding: '40px 24px',
            }}
          >
            {/* Hero */}
            <div style={{ textAlign: 'center', marginBottom: 50 }}>
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
            </div>

            {/* Plats avec vraies images */}
            <div style={{ marginTop: 40 }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: '#1a472a',
                  marginBottom: 30,
                }}
              >
                Nos Favoris
              </div>
              {plats.map((plat, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 30,
                    overflow: 'hidden',
                    marginBottom: 24,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    border: '2px solid #f0f0f0',
                  }}
                >
                  <Img
                    src={staticFile(plat.img)}
                    style={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                    }}
                  />
                  <div style={{ padding: 24 }}>
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 900,
                        color: '#1a472a',
                        marginBottom: 12,
                      }}
                    >
                      {plat.name}
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
                          fontSize: 28,
                          fontWeight: 900,
                          color: '#10b981',
                        }}
                      >
                        {plat.price}
                      </div>
                      <div
                        style={{
                          fontSize: 16,
                          color: '#666',
                          fontWeight: 600,
                        }}
                      >
                        {plat.kcal}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MouseCursor
        x={`${mouseX}%`}
        y={`${mouseY}%`}
        clicking={clicking}
      />
      <URLBadge frame={frame} visible={true} />
    </AbsoluteFill>
  );
};

// Scène 3: Menu complet avec toutes les catégories (10s)
const Scene3: React.FC<{ frame: number }> = ({ frame }) => {
  const scrollY = interpolate(frame, [0, 300], [0, -800], {
    extrapolateRight: 'clamp',
  });

  const categories = [
    {
      name: 'Plats Signature',
      plats: [
        { name: 'Bowl Poulet', price: '3 500', img: 'img/bowl-poulet-mais.jpeg' },
        { name: 'Bœuf Patate', price: '4 200', img: 'img/boeuf-puree-patate-douce.jpeg' },
        { name: 'Poisson Herbes', price: '3 900', img: 'img/poisson-blanc-herbes.jpeg' },
      ],
    },
    {
      name: 'Snacks & Energy Balls',
      plats: [
        { name: 'Energy Balls Mix', price: '2 500', img: 'img/energy-balls-mix.jpeg' },
        { name: 'Energy Balls Protéines', price: '2 800', img: 'img/energy-balls-proteines.jpeg' },
      ],
    },
  ];

  const mouseX = interpolate(frame, [0, 150, 300], [30, 70, 30], {
    extrapolateRight: 'clamp',
  });
  const mouseY = interpolate(frame, [0, 150, 300], [40, 60, 80], {
    extrapolateRight: 'clamp',
  });
  const clicking =
    (frame >= 40 && frame <= 45) ||
    (frame >= 160 && frame <= 165) ||
    (frame >= 280 && frame <= 285);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#fffdfa',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '95%',
          maxWidth: 500,
          height: '90%',
          backgroundColor: 'white',
          borderRadius: 40,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            height: 70,
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: '#1a472a',
            }}
          >
            Le Menu
          </div>
        </div>

        <div
          style={{
            height: 'calc(100% - 70px)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              transform: `translateY(${scrollY}px)`,
              padding: '40px 24px',
            }}
          >
            {categories.map((category, catIdx) => (
              <div key={catIdx} style={{ marginBottom: 50 }}>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: '#1a472a',
                    marginBottom: 30,
                  }}
                >
                  {category.name}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {category.plats.map((plat, platIdx) => (
                    <div
                      key={platIdx}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 24,
                        overflow: 'hidden',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                        border: '2px solid #f0f0f0',
                      }}
                    >
                      <div style={{ display: 'flex', gap: 16 }}>
                        <Img
                          src={staticFile(plat.img)}
                          style={{
                            width: 140,
                            height: 140,
                            objectFit: 'cover',
                            flexShrink: 0,
                          }}
                        />
                        <div
                          style={{
                            flex: 1,
                            padding: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div
                            style={{
                              fontSize: 22,
                              fontWeight: 900,
                              color: '#1a472a',
                            }}
                          >
                            {plat.name}
                          </div>
                          <div
                            style={{
                              fontSize: 24,
                              fontWeight: 900,
                              color: '#10b981',
                            }}
                          >
                            {plat.price} FCFA
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MouseCursor
        x={`${mouseX}%`}
        y={`${mouseY}%`}
        clicking={clicking}
      />
      <URLBadge frame={frame} visible={true} />
    </AbsoluteFill>
  );
};

// Scène 4: Crée ton Bowl (8s)
const Scene4: React.FC<{ frame: number }> = ({ frame }) => {
  const scrollY = interpolate(frame, [0, 240], [0, -400], {
    extrapolateRight: 'clamp',
  });

  const mouseX = interpolate(frame, [0, 80, 160, 240], [30, 70, 50, 30], {
    extrapolateRight: 'clamp',
  });
  const mouseY = interpolate(frame, [0, 80, 160, 240], [50, 60, 70, 50], {
    extrapolateRight: 'clamp',
  });
  const clicking =
    (frame >= 50 && frame <= 55) ||
    (frame >= 130 && frame <= 135) ||
    (frame >= 210 && frame <= 215);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#fffdfa',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '95%',
          maxWidth: 500,
          height: '90%',
          backgroundColor: 'white',
          borderRadius: 40,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            height: 70,
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: '#1a472a',
            }}
          >
            Crée ton Bowl
          </div>
        </div>

        <div
          style={{
            height: 'calc(100% - 70px)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              transform: `translateY(${scrollY}px)`,
              padding: '40px 24px',
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: '#1a472a',
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              Votre Chef,<br />
              <span style={{ color: '#10b981', fontStyle: 'italic' }}>
                c'est vous.
              </span>
            </div>

            <div style={{ marginTop: 40 }}>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: '#1a472a',
                  marginBottom: 20,
                }}
              >
                Choisissez votre taille
              </div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 30 }}>
                {['Small', 'Medium', 'Large'].map((size, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      backgroundColor: i === 1 ? '#1a472a' : '#f0f0f0',
                      color: i === 1 ? 'white' : '#666',
                      padding: '20px',
                      borderRadius: 20,
                      textAlign: 'center',
                      fontWeight: 900,
                      fontSize: 18,
                    }}
                  >
                    {size}
                  </div>
                ))}
              </div>

              <div
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: '#1a472a',
                  marginBottom: 20,
                }}
              >
                Sélectionnez vos ingrédients
              </div>
              {['Féculents', 'Protéines', 'Légumes', 'Sauces'].map(
                (type, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: '#f0f0f0',
                      padding: '16px',
                      borderRadius: 16,
                      marginBottom: 12,
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#1a472a',
                    }}
                  >
                    {type} (cliquez pour choisir)
                  </div>
                )
              )}

              <div
                style={{
                  marginTop: 40,
                  backgroundColor: '#1a472a',
                  color: 'white',
                  padding: '24px',
                  borderRadius: 24,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  Total
                </div>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                  }}
                >
                  4 500 FCFA
                </div>
                <div
                  style={{
                    marginTop: 20,
                    backgroundColor: 'white',
                    color: '#1a472a',
                    padding: '18px',
                    borderRadius: 16,
                    fontWeight: 900,
                    fontSize: 18,
                  }}
                >
                  Ajouter au panier
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MouseCursor
        x={`${mouseX}%`}
        y={`${mouseY}%`}
        clicking={clicking}
      />
      <URLBadge frame={frame} visible={true} />
    </AbsoluteFill>
  );
};

// Scène 5: Abonnements (6s)
const Scene5: React.FC<{ frame: number }> = ({ frame }) => {
  const scrollY = interpolate(frame, [0, 180], [0, -300], {
    extrapolateRight: 'clamp',
  });

  const plans = [
    { name: 'Petit-déjeuner', price: 'Sur mesure' },
    { name: 'Déjeuner', price: 'Sur mesure' },
    { name: 'Dîner', price: 'Sur mesure' },
    { name: '3 repas/jour', price: 'Sur mesure', popular: true },
  ];

  const mouseX = interpolate(frame, [0, 60, 120, 180], [30, 70, 50, 30], {
    extrapolateRight: 'clamp',
  });
  const mouseY = interpolate(frame, [0, 60, 120, 180], [50, 60, 70, 50], {
    extrapolateRight: 'clamp',
  });
  const clicking =
    (frame >= 40 && frame <= 45) ||
    (frame >= 100 && frame <= 105) ||
    (frame >= 160 && frame <= 165);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#fffdfa',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '95%',
          maxWidth: 500,
          height: '90%',
          backgroundColor: 'white',
          borderRadius: 40,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            height: 70,
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: '#1a472a',
            }}
          >
            Abonnements
          </div>
        </div>

        <div
          style={{
            height: 'calc(100% - 70px)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              transform: `translateY(${scrollY}px)`,
              padding: '40px 24px',
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: '#1a472a',
                marginBottom: 40,
                textAlign: 'center',
              }}
            >
              Programmes
            </div>

            {plans.map((plan, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: plan.popular ? '#1a472a' : 'white',
                  color: plan.popular ? 'white' : '#1a472a',
                  padding: '30px',
                  borderRadius: 30,
                  marginBottom: 20,
                  border: plan.popular ? '4px solid #10b981' : '2px solid #f0f0f0',
                  boxShadow: plan.popular
                    ? '0 20px 60px rgba(26, 71, 42, 0.3)'
                    : '0 8px 30px rgba(0,0,0,0.1)',
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    marginBottom: 12,
                  }}
                >
                  {plan.name}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    opacity: 0.9,
                  }}
                >
                  {plan.price}
                </div>
                {plan.popular && (
                  <div
                    style={{
                      marginTop: 16,
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#10b981',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      padding: '8px 16px',
                      borderRadius: 20,
                      display: 'inline-block',
                    }}
                  >
                    ⭐ Le plus populaire
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <MouseCursor
        x={`${mouseX}%`}
        y={`${mouseY}%`}
        clicking={clicking}
      />
      <URLBadge frame={frame} visible={true} />
    </AbsoluteFill>
  );
};

// Scène 6: Zones de livraison (5s)
const Scene6: React.FC<{ frame: number }> = ({ frame }) => {
  const zones = [
    {
      name: 'Zone 1',
      quartiers: ['Almadies', 'Mermoz', 'Ouakam'],
      price: '1 000 FCFA',
    },
    {
      name: 'Zone 2',
      quartiers: ['Plateau', 'Fann', 'Point E'],
      price: '1 500 FCFA',
    },
    {
      name: 'Zone 3',
      quartiers: ['Parcelles', 'Liberté 6', 'Yoff'],
      price: '2 000 FCFA',
    },
  ];

  const scrollY = interpolate(frame, [0, 150], [0, -200], {
    extrapolateRight: 'clamp',
  });

  const mouseX = interpolate(frame, [0, 50, 100, 150], [30, 70, 50, 30], {
    extrapolateRight: 'clamp',
  });
  const mouseY = interpolate(frame, [0, 50, 100, 150], [50, 60, 70, 50], {
    extrapolateRight: 'clamp',
  });
  const clicking =
    (frame >= 30 && frame <= 35) ||
    (frame >= 80 && frame <= 85) ||
    (frame >= 130 && frame <= 135);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#fffdfa',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '95%',
          maxWidth: 500,
          height: '90%',
          backgroundColor: 'white',
          borderRadius: 40,
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            height: 70,
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: '#1a472a',
            }}
          >
            Zones de Livraison
          </div>
        </div>

        <div
          style={{
            height: 'calc(100% - 70px)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              transform: `translateY(${scrollY}px)`,
              padding: '40px 24px',
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: '#1a472a',
                marginBottom: 40,
                textAlign: 'center',
              }}
            >
              Livraison Express
            </div>

            {zones.map((zone, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'white',
                  border: '3px solid #1a472a',
                  borderRadius: 30,
                  padding: '30px',
                  marginBottom: 24,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}
              >
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    color: '#1a472a',
                    marginBottom: 16,
                  }}
                >
                  {zone.name}
                </div>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: '#10b981',
                    marginBottom: 20,
                  }}
                >
                  {zone.price}
                </div>
                <div style={{ fontSize: 18, color: '#666', lineHeight: 1.8 }}>
                  {zone.quartiers.map((q, j) => (
                    <div key={j}>• {q}</div>
                  ))}
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: 30,
                padding: 24,
                backgroundColor: '#e6f5ed',
                borderRadius: 24,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1a472a',
                  marginBottom: 8,
                }}
              >
                📍 Livraison partout à Dakar
              </div>
              <div style={{ fontSize: 16, color: '#666' }}>
                Commandez entre 6h et 23h • Livraison express disponible
              </div>
            </div>
          </div>
        </div>
      </div>

      <MouseCursor
        x={`${mouseX}%`}
        y={`${mouseY}%`}
        clicking={clicking}
      />
      <URLBadge frame={frame} visible={true} />
    </AbsoluteFill>
  );
};

// Scène 7: Avantages (Frais, Halal) (5s)
const Scene7: React.FC<{ frame: number }> = ({ frame }) => {
  const items = [
    {
      icon: '🥗',
      text: '100% FRAIS',
      desc: 'Cuisiné chaque matin',
      color: '#10b981',
    },
    {
      icon: '✅',
      text: '100% HALAL',
      desc: 'Certifié authentique',
      color: '#1a472a',
    },
  ];

  const currentIndex = Math.floor((frame / 75) % items.length);
  const itemFrame = frame % 75;
  const item = items[currentIndex];

  const opacity = interpolate(itemFrame, [0, 20, 55, 75], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  const scale = spring({
    frame: itemFrame,
    fps: 30,
    config: { damping: 10 },
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
          transform: `scale(${0.85 + scale * 0.15})`,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 140, marginBottom: 40 }}>{item.icon}</div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            marginBottom: 24,
            textShadow: '0 8px 32px rgba(0,0,0,0.4)',
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
      <URLBadge frame={frame} visible={true} />
    </AbsoluteFill>
  );
};

// Scène 8: Call to Action final avec URL cliquable (4s)
const Scene8: React.FC<{ frame: number }> = ({ frame }) => {
  const bgPulse = interpolate(
    frame,
    [0, 30, 60, 90, 120],
    [1, 1.05, 1, 1.05, 1],
    {
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.ease),
    }
  );
  const textScale = spring({
    frame,
    fps: 30,
    config: { damping: 8 },
  });

  const mouseX = interpolate(frame, [60, 90, 120], [40, 50, 60], {
    extrapolateRight: 'clamp',
  });
  const mouseY = interpolate(frame, [60, 90, 120], [75, 80, 75], {
    extrapolateRight: 'clamp',
  });
  const clicking = frame >= 85 && frame <= 95;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1a472a 0%, #10b981 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${bgPulse})`,
        position: 'relative',
      }}
    >
      <div
        style={{
          transform: `scale(${0.9 + textScale * 0.1})`,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            marginBottom: 30,
            textShadow: '0 8px 32px rgba(0,0,0,0.4)',
            letterSpacing: '-0.02em',
          }}
        >
          COMMANDEZ MAINTENANT
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            opacity: 0.95,
            marginBottom: 50,
            textShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          Rejoignez 80 clients satisfaits à Dakar
        </div>
      </div>

      <MouseCursor
        x={`${mouseX}%`}
        y={`${mouseY}%`}
        clicking={clicking}
      />
      <URLBadge frame={frame} visible={true} />
    </AbsoluteFill>
  );
};

export const Publicite: React.FC = () => {
  const frame = useCurrentFrame();

  // Durée de chaque scène (en frames à 30fps)
  const scene1Duration = 90; // 3s - Intro
  const scene2Duration = 240; // 8s - Accueil avec plats
  const scene3Duration = 300; // 10s - Menu complet
  const scene4Duration = 240; // 8s - Crée ton Bowl
  const scene5Duration = 180; // 6s - Abonnements
  const scene6Duration = 150; // 5s - Zones livraison
  const scene7Duration = 150; // 5s - Avantages
  const scene8Duration = 120; // 4s - CTA final

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
        frame={
          frame - scene1Duration - scene2Duration - scene3Duration
        }
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
  } else if (
    frame <
    scene1Duration +
      scene2Duration +
      scene3Duration +
      scene4Duration +
      scene5Duration +
      scene6Duration
  ) {
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
  } else if (
    frame <
    scene1Duration +
      scene2Duration +
      scene3Duration +
      scene4Duration +
      scene5Duration +
      scene6Duration +
      scene7Duration
  ) {
    return (
      <Scene7
        frame={
          frame -
          scene1Duration -
          scene2Duration -
          scene3Duration -
          scene4Duration -
          scene5Duration -
          scene6Duration
        }
      />
    );
  } else {
    return (
      <Scene8
        frame={
          frame -
          scene1Duration -
          scene2Duration -
          scene3Duration -
          scene4Duration -
          scene5Duration -
          scene6Duration -
          scene7Duration
        }
      />
    );
  }
};
