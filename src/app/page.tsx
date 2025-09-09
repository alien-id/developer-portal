'use client';

import { Link } from 'nextra-theme-docs'
import { Header } from "@/components/Header";
import { Footer } from '@/components/Footer'
import type { FC } from 'react'
import { Button } from '@/components/ui/button'
import ArrowRight16Svg from '@/icons/arrow-right-16.svg';
import Logo16Svg from '@/icons/logo-16.svg';
import { AnimatedSection } from '@/components/framer-motion'
import Image from 'next/image'
import { useAuth } from '@alien_org/sso-sdk-react'

const IndexPage: FC = () => {
  const { auth } = useAuth()

  return (
    <section className='relative bg-[url(/bg-blurs-top.png)] bg-repeat-x bg-position-[50%_-45px]'>
      <Header />

      <main className="max-w-[636px] mx-auto flex flex-col items-center justify-center py-20 text-center">
        <AnimatedSection
          className="max-w-4xl flex flex-col items-center mb-34"
        >

          <h1 className="text-center justify-start text-white text-5xl leading-14 mb-3">
            Implement Alien Ecosystem
            <br />
            in just 5 minutes
          </h1>

          <div className="max-w-2xl mx-auto space-y-4 mb-6">
            <div className="w-96 text-center justify-start text-text-secondary text-sm font-normal leading-tight">
              Welcome to the Alien Ecosystem documentation.This enables developers to integrate their applications with Alien ecosystem.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 ">

            {auth.isAuthenticated ? (
              <Link href='/dashboard/sso'>
                <Button
                  variant={'brand'}
                  className='text-text-primary text-base leading-snug px-10 py-2'
                >
                  Go to Dashboard

                  <ArrowRight16Svg className="text-neutral-500" />
                </Button>
              </Link>
            ) : (
              <Link href='/sign-in'>
                <Button
                  variant={'brand'}
                  className='text-text-primary text-base leading-snug px-10 py-2'
                >
                  Get started

                  <ArrowRight16Svg className="text-neutral-500" />
                </Button>
              </Link>
            )}

            <Link href='/docs'>
              <Button
                variant="outline"
                className="bg-neutral-800 rounded-[36px] border-none text-text-primary text-base leading-snug px-10 py-2"
              >
                Learn more
                <ArrowRight16Svg className="text-neutral-500" />
              </Button>
            </Link>

          </div>

        </AnimatedSection>

        <AnimatedSection
          className="max-w-4xl flex flex-col items-center mb-4"
        >
          <h2 className="text-center justify-start text-sky-300 text-5xl leading-14 mb-20">
            Alien SSO
          </h2>

          <div>
            <div className='relative py-5 border border-t-0 border-b-0 border-stroke-default'>
              <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full border border-stroke-default bg-black" />
              <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full border border-stroke-default bg-black" />
            </div>

            <div className='px-20 py-14 text-left bg-[url(/dots-background.png)] bg-repeat-round border border-stroke-default'>
              <div className='text-text-secondary text-xs font-medium uppercase leading-none tracking-wide mb-5'>
                [ capabilities ]
              </div>

              <h3 className='text-text-primary text-2xl leading-9 mb-10'>
                Models that fit your needs
              </h3>

              <div className='grid grid-cols-2 gap-10'>
                <div>

                  <Image className="mb-[20px]" src='/model-avatar.png' alt='' width={44} height={46} />

                  <h4 className='text-text-primary text-base leading-normal mb-2'>
                    Built for security
                  </h4>

                  <p className='text-text-secondary text-sm font-normal leading-tight'>
                    Our SDK uses end-to-end encryption and a private key system. No passwords, no shared secrets.
                  </p>
                </div>

                <div>
                  <Image className="mb-[20px]" src='/model-avatar.png' alt='' width={44} height={46} />

                  <h4 className='text-text-primary text-base leading-normal mb-2'>
                    Anonymous
                  </h4>

                  <p className='text-text-secondary text-sm font-normal leading-tight'>
                    Users stay anonymous. The system doesn’t collect names, emails, or identifiers. All that’s used is a secure app-specific ID — invisible to everyone but the device itself.
                  </p>
                </div>

                <div>
                  <Image className="mb-[20px]" src='/model-avatar.png' alt='' width={44} height={46} />

                  <h4 className='text-text-primary text-base leading-normal mb-2'>
                    Developer-first
                  </h4>

                  <p className='text-text-secondary text-sm font-normal leading-tight'>
                    Users stay anonymous. The system doesn’t collect names, emails, or identifiers. All that’s used is a secure app-specific ID — invisible to everyone but the device itself.
                  </p>
                </div>

                <div>
                  <Image className="mb-[20px]" src='/model-avatar.png' alt='' width={44} height={46} />

                  <h4 className='text-text-primary text-base leading-normal mb-2'>
                    Fast, seamless integration
                  </h4>

                  <p className='text-text-secondary text-sm font-normal leading-tight'>
                    Install two packages, copy our usage example, and you’re live in minutes. The SDK handles everything from button rendering to secure backend validation.
                  </p>
                </div>
              </div>

            </div>

            <div className='relative py-13 border border-b-0 border-t-0 border-stroke-default'>
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border border-stroke-default bg-black" />
              <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border border-stroke-default bg-black" />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          className="max-w-4xl flex flex-col items-center mb-34"
        >
          <h2 className="relative text-center justify-start text-emerald-200 text-5xl leading-14 mb-30">
            Mini-apps

            <div className='absolute top-0 right-0 translate-x-80/100 -translate-y-80/100 px-1 py-1.5  border-2 rounded-full border-stroke-default text-[8px] text-text-secondary bg-bg-secondary leading-none'>
              SOON
            </div>
          </h2>
        </AnimatedSection>

        <AnimatedSection
          className="max-w-4xl flex flex-col items-center mb-34"
        >

          <Logo16Svg className="mb-6" />

          <p className='w-72 text-text-secondary text-sm font-normal leading-tight mb-10'>
            Accessing the Dev-Portal is a breeze! Just scan the QR code with your mobile app — no need for usernames or passwords.
          </p>

          <Link href='/sign-in' className='mb-4'>

            <svg xmlns="http://www.w3.org/2000/svg" width="211" height="81" viewBox="0 0 211 81" fill="none">
              <g filter="url(#filter0_in_207_8250)">
                <rect x="1" y="1" width="209" height="79" rx="39.5" fill="#205CB0" />
                <rect x="1" y="1" width="209" height="79" rx="39.5" stroke="url(#paint0_linear_207_8250)" strokeLinecap="round" />
                <path d="M50.293 49.7344C45.3945 49.7344 42.0664 46.1367 42.0664 40.8984C42.0664 35.6719 45.2656 32.0625 50.2344 32.0625C54.2422 32.0625 56.4688 33.8203 57.2305 36.6562L54.6875 37.207C54.1719 35.5781 53.0234 34.1133 50.2344 34.1133C46.8477 34.1133 44.7734 36.8438 44.7734 40.8984C44.7734 45.0352 46.8594 47.6836 50.293 47.6836C52.4023 47.6836 54.0547 46.8516 54.8867 45.9141V42.4922H50.4922V40.4062H55.8008C56.7734 40.4062 57.3477 41.0742 57.3477 42.0586V46.7578C55.9297 48.3984 53.3281 49.7344 50.293 49.7344ZM65.8555 49.7344C62.2109 49.7344 59.8672 47.1094 59.8672 43.1133C59.8672 39.1406 62.2695 36.4688 65.8438 36.4688C69.043 36.4688 71.6328 38.6133 71.3281 43.6172H62.3867C62.5273 46.2773 63.9453 47.8008 65.8555 47.8008C67.4492 47.8008 68.5273 47.0391 68.9375 45.5625H71.375C71 47.7422 69.0078 49.7344 65.8555 49.7344ZM62.457 41.8008H68.9023C68.8672 39.7031 67.707 38.3672 65.8555 38.3672C64.1914 38.3672 62.8203 39.3164 62.457 41.8008ZM77.2227 49.5C75.8281 49.5 75.1719 48.7617 75.1719 47.5547V38.625H73.0742V36.7031H75.2188L75.4414 33.375H77.5742V36.7031H80.5273V38.625H77.5742V47.5781H80.5273V49.5H77.2227ZM94.168 49.7344C90.6289 49.7344 88.7656 48.1641 88.6016 45.6328H90.9922C91.168 47.0859 92.2227 47.8242 94.168 47.8242C95.8555 47.8242 97.0039 47.168 97.0039 45.9375C97.0039 42.8086 89.0234 45.293 89.0234 40.2539C89.0234 37.9336 90.9805 36.4688 94.0039 36.4688C96.9688 36.4688 98.6562 37.7344 99.1016 39.7266L96.8164 40.207C96.5234 39.0352 95.7148 38.3789 93.9922 38.3789C92.4688 38.3789 91.4492 38.9883 91.4492 40.0898C91.4492 43.2422 99.4062 40.7227 99.4062 45.7734C99.4062 48.2227 97.3438 49.7344 94.168 49.7344ZM105.207 49.5C103.812 49.5 103.156 48.7617 103.156 47.5547V38.625H101.059V36.7031H103.203L103.426 33.375H105.559V36.7031H108.512V38.625H105.559V47.5781H108.512V49.5H105.207ZM114.781 49.7344C112.285 49.7344 110.691 48.3047 110.691 46.1016C110.691 43.7578 112.297 42.5039 115.262 42.0703L117.793 41.707C118.648 41.5781 119.023 41.3555 119.023 40.6758C119.023 39.1758 118.004 38.3672 116.27 38.3672C114.453 38.3672 113.469 39.2812 113.164 40.6641L110.844 40.3008C111.312 38.168 113.023 36.4688 116.27 36.4688C119.598 36.4688 121.438 38.25 121.438 41.1094V49.5H119.059V46.7695H118.965C118.578 48.3867 117.02 49.7344 114.781 49.7344ZM115.531 47.8125C117.816 47.8125 119.023 46.1836 119.023 43.6523V43.2305L115.719 43.793C114.066 44.0859 113.246 44.7539 113.246 45.8906C113.246 47.1211 114.148 47.8125 115.531 47.8125ZM125.082 49.5V36.7031H127.367V39.4219H127.473C128.023 37.1836 129.102 36.5977 130.543 36.5977H131.867V38.8945H130.273C128.375 38.8945 127.484 40.2305 127.484 43.3359V49.5H125.082ZM137.34 49.5C135.945 49.5 135.289 48.7617 135.289 47.5547V38.625H133.191V36.7031H135.336L135.559 33.375H137.691V36.7031H140.645V38.625H137.691V47.5781H140.645V49.5H137.34ZM148.473 49.7344C144.828 49.7344 142.484 47.1094 142.484 43.1133C142.484 39.1406 144.887 36.4688 148.461 36.4688C151.66 36.4688 154.25 38.6133 153.945 43.6172H145.004C145.145 46.2773 146.562 47.8008 148.473 47.8008C150.066 47.8008 151.145 47.0391 151.555 45.5625H153.992C153.617 47.7422 151.625 49.7344 148.473 49.7344ZM145.074 41.8008H151.52C151.484 39.7031 150.324 38.3672 148.473 38.3672C146.809 38.3672 145.438 39.3164 145.074 41.8008ZM161.656 49.7344C158.527 49.7344 156.418 47.1211 156.418 43.0781C156.418 39.0469 158.516 36.4688 161.645 36.4688C163.531 36.4688 164.973 37.5352 165.664 39.293H165.758V32.2969H168.172V49.5H165.77V46.8633H165.664C164.879 48.6914 163.543 49.7344 161.656 49.7344ZM158.961 43.0781C158.961 45.8789 160.297 47.707 162.348 47.707C164.422 47.707 165.746 45.8906 165.746 43.0781C165.746 40.2773 164.422 38.4609 162.348 38.4609C160.285 38.4609 158.961 40.2773 158.961 43.0781Z" fill="white" />
              </g>
              <defs>
                <filter id="filter0_in_207_8250" x="0.5" y="0.5" width="210" height="80" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset />
                  <feGaussianBlur stdDeviation="8" />
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.180392 0 0 0 0 0.509804 0 0 0 0 0.968627 0 0 0 1 0" />
                  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_207_8250" />
                  <feTurbulence type="fractalNoise" baseFrequency="0.5 0.5" stitchTiles="stitch" numOctaves="3" result="noise" seed="8922" />
                  <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                  <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                  </feComponentTransfer>
                  <feComposite operator="in" in2="effect1_innerShadow_207_8250" in="coloredNoise1" result="noise1Clipped" />
                  <feFlood floodColor="rgba(255, 255, 255, 0.3)" result="color1Flood" />
                  <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                  <feMerge result="effect2_noise_207_8250">
                    <feMergeNode in="effect1_innerShadow_207_8250" />
                    <feMergeNode in="color1" />
                  </feMerge>
                </filter>
                <linearGradient id="paint0_linear_207_8250" x1="145.761" y1="1" x2="145.761" y2="64.1037" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="#666666" />
                </linearGradient>
              </defs>
            </svg>
          </Link>

          {/* <div class="h-9 py-1 bg-neutral-800/0 rounded-[36px] shadow-[inset_0px_3px_11px_0px_rgba(101,178,255,0.70)] outline outline-1 outline-offset-[-0.50px] inline-flex justify-center items-center gap-1">
            <div class="text-center justify-center text-text-primary text-base leading-snug">
              Documentation
            </div>
            <div class="w-4 h-4 relative overflow-hidden">
              <div class="w-1.5 h-2.5 left-[10.33px] top-[13.33px] absolute origin-top-left -rotate-180 outline outline-2 outline-offset-[-1px] outline-white/30"></div>
            </div>
          </div> */}

          <Link href='/docs'>
            <Button
              variant="outline"
              className="bg-neutral-800/0 rounded-[36px] border-none text-text-primary text-base leading-snug px-10 py-2"
            >
              Documentation
              <ArrowRight16Svg className="text-neutral-500" />
            </Button>
          </Link>
        </AnimatedSection>

      </main>

      <Footer />
    </section>
  )
}

export default IndexPage
