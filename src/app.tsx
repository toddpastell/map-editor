import { useState } from 'react'
import { Canvas, Config, FileInput, Palette } from './components'

export function App() {
  const [image, setImage] = useState<ImageBitmap | null>(null)

  return (
    <div className='space-y-4 p-4'>
      <Config />
      <FileInput
        onChange={async (file) => setImage(await createImageBitmap(file))}
      />
      {image && (
        <div className='inline-flex gap-4'>
          <Palette image={image} />
          <Canvas image={image} />
        </div>
      )}
    </div>
  )
}
