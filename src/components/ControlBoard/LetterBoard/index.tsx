import React from 'react'
import { ControlBoardSection, ControlBoardSectionTitle } from '../styled'
import UsedLetterBoard from 'components/UsedLetterBoard'
import { Button } from 'styled/buttons'
import { setRevealedIndexes } from 'store/actions/roundActions'
import { useDispatch } from 'react-redux'
import { getUnrevealedIndexes } from 'utils'
import { CurrentRoundState } from 'store/reducers/currentRound'

interface LetterBoardProps {
  currentRound: CurrentRoundState
}

export const LetterBoard: React.FC<LetterBoardProps> = ({ currentRound }) => {
  const dispatch = useDispatch()

  const { highlightedChars, revealedIndexes, phraseChars } = currentRound
  const unrevealed = getUnrevealedIndexes(highlightedChars, revealedIndexes, phraseChars)

  function handleReveal() {
    const index = Math.floor((Math.random() * unrevealed.length))
    dispatch(setRevealedIndexes(unrevealed[index]))
  }

  return (
    <ControlBoardSection>
      <ControlBoardSectionTitle>
        Used Letter Board
      </ControlBoardSectionTitle>
      <UsedLetterBoard controlBoard={true} />

      <Button
        onClick={handleReveal}
        disabled={!unrevealed.length}>
        Reveal Highlighted
        {unrevealed.length ? ` (${unrevealed.length} remaining)` : null}
      </Button>
    </ControlBoardSection>
  )
}

export default LetterBoard
