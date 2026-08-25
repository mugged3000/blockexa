import Hero from '../components/Hero';
import LiveChart from '../components/LiveChart';
import ConsensusDiagram from '../components/ConsensusDiagram';
import Banner from '../components/Banner';
import VideoShowcase from '../components/VideoShowcase';
import PlanCards from '../components/PlanCards';
import RoiCalculator from '../components/RoiCalculator';
import WhyChooseUs from '../components/WhyChooseUs';
import Team from '../components/Team';

export default function Home() {
  return (
    <>
      <Hero />
      <LiveChart />
      <ConsensusDiagram />
      <Banner />
      <VideoShowcase />
      <PlanCards />
      <RoiCalculator />
      <WhyChooseUs />
      <Team />
    </>
  );
}