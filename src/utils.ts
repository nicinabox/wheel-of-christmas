import { uniq } from 'lodash'
import * as API from 'interfaces/types'

export const VOWELS = 'AEIOU'

export const isVowel = (char: string) => {
  return VOWELS.includes(char.toUpperCase())
}

// @ts-ignore
export function getPuzzle({ puzzles, puzzleIndex }) {
  return puzzles[puzzleIndex]
}

export const generateAlphas = () => {
  const start = 'A'.charCodeAt(0)
  return new Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(start + i))
}

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

export const isLastPuzzleVowelUsed = (phraseChars: string[], usedChars: API.Char[]): boolean => {
    const puzzleVowels = uniq(phraseChars.filter(isVowel))
    return puzzleVowels.length ? puzzleVowels.every(c => usedChars.includes(c)) : false
}
