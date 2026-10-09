import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Day 10 — React Query & Zustand',
  description: 'NirmanIQ Internship Training Day 10',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="container">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
