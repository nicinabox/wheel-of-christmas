import { VOWELS } from 'utils'
import API from 'interfaces/api';

export const SET_CURRENT_ROUND = 'SET_CURRENT_ROUND'
export const SET_ATTEMPTED_LETTERS = 'SET_ATTEMPTED_LETTERS'
export const SET_USED_CHARS = 'SET_USED_CHARS'
export const SET_HIGHLIGHTED_CHARS = 'SET_HIGHLIGHTED_CHARS'
export const SET_REVEALED_INDEXES = 'SET_REVEALED_INDEXES'
export const SET_PUZZLE_SOLVED = 'SET_PUZZLE_SOLVED'
export const RESET_PUZZLE = 'RESET_PUZZLE'

export function setCurrentRound(puzzle: API.Puzzle, roundIndex: number) {
  return {
    type: SET_CURRENT_ROUND,
    puzzle,
    roundIndex,
  }
}

export function setAttemptedLetters(value: string) {
  return {
    type: SET_ATTEMPTED_LETTERS,
    payload: {
      value: value.toUpperCase()
    }
  }
}

export function setUsedChars(chars: string[] | string) {
  return {
    type: SET_USED_CHARS,
    payload: {
      chars
    }
  }
}

export function setHighlightedChars(chars: string[] | string) {
  return {
    type: SET_HIGHLIGHTED_CHARS,
    payload: {
      chars
    }
  }
}

export function setRevealedIndexes(indexes: number[] | number) {
  return {
    type: SET_REVEALED_INDEXES,
    payload: {
      indexes
    }
  }
}

export function resetPuzzle() {
  return {
    type: RESET_PUZZLE
  }
}

export function setVowelsUsed() {
  return setUsedChars(VOWELS.split(''))
}

export function highlightChars(chars: string[], dispatch) {
  dispatch(setAttemptedLetters(''))
  dispatch(setUsedChars(chars))
  dispatch(setHighlightedChars(chars))
}

export function setPuzzleSolved() {
  return {
    type: SET_PUZZLE_SOLVED,
  }
}
