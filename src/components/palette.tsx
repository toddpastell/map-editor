import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type MouseEventHandler,
} from 'react'
import { useAtlasConfig, useSelectedIndex } from '../atoms'

interface Props {
  image: ImageBitmap
}

export function Palette({ image }: Props) {
  const [config] = useAtlasConfig()
  const [selected, setSelected] = useSelectedIndex()
  const ref = useRef<HTMLCanvasElement>(null)

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      const { left, top } = e.currentTarget.getBoundingClientRect()
      const width = config.width * config.scale
      const height = config.height * config.scale
      setSelected(
        Math.floor((e.clientY - top) / height) *
          Math.floor(image.width / config.width) +
          Math.floor((e.clientX - left) / width),
      )
    },
    [setSelected, config, image],
  )

  const style = useMemo(() => {
    const width = config.width * config.scale
    const height = config.height * config.scale
    return {
      width,
      height,
      // prettier-ignore
      left: selected % Math.floor(image.width / config.width) * width,
      // prettier-ignore
      top: Math.floor(selected * config.width / image.width) * height,
    }
  }, [selected, config, image])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'd':
          return setSelected((i) => i + 1)
        case 'a':
          return setSelected((i) => i - 1)
        case 'w':
          return setSelected((i) => i - Math.floor(image.width / config.width))
        case 's':
          return setSelected((i) => i + Math.floor(image.width / config.width))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setSelected, config, image])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = image.width * config.scale
    canvas.height = image.height * config.scale

    for (let j = 0; j < image.height; j += config.height) {
      for (let i = 0; i <= image.width; i += config.width) {
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(
          image,
          i,
          j,
          config.width,
          config.height,
          i * config.scale,
          j * config.scale,
          config.width * config.scale,
          config.height * config.scale,
        )
      }
    }
  }, [image, config])

  return (
    <div className='rounded border border-dashed border-sky-500 p-4'>
      <div className='relative inline-block' onMouseDown={handleClick}>
        <canvas className='select-none' ref={ref} />
        <div
          className='absolute border border-white ring-2 ring-sky-600'
          style={style}
        />
      </div>
      <div>{selected}</div>
    </div>
  )
}
