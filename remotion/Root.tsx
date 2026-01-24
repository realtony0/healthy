import { Composition, Still } from 'remotion';
import { HealthyPromo } from './HealthyPromo';
import { SiteDemo } from './SiteDemo';
import { Publicite } from './Publicite';
import { Flyer1_Brand, Flyer2_Menu, Flyer3_Benefits, Flyer4_Subscriptions, Flyer5_HowItWorks } from './Flyer';

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
      {/* Flyer Master Social Media - Format 9:16 (Snapchat/Instagram) */}
      <Still
        id="FlyerMaster"
        component={Flyer1_Brand}
        width={1080}
        height={1920}
      />
    </>
  );
};
