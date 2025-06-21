import { useCallback, useRef, useState } from 'react'

interface Props {
  layer: (number | null)[][]
}

export function CopyButton({ layer }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  const handleCopy = useCallback(async () => {
    const lua = `local layer = {\n${layer
      .map(
        (row) =>
          `\t{ ${row.map((tile) => (tile === null ? 'nil' : tile + 1)).join(', ')}, }`,
      )
      .join(',\n')},\n}`
    await navigator.clipboard.writeText(lua)
    setShow(true)
    setTimeout(() => setShow(false), 500)
  }, [layer])

  return (
    <div className='relative'>
      <button
        className='cursor-pointer rounded bg-sky-500 px-3 py-1 text-sm font-semibold text-white hover:bg-sky-600'
        onClick={handleCopy}>
        📋
      </button>
      <div
        className='absolute right-0 bottom-0 rounded bg-black px-3 py-1 text-sm font-semibold whitespace-nowrap text-white'
        ref={ref}
        hidden={!show}>
        Layer copied to clipboard
      </div>
    </div>
  )
}
