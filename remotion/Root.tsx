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
      {/* 5 Flyers Professionnels - Format A4 Paysage (300 DPI) */}
      <Still
        id="Flyer1-Brand"
        component={Flyer1_Brand}
        width={3508}
        height={2480}
      />
      <Still
        id="Flyer2-Menu"
        component={Flyer2_Menu}
        width={3508}
        height={2480}
      />
      <Still
        id="Flyer3-Benefits"
        component={Flyer3_Benefits}
        width={3508}
        height={2480}
      />
      <Still
        id="Flyer4-Subscriptions"
        component={Flyer4_Subscriptions}
        width={3508}
        height={2480}
      />
      <Still
        id="Flyer5-HowItWorks"
        component={Flyer5_HowItWorks}
        width={3508}
        height={2480}
      />
    </>
  );
};
