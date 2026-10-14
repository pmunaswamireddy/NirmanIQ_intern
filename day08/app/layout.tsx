import './globals.css';
import { Sidebar } from '../components/Navbar';

export const metadata = {
  title: 'BuildTrack IQ - Day 8',
  description: 'Next.js App Router practice',
};

// Exercise 2: Shared layout with sidebar navigation
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="layout-container">
          <Sidebar />
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
