import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DynamicBackground } from "@/components/ui/DynamicBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeRun Generator",
  description: "Crie runs personalizadas e insanas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased text-zinc-50 bg-transparent min-h-screen`}>
        <DynamicBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}