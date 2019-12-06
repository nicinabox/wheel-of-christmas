export const SET_SOUND = 'SET_SOUND'
export const SET_SOUND_STATUS = 'SET_SOUND_STATUS'
export const SET_SOUND_VOLUME = 'SET_SOUND_VOLUME'

export function setCurrentSound(sound: string) {
  return {
    type: SET_SOUND,
    sound,
    status: sound ? 'PLAYING' : 'STOPPED'
  }
}

export function setSoundStatus(status: string) {
  return {
    type: SET_SOUND_STATUS,
    status,
  }
}

export function setSoundVolume(volume: number) {
  return {
    type: SET_SOUND_VOLUME,
    volume,
  }
}
