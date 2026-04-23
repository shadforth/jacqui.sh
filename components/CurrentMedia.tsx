import { getNowPlaying } from '@/lib/lastfm'
import { IpodCard } from '@/components/IpodCard'
import { KindleCard } from '@/components/KindleCard'
import nowData from '@/content/now.json'

export const CurrentMedia = async () => {
  const { reading } = nowData
  const track = await getNowPlaying()

  if (!reading && !track) return null

  return (
    <section className="mt-14" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>

      {track && <IpodCard track={track} />}

      {reading && <KindleCard reading={reading} />}

    </section>
  )
}
