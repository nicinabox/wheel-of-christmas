import React, { useState, useEffect } from 'react'
import NewWindow from 'react-new-window'
import ReactSound from 'react-sound'
import * as API from 'types'
import PuzzleBoard from '../PuzzleBoard'
import UsedLetterBoard from '../UsedLetterBoard'
import Category from '../Category'
import { isLastPuzzleVowelUsed, getUnrevealedIndexes, getRevealedIndexes } from 'utils'
import * as Sounds from 'sounds'

import { ReactComponent as ControlsIcon } from 'images/controls.svg';

import './styles.css'

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

    setUsedChars([])
    setHighlightedChars([])
    setRevealedIndexes([])
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
    onPuzzleChange(direction)
  }

  const Controls = shouldPopOut
    ? NewWindow
    : (props: { children: React.ReactNode; onUnload: () => void; title: string; }) => (
      <button onClick={() => setShouldPopOut(true)} title="Open Controls" className="ControlsButton">
        <ControlsIcon width={25} />
      </button>
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

        <div className="PuzzleBoard-footer">
          <Category category={puzzle.category} />

          <UsedLetterBoard
            usedChars={usedChars}
            onLetterClick={handleLetterAttempt}
          />
        </div>

        <Controls onUnload={() => setShouldPopOut(false)} title="Controls">
          <div className="ControlBoard">
            <header className="ControlBoard-header ControlBoard-section">
              <strong>Puzzle {puzzleNumber} / {totalPuzzles}</strong>

              <div className="ControlBoard-navigation">
                <button
                  disabled={puzzleNumber === 1}
                  onClick={() => handlePuzzleChange(-1)}>
                  ←
                </button>
                <button
                  disabled={puzzleNumber === totalPuzzles}
                  onClick={() => handlePuzzleChange(1)}>
                  →
                </button>
              </div>
            </header>

            <section className="ControlBoard-section">
              <details>
                <summary>Spoiler</summary>
                <p className="ControlBoard-spoiler">
                  {puzzle.text}
                </p>
                <button onClick={handleSolve}>Solve Puzzle</button>
              </details>
            </section>

            <section className="ControlBoard-section">
              <h3>Used Letter Board</h3>
              <UsedLetterBoard
                usedChars={usedChars}
                onLetterClick={handleLetterAttempt}
                className="ControlBoard-UsedLetterBoard"
              />

              <button
                onClick={() => {
                  const index = Math.floor((Math.random() * unrevealed.length))
                  handleLetterReveal(unrevealed[index])
                }}
                disabled={!unrevealed.length}>
                Reveal Highlighted{unrevealed.length ? ` (${unrevealed.length} remaining)` : null}
              </button>
            </section>

            <section className="ControlBoard-section">
              <h3>Bonus Round</h3>
              <button onClick={() => handleHighlightChars('RSTLNE')}>
                Highlight RSTLNE
              </button>
              <br/>

              <input
                type="text"
                value={attemptedLetters}
                placeholder="Enter attempted letters"
                onChange={(e) => setAttemptedLetters(e.target.value.substr(0, 4).toUpperCase())}
              />
              <button onClick={() => handleHighlightChars(attemptedLetters)}>
                Highlight Letters
              </button>
            </section>

            <section className="ControlBoard-section">
              <h3>Sounds</h3>
              <div className="ControlBoard-soundboard">
                <fieldset>
                  <legend>Wheel</legend>
                  {[Sounds.BANKRUPT, Sounds.BEN_WEDGE, Sounds.EXPRESS, Sounds.HALF_CARD, Sounds.MYSTERY, Sounds.WILD_CARD].map((sound) => (
                    <button onClick={() => handleSetCurrentSound(sound)}>
                      {Sounds.getSoundName(sound)}
                    </button>
                  ))}
                </fieldset>
                <fieldset>
                  <legend>Extra</legend>
                  {[Sounds.THEME, Sounds.BONUS_ROUND_TIMER, Sounds.BONUS_ROUND_SOLVE, Sounds.TOSS_UP_THEME, Sounds.TOSS_UP_SOLVE].map((sound) => (
                    <button onClick={() => handleSetCurrentSound(sound)}>
                      {Sounds.getSoundName(sound)}
                    </button>
                  ))}
                </fieldset>
              </div>
            </section>
          </div>
        </Controls>
      </React.Fragment>
  )
}

export default ControlBoard
