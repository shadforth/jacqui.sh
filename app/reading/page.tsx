import { BookTitleWithReview } from '@/components/BookTitleWithReview'
import { getReadBooks, formatReadDate, stars, LAST_UPDATED, type Book } from '@/lib/books'

export const metadata = { title: 'Reading', description: 'Books Jacqui Shadforth has read, with ratings and reviews.' }

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
      <div className="reading-header">
        <h1 className="heading-markazi">Reading</h1>
        <span className="reading-last-updated">
          <span className="font-medium">Last updated</span>:{' '}
          {new Date(LAST_UPDATED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>

      {grouped.map(([year, books]) => (
        <div key={year}>
          <h3 className="heading-markazi-sm text-muted mt-7 mb-2">{year}</h3>
          <ul className="reading-books-list">
            {books.map((book, i) => (
              <li
                key={`${book.title}-${book.author}-${book.dateRead}`}
                className="reading-book-item"
              >
                <span className="reading-book-number">
                  {books.length - i}
                </span>
                <div className="min-w-0">
                  <BookTitleWithReview book={book} />
                  <span className="reading-book-author">
                    {' '}{book.author}
                  </span>
                </div>
                <div className="reading-book-meta">
                  {book.myRating > 0 && (
                    <span className="reading-book-rating">
                      {stars(book.myRating)}
                    </span>
                  )}
                  {book.dateRead && (
                    <span className="reading-book-date">
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
