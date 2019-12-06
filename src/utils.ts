import { uniq, isEqual } from 'lodash'

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
  chars: string[],
  pattern: RegExp
): number[] => {
  return chars.reduce((acc: number[], c: string, i) => {
    if (pattern.test(c)) {
      return acc.concat(i)
    }
    return acc
  }, [])
}

export const getUnrevealedIndexes = (
  unrevealedChars: string[],
  revealedIndexes: number[],
  chars: string[]
): number[] => {
  return chars.reduce((acc: number[], c: string, i: number) => {
    if (!revealedIndexes.includes(i) && unrevealedChars.includes(c)) {
      return acc.concat(i)
    }
    return acc
  }, [])
}

export const isLastPuzzleVowelUsed = (phraseChars: string[], usedChars: string[]): boolean => {
    const puzzleVowels = uniq(phraseChars.filter(isVowel))
    return puzzleVowels.length ? puzzleVowels.every(c => usedChars.includes(c)) : false
}

export const isPuzzleSolved = (phrase: string, usedChars: string[]) => {
  const uniqChars = uniq(phrase.split(''))
  return isEqual(uniqChars, usedChars)
}
