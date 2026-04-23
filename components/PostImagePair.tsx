import Image from "next/image"
import { getBlurDataURL } from "@/lib/blur"

interface PostImagePairProps {
  src1: string
  alt1?: string
  src2: string
  alt2?: string
  caption?: string
  priority?: boolean
  priority2?: boolean
}

export const PostImagePair = async ({
  src1,
  alt1 = "",
  src2,
  alt2 = "",
  caption,
  priority = false,
  priority2 = false,
}: PostImagePairProps) => {
  const [blur1, blur2] = await Promise.all([getBlurDataURL(src1), getBlurDataURL(src2)])
  const blurProps1 = blur1 ? { placeholder: "blur" as const, blurDataURL: blur1 } : {}
  const blurProps2 = blur2 ? { placeholder: "blur" as const, blurDataURL: blur2 } : {}

  return (
    <figure className="not-prose my-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
          <Image
            src={src1}
            alt={alt1}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
            {...blurProps1}
          />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
          <Image
            src={src2}
            alt={alt2}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority2}
            {...blurProps2}
          />
        </div>
      </div>
      {caption && (
        <figcaption
          className="mt-2 text-center text-sm"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
