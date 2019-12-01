import { uniq } from 'lodash'
import * as API from 'interfaces/types'
import { GameState } from 'store/reducers'

export const VOWELS = 'AEIOU'

export const isVowel = (char: string) => {
  return VOWELS.includes(char.toUpperCase())
}

export function getPuzzle({ puzzles, puzzleIndex }: GameState) {
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

export const isLastPuzzleVowelUsed = (puzzle: API.Puzzle, usedChars: API.Char[]): boolean => {
    const puzzleVowels = uniq(puzzle.chars.filter(isVowel))
    return puzzleVowels.length ? puzzleVowels.every(c => usedChars.includes(c)) : false
}
