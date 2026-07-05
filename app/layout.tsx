import type { Metadata } from 'next'
import { DM_Sans, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const siteUrl = 'https://jacqui.sh'
const siteDescription =
  'Personal site of Jacqui Shadforth — an Aussie software developer and designer based in London.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jacqui Shadforth — jacqui.sh',
    template: '%s — jacqui.sh',
  },
  description: siteDescription,
  keywords: [
    'Jacqui Shadforth',
    'software developer',
    'designer',
    'London',
    'personal site',
    'blog',
  ],
  authors: [{ name: 'Jacqui Shadforth', url: siteUrl }],
  creator: 'Jacqui Shadforth',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'jacqui.sh',
    title: 'jacqui.sh',
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jacquishadforth',
    creator: '@jacquishadforth',
    title: 'jacqui.sh',
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jacqui Shadforth',
  url: siteUrl,
  sameAs: ['https://twitter.com/jacquishadforth'],
  jobTitle: 'Software Developer & Designer',
  description: 'Aussie software developer and designer based in London.',
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5f0' },
    { media: '(prefers-color-scheme: dark)', color: '#251f1a' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${lora.variable}`}
    >
      <head>
        <link rel="dns-prefetch" href="https://ws.audioscrobbler.com" />
        <link rel="preconnect" href="https://ws.audioscrobbler.com" />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Analytics />
      </body>
    </html>
  )
}
