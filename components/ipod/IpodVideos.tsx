import { VolumeX, Volume2 } from 'lucide-react'

interface IpodVideosProps {
  isVideoMuted: boolean
  toggleMute: () => void
}

export const IpodVideos = ({ isVideoMuted, toggleMute }: IpodVideosProps) => {
  return (
    <div className="ipod-video-container">
      <iframe
        id="youtube-iframe"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/dGR65RWwzg8?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&start=3&enablejsapi=1"
        title="Avril Lavigne - I'm With You"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
        className="ipod-video-iframe"
      />
      <button
        onClick={toggleMute}
        aria-label={isVideoMuted ? 'Unmute' : 'Mute'}
        className="ipod-mute-switch"
        title={isVideoMuted ? 'Unmute video' : 'Mute video'}
      >
        {isVideoMuted ? (
          <VolumeX size={12} strokeWidth={2.5} />
        ) : (
          <Volume2 size={12} strokeWidth={2.5} />
        )}
      </button>
    </div>
  )
}
