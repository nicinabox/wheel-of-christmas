import { useDeepEqualEffect } from 'hooks'
import { ReactComponent as ControlsIcon } from 'images/controls.svg'
import React, { useEffect, useState, useMemo } from 'react'
import NewWindow from 'react-new-window'
import { useDispatch, useSelector } from 'react-redux'
import * as Sounds from 'sounds'
import { setRevealedIndexes } from 'store/actions/roundActions'
import { setCurrentSound } from 'store/actions/soundsActions'
import { RootState } from 'store/reducers'
import $ from 'styled-components'
import { getRevealedIndexes } from 'utils'
import GameDetails from './GameDetails'
import LetterBoard from './LetterBoard'
import Spoiler from './Spoiler'
import Soundboard from './Soundboard'
import BonusRound from './BonusRound'
import TossUpRound from './TossUpRound'
import { GameStatus } from 'store/reducers/currentGame'

interface ControlBoardProps {}

const ControlBoard: React.FC<ControlBoardProps> = () => {
  const PopOutButton = () => (
    <OpenControlsButton onClick={() => setShouldPopOut(true)} title="Open Controls">
      <ControlsIcon width={25} style={{fill: 'white'}} />
    </OpenControlsButton>
  )

  const PopOutWindow = ({ children }) => (
    <NewWindow onUnload={() => setShouldPopOut(false)} title="Controls">
      {children}
    </NewWindow>
  )

  const dispatch = useDispatch()
  const { currentGame, currentRound, currentSound } = useSelector((state: RootState) => state)
  const [shouldPopOut, setShouldPopOut] = useState(false)
  const Controls = useMemo(() => shouldPopOut ? PopOutWindow : PopOutButton, [shouldPopOut])

  const { phraseChars, phraseVowels } = currentRound

  useEffect(() => {
    const revealedIndexes = getRevealedIndexes(phraseChars, /[^\w\s]/g)
    dispatch(setRevealedIndexes(revealedIndexes))
  }, [dispatch, phraseChars])

  useDeepEqualEffect(() => {
    if (phraseChars.length && !phraseVowels.length) {
      dispatch(setCurrentSound(Sounds.NO_VOWELS_LEFT))
    }
  }, [dispatch, phraseChars, phraseVowels])

  return (
      <Controls>
        <ControlBoardWrapper>
          {currentGame.status === GameStatus.Paused && (
            <GameStatusBanner status={currentGame.status}>
              {currentGame.status.toUpperCase()}
            </GameStatusBanner>
          )}

          <GameDetails
            currentGame={currentGame}
            currentRound={currentRound}
          />
          <Soundboard currentSound={currentSound} currentRound={currentRound} />
          <LetterBoard currentRound={currentRound} />
          <Spoiler currentRound={currentRound} />
          <BonusRound currentRound={currentRound} currentSound={currentSound} />
          <TossUpRound currentRound={currentRound} currentSound={currentSound} />
        </ControlBoardWrapper>
      </Controls>
  )
}

const ControlBoardWrapper = $.div`
  font-size: 1rem;
  user-select: text;
`

const OpenControlsButton = $.button`
  border: none;
  background: none;
  position: absolute;
  top: 20px;
  left: 20px;
  outline: none;
  padding: 10px;
`

const GameStatusBanner = $.div<{ status: GameStatus }>`
  background: ${props => props.status === GameStatus.Paused ? 'red' : '#fafafa'};
  color: ${props => props.status === GameStatus.Paused ? 'white' : '#aaa'};
  font-weight: bold;
  text-align: center;
  padding: 0.5rem;
`

export default ControlBoard
