import type { Metadata } from "next";
import { Banner } from "nextra/components";
import { getPageMap } from 'nextra/page-map'
import { PropsWithChildren } from "react";
import 'nextra-theme-docs/style.css'

import dynamic from 'next/dynamic';

const NextraLayout = dynamic(() =>
    import('nextra-theme-docs').then((mod) => mod.Layout),
    { ssr: true }
);

const NextraFooter = dynamic(() =>
    import('nextra-theme-docs').then((mod) => mod.Footer),
    { ssr: true }
);

const NextraNavbar = dynamic(() =>
    import('nextra-theme-docs').then((mod) => mod.Navbar),
    { ssr: true }
);

export const metadata: Metadata = {
    title: "Developer Portal | Alien",
    description: "Developer Portal | Alien",
};

const banner = <Banner storageKey="some-key">Alien SSO v1.0.0 coming soon!</Banner>

const navbar = (
    <NextraNavbar
        logo={<b>Alien</b>}
        projectLink={'https://github.com/shuding/nextra/tree/main/docs'}
    >
        SignIn
        {/* <SignIn /> */}
    </NextraNavbar>
)

const footer = <NextraFooter>MIT {new Date().getFullYear()} © Alien</NextraFooter>

export default async function DocsLayout({
    children,
}: PropsWithChildren) {
    return (
        <NextraLayout
            banner={banner}
            navbar={navbar}
            pageMap={await getPageMap()}
            docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
            editLink="Edit this page on GitHub"
            sidebar={{ defaultMenuCollapseLevel: 1 }}
            footer={footer}
        >
            {children}
        </NextraLayout>
    );
}
