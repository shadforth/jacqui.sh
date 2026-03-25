import type { Metadata } from 'next'
import { Fredoka, Markazi_Text } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'jacqui.sh',
  description: 'Personal site of Jacqui Shadforth',
  twitter: {
    card: 'summary_large_image',
    creator: '@jacquishadforth',
  },
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
      </body>
    </html>
  )
}
