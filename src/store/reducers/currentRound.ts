import { uniq } from 'lodash';
import { AnyAction } from 'redux'
import { SET_ATTEMPTED_LETTERS, SET_USED_CHARS, SET_HIGHLIGHTED_CHARS, SET_REVEALED_INDEXES, RESET_PUZZLE, SET_CURRENT_ROUND, SET_PUZZLE_SOLVED } from 'store/actions/roundActions';
import API from 'interfaces/api';
import { isVowel } from 'utils';

export interface CurrentRoundState extends API.Puzzle {
  name: string
  roundIndex: number
  phraseChars: string[]
  phraseVowels: string[]
  attemptedLetters: string
  usedChars: string[]
  highlightedChars: string[]
  revealedIndexes: number[]
}

export const intitialState: CurrentRoundState = {
  roundIndex: 0,
  position: 0,
  name: '',
  category: '',
  phrase: '',
  bonus_round: false,
  phraseChars: [],
  phraseVowels: [],
  attemptedLetters: '',
  usedChars: [],
  highlightedChars: [],
  revealedIndexes: [],
}

export default function currentRound(state = intitialState, action: AnyAction): CurrentRoundState {
  const { type, payload } = action

  switch (type) {
    case SET_CURRENT_ROUND:
      const phraseChars = action.puzzle.phrase.split('')
      return {
        ...intitialState,
        ...action.puzzle,
        roundIndex: action.roundIndex,
        phraseVowels: uniq(phraseChars.filter(isVowel)),
        phraseChars,
      }

    case SET_ATTEMPTED_LETTERS:
      return {
        ...state,
        attemptedLetters: payload.value
      }

    case SET_USED_CHARS:
      return {
        ...state,
        usedChars: uniq(state.usedChars.concat(payload.chars)),
        phraseVowels: state.phraseVowels.filter(v => !payload.chars.includes(v)),
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

    case SET_PUZZLE_SOLVED:
      return {
        ...state,
        highlightedChars: state.phraseChars.map(c => c),
        usedChars: state.phraseChars.map(c => c),
        revealedIndexes: state.phraseChars.map((c, i) => i),
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
