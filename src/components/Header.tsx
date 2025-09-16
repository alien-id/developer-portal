'use client';

import Link from 'next/link';

import Lock16Svg from '@/icons/lock-16.svg';
import Logo1xWhiteSvg from '@/icons/logo-1x-white.svg';
import { UserMenu } from '@/components/UserMenu';
import { cn } from '@/lib/utils';

export const Header = () => {
  return (
    <header className="max-w-[1080px] w-full h-[60px] mx-auto px-3 flex flex-row items-center justify-between relative">
      <Link href={'/'} className="flex flex-row items-center basis-full">
        <Logo1xWhiteSvg />
      </Link>

      <div
        className={cn(
          'absolute left-[50%] translate-x-[-50%]',
          'basis-full',
          'flex flex-row items-center gap-3 justify-center text-sm text-text-tertiary leading-tight',
          'hidden sm:flex',
        )}
      >
        <Lock16Svg />
        Secured by Alien
      </div>

      <div className="flex flex-row items-center gap-5 justify-end basis-full">
        <Link href={'/docs'} className=" text-white text-sm leading-none">
          Docs
        </Link>

        <UserMenu />
      </div>
    </header>
  );
};
