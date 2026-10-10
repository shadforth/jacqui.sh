export const LAST_UPDATED = '2026-07-12'

export interface Book {
  title: string
  author: string
  myRating: number
  dateRead: string
  shelf: 'read' | 'to-read'
  /** Short review; when set, the title opens a dialog on the Reading page. */
  review?: string
}

export const books: Book[] = [
  // Read — sorted by date_read desc (undated ones at the end)
  {
    title: 'Macbeth: No Fear Shakespeare',
    author: 'William Shakespeare',
    myRating: 4,
    dateRead: '2026-07-12',
    shelf: 'read',
  },
  {
    title: 'The Ones Who Walk Away from Omelas',
    author: 'Ursula K. Le Guin',
    myRating: 5,
    dateRead: '2026-04-01',
    shelf: 'read',
  },
  {
    title: 'I Who Have Never Known Men',
    author: 'Jacqueline Harpman',
    myRating: 5,
    dateRead: '2026-03-11',
    shelf: 'read',
    review: `If you're looking for more existential dread in your life, this book is for you.

Disturbing, bleak, and profoundly powerful. It's science fiction, but it felt more like horror. I Who Have Never Known Men is a hollowed-out look at what's left of humanity when everything else is stripped away.

I loved its ambiguity—how it absolutely leaves you hanging—left alone to wander the vast and desolate nothingness for eternity. HIGHLY recommend.`,
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    myRating: 4,
    dateRead: '2026-02-25',
    shelf: 'read',
  },
  {
    title: 'Maybe You Should Talk to Someone',
    author: 'Lori Gottlieb',
    myRating: 2,
    dateRead: '2026-01-25',
    shelf: 'read',
  },
  {
    title: 'Circe',
    author: 'Madeline Miller',
    myRating: 4,
    dateRead: '2025-12-31',
    shelf: 'read',
  },
  {
    title: "Nobody's Girl",
    author: 'Virginia Roberts Giuffre',
    myRating: 5,
    dateRead: '2025-11-23',
    shelf: 'read',
  },
  {
    title: 'The Seven Principles For Making Marriage Work',
    author: 'John M. Gottman',
    myRating: 4,
    dateRead: '2025-11-10',
    shelf: 'read',
  },
  {
    title: 'Outlive: The Science & Art of Longevity',
    author: 'Peter Attia',
    myRating: 3,
    dateRead: '2025-05-18',
    shelf: 'read',
  },
  {
    title: 'Born to Run',
    author: 'Christopher McDougall',
    myRating: 3,
    dateRead: '2025-04-21',
    shelf: 'read',
  },
  {
    title: 'Careless People',
    author: 'Sarah Wynn-Williams',
    myRating: 4,
    dateRead: '2025-04-12',
    shelf: 'read',
  },
  {
    title: 'The Anxious Generation',
    author: 'Jonathan Haidt',
    myRating: 4,
    dateRead: '2025-04-09',
    shelf: 'read',
  },
  {
    title: 'Swimming in the Dark',
    author: 'Tomasz Jedrowski',
    myRating: 5,
    dateRead: '2025-09-01',
    shelf: 'read',
  },
  {
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    myRating: 4,
    dateRead: '2025-08-29',
    shelf: 'read',
  },
  {
    title: 'Muay Thai Basics',
    author: 'Christoph Delp',
    myRating: 3,
    dateRead: '2025-07-07',
    shelf: 'read',
  },
  {
    title: 'Caste: The Origins of Our Discontents',
    author: 'Isabel Wilkerson',
    myRating: 4,
    dateRead: '2025-02-23',
    shelf: 'read',
  },
  {
    title: 'Cobalt Red',
    author: 'Siddharth Kara',
    myRating: 5,
    dateRead: '2025-02-06',
    shelf: 'read',
  },
  {
    title: 'The Perfect Police State',
    author: 'Geoffrey Cain',
    myRating: 0,
    dateRead: '2025-01-26',
    shelf: 'read',
  },
  {
    title: 'Troubled: A Memoir',
    author: 'Rob Henderson',
    myRating: 4,
    dateRead: '2025-01-10',
    shelf: 'read',
  },
  {
    title: 'The Radium Girls',
    author: 'Kate Moore',
    myRating: 4,
    dateRead: '2025-01-14',
    shelf: 'read',
  },
  {
    title: 'On the Shortness of Life',
    author: 'Seneca',
    myRating: 3,
    dateRead: '2025-03-01',
    shelf: 'read',
  },
  {
    title: 'Nothing to Envy: Real Lives in North Korea',
    author: 'Barbara Demick',
    myRating: 4,
    dateRead: '2024-09-10',
    shelf: 'read',
  },
  {
    title: 'Fascism: A Warning',
    author: 'Madeleine K. Albright',
    myRating: 5,
    dateRead: '2023-02-12',
    shelf: 'read',
  },
  {
    title: 'The Happiest Man on Earth',
    author: 'Eddie Jaku',
    myRating: 4,
    dateRead: '2023-01-29',
    shelf: 'read',
  },
  {
    title: 'The Yellow Bird Sings',
    author: 'Jennifer Rosner',
    myRating: 4,
    dateRead: '2023-01-29',
    shelf: 'read',
  },
  {
    title: 'WWI: Tales from the Trenches',
    author: 'Daniel Wrinn',
    myRating: 3,
    dateRead: '2023-01-30',
    shelf: 'read',
  },
  {
    title: 'The Charisma Myth',
    author: 'Olivia Fox Cabane',
    myRating: 3,
    dateRead: '2022-06-13',
    shelf: 'read',
  },
  {
    title: 'Becoming',
    author: 'Michelle Obama',
    myRating: 5,
    dateRead: '2022-05-28',
    shelf: 'read',
  },
  {
    title: 'Crying in H Mart',
    author: 'Michelle Zauner',
    myRating: 4,
    dateRead: '2022-01-21',
    shelf: 'read',
  },
  {
    title: 'Spring Boot: Up and Running',
    author: 'Mark Heckler',
    myRating: 4,
    dateRead: '2022-01-01',
    shelf: 'read',
  },
  {
    title: 'Lord of the Flies',
    author: 'William Golding',
    myRating: 3,
    dateRead: '2022-01-04',
    shelf: 'read',
  },
  {
    title: 'The Courage to be Disliked',
    author: 'Ichiro Kishimi',
    myRating: 3,
    dateRead: '2022-01-11',
    shelf: 'read',
  },
  {
    title: "A Room of One's Own",
    author: 'Virginia Woolf',
    myRating: 5,
    dateRead: '2021-12-31',
    shelf: 'read',
  },
  {
    title: 'No Mud, No Lotus',
    author: 'Thich Nhat Hanh',
    myRating: 4,
    dateRead: '2021-12-27',
    shelf: 'read',
  },
  {
    title: 'No-Nonsense Buddhism for Beginners',
    author: 'Noah Rasheta',
    myRating: 4,
    dateRead: '2021-12-07',
    shelf: 'read',
  },
  {
    title: 'Adult Children of Emotionally Immature Parents',
    author: 'Lindsay C. Gibson',
    myRating: 5,
    dateRead: '2021-12-02',
    shelf: 'read',
  },
  {
    title: 'Lessons from Learning a Programming Language on the Job',
    author: 'Jacqui Shadforth',
    myRating: 0,
    dateRead: '2021-09-18',
    shelf: 'read',
  },
  {
    title: 'Ikigai',
    author: 'Héctor García',
    myRating: 3,
    dateRead: '2021-08-09',
    shelf: 'read',
  },
  {
    title: '97 Things Every Java Programmer Should Know',
    author: 'Kevlin Henney',
    myRating: 3,
    dateRead: '2021-03-28',
    shelf: 'read',
  },
  {
    title: 'Radical Candor',
    author: 'Kim Malone Scott',
    myRating: 4,
    dateRead: '2021-03-01',
    shelf: 'read',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    myRating: 4,
    dateRead: '2021-03-01',
    shelf: 'read',
  },
  {
    title: 'Pragmatic Thinking and Learning',
    author: 'Andy Hunt',
    myRating: 4,
    dateRead: '2021-01-01',
    shelf: 'read',
  },
  {
    title: 'Apprenticeship Patterns',
    author: 'Dave Hoover',
    myRating: 4,
    dateRead: '2021-01-01',
    shelf: 'read',
  },
  {
    title: 'The Life-Changing Magic of Tidying Up',
    author: 'Marie Kondō',
    myRating: 4,
    dateRead: '2021-01-01',
    shelf: 'read',
  },
  {
    title: 'Unbroken',
    author: 'Laura Hillenbrand',
    myRating: 4,
    dateRead: '2018-01-08',
    shelf: 'read',
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    myRating: 4,
    dateRead: '2018-09-02',
    shelf: 'read',
  },
  {
    title: "Man's Search for Meaning",
    author: 'Viktor E. Frankl',
    myRating: 3,
    dateRead: '2018-07-15',
    shelf: 'read',
  },
  {
    title: 'Ready Player One',
    author: 'Ernest Cline',
    myRating: 3,
    dateRead: '2017-11-05',
    shelf: 'read',
  },
  {
    title: 'The Sense of an Ending',
    author: 'Julian Barnes',
    myRating: 4,
    dateRead: '2017-01-10',
    shelf: 'read',
  },
  {
    title: 'Hackers & Painters',
    author: 'Paul Graham',
    myRating: 3,
    dateRead: '2017-01-29',
    shelf: 'read',
  },
  {
    title: 'Do Androids Dream of Electric Sheep?',
    author: 'Philip K. Dick',
    myRating: 4,
    dateRead: '2017-02-04',
    shelf: 'read',
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    myRating: 5,
    dateRead: '2017-02-05',
    shelf: 'read',
  },
  {
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    myRating: 2,
    dateRead: '2019-05-11',
    shelf: 'read',
  },
  {
    title: 'The Barefoot Investor',
    author: 'Scott Pape',
    myRating: 4,
    dateRead: '2019-06-11',
    shelf: 'read',
  },
  {
    title: 'Rich Dad, Poor Dad',
    author: 'Robert T. Kiyosaki',
    myRating: 3,
    dateRead: '2019-10-03',
    shelf: 'read',
  },
  // Read — no date
  {
    title: 'The Pragmatic Programmer',
    author: 'Andy Hunt',
    myRating: 4,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'Programming Kotlin',
    author: 'Venkat Subramaniam',
    myRating: 4,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'Lean In',
    author: 'Sheryl Sandberg',
    myRating: 4,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'A Mind for Numbers',
    author: 'Barbara Oakley',
    myRating: 4,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'Quiet: The Power of Introverts',
    author: 'Susan Cain',
    myRating: 4,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: '100 Ways to Improve Your Writing',
    author: 'Gary Provost',
    myRating: 4,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'The Martian',
    author: 'Andy Weir',
    myRating: 4,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'Flowers for Algernon',
    author: 'Daniel Keyes',
    myRating: 5,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: '1984',
    author: 'George Orwell',
    myRating: 5,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'Life of Pi',
    author: 'Yann Martel',
    myRating: 4,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    myRating: 4,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    myRating: 4,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    myRating: 4,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    myRating: 4,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    myRating: 4,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'Outliers',
    author: 'Malcolm Gladwell',
    myRating: 3,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'The Defining Decade',
    author: 'Meg Jay',
    myRating: 3,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'The Perks of Being a Wallflower',
    author: 'Stephen Chbosky',
    myRating: 3,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'The Bell Jar',
    author: 'Sylvia Plath',
    myRating: 3,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'The Crucible',
    author: 'Arthur Miller',
    myRating: 3,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'The Best Interface Is No Interface',
    author: 'Golden Krishna',
    myRating: 3,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'Women in Tech',
    author: 'Tarah Wheeler Van Vlack',
    myRating: 3,
    dateRead: '',
    shelf: 'read',
  },
  {
    title: 'The Blue Book of Grammar and Punctuation',
    author: 'Jane Straus',
    myRating: 3,
    dateRead: '',
    shelf: 'read',
  },
]

export function getReadBooks() {
  return books
    .filter((b) => b.shelf === 'read')
    .sort((a, b) => {
      if (a.dateRead && b.dateRead) return b.dateRead.localeCompare(a.dateRead)
      if (a.dateRead) return -1
      if (b.dateRead) return 1
      return 0
    })
}

export function formatReadDate(dateStr: string): string {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return `${months[parseInt(month) - 1]} ${year}`
}

export function stars(rating: number): string {
  if (rating === 0) return ''
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}
