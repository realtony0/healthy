import {
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';

// ============================================
// DA: MODERN TECH-FOOD (Premium & Exhaustive)
// ============================================

const COLORS = {
  primary: '#1a472a',
  secondary: '#10b981',
  accent: '#f59e0b',
  dark: '#0f172a',
  light: '#f8fafc',
  cream: '#fffbf5',
  energy: '#ffeb3b', // Yellow for energy
  shot: '#e91e63',   // Pinkish for shots
};

const Badge: React.FC<{ text: string; bg?: string; color?: string }> = ({ 
  text, 
  bg = COLORS.secondary, 
  color = 'white' 
}) => (
  <div style={{
    backgroundColor: bg,
    color,
    padding: '8px 16px',
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 900,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    display: 'inline-block'
  }}>
    {text}
  </div>
);

const QRCode: React.FC<{ size?: number; color?: string }> = ({ size = 120, color = COLORS.primary }) => (
  <div style={{
    width: size,
    height: size,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  }}>
    <svg width={size - 20} height={size - 20} viewBox="0 0 100 100">
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

// ============================================
// FLYER 1: MASTER PLATFORM - L'Écosystème
// ============================================
export const Flyer1_Brand: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.cream }}>
      {/* Top Banner */}
      <div style={{ height: '35%', backgroundColor: COLORS.primary, padding: '60px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 80, fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>HEALTHY DAKAR</div>
          <div style={{ fontSize: 24, fontWeight: 600, color: COLORS.secondary, letterSpacing: '0.4em', textTransform: 'uppercase' }}>La Nutrition en un Clic</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: 'white' }}>healthy.sn</div>
          <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)' }}>Commandez 24h/24</div>
        </div>
      </div>

      {/* Main Pillars */}
      <div style={{ padding: '0 80px', marginTop: -80, display: 'flex', gap: 30 }}>
        {[
          { title: 'MENU À LA CARTE', desc: 'Plats cuisinés chaque matin, frais et équilibrés.', img: 'img/bowl-poulet-mais.jpeg', badge: 'PRÊT-À-MANGER' },
          { title: 'BOWL BUILDER', desc: 'Le chef c\'est vous. Composez selon vos besoins.', img: 'img/boeuf-puree-patate-douce.jpeg', badge: 'CUSTOM' },
          { title: 'ENERGY & BOOST', desc: 'Shots détox, Energy Balls et Smoothies.', img: 'img/shot-mix.jpeg', badge: 'PERFORMANCE' },
        ].map((pillar, i) => (
          <div key={i} style={{ flex: 1, backgroundColor: 'white', borderRadius: 40, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
            <div style={{ height: 220, overflow: 'hidden' }}>
              <Img src={staticFile(pillar.img)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 30 }}>
              <Badge text={pillar.badge} />
              <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.primary, margin: '15px 0 10px' }}>{pillar.title}</div>
              <div style={{ fontSize: 16, color: '#64748b', lineHeight: 1.6 }}>{pillar.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Subscriptions Highlight */}
      <div style={{ padding: '60px 80px', display: 'flex', gap: 60, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.dark, lineHeight: 1.1, marginBottom: 20 }}>
            Libérez-vous de la cuisine avec nos <span style={{ color: COLORS.primary }}>Abonnements</span>
          </div>
          <div style={{ fontSize: 18, color: '#64748b', lineHeight: 1.8 }}>
            Petit-déjeuner, déjeuner ou dîner : planifiez votre semaine et recevez vos repas automatiquement. Gain de temps et nutrition maîtrisée.
          </div>
        </div>
        <div style={{ width: 400, backgroundColor: COLORS.primary, borderRadius: 30, padding: 40, color: 'white' }}>
          <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>Pourquoi healthy.sn ?</div>
          <div style={{ spaceY: 15 }}>
            {['Calcul précis des Kcal & Protéines', 'Ingrédients 100% frais et locaux', 'Livraison Express partout à Dakar', '100% Halal Certifié'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: 16, fontWeight: 600 }}>
                <span style={{ color: COLORS.secondary }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', padding: '40px 80px', backgroundColor: 'white', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
          <QRCode size={120} />
          <div>
            <div style={{ fontSize: 40, fontWeight: 900, color: COLORS.primary }}>SCANNEZ & MANGEZ</div>
            <div style={{ fontSize: 20, color: '#64748b' }}>Votre partenaire nutrition à Dakar</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.dark }}>📞 +221 XX XXX XX XX</div>
          <div style={{ fontSize: 18, color: '#94a3b8' }}>Instagram: @healthy.sn</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// FLYER 2: ENERGY & BOOST - Shots & Snacks
// ============================================
export const Flyer2_Menu: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', backgroundColor: COLORS.primary, opacity: 0.2 }} />
      
      <div style={{ padding: 80, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 60 }}>
          <Badge text="NOUVEAUTÉ" bg={COLORS.accent} color="black" />
          <div style={{ fontSize: 80, fontWeight: 900, color: 'white', lineHeight: 1, margin: '20px 0' }}>ENERGY<br /><span style={{ color: COLORS.secondary }}>& SHOTS</span></div>
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)', maxWidth: 600 }}>Le coup de boost dont votre corps a besoin. 100% naturel, 100% efficace.</div>
        </div>

        <div style={{ display: 'flex', gap: 40, flex: 1 }}>
          {/* Shots */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: 'white', marginBottom: 30, borderBottom: `4px solid ${COLORS.secondary}`, display: 'inline-block', paddingBottom: 10 }}>NOS SHOTS DÉTOX</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { name: 'SHOT DÉTOX', desc: 'Curcuma, Gingembre, Citron', img: 'img/shot-detox.jpeg' },
                { name: 'SHOT BRÛLE-GRAISSE', desc: 'Piment de Cayenne, Pomme', img: 'img/shot-brule-graisse.jpeg' },
                { name: 'SHOT IMMUNITÉ', desc: 'Miel, Citron, Vitamine C', img: 'img/shot-immunite.jpeg' },
                { name: 'SHOT ENERGY', desc: 'Guarana, Ginseng', img: 'img/shot-energy.jpeg' },
              ].map((shot, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ height: 120, borderRadius: 15, overflow: 'hidden', marginBottom: 15 }}>
                    <Img src={staticFile(shot.img)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: 'white', marginBottom: 5 }}>{shot.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{shot.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Snacks */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: 'white', marginBottom: 30, borderBottom: `4px solid ${COLORS.accent}`, display: 'inline-block', paddingBottom: 10 }}>SNACKS PROTÉINÉS</div>
            <div style={{ spaceY: 20 }}>
              {[
                { name: 'ENERGY BALLS MIX', desc: 'Le pack parfait pour le goûter', price: '2 500 F', img: 'img/energy-balls-mix.jpeg' },
                { name: 'SMOOTHIE PROTÉINÉ', desc: 'Idéal après le sport', price: '2 000 F', img: 'img/smoothie-proteine.jpeg' },
                { name: 'OVERNIGHT OATS', desc: 'Petit-déjeuner complet', price: '2 800 F', img: 'img/overnight-oats.jpeg' },
              ].map((snack, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 20, marginBottom: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ width: 100, height: 100, borderRadius: 15, overflow: 'hidden', flexShrink: 0 }}>
                    <Img src={staticFile(snack.img)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: 'white', marginBottom: 5 }}>{snack.name}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>{snack.desc}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.accent }}>{snack.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
            <QRCode size={140} color={COLORS.primary} />
            <div>
              <div style={{ fontSize: 50, fontWeight: 900, color: 'white' }}>COMMANDER</div>
              <div style={{ fontSize: 24, color: COLORS.secondary }}>SUR HEALTHY.SN</div>
            </div>
          </div>
          <div style={{ textAlign: 'right', color: 'white', opacity: 0.6 }}>
            <div style={{ fontSize: 18 }}>Livraison partout à Dakar</div>
            <div style={{ fontSize: 18 }}>6h - 23h • 7j/7</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// FLYER 3: ABONNEMENTS - La Routine Santé
// ============================================
export const Flyer3_Benefits: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      <div style={{ height: 15, background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})` }} />
      
      <div style={{ padding: 80, display: 'flex', gap: 80, height: '100%' }}>
        <div style={{ flex: 1.2 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.primary, letterSpacing: '0.2em', marginBottom: 20 }}>VOTRE ROUTINE NUTRITION</div>
          <div style={{ fontSize: 72, fontWeight: 900, color: COLORS.dark, lineHeight: 1, marginBottom: 40 }}>Oubliez la cuisine,<br /><span style={{ color: COLORS.primary }}>Visez vos objectifs.</span></div>
          
          <div style={{ fontSize: 20, color: '#64748b', lineHeight: 1.8, marginBottom: 50 }}>
            L'abonnement Healthy est conçu pour ceux qui n'ont pas le temps de cuisiner mais qui refusent de sacrifier leur santé. Choisissez vos repas, on s'occupe du reste.
          </div>

          <div style={{ spaceY: 30 }}>
            {[
              { icon: '💰', title: 'ÉCONOMISEZ JUSQU\'À 20%', desc: 'Des tarifs dégressifs sur vos repas quotidiens.' },
              { icon: '📅', title: 'PLANNING SUR MESURE', desc: 'Choisissez les jours et les heures de livraison.' },
              { icon: '🚫', title: 'SANS ENGAGEMENT', desc: 'Mettez en pause ou annulez à tout moment sur le site.' },
              { icon: '🥗', title: 'MENU VARIÉ', desc: 'Plus de 30 plats différents pour ne jamais s\'ennuyer.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
                <div style={{ fontSize: 40, width: 60 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.dark }}>{item.title}</div>
                  <div style={{ fontSize: 16, color: '#64748b' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, backgroundColor: COLORS.cream, borderRadius: 40, padding: 50, border: '2px solid #f1f5f9', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.primary, marginBottom: 10 }}>NOS FORMULES</div>
              <div style={{ height: 4, width: 60, backgroundColor: COLORS.secondary, margin: '0 auto' }} />
            </div>

            <div style={{ spaceY: 15 }}>
              {['Petit-déjeuner (Boost Matin)', 'Déjeuner (Performance)', 'Dîner (Récupération)', 'Pack Complet (Sérénité Totale)'].map((formule, i) => (
                <div key={i} style={{ backgroundColor: 'white', padding: '20px 30px', borderRadius: 20, fontWeight: 800, color: COLORS.dark, boxShadow: '0 5px 15px rgba(0,0,0,0.05)', marginBottom: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {formule}
                  <span style={{ color: COLORS.secondary }}>→</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 50, textAlign: 'center' }}>
              <div style={{ fontSize: 18, color: '#64748b', marginBottom: 20 }}>Configurez votre pack sur :</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.primary }}>healthy.sn</div>
            </div>
          </div>

          <div style={{ marginTop: 40, display: 'flex', gap: 20, alignItems: 'center', backgroundColor: COLORS.primary, padding: 30, borderRadius: 30, color: 'white' }}>
            <QRCode size={100} color={COLORS.primary} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>DÉMARRER MON ABONNEMENT</div>
              <div style={{ fontSize: 14, opacity: 0.7 }}>Scannez pour voir les tarifs</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// FLYER 4: BOWL BUILDER - Personnalisation
// ============================================
export const Flyer4_Subscriptions: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.cream }}>
      <div style={{ padding: 80, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: COLORS.primary }}>HEALTHY DAKAR</div>
          <Badge text="OUTIL EXCLUSIF" bg={COLORS.primary} />
        </div>

        <div style={{ display: 'flex', gap: 80, flex: 1 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 80, fontWeight: 900, color: COLORS.dark, lineHeight: 1, marginBottom: 30 }}>CRÉE TON<br /><span style={{ color: COLORS.secondary }}>BOWL</span></div>
            <div style={{ fontSize: 22, color: '#64748b', lineHeight: 1.8, marginBottom: 40 }}>
              Parce que personne ne connaît vos besoins mieux que vous. Notre outil de création en ligne vous permet de composer le repas parfait en quelques clics.
            </div>

            <div style={{ spaceY: 25 }}>
              {[
                { step: '01', title: 'CHOISIS TA TAILLE', desc: 'Small, Medium ou Large selon ton appétit.' },
                { step: '02', title: 'SÉLECTIONNE TA BASE', desc: 'Riz complet, Quinoa, Patate douce, Laitue...' },
                { step: '03', title: 'AJOUTE TES PROTÉINES', desc: 'Poulet grillé, Bœuf, Poisson, Œufs, Crevettes...' },
                { step: '04', title: 'VITAMINES & SAUCE', desc: 'Légumes frais et nos sauces secrètes.' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 25 }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.secondary, opacity: 0.3 }}>{step.step}</div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.dark }}>{step.title}</div>
                    <div style={{ fontSize: 15, color: '#64748b' }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ position: 'relative', height: '100%' }}>
              <div style={{ width: '100%', height: 500, borderRadius: 40, overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', border: '5px solid white' }}>
                <Img src={staticFile('img/bowl-poulet-mais.jpeg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <div style={{ position: 'absolute', bottom: 50, left: -40, right: 40, backgroundColor: 'white', borderRadius: 30, padding: 40, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.secondary, letterSpacing: '0.2em', marginBottom: 15 }}>TRANSPARENCE TOTALE</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.dark, marginBottom: 10 }}>Kcal & Macros en temps réel</div>
                <div style={{ fontSize: 16, color: '#64748b' }}>Le prix et les valeurs nutritionnelles s'ajustent à chaque ingrédient ajouté. Aucun secret.</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40 }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.primary }}>PRÊT À CRÉER ?</div>
          <div style={{ width: 4, height: 40, backgroundColor: '#e2e8f0' }} />
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <QRCode size={100} />
            <div style={{ fontSize: 40, fontWeight: 900, color: COLORS.dark }}>healthy.sn</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// FLYER 5: L'IMPORTANCE - Pourquoi nous ?
// ============================================
export const Flyer5_HowItWorks: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.primary }}>
      <div style={{ padding: 80, display: 'flex', flexDirection: 'column', height: '100%', color: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.secondary, letterSpacing: '0.3em', marginBottom: 20 }}>NOTRE MISSION</div>
          <div style={{ fontSize: 80, fontWeight: 900, lineHeight: 1 }}>Plus qu'un repas,<br /><span style={{ color: COLORS.secondary }}>un style de vie.</span></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1 }}>
          {[
            { title: 'POUR VOTRE SANTÉ', desc: 'Réduisez le sel, les mauvaises graisses et les produits transformés. Mangez du vrai, cuisiné chaque matin.', icon: '❤️' },
            { title: 'POUR VOTRE TEMPS', desc: 'Gagnez 10h par semaine en déléguant vos courses et votre cuisine à nos experts.', icon: '⏰' },
            { title: 'POUR VOTRE PERFORMANCE', desc: 'Donnez à votre cerveau et vos muscles l\'énergie nécessaire pour briller toute la journée.', icon: '🚀' },
            { title: 'POUR VOTRE BUDGET', desc: 'Mangez premium dès 3 500 F. Moins cher qu\'un fast-food, 100x plus nutritif.', icon: '💰' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 30, padding: 40, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 50, marginBottom: 20 }}>{item.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.secondary, marginBottom: 15 }}>{item.title}</div>
              <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 40, padding: 40 }}>
          <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
            <QRCode size={120} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.primary, letterSpacing: '0.1em' }}>REJOIGNEZ LE MOUVEMENT</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: COLORS.dark }}>healthy.sn</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.primary }}>LIVRAISON PARTOUT À DAKAR</div>
            <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>Cuisiné le matin • Livré à temps • 100% Halal</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Default export
export const Flyer = Flyer1_Brand;
export const FlyerA5 = Flyer1_Brand;
