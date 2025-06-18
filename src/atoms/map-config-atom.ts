import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback, type ChangeEvent } from 'react'

interface State {
  width: number
  height: number
  scale: number
}

export const mapConfigAtom = atomWithStorage<State>(
  'map',
  { width: 48, height: 24, scale: 1 },
  undefined,
  { getOnInit: true },
)

export function useMapConfig() {
  return useAtom(mapConfigAtom)
}

export function useMapConfigInputProps() {
  const [config, setConfig] = useMapConfig()
  return useCallback(
    (key: keyof State) => ({
      value: config[key],
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setConfig((prev) => ({
          ...prev,
          [key]: parseInt(e.target.value),
        })),
    }),
    [config, setConfig],
  )
}
