import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Izzy Kasandra Donque — Portfolio',
  description: 'Cebu-based Computer Engineering student building clean, responsive web solutions with structured design systems and robust backend integrations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="star-canvas" />
        <div className="wrap">{children}</div>
      </body>
    </html>
  );
}