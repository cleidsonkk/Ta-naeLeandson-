import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/providers";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Leandson & Taína",
  description:
    "Site de casamento premium com lista de presentes, história do casal e painel administrativo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full bg-[var(--color-bg)] font-sans text-[var(--color-cream)] antialiased">
        <Providers>
          <div className="grain fixed inset-0 pointer-events-none" />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster
            theme="dark"
            richColors
            position="top-right"
            toastOptions={{
              className: "toast-luxe",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
