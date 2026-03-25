import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid hsl(var(--border))' }}>
      <div className="container mx-auto max-w-2xl px-4 py-8 flex items-center justify-between">
        <ThemeToggle />
        <Link
          href="/"
          className="text-sm transition-colors"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          jacqui.sh
        </Link>
        <div />
      </div>
    </footer>
  )
}
