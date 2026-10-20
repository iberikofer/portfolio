import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import '../styles/main.scss';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

export const metadata: Metadata = {
  title: 'Yaroslav Sych',
  description:
    'Portfolio of Yaroslav Sych — Fullstack JavaScript/TypeScript Developer specializing in React, Node.js, and modern high-craft web applications.',
  icons: {
    icon: [
      {
        url: `${basePath}/favicon.svg`,
        type: 'image/svg+xml',
      },
    ],
    shortcut: `${basePath}/favicon.svg`,
    apple: `${basePath}/favicon.svg`,
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
