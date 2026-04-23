import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export async function getBlurDataURL(src: string): Promise<string | undefined> {
  try {
    const imagePath = path.join(process.cwd(), 'public', src)
    if (!fs.existsSync(imagePath)) return undefined
    const data = await sharp(imagePath)
      .resize(10, 10, { fit: 'inside' })
      .jpeg({ quality: 50 })
      .toBuffer()
    return `data:image/jpeg;base64,${data.toString('base64')}`
  } catch {
    return undefined
  }
}
