import React, { useState } from 'react'
import * as API from '../../interfaces/api'
import ControlBoard from '../ControlBoard'

import './styles.css'

interface Props {
  puzzles: API.Puzzle[]
}

const Game: React.FC<Props> = ({ puzzles }) => {
    const [currentPuzzleIndex, setCurrentPuzzle] = useState(0)
    const currentPuzzle = puzzles[currentPuzzleIndex]
    const puzzlesSize = puzzles.length - 1

    function handleChangePuzzle(direction: number) {
      let nextIndex = currentPuzzleIndex + direction;
      if (nextIndex < 0) {
        nextIndex = 0
      }
      if (nextIndex > puzzlesSize) {
        nextIndex = puzzlesSize
      }
      setCurrentPuzzle(nextIndex);
    }

    return (
      <div className="Game">
        <ControlBoard
          puzzle={currentPuzzle}
          onPuzzleChange={handleChangePuzzle}
        />
      </div>
  )
}

export default Game
