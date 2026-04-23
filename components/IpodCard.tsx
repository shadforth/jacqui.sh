'use client'

import { useState } from "react"
import { track } from "@vercel/analytics"
import { IpodNowPlaying } from "@/components/ipod/IpodNowPlaying"
import { IpodMenu } from "@/components/ipod/IpodMenu"
import { IpodVideos } from "@/components/ipod/IpodVideos"
import { IpodPhotos } from "@/components/ipod/IpodPhotos"
import { IpodClickWheel } from "@/components/ipod/IpodClickWheel"
import { useIpodVideo } from "@/components/ipod/useIpodVideo"
import { useIpodPhotos } from "@/components/ipod/useIpodPhotos"
import { usePageVisibility } from "@/components/ipod/usePageVisibility"

interface MusicTrack {
  name: string
  artist: string
  url: string
}

type View = 'nowPlaying' | 'menu' | 'videos' | 'photos'

const PHOTOS = [
  '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg',
  '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg',
  '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg',
  '19.jpg', '20.jpg', '21.jpg', '22.jpg',
]

export const IpodCard = ({ track: musicTrack }: { track: MusicTrack }) => {
  const [view, setView] = useState<View>('nowPlaying')
  const [isPaused, setIsPaused] = useState(false)
  const [pressedBtn, setPressedBtn] = useState<string | null>(null)
  
  const { toggleVideo, skipVideoForward, skipVideoBackward, toggleMute, isVideoMuted } = useIpodVideo(view)
  const { photoIndex, handlePrevPhoto, handleNextPhoto } = useIpodPhotos(PHOTOS.length)
  const isTabVisible = usePageVisibility()

  const pressButton = (name: string, action?: () => void) => {
    if (pressedBtn) return
    track('ipod_clicked', { button: name })
    if (view === 'videos') {
      if (name === 'play') toggleVideo()
      else if (name === 'forward') skipVideoForward()
      else if (name === 'back') skipVideoBackward()
    } else {
      action?.()
    }
    setPressedBtn(name)
    setTimeout(() => setPressedBtn(null), 200)
  }

  const handleMenu = () => {
    if (pressedBtn) return
    track('ipod_clicked', { button: 'menu' })
    setPressedBtn('menu')

    if (view === 'nowPlaying') setView('menu')
    else setView(view === 'menu' ? 'nowPlaying' : 'menu')

    setTimeout(() => setPressedBtn(null), 200)
  }

  return (
    <div className="media-card">
      <div className={`media-screen-base ipod-screen ${view === 'photos' ? 'ipod-screen-photos' : ''}`} style={{ padding: view === 'videos' ? '0' : undefined }}>
        {view === 'nowPlaying' && (
          <IpodNowPlaying
            trackName={musicTrack.name}
            trackArtist={musicTrack.artist}
            trackUrl={musicTrack.url}
            isPaused={isPaused}
            isTabVisible={isTabVisible}
          />
        )}

        {view === 'menu' && <IpodMenu setView={setView} />}

        {view === 'videos' && <IpodVideos isVideoMuted={isVideoMuted} toggleMute={toggleMute} />}

        {view === 'photos' && <IpodPhotos photos={PHOTOS} photoIndex={photoIndex} />}
      </div>

      <IpodClickWheel
        view={view}
        isPaused={isPaused}
        handleMenu={handleMenu}
        pressButton={pressButton}
        handlePrevPhoto={handlePrevPhoto}
        handleNextPhoto={handleNextPhoto}
        setIsPaused={setIsPaused}
      />
    </div>
  )
}
