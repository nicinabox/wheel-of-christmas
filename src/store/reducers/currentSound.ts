import { AnyAction } from 'redux'
import { SET_SOUND, SET_SOUND_STATUS, SET_SOUND_VOLUME } from 'store/actions/soundsActions'

export interface CurrentSoundState {
  sound: string
  status: 'PLAYING' | 'PAUSED' | 'STOPPED'
  volume: number
}

const initialState: CurrentSoundState = {
  sound: '',
  status: 'STOPPED',
  volume: 100,
}

export default function currentSound(state = initialState, action: AnyAction): CurrentSoundState {
  switch(action.type) {
    case SET_SOUND:
      return {
        ...state,
        sound: action.sound,
        status: action.status,
      }

    case SET_SOUND_STATUS:
      return {
        ...state,
        status: action.status,
      }

    case SET_SOUND_VOLUME:
      return {
        ...state,
        volume: action.volume
      }

    default:
      return state
  }
}
