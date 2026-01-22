import { Composition } from 'remotion';
import { HealthyPromo } from './HealthyPromo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HealthyPromo"
        component={HealthyPromo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: 'Healthy Dakar',
          subtitle: 'Votre nutrition, livrée chaque jour',
        }}
      />
    </>
  );
};
