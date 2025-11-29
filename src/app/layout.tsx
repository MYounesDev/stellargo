import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import FullscreenButton from '@/components/FullscreenButton';

export const metadata: Metadata = {
  title: 'StellarGo - Location-Based Crypto Platform',
  description: 'Drop crypto at physical locations for others to discover and claim on the Stellar Network',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#0284c7',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-screen bg-accent-50">
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <FullscreenButton />
      </body>
    </html>
  );
}
