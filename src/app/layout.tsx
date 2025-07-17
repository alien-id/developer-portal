import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from "react";
import { booton } from "@/fonts/fonts";
import { Toaster } from "@/components/ui/sonner"

import "./globals.css";
import { SWRConfig } from "swr";

export const metadata: Metadata = {
  title: "Developer Portal | Alien",
  description: "Developer Portal | Alien",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      data-theme="dark"
    >
      <body
        className={`${booton.className} ${booton.variable} antialiased bg-bg-primary text-text-primary`}
      >
        <ThemeProvider attribute="data-theme">
          <SWRConfig
            value={{
              revalidateOnFocus: false,
              revalidateIfStale: false,
              revalidateOnReconnect: false,
            }}
          >

            {children}
          </SWRConfig>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
