import { AnyAction } from 'redux'
import { SET_CURRENT_SOUND } from 'store/actions/soundsActions'

export type CurrentSoundState = string

export default function currentSound(state = '', action: AnyAction): CurrentSoundState {
  switch(action.type) {
    case SET_CURRENT_SOUND:
      return action.sound
    default:
      return state
  }
}
