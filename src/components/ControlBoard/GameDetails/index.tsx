import React from 'react'
import { ControlBoardHeader } from '../styled'
import { Button } from 'styled/buttons'
import { GameStatus, CurrentGameState } from 'store/reducers/currentGame'
import { setGameStatus } from 'store/actions/gameActions'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CurrentRoundState } from 'store/reducers/currentRound'
import { setPuzzleSolved } from 'store/actions/roundActions'
import API from 'interfaces/api'
import { setCurrentSound } from 'store/actions/soundsActions'
import * as Sounds from 'sounds'

interface GameDetailsProps {
  currentGame: CurrentGameState
  currentRound: CurrentRoundState
}

function getRound(puzzles: API.Puzzle[], index: number): API.Puzzle | undefined  {
  return puzzles[index]
}

function getRoundName(puzzle: API.Puzzle | undefined) {
  if (!puzzle) {
    return ''
  }

  return puzzle.name || `Round ${puzzle.position}`
}

function getPuzzles(puzzles: API.Puzzle[], roundIndex: number) {
  const nextPuzzle = getRound(puzzles, roundIndex + 1)
  const previousPuzzle = getRound(puzzles, roundIndex - 1)
  const currentPuzzle = getRound(puzzles, roundIndex)

  return {
    currentPuzzle,
    nextPuzzle,
    previousPuzzle,
  }
}

export const GameDetails: React.FC<GameDetailsProps> = ({ currentGame, currentRound }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const {
    currentPuzzle,
    previousPuzzle,
    nextPuzzle
  } = getPuzzles(currentGame.puzzles, currentRound.roundIndex)

  const nextRoundName = `→ ${getRoundName(nextPuzzle)}`
  const previousRoundName = `← ${getRoundName(previousPuzzle)}`
  const currentRoundName = getRoundName(currentPuzzle)
  const puzzleNumber = currentRound.position
  const puzzlesCount = currentGame.puzzles.length

  function handleEndGame() {
    dispatch(setGameStatus(GameStatus.Played))
    history.push('/')
  }

  const handlePuzzleChange = (direction: number) => {
    let roundIndex = currentRound.roundIndex + direction;

    if (roundIndex < 0) {
      roundIndex = 0
    }

    if (roundIndex > puzzlesCount) {
      roundIndex = puzzlesCount
    }

    history.push(`/play/${currentGame.id}/round/${roundIndex}`)
  }

  return (
    <ControlBoardHeader>
      <div>
        {currentGame.status === GameStatus.Active && (
          <Button onClick={() => dispatch(setGameStatus(GameStatus.Paused))}>
            Pause game
          </Button>
        )}
        {currentGame.status === GameStatus.Paused && (
          <Button onClick={() => dispatch(setGameStatus(GameStatus.Active))}>
            Resume game
          </Button>
        )}
        {currentGame.status !== GameStatus.Played && (
          <Button onClick={handleEndGame}>
            End game
          </Button>
        )}
      </div>

      <div>
        <strong>{currentGame.name} - {currentRoundName}</strong>
        <br/>
        <span>Round {puzzleNumber} / {puzzlesCount}</span>
        {currentRound.bonus_round && (
          <strong> Bonus Round</strong>
        )}
      </div>

      <div>
        <Button
          disabled={!previousPuzzle}
          onClick={() => handlePuzzleChange(-1)}>
          {previousRoundName}
        </Button>
        <Button
          disabled={!nextPuzzle}
          onClick={() => handlePuzzleChange(1)}>
          {nextRoundName}
        </Button>
      </div>
    </ControlBoardHeader>
  )
}

export default GameDetails
