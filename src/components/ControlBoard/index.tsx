import React, { useContext, useState, useEffect } from 'react'
import NewWindow from 'react-new-window'
import $ from 'styled-components'
import { darken } from 'polished'

import * as Sounds from 'sounds'
import * as API from 'interfaces/types'
import { useDeepEqualEffect } from 'hooks'
import { getUnrevealedIndexes, getRevealedIndexes, isLastPuzzleVowelUsed, isPuzzleSolved  } from 'utils'
import { ReactComponent as ControlsIcon } from 'images/controls.svg';
import UsedLetterBoard from '../UsedLetterBoard'
import { useDispatch, useSelector } from 'react-redux';
import { setRevealedIndexes, setVowelsUsed, solvePuzzle, highlightChars, setAttemptedLetters } from 'store/actions/roundActions';
import { RootState } from 'store/reducers';
import { useHistory } from 'react-router-dom';
import { setCurrentSound } from 'store/actions/soundsActions';

interface ControlBoardProps {
  puzzlesCount: number
}

const ControlBoard: React.FC<ControlBoardProps> = ({ puzzlesCount }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { currentGame, currentRound } = useSelector((state: RootState) => state)

  const { phrase, phraseChars, usedChars, highlightedChars, revealedIndexes, attemptedLetters } = currentRound
  const puzzleNumber = currentGame.roundIndex! + 1

  const [shouldPopOut, setShouldPopOut] = useState<boolean>(false)

  useEffect(() => {
    const revealedIndexes = getRevealedIndexes(phraseChars, /[^\w]/g)
    dispatch(setRevealedIndexes(revealedIndexes))
  }, [phraseChars])

  useDeepEqualEffect(() => {
    if (!isPuzzleSolved(phrase, usedChars) && isLastPuzzleVowelUsed(phraseChars, usedChars)) {
      dispatch(setVowelsUsed())
      dispatch(setCurrentSound(Sounds.NO_VOWELS_LEFT))
    }
  }, [phrase, phraseChars, usedChars])

  const handleSolve = () => {
    solvePuzzle(phraseChars, dispatch)
    dispatch(setCurrentSound(Sounds.PUZZLE_SOLVE))
  }

  const handleHighlightChars = (charStr: string) => {
    const chars: API.Char[] = charStr.toUpperCase().split('')
    highlightChars(chars, dispatch)
  }

  const handlePuzzleChange = (direction: number) => {
    let roundIndex = currentGame.roundIndex! + direction;

    if (roundIndex < 0) {
      roundIndex = 0
    }

    if (roundIndex > puzzlesCount) {
      roundIndex = puzzlesCount
    }

    history.push(`/games/${currentGame.gameId}/round/${roundIndex}`)
  }

  const PopOutButton = (props: { children: React.ReactNode; onUnload: () => void; title: string; }) => (
    <OpenControlsButton onClick={() => setShouldPopOut(true)} title="Open Controls">
      <ControlsIcon width={25} style={{fill: 'white'}} />
    </OpenControlsButton>
  )

  const Controls = shouldPopOut
    ? NewWindow
    : PopOutButton

  const unrevealed = getUnrevealedIndexes(highlightedChars, revealedIndexes, phraseChars)

  return (
      <Controls onUnload={() => setShouldPopOut(false)} title="Controls">
        <ControlBoardWrapper>
          <ControlBoardHeader>
            <strong>Puzzle {puzzleNumber} / {puzzlesCount}</strong>

            <div className="ControlBoard-navigation">
              <Button
                disabled={puzzleNumber === 1}
                onClick={() => handlePuzzleChange(-1)}>
                ←
              </Button>
              <Button
                disabled={puzzleNumber === puzzlesCount}
                onClick={() => handlePuzzleChange(1)}>
                →
              </Button>
            </div>
          </ControlBoardHeader>

          <ControlBoardSection>
            <details>
              <FieldsetSummary>
                Spoiler
              </FieldsetSummary>
              <ControlBoardSpoiler>
                {phrase}
              </ControlBoardSpoiler>
              <Button onClick={handleSolve}>Solve Puzzle</Button>
            </details>
          </ControlBoardSection>

          <ControlBoardSection>
            <ControlBoardSectionTitle>
              Used Letter Board
            </ControlBoardSectionTitle>
            <UsedLetterBoard
              controlBoard={true}
            />

            <Button
              onClick={() => {
                const index = Math.floor((Math.random() * unrevealed.length))
                dispatch(setRevealedIndexes(unrevealed[index]))
              }}
              disabled={!unrevealed.length}>
              Reveal Highlighted{unrevealed.length ? ` (${unrevealed.length} remaining)` : null}
            </Button>
          </ControlBoardSection>

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

          <ControlBoardSection>
            <ControlBoardSectionTitle>
              Sounds
            </ControlBoardSectionTitle>
            <SoundboardWrapper>
              <StyledFieldset>
                <legend>Wheel</legend>
                {[Sounds.BANKRUPT, Sounds.BEN_WEDGE, Sounds.EXPRESS, Sounds.HALF_CARD, Sounds.MYSTERY, Sounds.WILD_CARD].map((sound, i) => (
                  <SoundboardButton key={i} onClick={() => dispatch(setCurrentSound(sound))}>
                    {Sounds.getSoundName(sound)}
                  </SoundboardButton>
                ))}
              </StyledFieldset>
              <StyledFieldset>
                <legend>Extra</legend>
                {[Sounds.THEME, Sounds.BONUS_ROUND_TIMER, Sounds.BONUS_ROUND_SOLVE, Sounds.TOSS_UP_THEME, Sounds.TOSS_UP_SOLVE].map((sound, i) => (
                  <SoundboardButton
                     key={i} onClick={() => dispatch(setCurrentSound(sound))}>
                    {Sounds.getSoundName(sound)}
                  </SoundboardButton>
                ))}
              </StyledFieldset>
            </SoundboardWrapper>
          </ControlBoardSection>
        </ControlBoardWrapper>
      </Controls>
  )
}

const ControlBoardWrapper = $.div`
  padding: 1rem;
  font-size: 1rem;
  user-select: text;
`

const ControlBoardSection = $.section`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
`

const ControlBoardHeader = $(ControlBoardSection)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button = $.button`
  font-size: 1rem;
  border: none;
  background: #3e51a9;
  color: white;
  padding: 0.4rem 0.8rem;
  margin: 2px;
  border-radius: 6px;
  outline: none;

  &:hover {
    background: ${darken(0.1, '#3e51a9')};
  }

  &[disabled] {
    opacity: 0.4;

    &:hover {
      background: #3e51a9;
    }
  }
`

const ControlBoardSpoiler = $.p`
  font-size: 2rem;
`

const ControlBoardSectionTitle = $.h3`
  font-size: 1rem;
`

const SoundboardWrapper = $.div`
  display: flex;
`

const SoundboardButton = $(Button)`
  width: 100%;
`

const StyledFieldset = $.fieldset`
  flex: 1;
`

const FieldsetSummary = $.summary`
  cursor: pointer;
  outline: none;
  font-weight: bold;
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

const Input = $.input`
  font-size: 1rem;
  border-radius: 4px;
  border: 2px solid #ddd;
  padding: 0.3rem 0.8rem;
`

export default ControlBoard
