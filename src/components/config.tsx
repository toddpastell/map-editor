import { useAtlasConfigInputProps, useMapConfigInputProps } from '../atoms'

export function Config() {
  const atlasConfigInputProps = useAtlasConfigInputProps()
  const mapConfigInputProps = useMapConfigInputProps()

  return (
    <div className='rounded border border-dashed border-sky-500 bg-sky-50 p-4'>
      <div className='inline-flex flex-wrap gap-12'>
        <fieldset>
          <legend className='ml-14 font-semibold'>Atlas</legend>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <label htmlFor='atlas-width' className='w-12 text-right text-sm'>
                Width
              </label>
              <input
                id='atlas-width'
                type='number'
                className='w-32 bg-white px-3 py-1 focus:outline-none'
                {...atlasConfigInputProps('width')}
              />
              <span className='text-sm'>px</span>
            </div>
            <div className='flex items-center gap-2'>
              <label htmlFor='atlas-height' className='w-12 text-right text-sm'>
                Height
              </label>
              <input
                id='atlas-height'
                type='number'
                className='w-32 bg-white px-3 py-1 focus:outline-none'
                {...atlasConfigInputProps('height')}
              />
              <span className='text-sm'>px</span>
            </div>
            <div className='flex items-center gap-2'>
              <label htmlFor='atlas-scale' className='w-12 text-right text-sm'>
                Scale
              </label>
              <input
                id='atlas-scale'
                type='number'
                className='w-32 bg-white px-3 py-1 focus:outline-none'
                {...atlasConfigInputProps('scale')}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend className='ml-14 font-semibold'>Map</legend>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <label htmlFor='map-width' className='w-12 text-right text-sm'>
                Width
              </label>
              <input
                id='map-width'
                type='number'
                className='w-32 bg-white px-3 py-1 focus:outline-none'
                {...mapConfigInputProps('width')}
              />
              <span className='text-sm'>tiles</span>
            </div>
            <div className='flex items-center gap-2'>
              <label htmlFor='map-height' className='w-12 text-right text-sm'>
                Height
              </label>
              <input
                id='map-height'
                type='number'
                className='w-32 bg-white px-3 py-1 focus:outline-none'
                {...mapConfigInputProps('height')}
              />
              <span className='text-sm'>tiles</span>
            </div>
            <div className='flex items-center gap-2'>
              <label htmlFor='map-scale' className='w-12 text-right text-sm'>
                Scale
              </label>
              <input
                id='map-scale'
                type='number'
                className='w-32 bg-white px-3 py-1 focus:outline-none'
                {...mapConfigInputProps('scale')}
              />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  )
}
