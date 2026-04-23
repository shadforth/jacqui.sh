import Image from "next/image"

interface IpodPhotosProps {
  photos: string[]
  photoIndex: number
}

export const IpodPhotos = ({ photos, photoIndex }: IpodPhotosProps) => {
  return (
    <div className="ipod-photo-container">
      {photos.map((photo, idx) => (
        <div 
          key={photo}
          className={`ipod-photo-slide ${idx === photoIndex ? 'ipod-photo-active' : ''}`}
        >
          <Image
            src={`/media/ipod/photos/${photo}`}
            alt={`Photo ${idx + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100px, 95px"
            quality={75}
            loading={idx < 3 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
      <span className="ipod-photo-counter">
        {photoIndex + 1}/{photos.length}
      </span>
    </div>
  )
}
