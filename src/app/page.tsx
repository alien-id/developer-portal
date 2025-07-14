import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from 'nextra-theme-docs'
import docsCardDark from './SSO.png'
import docsCard from './SSO.png'
import { Feature, Features, Header } from '@/features'
import styles from './page.module.css'
import './page.css'
import type { FC } from 'react'

export const metadata: Metadata = {
  description:
    'Build fast, customizable, and content-rich websites with Nextra. Powered by Next.js, it offers seamless Markdown support, customizable themes, file conventions, and easy integration with MDX, making it perfect for documentation, blogs, and static websites.'
}

const IndexPage: FC = () => {
  return (
    <section>
      <Header />

      <div className="home-content">
        <div className="content-container">
          <h1 className="headline">
            Integrate with <br className="max-sm:hidden" />
            Alien Ecosystem
          </h1>
          <p className="subtitle">
            Welcome to the Alien Ecosystem documentation. This enables developers to integrate their applications with the Alien ecosystem.
          </p>
          <p className="subtitle">
            <Link className={styles.cta} href="/docs">
              Get started <span>→</span>
            </Link>
          </p>
        </div>

        <div className="features-container x:border-b nextra-border">
          <div className="content-container">
            <Features>
              <Feature
                index={0}
                large
                centered
                id="docs-card"
                href="/docs/sso"
              >
                <Image fill src={docsCard} alt="Background" loading="eager" />
                <Image fill
                  src={docsCardDark}
                  alt="Background (Dark)"
                  loading="eager"
                />
                <h3 className='text-white text-3xl font-bold drop-shadow-md'>
                  Intagrate with Alien SSO
                </h3>
              </Feature>

              <Feature index={1} centered href="/docs/mini-apps">
                <h3>
                  Mini-Apps
                </h3>

                <p className='text-left'>
                  The Alien Ecosystem supports two types of applications:
                  <br />
                  <br />
                  - Mini Apps: Web applications that run inside the Alien native app (iOS/Android) within a WebView
                  <br />
                  <br />
                  - Web Apps: Normal websites that integrate Sign in with Alien ID
                </p>

              </Feature>
            </Features>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IndexPage
