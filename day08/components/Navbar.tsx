'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Active Sites', href: '/projects?status=active' },
  ];

  return (
    <>
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

      {/* Mobile Bottom Nav */}
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
    </>
  );
}
