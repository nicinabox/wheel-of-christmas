import * as API from 'interfaces/types'
import { VOWELS } from 'utils'

export interface Payload {
  [key: string]: any
}

export interface Action {
  type: string
  payload: Payload
}

export const SET_GAME_STATE = 'SET_GAME_STATE'
export const RESET_PUZZLE = 'RESET_PUZZLE'
export const SET_PUZZLE = 'SET_PUZZLE'
export const SET_ATTEMPTED_LETTERS = 'SET_ATTEMPTED_LETTERS'
export const SET_USED_CHARS = 'SET_USED_CHARS'
export const SET_HIGHLIGHTED_CHARS = 'SET_HIGHLIGHTED_CHARS'
export const SET_REVEALED_INDEXES = 'SET_REVEALED_INDEXES'

const payload = (type: string, payload?: Payload) => {
  return { type, payload }
}

export function setGameState (nextState: Payload) {
  return payload(SET_GAME_STATE, nextState)
}

export function setAttemptedLetters(value: API.Char) {
  return payload(SET_ATTEMPTED_LETTERS, {
    value: value.substr(0, 4).toUpperCase()
  })
}

export function setUsedChars(chars: API.Char[] | API.Char) {
  return payload(SET_USED_CHARS, { chars })
}

export function setVowelsUsed() {
  return setUsedChars(VOWELS.split(''))
}

export function setHighlightedChars(chars: API.Char[] | API.Char) {
  return payload(SET_HIGHLIGHTED_CHARS, { chars })
}

export function setRevealedIndexes(indexes: API.Index[] | API.Index) {
  return payload(SET_REVEALED_INDEXES, { indexes })
}

export function setPuzzle(puzzleIndex: string) {
  return payload(SET_PUZZLE, { puzzleIndex })
}

export function resetPuzzle() {
  return payload(RESET_PUZZLE)
}

// @ts-ignore dispatch
export function highlightChars(chars: API.Char[], dispatch) {
  dispatch(setAttemptedLetters(''))
  dispatch(setUsedChars(chars))
  dispatch(setHighlightedChars(chars))
}

// @ts-ignore dispatch
export function solvePuzzle(puzzle: API.Puzzle, dispatch) {
  const nextIndexes = puzzle.chars.reduce((acc: API.Index[], char: API.Char) => {
    const result = puzzle.chars.reduce((a: API.Index[], c: API.Char, i: API.Index) => (c === char) ? a.concat(i) : a, [])
    return acc.concat(result)
  }, [])

  dispatch(setRevealedIndexes(nextIndexes))
  dispatch(setUsedChars(puzzle.chars))
  dispatch(setHighlightedChars([]))
}
