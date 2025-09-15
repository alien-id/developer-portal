import { AuthProtector } from '@/components/AuthProtector';
import { Header } from '@/components/Header';
import { robotoMono } from '@/fonts/fonts';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="w-full h-dvh flex flex-col gap-3">
      <Header />

      <section className="max-w-[1080px] w-full h-full mx-auto px-3 pb-3 grid grid-cols-[1fr_696px_1fr] gap-3">
        <aside className="min-w-[120px]">
          <div
            className={`mb-4 text-text-secondary text-xs font-medium uppercase leading-none tracking-tight ${robotoMono.className}`}
          >
            Menu
          </div>

          <nav className="flex flex-col gap-2 mt-4">
            <Link
              href={'/dashboard/sso'}
              className="text-text-primary text-sm leading-tight font-booton"
            >
              Alien SSO
            </Link>

            <div className="text-text-secondary text-sm leading-tight font-booton cursor-not-allowed flex flex-row gap-2 items-center">
              <div>Mini-Apps</div>
              <div className="px-[6px] py-[px] text-[10px] bg-alpha-neutral-10 border-[1px] border-alpha-neutral-24 rounded-full">
                SOON
              </div>
            </div>
          </nav>
        </aside>

        <AuthProtector>{children}</AuthProtector>
      </section>
    </section>
  );
};

export default DashboardLayout;
