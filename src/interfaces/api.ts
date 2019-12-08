declare namespace API {
  export interface Game {
    id: number
    puzzles: Puzzle[]
  }

  export interface Puzzle {
    id?: number
    phrase: string
    category: string
    name: string
    position: number
    bonus_round: boolean
  }
}

export default API
