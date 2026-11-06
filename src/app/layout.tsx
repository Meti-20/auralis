import type { Metadata, Viewport } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import ThemeRegistry from '@/theme/ThemeRegistry';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: '#F8F7F2',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'AURALIS — AI-Powered Cash Flow Analytics Dashboard',
  description:
    'Understand your money. Make better decisions. Auralis gives small businesses clarity on income, expenses, available balance, and AI-powered financial actions.',
  keywords: [
    'cash flow analytics',
    'fintech dashboard',
    'AI finance',
    'expense tracking',
    'Auralis',
  ],
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body
        style={{
          backgroundColor: '#F8F7F2',
          color: '#252923',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        }}
      >
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
