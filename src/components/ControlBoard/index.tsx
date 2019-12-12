import { useDeepEqualEffect } from 'hooks'
import { ReactComponent as ControlsIcon } from 'images/controls.svg'
import React, { useEffect, useState } from 'react'
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

interface ControlBoardProps {}

const ControlBoard: React.FC<ControlBoardProps> = ({ }) => {
  const dispatch = useDispatch()
  const { currentGame, currentRound, currentSound } = useSelector((state: RootState) => state)
  const [shouldPopOut, setShouldPopOut] = useState(false)

  const { phrase, phraseChars, phraseVowels } = currentRound

  useEffect(() => {
    const revealedIndexes = getRevealedIndexes(phraseChars, /[^\w\s]/g)
    dispatch(setRevealedIndexes(revealedIndexes))
  }, [dispatch, phraseChars])

  useDeepEqualEffect(() => {
    if (phraseChars.length && !phraseVowels.length) {
      dispatch(setCurrentSound(Sounds.NO_VOWELS_LEFT))
    }
  }, [dispatch, phraseChars, phraseVowels])

  const PopOutButton = (props: { children: React.ReactNode; onUnload: () => void; title: string; }) => (
    <OpenControlsButton onClick={() => setShouldPopOut(true)} title="Open Controls">
      <ControlsIcon width={25} style={{fill: 'white'}} />
    </OpenControlsButton>
  )

  const Controls = shouldPopOut ? NewWindow : PopOutButton

  return (
      <Controls onUnload={() => setShouldPopOut(false)} title="Controls">
        <ControlBoardWrapper>
          <GameDetails
            currentGame={currentGame}
            currentRound={currentRound}
          />
          <Spoiler phrase={phrase} />
          <BonusRound currentRound={currentRound} currentSound={currentSound} />
          <TossUpRound currentRound={currentRound} currentSound={currentSound} />
          <LetterBoard currentRound={currentRound} />
          <Soundboard currentSound={currentSound} />
        </ControlBoardWrapper>
      </Controls>
  )
}

const ControlBoardWrapper = $.div`
  padding: 1rem;
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

export default ControlBoard
