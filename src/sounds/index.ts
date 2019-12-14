import { PlayStatus } from "store/reducers/currentSound"

// Puzzle board sounds
export const BUZZER = 'Buzzer.mp3'
export const DING = 'Ding.mp3'
export const LAST_SPIN = 'Last Spin.mp3'
export const NO_VOWELS_LEFT = 'No Vowels Left.mp3'
export const PUZZLE_REVEAL = 'Puzzle Reveal.mp3'
export const PUZZLE_SOLVE = 'Puzzle Solve.mp3'
export const RSTLNE = 'RSTLNE.mp3'

// Wheel sounds
export const BANKRUPT = 'Bankrupt.mp3'
export const PRIZE = 'Prize.mp3'
export const EXPRESS = 'Express.mp3'
export const HALF_CARD = 'Half Card.mp3'
export const MYSTERY = 'Mystery.mp3'
export const WILD_CARD = 'Wild Card.mp3'

// Manual
export const BONUS_ROUND_SOLVE = 'Bonus Round Solve.mp3'
export const BONUS_ROUND_TIMER = 'Bonus Round Timer.mp3'
export const THEME = 'Theme.mp3'
export const TOSS_UP_SOLVE = 'Toss Up Solve.mp3'
export const TOSS_UP_THEME = 'Toss Up Theme.mp3'

export const getSoundName = (sound: string) => sound.replace(/\.\w{3}$/, '')

export const isPlaying = (status: PlayStatus) => status === 'PLAYING'
export const isPaused = (status: PlayStatus) => status === 'PAUSED'
export const isStopped = (status: PlayStatus) => status === 'STOPPED'
