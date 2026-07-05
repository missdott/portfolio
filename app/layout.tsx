import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Izzy Kasandra Donque — Portfolio',
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