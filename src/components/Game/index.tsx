import React, { useState } from 'react'
import $ from 'styled-components'
import * as API from 'types'
import ControlBoard from '../ControlBoard'
import Snow from '../Snow'

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
      <GameWrapper>
        <Snow />
        <ControlBoard
          puzzle={currentPuzzle}
          puzzleNumber={currentPuzzleIndex + 1}
          totalPuzzles={puzzles.length}
          onPuzzleChange={handleChangePuzzle}
        />
      </GameWrapper>
  )
}

const GameWrapper = $.div`
  background: linear-gradient(#5C79FE, #2E3D7F);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export default Game
