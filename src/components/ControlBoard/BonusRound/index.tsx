import React from 'react'
import $ from 'styled-components'
import { ControlBoardSection, ControlBoardSectionTitle } from '../styled'
import { Button } from 'styled/buttons'
import { useDispatch } from 'react-redux'
import { highlightChars, setAttemptedLetters } from 'store/actions/roundActions'
import { CurrentRoundState } from 'store/reducers/currentRound'

interface BonusRoundProps {
  currentRound: CurrentRoundState
}

export const BonusRound: React.FC<BonusRoundProps> = ({ currentRound }) => {
  const dispatch = useDispatch()

  const { attemptedLetters } = currentRound

  const handleHighlightChars = (charStr: string) => {
    const chars: string[] = charStr.toUpperCase().split('')
    highlightChars(chars, dispatch)
  }

  return (
    <ControlBoardSection>
      <ControlBoardSectionTitle>
        Bonus Round
      </ControlBoardSectionTitle>
      <Button onClick={() => handleHighlightChars('RSTLNE')}>
        Highlight RSTLNE
      </Button>

      <br/>
      <Input
        type="text"
        value={attemptedLetters}
        placeholder="Enter attempted letters"
        onChange={(e) => dispatch(setAttemptedLetters(e.target.value))}
      />
      <Button onClick={() => handleHighlightChars(attemptedLetters)}>
        Highlight Letters
      </Button>
    </ControlBoardSection>
  )
}

const Input = $.input`
  font-size: 1rem;
  border-radius: 4px;
  border: 2px solid #ddd;
  padding: 0.3rem 0.8rem;
`

export default BonusRound
