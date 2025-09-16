import Link from 'next/link';

export const Footer = () => {
  return (
    <footer>
      <nav className="max-w-[1080px] w-full mx-auto px-3 py-10 flex flex-row justify-between gap-6 flex-wrap">
        <div className="flex flex-row gap-6">
          <Link href="/public" className="text-text-tertiary text-sm leading-tight">
            Privacy Policy
          </Link>

          <Link href="/public" className="text-text-tertiary text-sm leading-tight">
            Terms and conditions
          </Link>
        </div>

        <Link href="/public" className="text-text-tertiary text-sm leading-tight">
          © 2025 Alien. All rights reserved.
        </Link>
      </nav>
    </footer>
  );
};
