import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SignalOps · API Connect Market Intelligence",
  description: "Competitive market intelligence platform for IBM API Connect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body style={{ margin: 0, padding: 0 }}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
