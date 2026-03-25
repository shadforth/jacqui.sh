import type { Metadata } from 'next'
import { Fredoka, Markazi_Text } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka' })
const markaziText = Markazi_Text({
  subsets: ['latin'],
  variable: '--font-markazi',
  weight: ['400', '500', '600', '700'],
})

const siteUrl = 'https://jacqui.sh'
const siteDescription = 'Personal site of Jacqui Shadforth — an Aussie software engineer and designer based in London.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'jacqui.sh',
    template: '%s — jacqui.sh',
  },
  description: siteDescription,
  keywords: ['Jacqui Shadforth', 'software engineer', 'designer', 'London', 'personal site', 'blog'],
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
  jobTitle: 'Software Engineer & Designer',
  description: 'Aussie software engineer and designer based in London.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fredoka.variable} ${markaziText.variable}`}>
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
