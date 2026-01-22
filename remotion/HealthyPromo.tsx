import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const HealthyPromo: React.FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation d'entrée
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: 'clamp',
  });

  // Animation de sortie
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
    }
  );

  const finalOpacity = Math.min(opacity, exitOpacity);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a472a',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          opacity: finalOpacity,
          transform: `translateY(${translateY}px)`,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1
          style={{
            fontSize: 120,
            fontWeight: 900,
            marginBottom: 40,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 48,
            fontWeight: 600,
            opacity: 0.9,
            letterSpacing: '0.02em',
          }}
        >
          {subtitle}
        </p>
        <div
          style={{
            marginTop: 60,
            fontSize: 32,
            opacity: 0.8,
            fontWeight: 500,
          }}
        >
          100% Frais • 100% Halal • Livré à Dakar
        </div>
      </div>
    </AbsoluteFill>
  );
};
