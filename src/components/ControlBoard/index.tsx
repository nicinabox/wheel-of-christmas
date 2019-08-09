import React, { useState, useEffect } from 'react'
import NewWindow from 'react-new-window'
import ReactSound from 'react-sound'
import $ from 'styled-components'
import * as API from 'types'
import PuzzleBoard from '../PuzzleBoard'
import UsedLetterBoard from '../UsedLetterBoard'
import Category from '../Category'
import { isLastPuzzleVowelUsed, getUnrevealedIndexes, getRevealedIndexes } from 'utils'
import * as Sounds from 'sounds'

import { ReactComponent as ControlsIcon } from 'images/controls.svg';


interface Props {
  puzzle: API.Puzzle;
  puzzleNumber: number;
  totalPuzzles: number;
  onPuzzleChange: (direction: number) => void;
}

const ControlBoard: React.FC<Props> = ({ puzzle, puzzleNumber, totalPuzzles, onPuzzleChange }) => {
  const { chars } = puzzle

  const [currentSound, setCurrentSound] = useState(Sounds.PUZZLE_REVEAL)
  const [shouldPopOut, setShouldPopOut] = useState<boolean>(false)
  const [usedChars, setUsedChars] = useState<API.Char[]>([])
  const [attemptedLetters, setAttemptedLetters] = useState<API.Char>('')
  const [highlightedChars, setHighlightedChars] = useState<API.Char[]>([])
  const [revealedIndexes, setRevealedIndexes] = useState<API.Index[]>([])

  useEffect(() => {
    const intitialRevealedIndexes = getRevealedIndexes(puzzle.chars, /[^\w]/g)
    setRevealedIndexes(intitialRevealedIndexes)

    setCurrentSound(Sounds.PUZZLE_REVEAL)
  }, [puzzle])

  const handleSolve = () => {
    const indexes = chars.reduce((acc: API.Index[], char) => {
      const result = chars.reduce((a: API.Index[], c, i) => (c === char) ? a.concat(i) : a, [])
      return acc.concat(result)
    }, [])

    setRevealedIndexes(revealedIndexes.concat(indexes))
    setUsedChars(usedChars.concat(chars))
    setHighlightedChars([])
    setCurrentSound(Sounds.PUZZLE_SOLVE)
  }

  const handleHighlightChars = (charStr: string) => {
    const chars: API.Char[] = charStr.toUpperCase().split('')

    setAttemptedLetters('')
    setUsedChars(usedChars.concat(chars))
    setHighlightedChars(highlightedChars.concat(chars))
  }

  const handleLetterAttempt = (char: API.Char) => {
    if (!chars.includes(char)) {
      setCurrentSound(Sounds.BUZZER)
      return setUsedChars(usedChars.concat(char))
    }

    const nextUsedChars = usedChars.concat(char)

    setUsedChars(nextUsedChars)
    setHighlightedChars(highlightedChars.concat(char))
    setCurrentSound(Sounds.DING)

    if (isLastPuzzleVowelUsed(puzzle, nextUsedChars)) {
      setCurrentSound(Sounds.NO_VOWELS_LEFT)
    }
  }

  const handleLetterReveal = (index: API.Index) => {
    setRevealedIndexes(revealedIndexes.concat(index))
  }

  const handleSetCurrentSound = (sound: string) => {
    currentSound ? setCurrentSound('') : setCurrentSound(sound)
  }

  const handlePuzzleChange = (direction: number) => {
    setUsedChars([])
    setHighlightedChars([])
    setRevealedIndexes([])
    onPuzzleChange(direction)
  }

  const Controls = shouldPopOut
    ? NewWindow
    : (props: { children: React.ReactNode; onUnload: () => void; title: string; }) => (
      <OpenControlsButton onClick={() => setShouldPopOut(true)} title="Open Controls">
        <ControlsIcon width={25} style={{fill: 'white'}} />
      </OpenControlsButton>
    )

  const unrevealed = getUnrevealedIndexes(highlightedChars, revealedIndexes, chars)

  // @ts-ignore
  const { PLAYING } = ReactSound.status

  return (
      <React.Fragment>
        {currentSound && (
          <ReactSound
            url={require(`sounds/${currentSound}`)}
            playStatus={PLAYING}
            onFinishedPlaying={() => setCurrentSound('')}
          />
        )}

        <PuzzleBoard
          chars={chars}
          attemptedLetters={attemptedLetters}
          highlightedChars={highlightedChars}
          revealedIndexes={revealedIndexes}
          onLetterReveal={handleLetterReveal}
        />

        <PuzzleBoardFooter>
          <Category category={puzzle.category} />

          <UsedLetterBoard
            usedChars={usedChars}
            onLetterClick={handleLetterAttempt}
          />
        </PuzzleBoardFooter>

        <Controls onUnload={() => setShouldPopOut(false)} title="Controls">
          <ControlBoardWrapper>
            <ControlBoardHeader>
              <strong>Puzzle {puzzleNumber} / {totalPuzzles}</strong>

              <div className="ControlBoard-navigation">
                <Button
                  disabled={puzzleNumber === 1}
                  onClick={() => handlePuzzleChange(-1)}>
                  ←
                </Button>
                <Button
                  disabled={puzzleNumber === totalPuzzles}
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
                  {puzzle.text}
                </ControlBoardSpoiler>
                <Button onClick={handleSolve}>Solve Puzzle</Button>
              </details>
            </ControlBoardSection>

            <ControlBoardSection>
              <ControlBoardSectionTitle>
                Used Letter Board
              </ControlBoardSectionTitle>
              <UsedLetterBoard
                usedChars={usedChars}
                onLetterClick={handleLetterAttempt}
                className="ControlBoard-UsedLetterBoard"
              />

              <Button
                onClick={() => {
                  const index = Math.floor((Math.random() * unrevealed.length))
                  handleLetterReveal(unrevealed[index])
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
                onChange={(e) => setAttemptedLetters(e.target.value.substr(0, 4).toUpperCase())}
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
                  {[Sounds.BANKRUPT, Sounds.BEN_WEDGE, Sounds.EXPRESS, Sounds.HALF_CARD, Sounds.MYSTERY, Sounds.WILD_CARD].map((sound) => (
                    <SoundboardButton onClick={() => handleSetCurrentSound(sound)}>
                      {Sounds.getSoundName(sound)}
                    </SoundboardButton>
                  ))}
                </StyledFieldset>
                <StyledFieldset>
                  <legend>Extra</legend>
                  {[Sounds.THEME, Sounds.BONUS_ROUND_TIMER, Sounds.BONUS_ROUND_SOLVE, Sounds.TOSS_UP_THEME, Sounds.TOSS_UP_SOLVE].map((sound) => (
                    <SoundboardButton onClick={() => handleSetCurrentSound(sound)}>
                      {Sounds.getSoundName(sound)}
                    </SoundboardButton>
                  ))}
                </StyledFieldset>
              </SoundboardWrapper>
            </ControlBoardSection>
          </ControlBoardWrapper>
        </Controls>
      </React.Fragment>
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
  background: #8c959d;
  color: white;
  padding: 0.3rem 0.8rem;
  margin: 2px;
  border-radius: 4px;
  outline: none;

  &:hover {
    background: #717b84;
  }

  &[disabled] {
    opacity: 0.4;

    &:hover {
      background: #8c959d;
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

const PuzzleBoardFooter = $.div`
  background: rgb(255,255,255);
  background: linear-gradient(180deg,
    rgba(255,255,255,1) 0%,
    rgba(252,252,253,1) 24%,
    rgba(242,244,245,1) 43%,
    rgba(225,230,232,1) 61%,
    rgba(202,211,216,1) 77%,
    rgba(169,183,191,1) 95%);
  padding-top: 2.6vw;
  width: 100%;
  flex: 1;
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
