import React, { useState, useEffect } from 'react'
import $ from 'styled-components'
import * as Sounds from 'sounds'
import { Section, Details, Summary, DetailsSection, SolvePuzzleButton } from '../styled'
import { Button } from 'styled/buttons'
import { useDispatch } from 'react-redux'
import { highlightChars, setAttemptedLetters, setPuzzleSolved } from 'store/actions/roundActions'
import { CurrentRoundState } from 'store/reducers/currentRound'
import { setCurrentSound } from 'store/actions/soundsActions'
import { CurrentSoundState } from 'store/reducers/currentSound'

interface BonusRoundProps {
  currentRound: CurrentRoundState
  currentSound: CurrentSoundState
}

type TimerStatus = 'active' | 'stopped'

export const BonusRound: React.FC<BonusRoundProps> = ({ currentRound, currentSound }) => {
  const dispatch = useDispatch()
  const [timerStatus, setTimerStatus] = useState<TimerStatus>('stopped')

  const { attemptedLetters, round_type } = currentRound

  useEffect(() => {
    if (timerStatus === 'active' && currentSound.status === 'STOPPED') {
      setTimerStatus('stopped')
      dispatch(setPuzzleSolved())
    }
  }, [timerStatus, currentSound.status])

  function handleStartTimer() {
    setTimerStatus('active')
    dispatch(setCurrentSound(Sounds.BONUS_ROUND_TIMER))
  }

  function handleSolve() {
    setTimerStatus('stopped')
    dispatch(setPuzzleSolved())
    dispatch(setCurrentSound(Sounds.BONUS_ROUND_SOLVE))
  }

  function handleHighlightChars(charStr: string) {
    const chars: string[] = charStr.toUpperCase().split('')
    highlightChars(chars, dispatch)
  }

  return (
    <Section>
      <Details open={round_type === 'bonus'}>
        <Summary>
          BONUS ROUND
        </Summary>

        <DetailsSection>
          <Ol>
            <li>
              <Button onClick={() => handleHighlightChars('RSTLNE')}>
                Highlight RSTLNE
              </Button>
            </li>
            <li>
              <Input
                type="text"
                value={attemptedLetters}
                placeholder="Enter attempted letters"
                onChange={(e) => dispatch(setAttemptedLetters(e.target.value))}
              />
              <Button onClick={() => handleHighlightChars(attemptedLetters)}>
                Highlight Letters
              </Button>
            </li>
            <li>
              <Button onClick={handleStartTimer} disabled={timerStatus === 'active'}>
                Start Timer
              </Button>
              <SolvePuzzleButton onClick={handleSolve} disabled={timerStatus === 'stopped'}>
                Solve Puzzle
              </SolvePuzzleButton>
            </li>
          </Ol>
        </DetailsSection>
      </Details>
    </Section>
  )
}

const Input = $.input`
  font-size: 1rem;
  border-radius: 4px;
  border: 2px solid #ddd;
  padding: 0.3rem 0.8rem;
`

const Ol = $.ol`
  margin: 0;
`

export default BonusRound
