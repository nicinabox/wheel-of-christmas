declare namespace API {
  export interface Game {
    id: number
    puzzles: Puzzle[]
  }

  export interface Puzzle {
    phrase: string
    category: string
  }
}

export default API
