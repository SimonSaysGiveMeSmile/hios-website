export default function Footer() {
  return (
    <footer className="relative border-t py-12 px-6" style={{ borderColor: 'var(--glass-border-subtle)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 transform rotate-180">
                <img src="/logo.svg" alt="HiOS Logo" className="w-full h-full" />
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>HiOS</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              The agent runtime for iPhone.
            </p>
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
