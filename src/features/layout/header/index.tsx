import Link from 'next/link'
import styles from './index.module.css'
import type { FC } from 'react'
import { Button } from '@/components/ui/button'

import Lock16Svg from '@/icons/lock-16.svg';
import Logo1xWhiteSvg from '@/icons/logo-1x-white.svg';
import AuthState from '@/features/auth-state';


const Header: FC = () => {
    return (
        <header>
            <div className="max-w-[1080px] w-full h-[60px] mx-auto px-3 grid grid-cols-3 place-items-stretch">
                <div className="flex flex-row items-center gap-3">
                    <Logo1xWhiteSvg />
                </div>

                <div className="flex flex-row items-center gap-3 justify-center text-text-tertiary">
                    <Lock16Svg />
                    Secured by Alien
                </div>

                <div className="flex flex-row items-center gap-3 justify-end">
                    <Link href={'/docs'}>
                        Documentation
                    </Link>

                    <AuthState />
                </div>
            </div>
        </header>
    )
}

export default Header;
