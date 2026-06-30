import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Minuet of Star Mist — Portfolio',
  description: 'Senior product designer & frontend engineer — Lunar Midnight Edition portfolio.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="star-canvas" />
        <div className="wrap">{children}</div>
      </body>
    </html>
  );
}
