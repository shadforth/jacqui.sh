import { Music } from 'lucide-react'
import { IpodMarquee } from '@/components/IpodMarquee'

interface IpodNowPlayingProps {
  trackName: string
  trackArtist: string
  trackUrl: string
  isPaused: boolean
  isTabVisible: boolean
}

const BAR_PROPS = [
  { delay: '0s', duration: '0.50s' },
  { delay: '0.15s', duration: '0.65s' },
  { delay: '0.08s', duration: '0.45s' },
  { delay: '0.22s', duration: '0.60s' },
]

export const IpodNowPlaying = ({
  trackName,
  trackArtist,
  trackUrl,
  isPaused,
  isTabVisible,
}: IpodNowPlayingProps) => {
  const shouldPause = isPaused || !isTabVisible

  return (
    <>
      <span className="media-label ipod-label">
        <Music size={7} strokeWidth={2.5} aria-hidden />
        Now playing
      </span>
      <IpodMarquee
        text={trackName}
        href={trackUrl}
        style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.25, paddingBottom: '2px' }}
        linkStyle={{ color: 'hsl(var(--background))' }}
        linkClassName="song-title-link"
        isPaused={shouldPause}
      />
      <span className="media-subtitle ipod-artist truncate">{trackArtist}</span>
      <div className="ipod-visualiser-container">
        {BAR_PROPS.map((bar, i) => (
          <div
            key={i}
            className="ipod-visualiser-bar"
            style={{
              animationDuration: bar.duration,
              animationDelay: bar.delay,
              animationPlayState: shouldPause ? 'paused' : 'running',
            }}
          />
        ))}
      </div>
    </>
  )
}
