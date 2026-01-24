import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// QR Code SVG component (URL: healthy.sn)
const QRCode: React.FC<{ size?: number; color?: string }> = ({ 
  size = 150, 
  color = '#1a472a' 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    style={{ backgroundColor: 'white', padding: 10, borderRadius: 12 }}
  >
    {/* QR Code pattern for healthy.sn */}
    <rect fill={color} x="10" y="10" width="60" height="60" rx="4" />
    <rect fill="white" x="20" y="20" width="40" height="40" rx="2" />
    <rect fill={color} x="28" y="28" width="24" height="24" rx="2" />
    
    <rect fill={color} x="130" y="10" width="60" height="60" rx="4" />
    <rect fill="white" x="140" y="20" width="40" height="40" rx="2" />
    <rect fill={color} x="148" y="28" width="24" height="24" rx="2" />
    
    <rect fill={color} x="10" y="130" width="60" height="60" rx="4" />
    <rect fill="white" x="20" y="140" width="40" height="40" rx="2" />
    <rect fill={color} x="28" y="148" width="24" height="24" rx="2" />
    
    {/* Data pattern */}
    <rect fill={color} x="80" y="10" width="12" height="12" />
    <rect fill={color} x="100" y="10" width="12" height="12" />
    <rect fill={color} x="80" y="30" width="12" height="12" />
    <rect fill={color} x="110" y="30" width="12" height="12" />
    <rect fill={color} x="80" y="50" width="12" height="12" />
    <rect fill={color} x="95" y="50" width="12" height="12" />
    
    <rect fill={color} x="10" y="80" width="12" height="12" />
    <rect fill={color} x="30" y="80" width="12" height="12" />
    <rect fill={color} x="50" y="80" width="12" height="12" />
    <rect fill={color} x="10" y="100" width="12" height="12" />
    <rect fill={color} x="40" y="100" width="12" height="12" />
    <rect fill={color} x="60" y="100" width="12" height="12" />
    
    <rect fill={color} x="80" y="80" width="12" height="12" />
    <rect fill={color} x="100" y="80" width="12" height="12" />
    <rect fill={color} x="120" y="80" width="12" height="12" />
    <rect fill={color} x="80" y="100" width="12" height="12" />
    <rect fill={color} x="95" y="95" width="12" height="12" />
    <rect fill={color} x="110" y="100" width="12" height="12" />
    
    <rect fill={color} x="140" y="80" width="12" height="12" />
    <rect fill={color} x="160" y="80" width="12" height="12" />
    <rect fill={color} x="178" y="80" width="12" height="12" />
    <rect fill={color} x="140" y="100" width="12" height="12" />
    <rect fill={color} x="155" y="95" width="12" height="12" />
    <rect fill={color} x="178" y="100" width="12" height="12" />
    
    <rect fill={color} x="80" y="130" width="12" height="12" />
    <rect fill={color} x="100" y="130" width="12" height="12" />
    <rect fill={color} x="80" y="150" width="12" height="12" />
    <rect fill={color} x="95" y="145" width="12" height="12" />
    <rect fill={color} x="110" y="150" width="12" height="12" />
    <rect fill={color} x="80" y="170" width="12" height="12" />
    <rect fill={color} x="100" y="178" width="12" height="12" />
    
    <rect fill={color} x="130" y="130" width="12" height="12" />
    <rect fill={color} x="150" y="130" width="12" height="12" />
    <rect fill={color} x="170" y="130" width="12" height="12" />
    <rect fill={color} x="130" y="150" width="12" height="12" />
    <rect fill={color} x="145" y="145" width="12" height="12" />
    <rect fill={color} x="160" y="150" width="12" height="12" />
    <rect fill={color} x="178" y="150" width="12" height="12" />
    <rect fill={color} x="130" y="170" width="12" height="12" />
    <rect fill={color} x="150" y="178" width="12" height="12" />
    <rect fill={color} x="170" y="170" width="12" height="12" />
  </svg>
);

export const Flyer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#fffdfa' }}>
      {/* Header with gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '45%',
          background: 'linear-gradient(135deg, #1a472a 0%, #2d5a3d 50%, #1a472a 100%)',
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          padding: 50,
          flexDirection: 'column',
        }}
      >
        {/* Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.02em',
              marginBottom: 10,
            }}
          >
            HEALTHY
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.9)',
              letterSpacing: '0.2em',
            }}
          >
            DAKAR • SÉNÉGAL
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.3,
            }}
          >
            Vos repas sains,
            <br />
            <span style={{ color: '#a7f3d0' }}>livrés chez vous</span>
          </div>
        </div>

        {/* Food Images Grid */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: 30,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              border: '4px solid white',
            }}
          >
            <Img
              src={staticFile('img/bowl-poulet-mais.jpeg')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: 30,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              border: '4px solid white',
            }}
          >
            <Img
              src={staticFile('img/boeuf-puree-patate-douce.jpeg')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: 30,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              border: '4px solid white',
            }}
          >
            <Img
              src={staticFile('img/poisson-blanc-herbes.jpeg')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 40,
            marginBottom: 40,
          }}
        >
          {[
            { icon: '🥗', text: '100% Frais' },
            { icon: '✓', text: '100% Halal' },
            { icon: '🚀', text: 'Livraison Express' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: '#f0fdf4',
                padding: '16px 28px',
                borderRadius: 50,
                border: '2px solid #1a472a',
              }}
            >
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#1a472a',
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Prices */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#1a472a',
              marginBottom: 10,
            }}
          >
            Bowls à partir de
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: '#1a472a',
            }}
          >
            3 500 FCFA
          </div>
        </div>

        {/* Bottom Section: QR Code & Contact */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: 'auto',
            backgroundColor: '#1a472a',
            margin: -50,
            marginTop: 0,
            padding: 40,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          {/* Left: Contact */}
          <div style={{ color: 'white' }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 15,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              Contactez-nous
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              📞 +221 XX XXX XX XX
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              📍 Livraison partout à Dakar
            </div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>
              ⏰ 6h - 23h
            </div>
          </div>

          {/* Center: Website */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: 'white',
                marginBottom: 10,
              }}
            >
              healthy.sn
            </div>
            <div
              style={{
                fontSize: 20,
                color: '#a7f3d0',
                fontWeight: 600,
              }}
            >
              Commandez en ligne
            </div>
          </div>

          {/* Right: QR Code */}
          <div style={{ textAlign: 'center' }}>
            <QRCode size={160} color="#1a472a" />
            <div
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.7)',
                marginTop: 10,
                fontWeight: 600,
              }}
            >
              Scannez pour commander
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Version A5 Portrait pour impression
export const FlyerA5: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#fffdfa' }}>
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(180deg, #1a472a 0%, #2d5a3d 100%)',
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
      />

      <AbsoluteFill
        style={{
          padding: 40,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-0.02em',
            marginBottom: 8,
            marginTop: 20,
          }}
        >
          HEALTHY
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.25em',
            marginBottom: 30,
          }}
        >
          DAKAR
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.3,
            marginBottom: 40,
          }}
        >
          Vos repas sains,
          <br />
          <span style={{ color: '#a7f3d0' }}>livrés chez vous</span>
        </div>

        {/* Main Food Image */}
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: 40,
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
            border: '5px solid white',
            marginBottom: 30,
          }}
        >
          <Img
            src={staticFile('img/bowl-poulet-mais.jpeg')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 15,
            marginBottom: 30,
            flexWrap: 'wrap',
          }}
        >
          {[
            { icon: '🥗', text: 'Frais' },
            { icon: '✓', text: 'Halal' },
            { icon: '🚀', text: 'Express' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#f0fdf4',
                padding: '12px 20px',
                borderRadius: 30,
                border: '2px solid #1a472a',
              }}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#1a472a' }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#666', marginBottom: 5 }}>
            À partir de
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, color: '#1a472a' }}>
            3 500 F
          </div>
        </div>

        {/* QR Code Section */}
        <div
          style={{
            backgroundColor: '#1a472a',
            borderRadius: 30,
            padding: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 30,
            marginTop: 'auto',
          }}
        >
          <QRCode size={120} color="#1a472a" />
          <div>
            <div style={{ fontSize: 32, fontWeight: 900, color: 'white', marginBottom: 5 }}>
              healthy.sn
            </div>
            <div style={{ fontSize: 16, color: '#a7f3d0', fontWeight: 600 }}>
              Scannez & Commandez
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
