export const SET_CURRENT_SOUND = 'SET_CURRENT_SOUND'

export function setCurrentSound(sound: string) {
  return {
    type: SET_CURRENT_SOUND,
    sound,
  }
}
