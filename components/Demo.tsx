'use client';

import { motion } from 'framer-motion';

export default function Demo() {
  const demos = [
    { title: 'Voice Command', description: 'Natural language' },
    { title: 'Task Execution', description: 'Automated workflows' },
    { title: 'Smart Integration', description: 'Seamless control' }
  ];

  return (
    <section id="demo" className="relative h-screen flex items-center justify-center px-6">
      <div className="w-[50vw] mx-auto" style={{ maxHeight: '33.33vh' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-bold mb-2 text-white">
            See HiOS in action
          </h2>
          <p className="text-xs text-gray-400 font-light">
            Real examples of autonomous task completion
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {demos.map((demo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white/5 backdrop-blur-xl border border-gray-800 rounded-2xl p-3 hover:scale-[1.02] transition-transform">
                <div className="aspect-[9/16] bg-gray-900 rounded-xl mb-2 overflow-hidden relative flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xs font-semibold mb-0.5 text-white">
                  {demo.title}
                </h3>
                <p className="text-xs text-gray-500 font-light">
                  {demo.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
