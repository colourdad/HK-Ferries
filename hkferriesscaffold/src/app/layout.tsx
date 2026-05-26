import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HK Ferries",
  description: "Fast, mobile-first Hong Kong outlying island ferry schedules",
  // TODO: Add PWA manifest link in Phase 5
  // TODO: Add OG image in Phase 4
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* TODO: Add navigation shell in Phase 4 */}
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  );
}
