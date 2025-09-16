'use client';
import Logo2xGraySvg from '@/icons/logo-2x-gray.svg';
import { cn } from '@/lib/utils';
import Lock16Svg from '@/icons/lock-16.svg';
import Link from 'next/link';
import ArrowRightSvg from '@/icons/arrow-right-16.svg';
import dynamic from 'next/dynamic';

const AuthForm = dynamic(() => import('@/components/AuthForm'), { ssr: false });

const SignInPage = () => {
  return (
    <main className="max-w-[696px] min-h-screen w-[90%] mx-auto flex flex-col">
      <div className="flex-none basis-[60px] mb-[10px] h-[60px] flex flex-row items-center relative">
        <Link
          href="/"
          className="absolute left-0 text-text-secondary flex flex-row gap-3 items-center"
        >
          <div className="rotate-180">
            <ArrowRightSvg />
          </div>
          Back
        </Link>
        <div
          className={cn(
            'basis-full',
            'flex flex-row items-center gap-3 justify-center text-sm text-text-tertiary leading-tight',
            'hidden sm:flex',
          )}
        >
          <Lock16Svg />
          Secured by Alien
        </div>
      </div>

      <div className="w-full flex flex-col items-center flex-1 p-4 md:p-[35px] rounded-t-[40px] border-b-0 border border-stroke-default">
        <Logo2xGraySvg className="mb-[23px] shrink-0" />

        <AuthForm />
      </div>
    </main>
  );
};

export default SignInPage;
