import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyParticipateSection from "@/components/WhyParticipateSection";
import EventInfoSection from "@/components/EventInfoSection";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <WhyParticipateSection />
      <EventInfoSection />
      <RegistrationSection />
      <Footer />
    </div>
  );
};

export default Index;
