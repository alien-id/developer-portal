import Link from 'next/link'

const Footer = () => {
    return (
        <footer>
            <nav className="max-w-[1080px] w-full mx-auto px-3 py-10 flex flex-row gap-6">
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
        </footer>
    )
}

export default Footer;
