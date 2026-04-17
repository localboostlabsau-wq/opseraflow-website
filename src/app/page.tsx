import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import AISystem from "@/components/AISystem";
import Integrations from "@/components/Integrations";
import Metrics from "@/components/Metrics";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0f] text-[#f0f4ff] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Solutions />
      <AISystem />
      <Integrations />
      <Metrics />
      <CTASection />
      <FAQ />
      <Blog />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
