'use client';

import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-12 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Ready to Supercharge Your iPhone?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Join the TestFlight and be among the first to experience the future of iOS automation
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="ios-button px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-xl hover:shadow-2xl">
              Join the TestFlight
            </button>
            <button className="ios-button px-10 py-5 rounded-2xl glass font-semibold text-lg">
              View Documentation
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Free for beta testers • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
