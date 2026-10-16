import './globals.css';
import { Providers } from '../components/Providers';
import { Navbar } from '../components/Navbar';

export const metadata = {
  title: 'Tower Progress Tracker | NirmanIQ Checkpoint Assessment #1',
  description: 'AI-powered construction intelligence and floor-by-floor site progress monitoring platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-slate-100 min-h-screen flex flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
            {children}
          </main>
          <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
            NirmanIQ Internship Phase 1 Assessment &bull; Next.js + NestJS + PostgreSQL
          </footer>
        </Providers>
      </body>
    </html>
  );
}
