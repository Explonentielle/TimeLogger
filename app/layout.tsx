import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import { Suspense } from "react";
import Loading from "./Loading";
import { Providers } from "./Providers";
import { Header } from "@/src/features/layout/Header";
import { Footer } from "@/src/features/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className=" h-full">
      <body cz-shortcut-listen="true" className={cn(inter.className)}>
        <Suspense fallback={<Loading />}>
          <Providers>
            <Header/>
            {children}
          </Providers>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}