import React from 'react'
import { ControlBoardSection, Summary } from '../styled'
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

  const { highlightedChars, revealedIndexes, phraseChars, round_type } = currentRound
  const unrevealed = getUnrevealedIndexes(highlightedChars, revealedIndexes, phraseChars)

  function handleReveal() {
    const index = Math.floor((Math.random() * unrevealed.length))
    dispatch(setRevealedIndexes(unrevealed[index]))
  }

  return (
    <ControlBoardSection>
      <details open={round_type !== 'toss_up'}>
        <Summary>
          USED LETTER BOARD
        </Summary>

        <UsedLetterBoard controlBoard={true} />

        <Button
          onClick={handleReveal}
          disabled={!unrevealed.length}>
          Reveal Highlighted
          {unrevealed.length ? ` (${unrevealed.length} remaining)` : null}
        </Button>
      </details>
    </ControlBoardSection>
  )
}

export default LetterBoard
