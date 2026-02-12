import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyParticipateSection from "@/components/WhyParticipateSection";
import PricingCallToAction from "@/components/PricingCallToAction";
import EventInfoSection from "@/components/EventInfoSection";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PricingCallToAction />
      <AboutSection />
      <WhyParticipateSection />
      <EventInfoSection />
      <RegistrationSection />
      <Footer />
    </div>
  );
};

export default Index;
