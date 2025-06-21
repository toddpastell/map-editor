import clsx from 'clsx'
import { useCallback, useState, type MouseEventHandler } from 'react'
import { useAtlasConfig, useMapConfig, useSelectedIndex } from '../atoms'
import { Canvas } from './canvas'
import { CopyButton } from './copy-button'

interface Props {
  image: ImageBitmap
}

export function Map({ image }: Props) {
  const [atlasConfig] = useAtlasConfig()
  const [mapConfig] = useMapConfig()
  const [selected] = useSelectedIndex()
  const [active, setActive] = useState(0)
  const [hidden, setHidden] = useState<number[]>([])
  const [layers, setLayers] = useState<(number | null)[][][]>(
    Array.from({ length: 3 }, () =>
      Array.from({ length: mapConfig.height }, () =>
        Array.from({ length: mapConfig.width }, () => null),
      ),
    ),
  )

  const handleDraw = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (!(e.metaKey || e.buttons & 1 || e.buttons & 2)) return
      const { left, top } = e.currentTarget.getBoundingClientRect()
      const x = Math.floor(
        (e.clientX - left) / atlasConfig.width / mapConfig.scale,
      )
      const y = Math.floor(
        (e.clientY - top) / atlasConfig.height / mapConfig.scale,
      )
      const tile = e.metaKey || e.buttons & 1 ? selected : null
      setLayers((value) =>
        value[active][y][x] === tile
          ? value
          : value.toSpliced(
              active,
              1,
              value[active].toSpliced(
                y,
                1,
                value[active][y].toSpliced(x, 1, tile),
              ),
            ),
      )
    },
    [atlasConfig, mapConfig, selected, active],
  )

  const handleContextMenu = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => e.preventDefault(),
    [],
  )

  return (
    <div className='rounded border border-dashed border-sky-500 p-4'>
      <div className='inline-flex gap-4'>
        <div
          className='bg-grid grid'
          onMouseDown={handleDraw}
          onMouseMove={handleDraw}
          onContextMenu={handleContextMenu}>
          {layers.map((layer, index) => (
            <Canvas
              key={index}
              className='col-start-1 row-start-1'
              data={layer}
              image={image}
              hidden={hidden.includes(index)}
            />
          ))}
        </div>
        <div className='flex flex-col gap-1'>
          {layers.map((_, index) => (
            <button
              key={index}
              className={clsx(
                'cursor-pointer rounded bg-sky-500 px-3 py-1 text-sm font-semibold text-white hover:bg-sky-600',
                index === active && 'hue-rotate-270',
                hidden.includes(index) && 'grayscale',
              )}
              onClick={() => {
                setActive(index)
                setHidden((value) => value.filter((i) => i !== index))
              }}
              onContextMenu={(e) => {
                e.preventDefault()
                if (index === active) return
                setHidden((value) =>
                  value.includes(index)
                    ? value.filter((i) => i !== index)
                    : value.toSpliced(0, 0, index),
                )
              }}>
              {hidden.includes(index) ? '🙈' : index + 1}
            </button>
          ))}
          <span className='flex-grow' />
          <CopyButton layer={layers[active]} />
        </div>
      </div>
    </div>
  )
}
