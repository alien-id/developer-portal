import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import 'nextra-theme-docs/style.css'
import "./globals.css";
import { Banner } from "nextra/components";
import { getPageMap } from 'nextra/page-map'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Developer Portal | Alien",
  description: "Developer Portal | Alien",
};

const banner = <Banner storageKey="some-key">Alien SSO v1.0.0 coming soon!</Banner>

const navbar = (
  <Navbar
    logo={<b>Alien</b>}
  />
)

const footer = <Footer>MIT {new Date().getFullYear()} © Alien</Footer>

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
