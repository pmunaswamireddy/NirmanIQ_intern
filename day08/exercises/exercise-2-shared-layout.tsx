'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Exercise 2: Shared Layout with Sidebar & Responsive Mobile Nav
export function SharedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Active Sites', href: '/projects?status=active' },
  ];

  return (
    <div className="layout-container">
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <h3>SitePulse IQ</h3>
        <nav>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href.split('?')[0] ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="content">{children}</main>

      {/* Mobile Bottom Nav (visible on screens <= 768px) */}
      <nav className="mobile-bottom-nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`bottom-link ${pathname === link.href.split('?')[0] ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
