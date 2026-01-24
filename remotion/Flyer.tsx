import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// ============================================
// DA: SOCIAL MEDIA MASTER INFOGRAPHIC (9:16)
// ============================================
// Style: High-Density, Editorial, Professional
// Format: 1080x1920 (Instagram / Snapchat)
// ============================================

const COLORS = {
  primary: '#0d2818',   // Deeper, more premium green
  secondary: '#00ff87', // Neon green for punch
  accent: '#ffbe0b',    // Vibrant gold
  dark: '#050505',      // True black
  light: '#f8fafc',
  cream: '#fffdfa',     // Cleaner cream
};

const SectionTitle: React.FC<{ text: string; color?: string }> = ({ text, color = COLORS.primary }) => (
  <div style={{
    fontSize: 28,
    fontWeight: 900,
    color,
    letterSpacing: '0.05em',
    marginBottom: 15,
    borderLeft: `6px solid ${color}`,
    paddingLeft: 15,
    lineHeight: 1
  }}>
    {text}
  </div>
);

const QRCode: React.FC<{ size?: number; color?: string }> = ({ size = 180, color = COLORS.primary }) => (
  <div style={{
    width: size,
    height: size,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
  }}>
    <svg width={size - 30} height={size - 30} viewBox="0 0 100 100">
      <rect fill={color} x="5" y="5" width="25" height="25" rx="3" />
      <rect fill="white" x="10" y="10" width="15" height="15" rx="2" />
      <rect fill={color} x="13" y="13" width="9" height="9" />
      
      <rect fill={color} x="70" y="5" width="25" height="25" rx="3" />
      <rect fill="white" x="75" y="10" width="15" height="15" rx="2" />
      <rect fill={color} x="78" y="13" width="9" height="9" />
      
      <rect fill={color} x="5" y="70" width="25" height="25" rx="3" />
      <rect fill="white" x="10" y="75" width="15" height="15" rx="2" />
      <rect fill={color} x="13" y="78" width="9" height="9" />
      
      <rect fill={color} x="35" y="5" width="8" height="8" />
      <rect fill={color} x="50" y="5" width="8" height="8" />
      <rect fill={color} x="35" y="20" width="8" height="8" />
      <rect fill={color} x="55" y="20" width="8" height="8" />
      
      <rect fill={color} x="5" y="40" width="8" height="8" />
      <rect fill={color} x="20" y="40" width="8" height="8" />
      <rect fill={color} x="5" y="55" width="8" height="8" />
      <rect fill={color} x="25" y="55" width="8" height="8" />
      
      <rect fill={color} x="40" y="40" width="8" height="8" />
      <rect fill={color} x="52" y="40" width="8" height="8" />
      <rect fill={color} x="45" y="52" width="8" height="8" />
      
      <rect fill={color} x="70" y="40" width="8" height="8" />
      <rect fill={color} x="85" y="40" width="8" height="8" />
      <rect fill={color} x="70" y="55" width="8" height="8" />
      <rect fill={color} x="80" y="52" width="8" height="8" />
      
      <rect fill={color} x="40" y="70" width="8" height="8" />
      <rect fill={color} x="55" y="70" width="8" height="8" />
      <rect fill={color} x="45" y="85" width="8" height="8" />
      
      <rect fill={color} x="70" y="70" width="8" height="8" />
      <rect fill={color} x="85" y="70" width="8" height="8" />
      <rect fill={color} x="75" y="85" width="8" height="8" />
      <rect fill={color} x="90" y="85" width="8" height="8" />
    </svg>
  </div>
);

