import Image from 'next/image'
import { getBlurDataURL } from '@/lib/blur'

interface PostImageProps {
  src: string
  alt?: string
  caption?: string
  source?: string
  priority?: boolean
  contain?: boolean
}

export const PostImage = async ({
  src,
  alt = '',
  caption,
  source,
  priority = false,
  contain = false,
}: PostImageProps) => {
  const blurDataURL = await getBlurDataURL(src)
  const blurProps = blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {}

  return (
    <figure className="not-prose my-4 overflow-hidden rounded-md">
      {contain ? (
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes="(max-width: 1024px) 100vw, 65vw"
          priority={priority}
          className="w-full h-auto rounded-md"
          {...blurProps}
        />
      ) : (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 65vw"
            priority={priority}
            {...blurProps}
          />
        </div>
      )}
      {(caption || source) && (
        <figcaption
          className="mt-2 block text-center text-sm"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          {caption}
          {source && (
            <span style={{ opacity: 0.7 }}>
              {caption ? ' (' : ''}
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                source
              </a>
              {caption ? ')' : ''}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
