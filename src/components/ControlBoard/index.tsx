import React, { useState } from 'react'
import NewWindow from 'react-new-window'
import ReactSound from 'react-sound'
import * as API from '../../types'
import PuzzleBoard from '../PuzzleBoard'
import UsedLetterBoard from '../UsedLetterBoard'
import Category from '../Category'
import { getUnrevealedIndexes, getRevealedIndexes } from '../../utils'
import * as Sounds from '../../sounds'

import { ReactComponent as ControlsIcon } from '../../images/controls.svg';

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
  const [solvedChars, setSolvedChars] = useState<API.Char[]>([])
  const [revealedIndexes, setRevealedIndexes] = useState<API.Index[]>(getRevealedIndexes(chars, /[^\w]/g))

  const handleSolve = () => {
    const indexes = chars.reduce((acc: API.Index[], char) => {
      const result = chars.reduce((a: API.Index[], c, i) => (c === char) ? a.concat(i) : a, [])
      return acc.concat(result)
    }, [])

    setRevealedIndexes(revealedIndexes.concat(indexes))
    setUsedChars(usedChars.concat(chars))
    setSolvedChars([])
    setCurrentSound(Sounds.PUZZLE_SOLVE)
  }

  const handleSolveRSTLNE = () => {
    const rstlne = 'RSTLNE'.split('')
    setUsedChars(usedChars.concat(rstlne))
    setSolvedChars(solvedChars.concat(rstlne))
  }

  const handleLetterAttempt = (char: API.Char) => {
    if (!chars.includes(char)) {
      setCurrentSound(Sounds.BUZZER)
      return setUsedChars(usedChars.concat(char))
    }

    setUsedChars(usedChars.concat(char))
    setSolvedChars(solvedChars.concat(char))
    setCurrentSound(Sounds.DING)
  }

  const handleLetterReveal = (index: API.Index) => {
    setRevealedIndexes(revealedIndexes.concat(index))
  }

  const handlePuzzleChange = (direction: number) => {
    setUsedChars([])
    setSolvedChars([])
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

  const unrevealed = getUnrevealedIndexes(solvedChars, revealedIndexes, chars)

  return (
      <div>
        {currentSound && (
          <ReactSound
            url={require(`../../sounds/${currentSound}`)}
            playStatus={PLAYING}
            onFinishedPlaying={() => setCurrentSound('')}
          />
        )}

        <PuzzleBoard
          chars={chars}
          solvedChars={solvedChars}
          revealedIndexes={revealedIndexes}
          onLetterReveal={handleLetterReveal}
        />

        <Category category={puzzle.category} />

        <UsedLetterBoard
          usedChars={usedChars}
          onLetterClick={handleLetterAttempt}
        />

        <Controls onUnload={() => setShouldPopOut(false)}>
          <div className="ControlBoard">
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
              Reveal Solved{unrevealed.length ? ` (${unrevealed.length} remaining)` : null}
            </button>
            <button onClick={handleSolveRSTLNE}>
              Solve RSTLNE
            </button>

            <hr/>
            <details>
              <summary>Spoiler</summary>
              <p>
                {puzzle.text}
              </p>
              <button onClick={handleSolve}>Solve</button>
            </details>

            <hr/>
            <p>{puzzleNumber} / {totalPuzzles}</p>
            <button
              disabled={puzzleNumber === 1}
              onClick={() => handlePuzzleChange(-1)}>←</button>
            <button
              disabled={puzzleNumber === totalPuzzles}
              onClick={() => handlePuzzleChange(1)}>→</button>
          </div>
        </Controls>
      </div>
  )
}

export default ControlBoard
