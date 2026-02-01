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
    <section id="workflows" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Powerful Workflows
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Automate your iOS experience with intelligent workflows
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center space-x-3 glass rounded-2xl p-4 hover:scale-105 transition-transform"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {workflow}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
