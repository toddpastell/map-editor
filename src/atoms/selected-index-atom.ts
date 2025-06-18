import { atom, useAtom } from 'jotai'

const selectedIndexAtom = atom(0)

export function useSelectedIndex() {
  return useAtom(selectedIndexAtom)
}
