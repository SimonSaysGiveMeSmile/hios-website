'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Speak Your Command',
    description: 'Use natural language to tell HiOS what you want',
  },
  {
    title: 'AI Plans the Steps',
    description: 'HiOS breaks down your request into actions',
  },
  {
    title: 'Shortcuts Execute',
    description: 'iOS Shortcuts run to complete each step',
  },
  {
    title: 'Results Confirmed',
    description: 'HiOS verifies and reports back to you',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="min-h-screen flex items-center justify-center py-32 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
            Get started in minutes with our simple 4-step process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="glass rounded-2xl p-4 h-full hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-black font-semibold text-xs">
                    {index + 1}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-light pl-9">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
