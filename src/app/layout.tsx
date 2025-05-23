import type { Metadata } from "next";
import { Geist, Geist_Mono,Poppins,Space_Grotesk } from "next/font/google";

import "./globals.css";
import {Providers} from '@/store/provider'
import NavbarPage from "@/components/layouts/Navbar";
import AppLayout from "@/components/layouts/AppLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

  const poppins = Poppins({
      subsets: ['latin'],
      display: 'swap',
      variable: '--font-poppins',
      weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
    });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <Providers>
           <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
