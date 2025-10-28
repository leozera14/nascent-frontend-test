import type { Metadata } from "next";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/QueryProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Crypto Trading Platform",
  description:
    "Bitcoin and Ethereum order book visualization and trading - Made for Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 antialiased">
        <QueryProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={5000}
            theme="dark"
          />
        </QueryProvider>
      </body>
    </html>
  );
}
