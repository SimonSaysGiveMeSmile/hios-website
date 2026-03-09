'use client';

import { motion } from 'framer-motion';
import LiquidGlassDemo from './LiquidGlassDemo';

export default function Demo() {
  return (
    <section id="demo" className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Liquid Glass Effects
          </h2>
          <p className="text-lg text-gray-400 font-light">
            WebGL-powered glassmorphism with real-time refraction and blur
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <LiquidGlassDemo />
        </motion.div>
      </div>
    </section>
  );
}
