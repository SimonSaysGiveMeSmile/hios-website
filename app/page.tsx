'use client';

import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Product from "@/components/Product";
import Capabilities from "@/components/Capabilities";
import Services from "@/components/Services";
import Architecture from "@/components/Architecture";
import CTA from "@/components/CTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        <Problem />
        <Product />
        <Capabilities />
        <Services />
        <Architecture />
        <CTA />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
