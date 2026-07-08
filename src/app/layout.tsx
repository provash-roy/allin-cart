import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { dark } from "@clerk/ui/themes";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AllinCart",
  description: "Multi-Vendor E-commerce Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-linear-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen antialiased`}
      >
        <ClerkProvider
          appearance={{
            theme: dark,
          }}
        >
          <Toaster position="top-center" />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
