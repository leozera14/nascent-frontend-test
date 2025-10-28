import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Crypto Trading Platform",
  description: "Bitcoin and Ethereum order book visualization and trading",
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
