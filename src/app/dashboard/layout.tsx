import { AuthProtector } from '@/components/AuthProtector';
import { Header } from '@/components/Header';
import { robotoMono } from '@/fonts/fonts';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="min-h-screen w-[90%] max-w-[1080px] mx-auto flex flex-col">
      <div className="h-[60px] flex-none shrink-0">
        <Header />
      </div>

      <section className="w-full min-h-0 flex-1 grid grid-cols-1 grid-rows-[auto_1fr] lg:grid-rows-[1fr] lg:grid-cols-[140px_minmax(0,1fr)_140px] items-stretch gap-3 px-3">
        <aside className="lg:mt-[36px] min-w-[120px] self-start">
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

        <div className="lg:max-w-[696px] w-[100%] self-stretch justify-self-center rounded-t-[40px] border-b-0 border border-stroke-default p-[36px]">
          <AuthProtector>{children}</AuthProtector>
        </div>
      </section>
    </section>
  );
};

export default DashboardLayout;
