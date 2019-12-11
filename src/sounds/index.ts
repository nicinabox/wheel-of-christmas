// Puzzle board sounds
export const BUZZER = 'Buzzer.wav'
export const DING = 'Ding.wav'
export const LAST_SPIN = 'Last Spin.wav'
export const NO_VOWELS_LEFT = 'No Vowels Left.wav'
export const PUZZLE_REVEAL = 'Puzzle Reveal.mp3'
export const PUZZLE_SOLVE = 'Puzzle Solve.wav'

// Wheel sounds
export const BANKRUPT = 'Bankrupt.wav'
export const PRIZE = 'Prize.wav'
export const EXPRESS = 'Express.wav'
export const HALF_CARD = 'Half Card.wav'
export const MYSTERY = 'Mystery.wav'
export const WILD_CARD = 'Wild Card.wav'

// Manual
export const BONUS_ROUND_SOLVE = 'Bonus Round Solve.wav'
export const BONUS_ROUND_TIMER = 'Bonus Round Timer.wav'
export const THEME = 'Theme.wav'
export const TOSS_UP_SOLVE = 'Toss Up Solve.wav'
export const TOSS_UP_THEME = 'Toss Up Theme.wav'

export const WedgeColors = {
  [BANKRUPT]: '#171515',
  [PRIZE]: '#64c190',
  [EXPRESS]: '#58caea',
  [HALF_CARD]: '#f17444',
  [MYSTERY]: '#b78abe',
  [WILD_CARD]: '#e43f97',
}

export const getSoundName = (sound: string) => {
  return sound.replace(/\.\w{3}$/, '')
}

export const isPlaying = (status: string) => status === 'PLAYING'
export const isPaused = (status: string) => status === 'PAUSED'
export const isStopped = (status: string) => status === 'STOPPED'
