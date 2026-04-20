import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Digital Catalogue - Renewable Energy Products",
  description: "Browse our selection of solar panels, inverters, and batteries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
