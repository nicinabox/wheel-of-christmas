import * as API from './types'

export const getRevealedIndexes = (
  chars: API.Char[],
  pattern: RegExp
): API.Index[] => {
  return chars.reduce((acc: API.Index[], c: string, i) => {
    if (pattern.test(c)) {
      return acc.concat(i)
    }
    return acc
  }, [])
}

export const getUnrevealedIndexes = (
  unrevealedChars: API.Char[],
  revealedIndexes: API.Index[],
  chars: API.Char[]
): API.Index[] => {
  return chars.reduce((acc: API.Index[], c: API.Char, i: number) => {
    if (!revealedIndexes.includes(i) && unrevealedChars.includes(c)) {
      return acc.concat(i)
    }
    return acc
  }, [])
}