export const FlyerSocial: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.cream }}>
      {/* 1. HEADER (Mission) */}
      <div style={{ backgroundColor: COLORS.primary, padding: '60px 50px 80px', color: 'white' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.secondary, letterSpacing: '0.3em', marginBottom: 15 }}>HEALTHY DAKAR</div>
        <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1, marginBottom: 25 }}>TA RÉVOLUTION<br />NUTRITION.</div>
        <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, maxWidth: '80%' }}>
          Plus qu'un repas, un partenaire santé qui gère tout pour toi. Du petit-déj au dîner.
        </div>
      </div>

      <div style={{ marginTop: -40, padding: '0 40px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        
        {/* 2. LE MENU À LA CARTE (L'Essentiel) */}
        <div style={{ backgroundColor: 'white', borderRadius: 40, padding: 35, boxShadow: '0 15px 40px rgba(0,0,0,0.05)' }}>
          <SectionTitle text="MENU À LA CARTE" />
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, color: '#64748b', lineHeight: 1.6, marginBottom: 15 }}>
                Plats gourmands cuisinés chaque matin. 100% frais, 100% Halal.
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 800, backgroundColor: COLORS.cream, color: COLORS.primary, padding: '6px 12px', borderRadius: 8 }}>+30 PLATS</div>
                <div style={{ fontSize: 13, fontWeight: 800, backgroundColor: '#f0fdf4', color: COLORS.secondary, padding: '6px 12px', borderRadius: 8 }}>DÈS 3 500 F</div>
              </div>
            </div>
            <div style={{ width: 140, height: 140, borderRadius: 24, overflow: 'hidden' }}>
              <Img src={staticFile('img/bowl-poulet-mais.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* 3. BOWL BUILDER & ENERGY (Custom & Boost) */}
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1, backgroundColor: COLORS.dark, borderRadius: 40, padding: 30, color: 'white' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: COLORS.secondary, marginBottom: 10 }}>CRÉE TON BOWL</div>
            <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 20 }}>Ton chef c'est toi. Kcal & Macros calculés en temps réel.</div>
            <div style={{ fontSize: 12, fontWeight: 800, border: `1px solid ${COLORS.secondary}`, padding: '8px 12px', borderRadius: 10, display: 'inline-block' }}>PERSONNALISATION TOTALE</div>
          </div>
          <div style={{ flex: 1, backgroundColor: COLORS.accent, borderRadius: 40, padding: 30, color: 'white' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: 'white', marginBottom: 10 }}>SHOTS & ENERGY</div>
            <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 20 }}>Shots Détox, Energy Balls & Smoothies Protéinés.</div>
            <div style={{ width: 80, height: 80, borderRadius: 15, overflow: 'hidden' }}>
              <Img src={staticFile('img/shot-mix.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* 4. ABONNEMENTS (Routine & Gain de temps) */}
        <div style={{ backgroundColor: COLORS.cream, borderRadius: 40, padding: 35, border: `2px solid ${COLORS.primary}` }}>
          <SectionTitle text="ABONNEMENTS" />
          <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.primary, marginBottom: 10 }}>PLANIFIE TA SEMAINE.</div>
          <div style={{ fontSize: 16, color: '#64748b', lineHeight: 1.6, marginBottom: 20 }}>
            Économise du temps et de l'argent. Tes repas livrés automatiquement selon tes objectifs.
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.primary }}>✓ ÉCONOMISE -20%</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.primary }}>✓ SANS ENGAGEMENT</div>
          </div>
        </div>

        {/* 5. L'IMPORTANCE (Le Rôle) */}
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.primary, letterSpacing: '0.15em', marginBottom: 20 }}>POURQUOI UTILISER HEALTHY.SN ?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
            {[
              { icon: '⏰', text: 'Gagne 10h/semaine' },
              { icon: '📊', text: 'Suis tes Macros' },
              { icon: '❤️', text: 'Vivre en Santé' },
              { icon: '🚀', text: 'Boost Performance' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, backgroundColor: 'white', padding: '15px', borderRadius: 20, border: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: COLORS.dark }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. FOOTER (CTA & QR) */}
      <div style={{ marginTop: 'auto', backgroundColor: COLORS.primary, padding: '50px 40px', borderTopLeftRadius: 60, borderTopRightRadius: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56, fontWeight: 900, color: 'white', marginBottom: 5 }}>healthy.sn</div>
          <div style={{ fontSize: 18, color: COLORS.secondary, fontWeight: 700, letterSpacing: '0.1em' }}>TA PLATEFORME NUTRITION À DAKAR</div>
        </div>
        
        <QRCode size={220} color={COLORS.primary} />
        
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 5 }}>📞 +221 78 598 71 43</div>
          <div style={{ fontSize: 16, opacity: 0.7 }}>Livraison 6h - 23h • Partout à Dakar</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Default exports for compatibility
export const Flyer1_Brand = FlyerSocial;
export const Flyer2_Menu = FlyerSocial;
export const Flyer3_Benefits = FlyerSocial;
export const Flyer4_Subscriptions = FlyerSocial;
export const Flyer5_HowItWorks = FlyerSocial;
