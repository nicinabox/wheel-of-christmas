import API from 'interfaces/api'
import { lighten } from 'polished'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setGameStatus } from 'store/actions/gameActions'
import { resetPuzzle } from 'store/actions/roundActions'
import { setSoundStatus } from 'store/actions/soundsActions'
import { CurrentGameState, GameStatus } from 'store/reducers/currentGame'
import { CurrentRoundState } from 'store/reducers/currentRound'
import $ from 'styled-components'
import { Button } from 'styled/buttons'
import { DetailsSection, Section as ControlSection } from '../styled'

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
    dispatch(setGameStatus(GameStatus.Paused))
    dispatch(setSoundStatus('STOPPED'))
    dispatch(resetPuzzle())
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
    <Section>
      <Header>
        <div>
          {currentGame.status === GameStatus.Active && (
            <StatusButton
              nextStatus={GameStatus.Paused}
              onClick={() => dispatch(setGameStatus(GameStatus.Paused))}>
              Pause game
            </StatusButton>
          )}
          {currentGame.status === GameStatus.Paused && (
            <StatusButton
              nextStatus={GameStatus.Active}
              onClick={() => dispatch(setGameStatus(GameStatus.Active))}>
              Resume game
            </StatusButton>
          )}
          <StatusButton
            nextStatus={GameStatus.Played}
            onClick={handleEndGame}>
            End game
          </StatusButton>
        </div>

        <div>
          <strong>{currentGame.name} - {currentRoundName}</strong>
          <br/>
          <span>Round {puzzleNumber} / {puzzlesCount}</span>
          {currentRound.round_type === 'bonus' && (
            <strong> Bonus Round</strong>
          )}
          {currentRound.round_type === 'toss_up' && (
            <strong> Toss-Up Round</strong>
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
      </Header>
    </Section>
  )
}

const getStatusColor = (status: GameStatus) => {
  switch(status) {
    case GameStatus.Active:
      return 'orange'
    case GameStatus.Paused:
      return 'green'
    case GameStatus.Played:
      return 'black'
    default:
      return '#1a4048'
  }
}

export const Header = $.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Section = $(ControlSection)`
  padding: 1rem;
`

const StatusButton = $(Button)<{ nextStatus: GameStatus }>`
  background: ${props => getStatusColor(props.nextStatus)};

  &:hover {
    background: ${props => lighten(0.1, getStatusColor(props.nextStatus))};
  }
`

export default GameDetails
