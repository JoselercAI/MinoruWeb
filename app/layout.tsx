import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { CookieConsent } from "@/components/CookieConsent";
import { TrackingManager } from "@/components/TrackingManager";
import { site } from "@/lib/site";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Arquitecto digital`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Suspense fallback={null}>
          <TrackingManager />
        </Suspense>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
