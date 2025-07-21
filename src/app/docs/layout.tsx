import type { Metadata } from "next";
import { Banner } from "nextra/components";
import { getPageMap } from 'nextra/page-map'
import type { PageMapItem } from 'nextra'
import { PropsWithChildren } from "react";
import Logo1xWhiteSvg from '@/icons/logo-1x-white.svg';
import dynamic from 'next/dynamic';
import Link from "next/link";
import { UserMenu } from "@/features";
import 'nextra-theme-docs/style.css'


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
        logo={
            <div className="flex flex-row items-center">
                <Logo1xWhiteSvg />
            </div>
        }
        projectLink={'https://github.com/alien-id/sso-sdk-js'}
    >
        <UserMenu />
    </NextraNavbar>
)

const footer = <NextraFooter >
    <nav className="w-full mx-auto flex flex-row gap-6">
        <Link href='/' className="text-text-tertiary text-sm leading-tight">
            Privacy Policy
        </Link>

        <Link href='/' className="text-text-tertiary text-sm leading-tight">
            Terms and conditions
        </Link>

        <Link href='/' className="text-text-tertiary text-sm leading-tight ml-auto">
            © 2025 Alien. All rights reserved.
        </Link>
    </nav>
</NextraFooter>

export default async function DocsLayout({ children }: PropsWithChildren) {
    const pageMap = await getPageMap();

    // Only serve from /content/docs folder and don't touch basic pages from /app
    const docsMap = pageMap.filter(
        (item): item is PageMapItem & { route: string } => 'route' in item && typeof item.route === 'string' && item.route.startsWith('/docs')
    );

    return (
        <NextraLayout
            pageMap={docsMap}
            banner={banner}
            navbar={navbar}
            footer={footer}
            docsRepositoryBase="https://github.com/alien-id/developer-portal/tree/main"
            editLink="Edit this page on GitHub"
            sidebar={{ defaultMenuCollapseLevel: 1 }}
        >
            {children}
        </NextraLayout>
    );
}