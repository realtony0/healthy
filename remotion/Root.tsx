import { Composition } from 'remotion';
import { HealthyPromo } from './HealthyPromo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HealthyPromo"
        component={HealthyPromo}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
