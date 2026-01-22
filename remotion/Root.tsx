import { Composition } from 'remotion';
import { HealthyPromo } from './HealthyPromo';
import { SiteDemo } from './SiteDemo';
import { Publicite } from './Publicite';

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
      <Composition
        id="SiteDemo"
        component={SiteDemo}
        durationInFrames={750}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Publicite"
        component={Publicite}
        durationInFrames={1080}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
