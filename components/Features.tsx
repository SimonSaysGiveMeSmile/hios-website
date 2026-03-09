'use client';

import { motion } from 'framer-motion';

const features = [
  {
    title: 'Voice Command Center',
    description: 'Control your phone with natural language.',
  },
  {
    title: 'OCR + Vision Search',
    description: 'Find text in screenshots and documents.',
  },
  {
    title: 'Shortcut Automation',
    description: 'Trigger iOS Shortcuts and control apps.',
  },
  {
    title: 'Context Memory',
    description: 'Remembers your preferences and contacts.',
  },
  {
    title: 'Keep Going Mode',
    description: 'Repeats actions until outcome is achieved.',
  },
  {
    title: 'Privacy-First',
    description: 'All processing happens on-device.',
  },
];

export default function Features() {
  return (
    <section id="features" className="min-h-screen flex items-center justify-center py-32 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Core Features
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
            Everything you need to make your phone work for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass rounded-2xl p-4 h-full hover:scale-[1.02] transition-transform duration-300">
                <h3 className="text-sm font-semibold mb-1 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
