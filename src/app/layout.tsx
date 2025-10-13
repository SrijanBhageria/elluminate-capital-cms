import type { Metadata } from 'next';
import { Inter, Source_Serif_4, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import '../styles/cms.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Elluminate Capital',
  description: 'Professional Investment Banking Services',
  keywords: 'investment banking, financial services, capital markets, advisory',
  authors: [{ name: 'Elluminate Capital' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Elluminate Capital',
    description: 'Professional Investment Banking Services',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable}`}
        style={{
          fontFamily: "'Playfair Display', var(--font-family-primary), serif",
        }}
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            <div
              style={{
                minHeight: '100vh',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                transition: 'background-color var(--transition-normal), color var(--transition-normal)',
              }}
            >
              {/* Navigation */}
              <Navbar />
              
              {/* Main Content */}
              <main>{children}</main>
              
              {/* Footer */}
              <Footer />
            </div>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}