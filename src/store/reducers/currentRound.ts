import { uniq } from 'lodash';
import { AnyAction } from 'redux'
import { SET_ATTEMPTED_LETTERS, SET_USED_CHARS, SET_HIGHLIGHTED_CHARS, SET_REVEALED_INDEXES, RESET_PUZZLE, SET_CURRENT_ROUND } from 'store/actions/roundActions';

export interface CurrentRoundState {
  name: string | null
  category: string
  phrase: string
  phraseChars: string[]
  attemptedLetters: string
  usedChars: string[]
  highlightedChars: string[]
  revealedIndexes: number[]
}

export const intitialState: CurrentRoundState = {
  name: '',
  category: '',
  phrase: '',
  phraseChars: [],
  attemptedLetters: '',
  usedChars: [],
  highlightedChars: [],
  revealedIndexes: [],
}

export default function currentRound(state = intitialState, action: AnyAction): CurrentRoundState {
  const { type, payload } = action

  switch (type) {
    case SET_CURRENT_ROUND:
      return {
        ...intitialState,
        ...action.puzzle,
        phraseChars: action.puzzle.phrase.split('')
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
