import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Provider";
import { Toaster } from "@/components/ui/sonner";
import EmailVerificationOverlay from "@/components/VerificationOverlay";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Law Pavilion App",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="legaltech-theme"
          >
            {children}
          </ThemeProvider>
          <EmailVerificationOverlay />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
