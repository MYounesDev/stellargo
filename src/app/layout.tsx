import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'StellarGo - Location-Based SocialFi Platform',
  description: 'Drop crypto at physical locations for others to discover and claim on the Stellar Network. The future of location-based cryptocurrency.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#00ff9d',
  keywords: 'Stellar, Cryptocurrency, Location-Based, SocialFi, Geo-Drop, XLM, Web3',
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
      <body className="min-h-screen bg-dark-950">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
