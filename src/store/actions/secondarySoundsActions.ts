export const SET_SECONDARY_SOUND = 'SET_SECONDARY_SOUND'
export const SET_SECONDARY_SOUND_STATUS = 'SET_SECONDARY_SOUND_STATUS'
export const SET_SECONDARY_SOUND_VOLUME = 'SET_SECONDARY_SOUND_VOLUME'

export function setSecondarySound(sound: string) {
  return {
    type: SET_SECONDARY_SOUND,
    sound,
    status: sound ? 'PLAYING' : 'STOPPED'
  }
}

export function setSecondarySoundStatus(status: string) {
  return {
    type: SET_SECONDARY_SOUND_STATUS,
    status,
  }
}

export function setSecondarySoundVolume(volume: number) {
  return {
    type: SET_SECONDARY_SOUND_VOLUME,
    volume,
  }
}
