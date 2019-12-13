import React from 'react'
import $ from 'styled-components'
import { ControlBoardSection, Summary } from '../styled'
import { setCurrentSound } from 'store/actions/soundsActions'
import * as Sounds from 'sounds'
import { Button } from 'styled/buttons'
import { setPuzzleSolved } from 'store/actions/roundActions'
import { useDispatch } from 'react-redux'

interface SpoilerProps {
  phrase: string
}

export const Spoiler: React.FC<SpoilerProps> = ({ phrase }) => {
  const dispatch = useDispatch()

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

        <Button onClick={handleSolve}>Reveal Puzzle</Button>
        <Button onClick={() => dispatch(setCurrentSound(Sounds.BUZZER))}>
          {Sounds.getSoundName(Sounds.BUZZER)}
        </Button>
      </details>
    </ControlBoardSection>
  )
}

const ControlBoardSpoiler = $.p`
  font-size: 2rem;
`

export default Spoiler
