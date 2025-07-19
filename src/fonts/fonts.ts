import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const robotoMono = Roboto_Mono({
    variable: "--font-roboto-mono",
    subsets: ["latin"],
});

export const booton = localFont({
    src: [
        { path: './Booton-Thin.woff2', weight: '100', style: 'normal' },
        { path: './Booton-Extralight.woff2', weight: '200', style: 'normal' },
        { path: './Booton-Light.woff2', weight: '300', style: 'normal' },
        { path: './Booton-Regular.woff2', weight: '400', style: 'normal' },
        { path: './Booton-Medium.woff2', weight: '500', style: 'normal' },
        { path: './Booton-Semibold.woff2', weight: '600', style: 'normal' },
        { path: './Booton-Bold.woff2', weight: '700', style: 'normal' },
        { path: './Booton-Heavy.woff2', weight: '800', style: 'normal' },
    ],
    display: 'swap',
    variable: '--font-booton',
    fallback: ['Arial'],
});