'use client';

import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const toolData = {
  version: '1.0',
  generated: '2026-03-10',
  totalTools: 13,
  overview: 'Complete specification of all tools available to the HiOS agent for LLM planner task execution.',
  categories: [
    { name: 'Browser', description: 'Web automation via WKWebView', color: '#000000' },
    { name: 'Calendar', description: 'EventKit event management', color: '#000000' },
    { name: 'Reminders', description: 'EventKit task management', color: '#000000' },
    { name: 'Photos', description: 'PhotosKit camera roll access', color: '#000000' },
    { name: 'OCR', description: 'Vision framework text extraction', color: '#000000' },
    { name: 'Contacts', description: 'Contacts framework search', color: '#000000' },
  ],
  tools: [
    {
      id: 'calendar_create_event',
      category: 'Calendar',
      name: 'calendar_create_event',
      description: 'Create a calendar event with title, date, and optional location',
      framework: 'EventKit',
      permissions: 'Calendar access required (iOS will prompt)',
      parameters: [
        { name: 'title', type: 'string', required: true, description: 'Event title' },
        { name: 'start_date', type: 'string', required: true, description: 'Start date/time (ISO 8601)' },
        { name: 'end_date', type: 'string', required: false, description: 'End date/time (ISO 8601)' },
        { name: 'location', type: 'string', required: false, description: 'Event location' },
        { name: 'notes', type: 'string', required: false, description: 'Event notes' },
      ],
      returns: '{ "event_id": "string", "title": "string", "start": "string" }',
    },
    {
      id: 'reminders_create',
      category: 'Reminders',
      name: 'reminders_create',
      description: 'Create a reminder/task with title and optional due date',
      framework: 'EventKit',
      permissions: 'Reminders access required (iOS will prompt)',
      parameters: [
        { name: 'title', type: 'string', required: true, description: 'Reminder title' },
        { name: 'due_date', type: 'string', required: false, description: 'Due date (ISO 8601)' },
        { name: 'notes', type: 'string', required: false, description: 'Reminder notes' },
        { name: 'priority', type: 'number', required: false, description: '0=none, 1=high, 5=medium, 9=low' },
      ],
      returns: '{ "reminder_id": "string", "title": "string" }',
    },
    {
      id: 'photos_get_latest',
      category: 'Photos',
      name: 'photos_get_latest',
      description: 'Get the latest photo(s) from the camera roll',
      framework: 'PhotosKit',
      permissions: 'Photos access required (iOS will prompt)',
      parameters: [
        { name: 'count', type: 'number', required: false, description: 'Number of photos (default: 1)' },
      ],
      returns: '{ "photos": [...], "count": number }',
    },
    {
      id: 'ocr_extract_text',
      category: 'OCR',
      name: 'ocr_extract_text',
      description: 'Extract text from an image using OCR',
      framework: 'Vision',
      permissions: 'None (local processing)',
      parameters: [
        { name: 'image_path', type: 'string', required: true, description: 'Path to image or base64' },
        { name: 'language', type: 'string', required: false, description: 'Language code (e.g., en-US)' },
      ],
      returns: '{ "text": "string", "length": number }',
    },
    {
      id: 'contacts_search',
      category: 'Contacts',
      name: 'contacts_search',
      description: 'Search for a contact by name',
      framework: 'Contacts',
      permissions: 'Contacts access required (iOS will prompt)',
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'Contact name to search for' },
      ],
      returns: '{ "contacts": [...], "count": number }',
    },
    {
      id: 'browser_open',
      category: 'Browser',
      name: 'browser_open',
      description: 'Navigate to a URL in the browser',
      framework: 'WKWebView',
      permissions: 'None',
      parameters: [
        { name: 'url', type: 'string', required: true, description: 'The URL to navigate to' },
      ],
      returns: '{ "url": "string" }',
    },
    {
      id: 'browser_click',
      category: 'Browser',
      name: 'browser_click',
      description: 'Click an element by CSS selector',
      framework: 'WKWebView',
      permissions: 'None',
      parameters: [
        { name: 'selector', type: 'string', required: true, description: 'CSS selector for the element' },
      ],
      returns: '{ "selector": "string" }',
    },
    {
      id: 'browser_click_text',
      category: 'Browser',
      name: 'browser_click_text',
      description: 'Click an element by its visible text content',
      framework: 'WKWebView',
      permissions: 'None',
      parameters: [
        { name: 'text', type: 'string', required: true, description: 'Visible text to search for' },
        { name: 'exact', type: 'boolean', required: false, description: 'Match text exactly (default: false)' },
      ],
      returns: '{ "text": "string", "exact": boolean }',
    },
    {
      id: 'browser_type',
      category: 'Browser',
      name: 'browser_type',
      description: 'Type text into an input field by CSS selector',
      framework: 'WKWebView',
      permissions: 'None',
      parameters: [
        { name: 'selector', type: 'string', required: true, description: 'CSS selector for input field' },
        { name: 'text', type: 'string', required: true, description: 'Text to type' },
        { name: 'clear', type: 'boolean', required: false, description: 'Clear before typing (default: true)' },
      ],
      returns: '{ "selector": "string", "text": "string" }',
    },
    {
      id: 'browser_fill_input',
      category: 'Browser',
      name: 'browser_fill_input',
      description: 'Fill an input field by finding it via its label text',
      framework: 'WKWebView',
      permissions: 'None',
      parameters: [
        { name: 'label', type: 'string', required: true, description: 'Label text to search for' },
        { name: 'value', type: 'string', required: true, description: 'Value to fill' },
      ],
      returns: '{ "label": "string", "value": "string" }',
    },
    {
      id: 'browser_extract',
      category: 'Browser',
      name: 'browser_extract',
      description: 'Extract text or data from the page using CSS selectors',
      framework: 'WKWebView',
      permissions: 'None',
      parameters: [
        { name: 'selector', type: 'string', required: true, description: 'CSS selector for elements' },
        { name: 'attribute', type: 'string', required: false, description: 'Attribute to extract (default: textContent)' },
        { name: 'multiple', type: 'boolean', required: false, description: 'Extract all matches (default: false)' },
      ],
      returns: '{ "selector": "string", "data": "string" }',
    },
    {
      id: 'browser_scroll',
      category: 'Browser',
      name: 'browser_scroll',
      description: 'Scroll the page in a direction',
      framework: 'WKWebView',
      permissions: 'None',
      parameters: [
        { name: 'direction', type: 'string', required: true, description: "'up', 'down', 'top', 'bottom'" },
        { name: 'amount', type: 'number', required: false, description: 'Scroll amount in pixels (default: 500)' },
      ],
      returns: '{ "direction": "string", "amount": number }',
    },
    {
      id: 'browser_wait',
      category: 'Browser',
      name: 'browser_wait',
      description: 'Wait for an element to appear or a condition to be met',
      framework: 'WKWebView',
      permissions: 'None',
      parameters: [
        { name: 'selector', type: 'string', required: false, description: 'CSS selector to wait for' },
        { name: 'timeout', type: 'number', required: false, description: 'Max wait seconds (default: 10)' },
      ],
      returns: '{ "selector": "string", "found": boolean }',
    },
  ],
};

