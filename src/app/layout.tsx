import type { Metadata } from "next";
import { Playfair_Display, Inter } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Voyage Japan with Asuka III | Premium Japanese Cruise Experience",
  description: "Discover Japan's coastlines aboard Asuka III, Japan's most prestigious cruise ship. Experience world-class hospitality, exquisite cuisine, and unforgettable destinations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
