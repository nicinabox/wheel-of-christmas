declare namespace API {
  export interface Game {
    id: number
    name: string | null
    puzzles: Puzzle[]
  }

  export type RoundType = 'toss_up' | 'bonus'

  export interface Puzzle {
    id?: number
    phrase: string
    category: string
    name: string
    position: number
    round_type: RoundType | undefined
    toss_up_reveal_order: number[]
  }
}

export default API
