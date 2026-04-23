import { NextRequest, NextResponse } from "next/server"
import { redis } from "@/lib/redis"

type Params = { params: Promise<{ slug: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params
  const raw = await redis.hgetall(`reactions:${slug}`)
  const counts: Record<string, number> = {}
  if (raw) {
    for (const [emoji, value] of Object.entries(raw)) {
      counts[emoji] = parseInt(value as string, 10)
    }
  }
  return NextResponse.json(counts)
}

const RATE_LIMIT = 20
const RATE_WINDOW_SECONDS = 60

async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `rl:reactions:${ip}`
  const count = await redis.incr(key)
  if (count === 1) await redis.expire(key, RATE_WINDOW_SECONDS)
  return count <= RATE_LIMIT
}

export async function POST(req: NextRequest, { params }: Params) {
  const { slug } = await params

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  const allowed = await checkRateLimit(ip)
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  const { emoji, delta } = await req.json()

  if (typeof emoji !== "string" || emoji.length > 10 || (delta !== 1 && delta !== -1)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const newCount = await redis.hincrby(`reactions:${slug}`, emoji, delta)
  if (newCount < 0) await redis.hset(`reactions:${slug}`, emoji, 0)
  return NextResponse.json({ emoji, count: Math.max(0, newCount) })
}
