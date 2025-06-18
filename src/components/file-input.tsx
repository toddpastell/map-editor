import clsx from 'clsx'
import {
  useCallback,
  useState,
  type ChangeEventHandler,
  type DragEventHandler,
} from 'react'

interface Props {
  onChange: (file: File) => void
}

type DragHandler = DragEventHandler<HTMLDivElement>

export function FileInput({ onChange }: Props) {
  const [isOver, setIsOver] = useState(false)

  const handleDragEnter = useCallback<DragHandler>(
    () => setIsOver(true),
    [setIsOver],
  )

  const handleDragLeave = useCallback<DragHandler>(
    () => setIsOver(false),
    [setIsOver],
  )

  const handleDragOver = useCallback<DragHandler>(
    (e) => {
      e.preventDefault()
      setIsOver(true)
    },
    [setIsOver],
  )

  const handleDrop = useCallback<DragHandler>(
    (e) => {
      e.preventDefault()
      setIsOver(false)
      const file = e.dataTransfer.files.item(0)
      if (!file) return
      onChange(file)
    },
    [setIsOver, onChange],
  )

  const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const file = e.target.files?.item(0)
      if (!file) return
      onChange(file)
    },
    [onChange],
  )

  return (
    <div
      className={clsx(
        'space-y-3 rounded border border-dashed border-sky-500 bg-sky-50 p-5',
        isOver && 'hue-rotate-270',
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <h6 className='font-semibold'>Drop an image to begin</h6>
      <p className='text-sm'>
        It will be sliced into tiles you can use to build a map.
      </p>
      <label className='cursor-pointer rounded bg-sky-500 px-3 py-1 text-sm font-semibold text-white hover:bg-sky-600'>
        Choose file
        <input type='file' onChange={handleInputChange} hidden />
      </label>
    </div>
  )
}
