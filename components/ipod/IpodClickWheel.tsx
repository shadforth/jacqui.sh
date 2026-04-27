import { SkipBack, SkipForward, Play, Pause } from 'lucide-react'

type View = 'nowPlaying' | 'menu' | 'videos' | 'photos'

interface IpodClickWheelProps {
  view: View
  isPaused: boolean
  handleMenu: () => void
  pressButton: (name: string, action?: () => void) => void
  handlePrevPhoto: () => void
  handleNextPhoto: () => void
  setIsPaused: (value: boolean | ((prev: boolean) => boolean)) => void
}

export const IpodClickWheel = ({
  view,
  isPaused,
  handleMenu,
  pressButton,
  handlePrevPhoto,
  handleNextPhoto,
  setIsPaused,
}: IpodClickWheelProps) => {
  return (
    <div className="ipod-clickwheel">
      <button aria-label="Menu" onClick={handleMenu} className="ipod-menu-button">
        Menu
      </button>

      <button
        aria-label={view === 'photos' ? 'Previous photo' : 'Skip back'}
        onClick={() => pressButton('back', view === 'photos' ? handlePrevPhoto : undefined)}
        className="ipod-button"
        style={{ left: '4px' }}
      >
        <SkipBack size={11} strokeWidth={2} />
      </button>

      <button
        aria-label={view === 'photos' ? 'Next photo' : 'Skip forward'}
        onClick={() => pressButton('forward', view === 'photos' ? handleNextPhoto : undefined)}
        className="ipod-button"
        style={{ right: '4px' }}
      >
        <SkipForward size={11} strokeWidth={2} />
      </button>

      <button
        aria-label={isPaused ? 'Play' : 'Pause'}
        onClick={() => pressButton('play', () => setIsPaused((p) => !p))}
        className="ipod-button"
        style={{ bottom: '5px' }}
      >
        {isPaused ? <Play size={11} strokeWidth={2} /> : <Pause size={11} strokeWidth={2} />}
      </button>

      <button
        aria-label="Select"
        onClick={handleMenu}
        className="ipod-center-button"
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      />
    </div>
  )
}
