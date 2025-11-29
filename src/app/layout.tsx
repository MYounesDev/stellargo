import type { Metadata } from 'next';
import './globals.css';
import { WalletProvider } from '@/contexts/WalletContext';
import AnimatedBackground from '@/components/AnimatedBackground';
import DesktopNavbar from '@/components/navigation/DesktopNavbar';
import MobileTabBar from '@/components/navigation/MobileTabBar';

export const metadata: Metadata = {
  title: 'StellarGo - Crypto on the Streets',
  description: 'Location-Based SocialFi Platform. Drop crypto at physical locations for others to discover and claim on the Stellar Network',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#00FF41',
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
      <body className="min-h-screen bg-dark-900 text-gray-100">
        <WalletProvider>
          <AnimatedBackground />
          <DesktopNavbar />
          <MobileTabBar />
          <main className="min-h-screen pt-24 md:pt-28 pb-24 md:pb-8 px-4">
            {children}
          </main>
        </WalletProvider>
      </body>
    </html>
  );
}
