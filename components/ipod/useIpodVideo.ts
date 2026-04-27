import { useEffect, useRef, useState } from 'react'

export const useIpodVideo = (view: string) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const youtubePlayerRef = useRef<Window | null>(null)

  useEffect(() => {
    if (view !== 'videos') return

    const iframe = document.getElementById('youtube-iframe') as HTMLIFrameElement
    if (!iframe || !iframe.contentWindow) return

    youtubePlayerRef.current = iframe.contentWindow
  }, [view])

  const toggleVideo = () => {
    const iframe = youtubePlayerRef.current
    if (!iframe) return

    const command = isVideoPlaying ? 'pauseVideo' : 'playVideo'
    iframe.postMessage(`{"event":"command","func":"${command}","args":""}`, '*')
    setIsVideoPlaying(!isVideoPlaying)
  }

  const skipVideoForward = () => {
    const iframe = youtubePlayerRef.current
    if (!iframe) return
    iframe.postMessage('{"event":"command","func":"seekTo","args":[10, true]}', '*')
  }

  const skipVideoBackward = () => {
    const iframe = youtubePlayerRef.current
    if (!iframe) return
    iframe.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', '*')
  }

  const toggleMute = () => {
    const iframe = youtubePlayerRef.current
    if (!iframe) return

    const command = isVideoMuted ? 'unMute' : 'mute'
    iframe.postMessage(`{"event":"command","func":"${command}","args":""}`, '*')
    setIsVideoMuted(!isVideoMuted)
  }

  return {
    isVideoPlaying,
    isVideoMuted,
    toggleVideo,
    skipVideoForward,
    skipVideoBackward,
    toggleMute,
  }
}
