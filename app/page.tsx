'use client';

import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Product from "@/components/Product";
import Demo from "@/components/Demo";
import Capabilities from "@/components/Capabilities";
import Services from "@/components/Services";
import Architecture from "@/components/Architecture";
import CTA from "@/components/CTA";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 -z-10 bg-white dark:bg-black" />
      <Navigation />
      <Hero />
      <Problem />
      <Product />
      <Demo />
      <Capabilities />
      <Services />
      <Architecture />
      <CTA />
      <Footer />
    </main>
  );
}
