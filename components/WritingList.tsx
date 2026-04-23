"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ListFilter } from "lucide-react"
import { PostMeta } from "@/lib/posts"

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", { month: "short", year: "numeric" })
import { quickLinkClassName } from "@/lib/quick-link"
import { TrackedLink } from "@/components/TrackedLink"

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-markazi), serif",
  fontSize: "1.1rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  color: "hsl(var(--muted-foreground))",
  marginBottom: "0.5rem",
}

interface WritingListProps {
  posts: PostMeta[]
}

export function WritingList({ posts }: WritingListProps) {
  // eslint-disable-next-line react-hooks/purity
  const now = useMemo(() => Date.now(), [])
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialTags = searchParams.get("tags")?.split(",").filter(Boolean) ?? []

  const [filterOpen, setFilterOpen] = useState(initialTags.length > 0)
  const [activeTags, setActiveTags] = useState<string[]>(initialTags)

  useEffect(() => {
    const params = new URLSearchParams()
    if (activeTags.length) params.set("tags", activeTags.join(","))
    const qs = params.toString()
    router.replace(qs ? `?${qs}` : "?", { scroll: false })
  }, [activeTags, router])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach((p) => p.categories?.forEach((c) => tags.add(c)))
    return Array.from(tags).sort()
  }, [posts])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      activeTags.length === 0 || activeTags.some((tag) => post.categories?.includes(tag))
    )
  }, [posts, activeTags])

  const activeFilterCount = activeTags.length

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])
  }

  const clearFilters = () => setActiveTags([])

  return (
    <>
      {/* Title row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.8rem" }}>
        <h1 style={{ fontFamily: "var(--font-markazi), serif", fontSize: "1.5rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Writing
        </h1>

        {/* Button + dropdown wrapper */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <button
            onClick={() => setFilterOpen((v) => !v)}
            aria-label="Toggle filters"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1.75rem",
              height: "1.75rem",
              border: `1px solid ${filterOpen || activeFilterCount > 0 ? "hsl(var(--foreground))" : "hsl(var(--border))"}`,
              borderRadius: "0.5rem",
              background: filterOpen || activeFilterCount > 0 ? "hsl(var(--foreground))" : "transparent",
              color: filterOpen || activeFilterCount > 0 ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
              cursor: "pointer",
              transition: "color 0.15s, border-radius 0.15s",
              position: "relative",
              zIndex: 11,
            }}
          >
            <ListFilter size={13} />
            {activeFilterCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-0.3rem",
                right: "-0.3rem",
                fontSize: "0.55rem",
                fontWeight: 700,
                lineHeight: 1,
                background: "hsl(var(--accent))",
                color: "hsl(var(--background))",
                borderRadius: "9999px",
                padding: "0.1rem 0.25rem",
                minWidth: "0.9rem",
                textAlign: "center",
              }}>
                {activeFilterCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {filterOpen && (
        <div style={{
          border: "1px solid hsl(var(--border))",
          borderRadius: "0.5rem",
          padding: "0.75rem",
          marginBottom: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
            {allTags.map((tag) => {
              const active = activeTags.includes(tag)
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    padding: "0.15rem 0.5rem",
                    borderRadius: "9999px",
                    border: `1px solid ${active ? "hsl(var(--foreground))" : "hsl(var(--border))"}`,
                    background: active ? "hsl(var(--foreground))" : "transparent",
                    color: active ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {tag}
                </button>
              )
            })}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              style={{
                alignSelf: "flex-start",
                fontSize: "0.7rem",
                color: "hsl(var(--muted-foreground))",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Blog posts */}
      <section>
        <h2 style={h2Style}>Blog posts</h2>
        {filteredPosts.length === 0 ? (
          <p style={{ fontSize: "0.875rem", color: "hsl(var(--muted-foreground))" }}>No posts match your filters.</p>
        ) : (
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {filteredPosts.map((post) => {
              const isNew = !post.favourite && (now - new Date(post.date).getTime()) < 30 * 24 * 60 * 60 * 1000
              return (
                <li key={post.slug} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem" }}>
                  <span style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", minWidth: 0 }}>
                    <TrackedLink href={`/writing/${post.slug}`} eventName="post_click" eventData={{ slug: post.slug, title: post.title }} className={quickLinkClassName}>
                      {post.title}
                    </TrackedLink>
                    {isNew && (
                      <span style={{
                        fontSize: "0.65rem",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                        padding: "0.1rem 0.4rem",
                        borderRadius: "9999px",
                        backgroundColor: "hsl(var(--foreground))",
                        color: "hsl(var(--background))",
                        flexShrink: 0,
                        position: "relative",
                        bottom: "2px",
                      }}>
                        new
                      </span>
                    )}
                    {post.favourite && (
                      <span style={{
                        fontSize: "0.65rem",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                        padding: "0.1rem 0.4rem",
                        borderRadius: "9999px",
                        backgroundColor: "#854d0e",
                        color: "#fef08a",
                        flexShrink: 0,
                        position: "relative",
                        bottom: "2px",
                      }}>
                        favourite
                      </span>
                    )}
                  </span>
                  <span style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.875rem", flexShrink: 0 }}>
                    {formatDate(post.date)}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      {/* Travel blog */}
      <section style={{ marginTop: "3rem" }}>
        <h2 style={h2Style}>Travel blog</h2>
        <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <li style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", columnGap: "0.5rem", rowGap: "0.25rem" }}>
            <TrackedLink href="https://bułka.com" eventName="external_link_click" eventData={{ label: "bułka.com", location: "writing" }} external className={quickLinkClassName}>
              bułka.com
            </TrackedLink>
            <span style={{ color: "hsl(var(--muted-foreground))", fontSize: "0.875rem" }}>
              A blog about travel, food, and bread.
            </span>
          </li>
        </ul>
      </section>
    </>
  )
}
