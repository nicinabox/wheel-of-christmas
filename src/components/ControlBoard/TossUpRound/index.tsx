import React, { useState, useEffect } from 'react'
import * as Sounds from 'sounds'
import { Section, Summary, Details, DetailsSection, SolvePuzzleButton } from '../styled'
import { CurrentRoundState } from 'store/reducers/currentRound'
import { Button } from 'styled/buttons'
import { setPuzzleSolved, setRevealedIndexes } from 'store/actions/roundActions'
import { setCurrentSound, setSoundStatus } from 'store/actions/soundsActions'
import { useDispatch } from 'react-redux'
import { CurrentSoundState } from 'store/reducers/currentSound'

interface TossUpRoundProps {
  currentRound: CurrentRoundState
  currentSound: CurrentSoundState
}

type TossUpStatus = 'active' | 'paused' | 'stopped'

export const TossUpRound: React.FC<TossUpRoundProps> = ({ currentRound, currentSound }) => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState<TossUpStatus>('stopped')
  const [currentIndex, setCurrentIndex] = useState(0)

  const { toss_up_reveal_order, round_type } = currentRound
  const revealPuzzleIndex = toss_up_reveal_order[currentIndex]

  useEffect(() => {
    if (status === 'active' && currentSound.status === 'STOPPED') {
      setStatus('paused')
    }
  }, [status, currentSound.status])

  useEffect(() => {
    if (status === 'active' && revealPuzzleIndex === undefined) {
      handleStop()
      dispatch(setCurrentSound(Sounds.BUZZER))
    }
  }, [status, revealPuzzleIndex])

  useEffect(() => {
    let timer: number

    if (status === 'active' && revealPuzzleIndex !== undefined) {
      timer = setTimeout(() => {
        dispatch(setRevealedIndexes(revealPuzzleIndex))
        setCurrentIndex(currentIndex + 1)
      }, 1000)
    }

    return () => clearTimeout(timer)
  }, [status, currentIndex, revealPuzzleIndex])

  function handlePause() {
    setStatus('paused')
    dispatch(setSoundStatus('PAUSED'))
  }

  function handleStart() {
    setStatus('active')
    dispatch(setCurrentSound(Sounds.TOSS_UP_THEME))
  }

  function handleStop() {
    setStatus('stopped')
    setCurrentIndex(0)
    dispatch(setPuzzleSolved())
  }

  function handleSolve() {
    handleStop()
    dispatch(setCurrentSound(Sounds.TOSS_UP_SOLVE))
  }

  return (
    <Section>
      <Details open={round_type === 'toss_up'}>
        <Summary>
          TOSS-UP ROUND
        </Summary>

        <DetailsSection>
          { status !== 'active' && (
            <Button onClick={handleStart}>
              Start Timer
            </Button>
          )}
          {status === 'active' && (
            <Button onClick={handlePause}>
              Pause Timer
            </Button>
          )}
          <SolvePuzzleButton onClick={handleSolve} disabled={status !== 'paused'}>
            Solve Puzzle
          </SolvePuzzleButton>
        </DetailsSection>
      </Details>
    </Section>
  )
}

export default TossUpRound
