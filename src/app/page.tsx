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
import BookingSection from "@/components/BookingSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#000000", color: "#f0f4ff", overflowX: "hidden" }}>
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
      <BookingSection />
      <Contact />
      <Footer />
    </main>
  );
}
