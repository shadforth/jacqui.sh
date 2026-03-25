import { BookTitleWithReview } from '@/components/BookTitleWithReview'
import { getReadBooks, formatReadDate, stars, LAST_UPDATED, type Book } from '@/lib/books'

export const metadata = { title: 'Reading', description: 'Books Jacqui Shadforth has read, with ratings and reviews.' }

const h1Style = {
  fontFamily: 'var(--font-markazi), serif',
  fontSize: '1.5rem',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  marginBottom: '0.5rem',
}

const h3Style = {
  fontFamily: 'var(--font-markazi), serif',
  fontSize: '1.1rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  color: 'hsl(var(--muted-foreground))',
  marginBottom: '0.5rem',
  marginTop: '1.75rem',
}

function groupByYear(books: Book[]): [string, Book[]][] {
  const groups = new Map<string, Book[]>()
  for (const book of books) {
    const year = book.dateRead ? book.dateRead.slice(0, 4) : 'Earlier'
    if (!groups.has(year)) groups.set(year, [])
    groups.get(year)!.push(book)
  }
  return Array.from(groups.entries())
}

export default function ReadingPage() {
  const read = getReadBooks().filter((b) => {
    if (!b.dateRead) return false
    const year = Number.parseInt(b.dateRead.slice(0, 4), 10)
    return Number.isFinite(year) && year > 2022
  })
  const grouped = groupByYear(read)

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 md:py-24">
      <h1 style={h1Style}>Reading</h1>
      <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, marginBottom: '1rem' }}>
        Last updated:{' '}
        {new Date(LAST_UPDATED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

      {grouped.map(([year, books]) => (
        <div key={year}>
          <h3 style={h3Style}>{year}</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {books.map((book, i) => (
              <li
                key={`${book.title}-${book.author}-${book.dateRead}`}
                style={{ position: 'relative', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}
              >
                <span style={{
                  position: 'absolute',
                  left: '-2rem',
                  width: '1.5rem',
                  textAlign: 'right',
                  fontSize: '0.65rem',
                  color: 'hsl(var(--muted-foreground))',
                  opacity: 0.35,
                  fontVariantNumeric: 'tabular-nums',
                  top: '0.15em',
                }}>
                  {books.length - i}
                </span>
                <div style={{ minWidth: 0 }}>
                  <BookTitleWithReview book={book} />
                  <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.85rem' }}>
                    {' '}{book.author}
                  </span>
                </div>
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  {book.myRating > 0 && (
                    <span style={{ color: 'hsl(var(--accent))', fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                      {stars(book.myRating)}
                    </span>
                  )}
                  {book.dateRead && (
                    <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>
                      {formatReadDate(book.dateRead)}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
