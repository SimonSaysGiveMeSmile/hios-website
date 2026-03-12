'use client';

import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface ListItem {
  strong?: string;
  desc?: string;
}

interface Section {
  title?: string;
  content?: string;
  list?: (string | ListItem)[];
  note?: string;
  links?: { text: string; url: string }[];
  email?: string;
}

const sections: Section[] = [
  {
    title: 'Overview',
    content: 'HiOS ("the App") is an AI-powered personal assistant for iOS. We are committed to protecting your privacy. This policy explains what data the App accesses, how it is used, and your choices.',
  },
  {
    title: 'Data We Access',
    content: 'HiOS may request access to the following on your device, only when you use features that require them:',
    list: [
      { strong: 'Microphone & Speech Recognition', desc: 'to process voice commands. Audio is processed in real time and is not stored.' },
      { strong: 'Contacts', desc: 'to look up people when sending messages. Contact data stays on your device.' },
      { strong: 'Calendar & Reminders', desc: 'to create events and tasks on your behalf. This data stays on your device.' },
      { strong: 'Photos', desc: 'to assist with image-related tasks. Photos are not uploaded or shared.' },
    ],
  },
  {
    title: 'Data Sent to Third-Party Services',
    content: 'When you use HiOS to complete tasks, your text commands and conversation history may be sent to the following AI services for processing:',
    list: [
      { strong: 'Anthropic', desc: '(Claude API) — to generate task plans and responses' },
      { strong: 'OpenAI', desc: '(GPT API) — to generate task plans and responses' },
    ],
    note: 'These services process your requests and return results. Please refer to',
    links: [
      { text: "Anthropic's Privacy Policy", url: 'https://www.anthropic.com/privacy' },
      { text: "OpenAI's Privacy Policy", url: 'https://openai.com/privacy' },
    ],
  },
  {
    title: 'Web Browsing',
    content: 'HiOS includes a built-in browser to help automate web-based tasks. Web page content is processed locally on your device to understand page structure. We do not collect or store your browsing history.',
  },
  {
    title: 'API Keys',
    content: 'HiOS allows you to enter your own API keys for AI services. These keys are stored locally on your device and are never shared with us or any third party.',
  },
  {
    title: 'Data We Do Not Collect',
    list: [
      'We do not collect analytics or usage data',
      'We do not use advertising or tracking SDKs',
      'We do not sell or share your personal data',
      'We do not have user accounts or require sign-in',
    ],
  },
  {
    title: 'Data Storage',
    content: 'All app data (settings, conversation history, API keys) is stored locally on your device. We do not operate servers that store your personal data.',
  },
  {
    title: "Children's Privacy",
    content: 'HiOS is not directed at children under 13. We do not knowingly collect data from children.',
  },
  {
    title: 'Changes to This Policy',
    content: 'We may update this policy from time to time. Changes will be posted on this page with an updated date.',
  },
  {
    title: 'Contact',
    content: 'If you have questions about this privacy policy, contact us at:',
    email: 'realsimontian@gmail.com',
  },
];

function renderListItem(item: string | ListItem, itemIdx: number) {
  const isObject = typeof item === 'object' && item !== null && 'strong' in item;

  return (
    <li key={itemIdx} className="flex items-start gap-2" style={{ color: '#333333' }}>
      <span
        className="mt-2 flex-shrink-0"
        style={{
          width: '6px',
          height: '6px',
          background: '#000000',
          borderRadius: '50%',
        }}
      ></span>
      <span>
        {isObject ? (
          <>
            <strong style={{ color: '#000000' }}>{(item as ListItem).strong}</strong>
            {' '}{(item as ListItem).desc}
          </>
        ) : (
          String(item)
        )}
      </span>
    </li>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ background: '#f5f5f5' }}>
        <Navigation minimal />

        {/* Main Content - shifted down by 150px */}
        <div className="pt-24 pb-16" style={{ padding: '174px 24px 64px' }}>
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 mb-4"
                style={{
                  background: '#ffffff',
                  border: '2px solid #000000',
                  borderRadius: '12px',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#000000' }}
                ></span>
                <span className="text-xs font-semibold" style={{ color: '#000000' }}>Legal</span>
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: '#000000', letterSpacing: '-0.02em' }}
              >
                Privacy Policy
              </h1>
              <p className="text-base" style={{ color: '#666666' }}>
                Last updated: March 11, 2026
              </p>
            </div>

            {/* Content */}
            <div
              className="bg-white"
              style={{
                border: '2px solid #000000',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              {sections.map((section, idx) => (
                <div key={idx} className={idx > 0 ? 'mt-10' : ''}>
                  {section.title && (
                    <h2
                      className="text-xl font-bold mb-4"
                      style={{ color: '#000000' }}
                    >
                      {section.title}
                    </h2>
                  )}

                  {section.content && (
                    <p className="mb-4 leading-relaxed" style={{ color: '#333333' }}>
                      {section.content}
                    </p>
                  )}

                  {section.list && (
                    <ul className="mb-4 space-y-3">
                      {section.list.map((item, itemIdx) => renderListItem(item, itemIdx))}
                    </ul>
                  )}

                  {section.note && (
                    <p className="mb-4 leading-relaxed" style={{ color: '#333333' }}>
                      {section.note}{' '}
                      {section.links?.map((link, linkIdx) => (
                        <span key={linkIdx}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:no-underline"
                            style={{ color: '#000000' }}
                          >
                            {link.text}
                          </a>
                          {linkIdx < (section.links?.length || 0) - 1 ? ', ' : ''}
                        </span>
                      ))}
                      {' for details on how they handle data.'}
                    </p>
                  )}

                  {section.email && (
                    <p className="mb-4 leading-relaxed" style={{ color: '#333333' }}>
                      <a
                        href={`mailto:${section.email}`}
                        className="underline hover:no-underline"
                        style={{ color: '#000000' }}
                      >
                        {section.email}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}