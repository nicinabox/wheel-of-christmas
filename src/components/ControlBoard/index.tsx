import React, { useState } from 'react'
import NewWindow from 'react-new-window'
import ReactSound, { PlayStatus } from 'react-sound'
import * as API from '../../interfaces/api'
import PuzzleBoard from '../PuzzleBoard'
import PuzzleKey from '../PuzzleKey'
import Category from '../Category'
import { getRevealedIndexes } from '../../utils'

import { ReactComponent as ControlsIcon } from '../../images/controls.svg';

import './styles.css'

interface Props {
  puzzle: API.Puzzle;
  puzzleNumber: number;
  totalPuzzles: number;
  onPuzzleChange: (direction: number) => void;
}

const BUZZER = 'Buzzer.mp3'
const DING = 'Ding.mp3'
const PUZZLE_REVEAL = 'Puzzle Reveal.mp3'
const PUZZLE_SOLVE = 'Puzzle solve.mp3'
const RSTLNE = 'R S T L N E.mp3'

const findUnrevealedIndexes = (unrevealedChars: string[], revealedIndexes: number[], chars: string[]) => {
  return chars.reduce((acc: number[], c: string, i: number) => {
    if (!revealedIndexes.includes(i) && unrevealedChars.includes(c)) {
      return acc.concat(i)
    }
    return acc
  }, [])
}

const ControlBoard: React.FC<Props> = ({ puzzle, puzzleNumber, totalPuzzles, onPuzzleChange }) => {
  const chars = puzzle.text.toUpperCase().split('')

  const [currentSound, setCurrentSound] = useState(PUZZLE_REVEAL)
  const [shouldPopOut, setShouldPopOut] = useState<boolean>(false)
  const [usedChars, setUsedChars] = useState<string[]>([])
  const [solvedChars, setSolvedChars] = useState<API.SolvedChars>([])
  const [revealedIndexes, setRevealedIndexes] = useState<API.RevealedIndexes>(getRevealedIndexes(chars, /[^\w]/g))

  const handleSolve = () => {
    const indexes = chars.reduce((acc: number[], char) => {
      const result = chars.reduce((a: number[], c, i) => (c === char) ? a.concat(i) : a, [])
      return acc.concat(result)
    }, [])

    setRevealedIndexes(revealedIndexes.concat(indexes))
    setUsedChars(usedChars.concat(chars))
    setSolvedChars([])
    setCurrentSound(PUZZLE_SOLVE)
  }

  const handleSolveRSTLNE = () => {
    const rstlne = 'RSTLNE'.split('')
    setUsedChars(usedChars.concat(rstlne))
    setSolvedChars(solvedChars.concat(rstlne))
    setCurrentSound(RSTLNE)
  }

  const handleLetterAttempt = (char: string) => {
    if (!chars.includes(char)) {
      setCurrentSound(BUZZER)
      return setUsedChars(usedChars.concat(char))
    }

    setUsedChars(usedChars.concat(char))
    setSolvedChars(solvedChars.concat(char))
    setCurrentSound(DING)
  }

  const handleLetterReveal = (index: number) => {
    setRevealedIndexes(revealedIndexes.concat(index))
  }

  const handlePuzzleChange = (direction: number) => {
    setUsedChars([])
    setSolvedChars([])
    setRevealedIndexes([])
    onPuzzleChange(direction)
    setCurrentSound(PUZZLE_REVEAL)
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

  const unrevealed = findUnrevealedIndexes(solvedChars, revealedIndexes, chars)

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

        <PuzzleKey
          usedChars={usedChars}
          onLetterClick={handleLetterAttempt}
        />

        <Controls onUnload={() => setShouldPopOut(false)}>
          <div className="ControlBoard">
            <PuzzleKey
              usedChars={usedChars}
              onLetterClick={handleLetterAttempt}
              className="ControlBoard-PuzzleKey"
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
