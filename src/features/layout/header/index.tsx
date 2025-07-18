import Link from 'next/link'
import type { FC } from 'react'

import Lock16Svg from '@/icons/lock-16.svg';
import Logo1xWhiteSvg from '@/icons/logo-1x-white.svg';
import AuthState from '@/features/auth-state';


const Header: FC = () => {
    return (
        <header>
            <div className="max-w-[1080px] w-full h-[60px] mx-auto px-3 grid grid-cols-3 place-items-stretch">
                <Link href={'/'} className="flex flex-row items-center gap-3">
                    <Logo1xWhiteSvg />
                </Link>

                <div className="flex flex-row items-center gap-3 justify-center text-sm text-text-tertiary leading-tight">
                    <Lock16Svg />
                    Secured by Alien
                </div>

                <div className="flex flex-row items-center gap-3 justify-end">
                    <Link href={'/docs'} className="text-white text-xs leading-none">
                        Documentation
                    </Link>

                    <AuthState />
                </div>
            </div>
        </header>
    )
}

export default Header;
