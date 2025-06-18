import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback, type ChangeEvent } from 'react'

interface State {
  width: number
  height: number
  scale: number
}

export const atlasConfigAtom = atomWithStorage<State>(
  'atlas',
  { width: 16, height: 16, scale: 1 },
  undefined,
  { getOnInit: true },
)

export function useAtlasConfig() {
  return useAtom(atlasConfigAtom)
}

export function useAtlasConfigInputProps() {
  const [config, setConfig] = useAtlasConfig()
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
