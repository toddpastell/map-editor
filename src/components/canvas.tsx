import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react'
import { useAtlasConfig, useMapConfig } from '../atoms'

interface Props {
  image: ImageBitmap
  data: (number | null)[][]
}

export function Canvas({
  image,
  data,
  ...props
}: Props & ComponentPropsWithoutRef<'canvas'>) {
  const [atlasConfig] = useAtlasConfig()
  const [mapConfig] = useMapConfig()
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    canvas.width = mapConfig.width * atlasConfig.width * mapConfig.scale
    canvas.height = mapConfig.height * atlasConfig.height * mapConfig.scale
  }, [atlasConfig, mapConfig])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    data.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile === null) return
        const left =
          (tile % Math.floor(image.width / atlasConfig.width)) *
          atlasConfig.width
        // prettier-ignore
        const top = Math.floor(tile * atlasConfig.width / image.width) * atlasConfig.height
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(
          image,
          left,
          top,
          atlasConfig.width,
          atlasConfig.height,
          x * atlasConfig.width * mapConfig.scale,
          y * atlasConfig.height * mapConfig.scale,
          atlasConfig.width * mapConfig.scale,
          atlasConfig.height * mapConfig.scale,
        )
      })
    })
  }, [data, image, atlasConfig, mapConfig])

  return <canvas ref={ref} {...props} />
}
