# jacqui.sh

Personal website of Jacqui Shadforth — software engineer and designer based in London.

🔗 **[jacqui.sh](https://jacqui.sh)**

## Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **Styling**: [TailwindCSS 4](https://tailwindcss.com)
- **Content**: MDX (blog posts)
- **Reactions**: Redis via [ioredis](https://github.com/redis/ioredis)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Deployment**: [Vercel](https://vercel.com)

## Local development

```bash
npm install
```

Create a `.env.local` file with the following variables:

| Variable | Description |
|----------|-------------|
| `REDIS_URL` | Redis connection URL (used for emoji reactions on blog posts) |
| `LASTFM_API_KEY` | Last.fm API key (used for the listening section) |

Then use the scripts in the `scripts/` directory:

| Script | Description |
|--------|-------------|
| `./scripts/dev` | Start the dev server (Turbopack) |
| `./scripts/build` | Build for production |
| `./scripts/lint` | Run ESLint |
| `./scripts/start` | Start the production server |

Open [http://localhost:3000](http://localhost:3000).

## AI development

This project is built with [Claude Code](https://claude.ai/code) and [Superpowers](https://getsuperpowers.com). The `CLAUDE.md` file contains instructions and conventions for AI agents working on this codebase.
