'use client';

import { motion } from 'framer-motion';

const workflows = [
  'Smart Triage & Categorization',
  'Reply Queue Management',
  'Auto-Reply for Important Chats',
  'AI-Powered Reply Suggestions',
  'Smart Message Forwarding',
  'Scheduled Message Sending',
  'Contact Organization',
  'Group Chat Filtering',
  'Urgency Detection & Alerts',
  'Spam & Noise Reduction',
  'Daily Message Digest',
  'Screenshot Search',
];

export default function Workflows() {
  return (
    <section id="workflows" className="min-h-screen flex items-center justify-center py-32 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Powerful Workflows
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
            Automate your iOS experience with intelligent workflows
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-2">
          {workflows.map((workflow, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
            >
              <div className="glass rounded-xl p-3 hover:scale-[1.02] transition-transform">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {workflow}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
