import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
} from 'react'
import { useAtlasConfig, useMapConfig, useSelectedIndex } from '../atoms'

interface Props {
  image: ImageBitmap
}

export function Canvas({ image }: Props) {
  const [atlasConfig] = useAtlasConfig()
  const [mapConfig] = useMapConfig()
  const [selected] = useSelectedIndex()
  const ref = useRef<HTMLCanvasElement>(null)
  const [map, setMap] = useState<(number | null)[]>(
    new Array(mapConfig.width * mapConfig.height).fill(null),
  )

  const handleDraw = useCallback<MouseEventHandler<HTMLCanvasElement>>(
    (e) => {
      if (!(e.metaKey || e.buttons & 1 || e.buttons & 2)) return
      const { left, top } = e.currentTarget.getBoundingClientRect()
      const x = Math.floor(
        (e.clientX - left) / atlasConfig.width / mapConfig.scale,
      )
      const y = Math.floor(
        (e.clientY - top) / atlasConfig.height / mapConfig.scale,
      )
      const index = y * mapConfig.width + x
      const z = e.metaKey || e.buttons & 1 ? selected : null
      setMap((value) =>
        value[index] === z ? value : value.toSpliced(index, 1, z),
      )
    },
    [atlasConfig, mapConfig, selected],
  )

  const handleContextMenu = useCallback<MouseEventHandler<HTMLCanvasElement>>(
    (e) => e.preventDefault(),
    [],
  )

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
    map.forEach((value, index) => {
      const x = index % mapConfig.width
      const y = Math.floor(index / mapConfig.width)
      if (value === null) return

      const left =
        (value % Math.floor(image.width / atlasConfig.width)) *
        atlasConfig.width
      // prettier-ignore
      const top = Math.floor(value * atlasConfig.width / image.width) * atlasConfig.height
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
  }, [map, image, atlasConfig, mapConfig, selected])

  return (
    <div className='rounded border border-dashed border-sky-500 p-4'>
      <canvas
        className='bg-linear-to-br from-transparent to-sky-50 bg-size-[16px_16px]'
        onMouseDown={handleDraw}
        onMouseMove={handleDraw}
        onContextMenu={handleContextMenu}
        ref={ref}
      />
    </div>
  )
}
