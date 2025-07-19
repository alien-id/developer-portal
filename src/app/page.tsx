import type { Metadata } from 'next'
import { Link } from 'nextra-theme-docs'
import { Header } from '@/features'
import type { FC } from 'react'
import { Button } from '@/components/ui/button'
import ArrowRight16Svg from '@/icons/arrow-right-16.svg';
import LogoGradientSvg from '@/icons/logo-gradient.svg';
import { AnimatedSection } from '@/components/framer-motion'

export const metadata: Metadata = {
  description:
    'Build fast, customizable, and content-rich websites with Nextra. Powered by Next.js, it offers seamless Markdown support, customizable themes, file conventions, and easy integration with MDX, making it perfect for documentation, blogs, and static websites.'
}

const IndexPage: FC = () => {
  return (
    <section>
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

            <Link href='/sign-in'>
              <Button
                variant={'brand'}
                className='text-text-primary text-base leading-snug px-10 py-2'
              >
                Get started

                <ArrowRight16Svg className="text-neutral-500" />
              </Button>
            </Link>

            <Link href='/docs'>
              <Button
                variant="outline"
                className="bg-neutral-800 rounded-[36px] border-none text-text-primary text-base leading-snug px-10 py-2"
              >
                Learn more
                <ArrowRight16Svg />
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
                  <h4 className='text-text-primary text-base leading-normal mb-2'>
                    Built for security
                  </h4>

                  <p className='text-text-secondary text-sm font-normal leading-tight'>
                    Our SDK uses end-to-end encryption and a private key system. No passwords, no shared secrets.
                  </p>
                </div>

                <div>
                  <h4 className='text-text-primary text-base leading-normal mb-2'>
                    Anonymous
                  </h4>

                  <p className='text-text-secondary text-sm font-normal leading-tight'>
                    Users stay anonymous. The system doesn’t collect names, emails, or identifiers. All that’s used is a secure app-specific ID — invisible to everyone but the device itself.
                  </p>
                </div>

                <div>
                  <h4 className='text-text-primary text-base leading-normal mb-2'>
                    Developer-first
                  </h4>

                  <p className='text-text-secondary text-sm font-normal leading-tight'>
                    Users stay anonymous. The system doesn’t collect names, emails, or identifiers. All that’s used is a secure app-specific ID — invisible to everyone but the device itself.
                  </p>
                </div>

                <div>
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

          <LogoGradientSvg className="mb-6" />

          <p className='text-text-secondary text-sm font-normal leading-tight'>
            Accessing the Dev-Portal is a breeze! Just scan the QR code with your mobile app—no need for usernames or passwords.
          </p>
        </AnimatedSection>

      </main>

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


    </section>
  )
}

export default IndexPage
