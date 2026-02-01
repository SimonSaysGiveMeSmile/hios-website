import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Workflows from "@/components/Workflows";
import CTA from "@/components/CTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20" />
      <Navigation />
      <Hero />
      <Features />
      <Workflows />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