function ToolCard({ tool }: { tool: typeof toolData.tools[0] }) {
  return (
    <div
      id={tool.id}
      className="bg-white"
      style={{
        border: '2px solid #000000',
        borderRadius: '12px',
        padding: '20px',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between mb-4 pb-4"
        style={{ borderBottom: '2px solid #000000' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-semibold px-3 py-1"
            style={{
              background: tool.category === 'Browser' ? '#000000' : '#f5f5f5',
              color: tool.category === 'Browser' ? '#ffffff' : '#000000',
              border: '2px solid #000000',
              borderRadius: '8px',
            }}
          >
            {tool.category}
          </span>
          <span className="text-xs" style={{ color: '#666666' }}>{tool.framework}</span>
        </div>
      </div>

      {/* Name & Description */}
      <code
        className="text-sm block mb-2"
        style={{
          background: '#f5f5f5',
          color: '#000000',
          padding: '8px 12px',
          borderRadius: '8px',
          border: '2px solid #000000',
          fontFamily: 'monospace',
        }}
      >
        {tool.name}
      </code>
      <p className="text-sm mb-4" style={{ color: '#333333' }}>{tool.description}</p>

      {/* Parameters */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#000000' }}>
          Parameters
        </h4>
        <div
          className="overflow-hidden"
          style={{ border: '2px solid #000000', borderRadius: '8px' }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th
                  className="text-left p-2 px-3 text-xs font-semibold"
                  style={{ color: '#000000', borderBottom: '2px solid #000000' }}
                >
                  Name
                </th>
                <th
                  className="text-left p-2 px-3 text-xs font-semibold"
                  style={{ color: '#000000', borderBottom: '2px solid #000000' }}
                >
                  Type
                </th>
                <th
                  className="text-left p-2 px-3 text-xs font-semibold"
                  style={{ color: '#000000', borderBottom: '2px solid #000000' }}
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {tool.parameters.map((param, idx) => (
                <tr key={idx} style={{ borderBottom: idx < tool.parameters.length - 1 ? '1px solid #cccccc' : 'none' }}>
                  <td className="p-2 px-3">
                    <code style={{ color: '#000000', fontFamily: 'monospace' }}>{param.name}</code>
                    {param.required && <span style={{ color: '#ff0000' }}> *</span>}
                  </td>
                  <td className="p-2 px-3">
                    <span
                      className="text-xs px-2 py-1"
                      style={{ background: '#f5f5f5', border: '1px solid #000000', borderRadius: '4px', fontFamily: 'monospace' }}
                    >
                      {param.type}
                    </span>
                  </td>
                  <td className="p-2 px-3" style={{ color: '#333333' }}>{param.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Returns */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#000000' }}>
          Returns
        </h4>
        <pre
          className="text-xs p-3 overflow-x-auto"
          style={{
            background: '#f5f5f5',
            color: '#006600',
            fontFamily: 'monospace',
            border: '2px solid #000000',
            borderRadius: '8px',
          }}
        >
          {tool.returns}
        </pre>
      </div>

      {/* Permissions */}
      <div
        className="text-xs p-2"
        style={{
          background: '#fffbe6',
          color: '#000000',
          border: '2px solid #000000',
          borderRadius: '8px',
        }}
      >
        {tool.permissions}
      </div>
    </div>
  );
}

export default function DocsPage() {
  const nativeTools = toolData.tools.filter((t) => !t.name.startsWith('browser_'));
  const browserTools = toolData.tools.filter((t) => t.name.startsWith('browser_'));

  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ background: '#f5f5f5' }}>
        <Navigation />

        {/* Main Content */}
        <div className="pt-24 pb-16" style={{ padding: '0 24px' }}>
          <div className="max-w-6xl mx-auto">

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
                <span className="text-xs font-semibold" style={{ color: '#000000' }}>Documentation</span>
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: '#000000', letterSpacing: '-0.02em' }}
              >
                Agent Tool Reference
              </h1>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#333333' }}>
                {toolData.overview}
              </p>
              <div
                className="flex items-center justify-center gap-4 mt-4 text-sm"
                style={{ color: '#666666' }}
              >
                <span style={{ fontWeight: 600 }}>Version {toolData.version}</span>
                <span>•</span>
                <span>{toolData.totalTools} Tools</span>
                <span>•</span>
                <span>{toolData.generated}</span>
              </div>
            </div>

            {/* Protocol & Categories */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Protocol */}
              <div
                className="bg-white"
                style={{
                  border: '2px solid #000000',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <h3 className="text-sm font-bold mb-3" style={{ color: '#000000' }}>Tool Protocol</h3>
                <pre
                  className="text-xs p-3 overflow-x-auto"
                  style={{
                    background: '#f5f5f5',
                    color: '#333333',
                    fontFamily: 'monospace',
                    border: '2px solid #000000',
                    borderRadius: '8px',
                  }}
                >
{`protocol Tool {
  var name: String
  var description: String
  var category: ToolCategory
  var inputSchema: [...]
  func execute(params:)
    async -> ToolResult
}`}
                </pre>
              </div>

              {/* Categories */}
              <div
                className="bg-white col-span-2"
                style={{
                  border: '2px solid #000000',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <h3 className="text-sm font-bold mb-3" style={{ color: '#000000' }}>Categories</h3>
                <div className="grid grid-cols-3 gap-3">
                  {toolData.categories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="p-3"
                      style={{
                        background: '#f5f5f5',
                        border: '2px solid #000000',
                        borderRadius: '8px',
                      }}
                    >
                      <div className="text-sm font-semibold mb-1" style={{ color: '#000000' }}>{cat.name}</div>
                      <div className="text-xs" style={{ color: '#666666' }}>{cat.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Native Tools */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    background: '#000000',
                    borderRadius: '12px',
                  }}
                >
                  <svg className="w-6 h-6" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#000000' }}>Native iOS Tools</h2>
                  <span className="text-sm" style={{ color: '#666666' }}>{nativeTools.length} tools</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {nativeTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>

            {/* Browser Tools */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{
                    background: '#000000',
                    borderRadius: '12px',
                  }}
                >
                  <svg className="w-6 h-6" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#000000' }}>Browser Tools</h2>
                  <span className="text-sm" style={{ color: '#666666' }}>{browserTools.length} tools</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {browserTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>

            {/* Quick Reference */}
            <div
              className="bg-white"
              style={{
                border: '2px solid #000000',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: '#000000' }}>Quick Reference</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-semibold mb-3" style={{ color: '#000000' }}>
                    Native ({nativeTools.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {nativeTools.map(t => (
                      <a
                        key={t.id}
                        href={`#${t.id}`}
                        className="text-xs px-3 py-1"
                        style={{
                          background: '#f5f5f5',
                          color: '#000000',
                          border: '2px solid #000000',
                          borderRadius: '8px',
                          fontFamily: 'monospace',
                        }}
                      >
                        {t.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-3" style={{ color: '#000000' }}>
                    Browser ({browserTools.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {browserTools.map(t => (
                      <a
                        key={t.id}
                        href={`#${t.id}`}
                        className="text-xs px-3 py-1"
                        style={{
                          background: '#000000',
                          color: '#ffffff',
                          borderRadius: '8px',
                          fontFamily: 'monospace',
                        }}
                      >
                        {t.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-12">
              <p className="text-sm" style={{ color: '#666666' }}>
                Generated by Claude Opus 4.6 • Project: HiOS - Universal Tool Bus for iOS
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}