import Link from 'next/link'

import Lock16Svg from '@/icons/lock-16.svg';
import Logo1xWhiteSvg from '@/icons/logo-1x-white.svg';
import { UserMenu } from '@/features';
import { cn } from '@/lib/utils';

const Header = () => {
    return (
        <header>
            <div className="max-w-[1080px] w-full h-[60px] mx-auto px-3 flex flex-row items-center">
                <Link href={'/'} className="flex flex-row items-center basis-full">
                    <Logo1xWhiteSvg />
                </Link>

                <div
                    className={cn(
                        "basis-full",
                        "flex flex-row items-center gap-3 justify-center text-sm text-text-tertiary leading-tight",
                        "hidden sm:flex"
                    )}
                >
                    <Lock16Svg />

                    Secured by Alien
                </div>

                <div className="flex flex-row items-center gap-3 justify-end basis-full">
                    <Link href={'/docs'} className=" text-white text-xs leading-none">
                        Documentation
                    </Link>

                    <UserMenu />
                </div>
            </div>
        </header>
    )
}

export default Header;
