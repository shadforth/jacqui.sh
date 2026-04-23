import { useEffect, useState } from "react"

export const usePageVisibility = () => {
  const [isTabVisible, setIsTabVisible] = useState(() => {
    if (typeof document !== 'undefined') {
      return !document.hidden && document.hasFocus()
    }
    return true
  })

  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = !document.hidden && document.hasFocus()
      setIsTabVisible(visible)
    }

    const handleFocus = () => {
      setIsTabVisible(true)
    }

    const handleBlur = () => {
      setIsTabVisible(false)
    }

    // Set initial state
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTabVisible(!document.hidden && document.hasFocus())

    // Listen for tab visibility changes (switching tabs)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Listen for window focus changes (switching apps)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])

  return isTabVisible
}
