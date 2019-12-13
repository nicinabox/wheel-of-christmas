import React from 'react'
import $ from 'styled-components'
import { ControlBoardSection, Summary } from '../styled'
import { setCurrentSound } from 'store/actions/soundsActions'
import * as Sounds from 'sounds'
import { Button } from 'styled/buttons'
import { setPuzzleSolved } from 'store/actions/roundActions'
import { useDispatch } from 'react-redux'
import { CurrentRoundState } from 'store/reducers/currentRound'

interface SpoilerProps {
  currentRound: CurrentRoundState
}

export const Spoiler: React.FC<SpoilerProps> = ({ currentRound }) => {
  const dispatch = useDispatch()

  const { phrase, round_type } = currentRound

  const handleSolve = () => {
    dispatch(setPuzzleSolved())
    dispatch(setCurrentSound(Sounds.PUZZLE_SOLVE))
  }

  return (
    <ControlBoardSection>
      <details>
        <Summary>
          SPOILER
        </Summary>

        <ControlBoardSpoiler>
          {phrase}
        </ControlBoardSpoiler>

        <Button onClick={handleSolve} disabled={Boolean(round_type)}>
          Reveal Puzzle
        </Button>
      </details>
    </ControlBoardSection>
  )
}

const ControlBoardSpoiler = $.p`
  font-size: 2rem;
`

export default Spoiler
