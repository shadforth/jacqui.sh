const LASTFM_USERNAME = 'shdf'

export type Track = {
  name: string
  artist: string
  url: string
  nowPlaying: boolean
}

export async function getNowPlaying(): Promise<Track | null> {
  const apiKey = process.env.LASTFM_API_KEY
  if (!apiKey) return null

  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${apiKey}&format=json&limit=1`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return null

    const data = await res.json()
    const tracks = data.recenttracks?.track
    if (!tracks || tracks.length === 0) return null

    const track = Array.isArray(tracks) ? tracks[0] : tracks
    return {
      name: track.name,
      artist: track.artist['#text'],
      url: track.url,
      nowPlaying: track['@attr']?.nowplaying === 'true',
    }
  } catch {
    return null
  }
}
