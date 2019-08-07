import React, { useState } from 'react'
import NewWindow from 'react-new-window'
import ReactSound from 'react-sound'
import * as API from 'types'
import PuzzleBoard from '../PuzzleBoard'
import UsedLetterBoard from '../UsedLetterBoard'
import Category from '../Category'
import { getUnrevealedIndexes, getRevealedIndexes } from 'utils'
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
  const chars = puzzle.text.toUpperCase().split('')

  const [currentSound, setCurrentSound] = useState(Sounds.PUZZLE_REVEAL)
  const [shouldPopOut, setShouldPopOut] = useState<boolean>(false)
  const [usedChars, setUsedChars] = useState<API.Char[]>([])
  const [attemptedLetters, setAttemptedLetters] = useState<API.Char>('')
  const [highlightedChars, setHighlightedChars] = useState<API.Char[]>([])
  const [revealedIndexes, setRevealedIndexes] = useState<API.Index[]>(getRevealedIndexes(chars, /[^\w]/g))

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

    setUsedChars(usedChars.concat(char))
    setHighlightedChars(highlightedChars.concat(char))
    setCurrentSound(Sounds.DING)
  }

  const handleLetterReveal = (index: API.Index) => {
    setRevealedIndexes(revealedIndexes.concat(index))
  }

  const handlePuzzleChange = (direction: number) => {
    setUsedChars([])
    setHighlightedChars([])
    setRevealedIndexes([])
    onPuzzleChange(direction)
    setCurrentSound(Sounds.PUZZLE_REVEAL)
  }

  const Controls = shouldPopOut
    ? NewWindow
    : ({ children, onUnload }: { children: any, onUnload: any }) => (
      <button onClick={() => setShouldPopOut(true)} title="Open Controls" className="ControlsButton">
        <ControlsIcon width={25} />
      </button>
    )

  // @ts-ignore
  const { PLAYING } = ReactSound.status

  const unrevealed = getUnrevealedIndexes(highlightedChars, revealedIndexes, chars)

  return (
      <div>
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

        <Category category={puzzle.category} />

        <UsedLetterBoard
          usedChars={usedChars}
          onLetterClick={handleLetterAttempt}
        />

        <div className="PuzzleBoard-footer" />

        <Controls onUnload={() => setShouldPopOut(false)}>
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
              <input
                type="text"
                value={attemptedLetters}
                placeholder="Enter attempted letters"
                onChange={(e) => setAttemptedLetters(e.target.value.substr(0, 4).toUpperCase())}
              />
              <button onClick={() => handleHighlightChars(attemptedLetters)}>
                Highlight Letters
              </button>

              <button onClick={() => handleHighlightChars('RSTLNE')}>
                Highlight RSTLNE
              </button>
            </section>

            <section className="ControlBoard-section">
              <details>
                <summary>Spoiler</summary>
                <p className="ControlBoard-spoiler">
                  {puzzle.text}
                </p>
                <button onClick={handleSolve}>Solve Puzzle</button>
              </details>
            </section>
          </div>
        </Controls>
      </div>
  )
}

export default ControlBoard
