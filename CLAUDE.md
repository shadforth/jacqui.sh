# CLAUDE.md - jacqui.sh

jacqui.sh is Jacqui Shadforth's personal website: a place to share what she finds interesting across writing, reading, creating, and building. Developed with Claude Code + the Superpowers skills system.

## About Jacqui and this site

Jacqui is a software developer and designer who writes about AI, creativity, and the things she finds genuinely interesting. The site should feel warm, personal, and a little playful - never corporate or polished to the point of sterility.

She has strong opinions about craft: writing should be honest and specific, design should get out of the way of the content, and code should be something to be proud of. The little details matter. She cares about doing right by the user; she values accessibility, empathy, and inclusivity. She built this site alongside Claude, and treats that collaboration as something real.

## Architecture

Next.js 16 App Router, statically generated at build time. Content is MDX files in `content/posts/` parsed by gray-matter and rendered with `next-mdx-remote/rsc`; custom MDX components are registered in `components/MdxComponents.tsx`. Post reactions (emoji counts) are the only dynamic feature: they write to Redis via a rate-limited API route and are client-fetched on page load. Images live under `public/media/` in a nested hierarchy (`profile/`, `posts/<slug>/`, `creating/`, etc.) and use Next.js `<Image>` with blur placeholders computed at build time by `lib/blur.ts`. Dark mode is CSS-variable-based via `app/globals.css`; Tailwind v4 handles all other styling.

## Key files

- `lib/posts.ts` — `getAllPosts`, `getPost`, `extractHeadings`, `formatDate`, `slugify`. Single source of truth for reading and shaping MDX content.
- `components/MdxComponents.tsx` — registers all custom components available in MDX (`PostImage`, `Quote`, `VibeCodingConversation`, heading overrides, etc.). Add new MDX components here.
- `app/writing/[slug]/page.tsx` — post page: sidebar with date/tags/TOC, article body with `MDXRemote`, reactions, JSON-LD schema, OG metadata.
- `app/globals.css` — CSS variables for theming, Tailwind base overrides, rehype-pretty-code specificity fixes, blockquote and prose styles.
- `lib/redis.ts` — singleton Redis client (ioredis). Requires `REDIS_URL` env var.
- `app/api/reactions/[slug]/route.ts` — GET/POST for emoji reactions. Redis hash per slug (`reactions:<slug>`), rate-limited to 20 req/min per IP.
- `lib/blur.ts` — generates base64 blur placeholders for `<PostImage>` at build time.
- `next.config.ts` — CSP headers, no powered-by header, image domain allowlist.

## Commands

Scripts in `scripts/` wrap npm:

| Script             | Description                  |
| ------------------ | ---------------------------- |
| `./scripts/dev`    | Start dev server (Turbopack) |
| `./scripts/build`  | Production build             |
| `./scripts/lint`   | ESLint                       |
| `./scripts/format` | Prettier (format all files)  |
| `./scripts/start`  | Start production server      |

Always run `./scripts/build` and `./scripts/lint` before considering work complete.

## Tech stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: TailwindCSS 4
- **Icons**: Lucide React
- **Content**: MDX (`next-mdx-remote`), gray-matter
- **Data**: Redis (ioredis)
- **Analytics**: Vercel Analytics

## AI workflow

This project uses Claude Code + the Superpowers skills system. Invoke skills before starting work:

- **New feature or significant refactor**: `superpowers:brainstorming`
- **Multi-step implementation**: `superpowers:writing-plans`
- **UI work**: `superpowers:frontend-design`
- **After a major step**: `superpowers:code-reviewer`

## Core principles

- Follow requirements carefully and to the letter. Leave no todos, placeholders, or missing pieces.
- Write correct, bug-free, DRY code. Fully implement all requested functionality.
- Readable and maintainable over premature optimisation; optimise where it matters (Redis queries, expensive API calls).
- Be concise. If you don't know, say so rather than guessing.

## Code style

### General

- Single quotes (`'`), no semicolons — enforced by Prettier (`.prettierrc`)
- British English (colour, optimise, behaviour)
- Sentence case for all text and headings; never title case
- No em dashes. Use a comma, colon, or rewrite
- Early returns over nested conditionals
- `const` over `function` declarations
- Event handlers named with `handle` prefix (`handleClick`, `handleKeyDown`)
- Always define types
- Import paths use `@/` alias (e.g. `import { redis } from '@/lib/redis'`)

### TypeScript

- Avoid `any`; use proper types or generics
- Explicit types for function parameters and return values; inference elsewhere
- Resolve all TypeScript errors before considering code complete
- Null-check all optional values

### Styling

- Tailwind classes for all styling; avoid inline styles or `<style>` tags except where fighting Tailwind Typography specificity (follow patterns in `globals.css`)
- `dark:` prefix for dark mode support
- `clsx` or template literals for conditional classes

### Accessibility

- `aria-label`, `tabindex`, `role` on all interactive elements
- Keyboard navigation for everything interactive

### React components

- `'use client'` only when required (event handlers, browser APIs, stateful hooks)
- TypeScript interfaces for all props
- Extract repeated JSX into reusable components in `components/`
- Next.js `<Image>` for all images with a correct `sizes` prop

## Code quality checklist

- [ ] TypeScript errors resolved
- [ ] Imports correct and complete
- [ ] `./scripts/format` run (Prettier)
- [ ] No `console.log` in production code
- [ ] Dark mode supported where applicable
- [ ] Accessibility attributes present
- [ ] `./scripts/build` passes
- [ ] `./scripts/lint` passes
