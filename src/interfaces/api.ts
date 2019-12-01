export module API {
  export interface Game {
    puzzles: Puzzle[]
  }

  export interface Puzzle {
    phrase: string
    category: string
  }
}
