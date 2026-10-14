import './globals.css';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Day 9 — Tailwind CSS & shadcn/ui',
  description: 'NirmanIQ Internship Training Day 9',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen">
        {children}
        {/* Exercise 4: Global Sonner Toast Provider */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
