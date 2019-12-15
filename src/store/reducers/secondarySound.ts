import { AnyAction } from 'redux'
import { SET_SECONDARY_SOUND, SET_SECONDARY_SOUND_STATUS, SET_SECONDARY_SOUND_VOLUME } from 'store/actions/secondarySoundsActions'

export type PlayStatus = 'PLAYING' | 'PAUSED' | 'STOPPED'

export interface SecondarySoundState {
  sound: string
  status: PlayStatus
  volume: number
}

const initialState: SecondarySoundState = {
  sound: '',
  status: 'STOPPED',
  volume: 100,
}

export default function currentSound(state = initialState, action: AnyAction): SecondarySoundState {
  switch(action.type) {
    case SET_SECONDARY_SOUND:
      return {
        ...state,
        sound: action.sound,
        status: action.status,
      }

    case SET_SECONDARY_SOUND_STATUS:
      return {
        ...state,
        status: action.status,
      }

    case SET_SECONDARY_SOUND_VOLUME:
      return {
        ...state,
        volume: action.volume
      }

    default:
      return state
  }
}
