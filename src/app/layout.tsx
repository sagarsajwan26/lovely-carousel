import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Romantic Music Experience — Liquid Glass Audio Player',
  description: 'A romantic liquid glass music experience with synchronized lyrics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#12071C] text-white min-h-screen antialiased selection:bg-[#FF2D6C]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
