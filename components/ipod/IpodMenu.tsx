import { Music, Video, Image as ImageIcon } from 'lucide-react'

type View = 'nowPlaying' | 'menu' | 'videos' | 'photos'

interface IpodMenuProps {
  setView: (view: View) => void
}

const menuItem = (label: string, icon: React.ReactNode, onClick: () => void) => {
  return (
    <button key={label} onClick={onClick} className="ipod-menu-item">
      <span className="ipod-menu-item-content">
        {icon}
        {label}
      </span>
      <span className="ipod-menu-item-chevron">›</span>
    </button>
  )
}

export const IpodMenu = ({ setView }: IpodMenuProps) => {
  return (
    <div className="ipod-menu-container">
      {menuItem('Music', <Music size={8} strokeWidth={2} aria-hidden />, () =>
        setView('nowPlaying')
      )}
      {menuItem('Videos', <Video size={8} strokeWidth={2} aria-hidden />, () => setView('videos'))}
      {menuItem('Photos', <ImageIcon size={8} strokeWidth={2} aria-hidden />, () =>
        setView('photos')
      )}
    </div>
  )
}
