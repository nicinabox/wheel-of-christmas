import { createContext } from 'react'
import { uniq } from 'lodash'
import * as API from 'types'
import {
  Action,
  SET_GAME_STATE,
  SET_USED_CHARS,
  SET_HIGHLIGHTED_CHARS,
  SET_REVEALED_INDEXES,
  SET_ATTEMPTED_LETTERS,
  RESET_PUZZLE,
  SET_PUZZLE,
} from './actions'

export interface GameState {
  puzzles: API.Puzzle[]
  puzzleIndex: number
  attemptedLetters: string
  usedChars: API.Char[]
  highlightedChars: API.Char[]
  revealedIndexes: API.Index[]
}

export const initialGameState: GameState = {
  puzzles: [],
  puzzleIndex: 0,
  attemptedLetters: '',
  usedChars: [],
  highlightedChars: [],
  revealedIndexes: [],
}

// @ts-ignore
export const GameContext = createContext()

export default (state: GameState, action: Action): GameState => {
  const { type, payload } = action

  switch (type) {
    case SET_GAME_STATE:
      return {
        ...state,
        ...payload,
      }
    case SET_ATTEMPTED_LETTERS:
      return {
        ...state,
        attemptedLetters: payload.value
      }
    case SET_USED_CHARS:
      return {
        ...state,
        usedChars: uniq(state.usedChars.concat(payload.chars))
      }
    case SET_HIGHLIGHTED_CHARS:
      return {
        ...state,
        highlightedChars: uniq(state.highlightedChars.concat(payload.chars))
      }
    case SET_REVEALED_INDEXES:
      return {
        ...state,
        revealedIndexes: state.revealedIndexes.concat(payload.indexes)
      }
    case SET_PUZZLE:
      return {
        ...state,
        puzzleIndex: action.payload.puzzleIndex,
        attemptedLetters: '',
        usedChars: [],
        highlightedChars: [],
        revealedIndexes: [],
      }
    case RESET_PUZZLE:
      return {
        ...state,
        attemptedLetters: '',
        usedChars: [],
        highlightedChars: [],
        revealedIndexes: [],
      }
    default:
      return state
  }
}
