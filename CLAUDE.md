# jacqui.sh

Personal website covering writing, reading, creating, and building.

## Commands
- `./scripts/build` - Production build check (must pass before finishing).
- `./scripts/lint` - Linting and type-checking (must pass clean).
- `./scripts/dev` - Local dev server.

## Architecture and key paths
- `app/` - Next.js App Router pages and routes.
- `content/posts/` - MDX post files.
- `app/globals.css` - CSS custom properties for colour tokens and dark mode overrides.
- `components/` - Shared UI primitives. Check here before creating new components.

## Working agreement
- **Inspect first:** Read existing components and `globals.css` before writing new UI or CSS. Follow established patterns.
- **Verify visually:** For layout, styling, or new page changes, start the dev server and verify in a browser before asking to commit. Skip this for pure copy or backend/config edits.
- **No unrequested commits:** Leave changes unstaged/uncommitted until reviewed unless explicitly told to commit.

## Editorial and copy standards
- **British English:** Use UK spelling (`colour`, `optimise`, `behaviour`, `centre`) in all UI copy, metadata, and prose.
- **Sentence case:** Use sentence case for all headings, navigation items, buttons, and labels. Never use Title Case.
- **Punctuation:** Never use em dashes (`—`). Restructure with a comma, colon, parentheses, or separate sentences.
- **Voice:** Direct, specific, and human. Avoid generic portfolio filler or corporate phrasing.

## Technical guardrails
- **Server-first:** Default to React Server Components. Add `'use client'` only when state, effects, or browser APIs are strictly required.
- **Styling:** Use Tailwind utility classes paired with semantic tokens from `globals.css`. Always include `dark:` variants when using raw Tailwind colour utilities. Use inline `style` only when overriding stubborn third-party or specificity conflicts (document why with a brief comment).
- **Accessibility:** Interactive elements require visible focus states, keyboard support, and appropriate `aria-*` attributes. Prefer semantic HTML (`<button>`, `<nav>`, `<article>`) over `div` click handlers.
