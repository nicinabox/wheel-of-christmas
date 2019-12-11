// Puzzle board sounds
export const BUZZER = 'Buzzer.wav'
export const DING = 'Ding.wav'
export const LAST_SPIN = 'Last Spin.wav'
export const NO_VOWELS_LEFT = 'No Vowels Left.wav'
export const PUZZLE_REVEAL = 'Puzzle Reveal.mp3'
export const PUZZLE_SOLVE = 'Puzzle Solve.wav'

// Wheel sounds
export const BANKRUPT = 'Bankrupt.wav' // black
export const PRIZE = 'Prize.wav' // prize - green
export const EXPRESS = 'Express.wav' // light blue
export const HALF_CARD = 'Half Card.wav' // red
export const MYSTERY = 'Mystery.wav' // purple
export const WILD_CARD = 'Wild Card.wav' // hot pink

// Manual
export const BONUS_ROUND_SOLVE = 'Bonus Round Solve.wav'
export const BONUS_ROUND_TIMER = 'Bonus Round Timer.wav'
export const THEME = 'Theme.wav'
export const TOSS_UP_SOLVE = 'Toss Up Solve.wav'
export const TOSS_UP_THEME = 'Toss Up Theme.wav'

export const getSoundName = (sound: string) => {
  return sound.replace(/\.\w{3}$/, '')
}

export const isPlaying = (status: string) => status === 'PLAYING'
export const isPaused = (status: string) => status === 'PAUSED'
export const isStopped = (status: string) => status === 'STOPPED'
