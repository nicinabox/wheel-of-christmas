import React, { useEffect, useState } from 'react'
import $ from 'styled-components'
import { Section, Summary, Details, DetailsSection, SolvePuzzleButton } from '../styled'
import { setCurrentSound } from 'store/actions/soundsActions'
import * as Sounds from 'sounds'
import { setPuzzleSolved } from 'store/actions/roundActions'
import { useDispatch } from 'react-redux'
import { CurrentRoundState } from 'store/reducers/currentRound'

interface SpoilerProps {
  currentRound: CurrentRoundState
}

export const Spoiler: React.FC<SpoilerProps> = ({ currentRound }) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const { phrase, roundIndex, round_type } = currentRound

  useEffect(() => {
    setIsOpen(false)
  }, [roundIndex])

  function handleSolve() {
    dispatch(setPuzzleSolved())
    dispatch(setCurrentSound(Sounds.PUZZLE_SOLVE))
  }

  function handleToggleClick(e) {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <Section>
      <Details open={isOpen} onClick={handleToggleClick}>
        <Summary>
          SPOILER
        </Summary>

        <DetailsSection>
          <Phrase>
            {phrase}
          </Phrase>

          <SolvePuzzleButton onClick={handleSolve} disabled={Boolean(round_type)}>
            Solve Puzzle
          </SolvePuzzleButton>
        </DetailsSection>
      </Details>
    </Section>
  )
}

const Phrase = $.p`
  font-size: 2rem;
  margin: 0;
  margin-bottom: 0.5rem;
`

export default Spoiler
