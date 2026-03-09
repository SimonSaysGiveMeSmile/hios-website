export default function Footer() {
  return (
    <footer className="relative border-t py-12 px-6" style={{ borderColor: 'var(--glass-border-subtle)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transform rotate-180">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>HiOS</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {['Product', 'Docs', 'GitHub', 'Privacy', 'Twitter'].map((link, i) => (
              <a
                key={i}
                href="#"
                className="text-sm transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm" style={{ color: 'var(--text-subtle)' }}>
            © 2026 HiOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
