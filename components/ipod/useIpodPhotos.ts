import { useState } from 'react'

export const useIpodPhotos = (photosLength: number) => {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handlePrevPhoto = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setPhotoIndex((prev) => (prev === 0 ? photosLength - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const handleNextPhoto = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setPhotoIndex((prev) => (prev === photosLength - 1 ? 0 : prev + 1))
    setTimeout(() => setIsTransitioning(false), 300)
  }

  return {
    photoIndex,
    handlePrevPhoto,
    handleNextPhoto,
  }
}
