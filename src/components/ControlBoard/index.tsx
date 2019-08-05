import React, { useState } from 'react'
import NewWindow from 'react-new-window'
import * as API from '../../interfaces/api'
import PuzzleBoard from '../PuzzleBoard'
import PuzzleKey from '../PuzzleKey'
import Category from '../Category'

import './styles.css'

interface Props {
  puzzle: API.Puzzle;
  onPuzzleChange: (direction: number) => void;
}

const ControlBoard: React.FC<Props> = ({ puzzle, onPuzzleChange }) => {
  const chars = puzzle.text.toUpperCase().split('')

  const [shouldPopOut, setShouldPopOut] = useState(false)
  const [usedChars, setUsedChars] = useState<string[]>([])
  const [solvedChars, setSolvedChars] = useState<string[]>([])
  const [revealedIndexes, setRevealedIndexes] = useState<number[]>([])

  const handleSolve = () => {
    const indexes = chars.reduce((acc: number[], char) => {
      const result = chars.reduce((a: number[], c, i) => (c === char) ? a.concat(i) : a, [])
      return acc.concat(result)
    }, [])
    setRevealedIndexes(revealedIndexes.concat(indexes))
    setSolvedChars([])
  }

  const handleLetterAttempt = (char: string) => {
    if (!chars.includes(char)) {
      // TODO: play a sad trombone sound
      return setUsedChars(usedChars.concat(char))
    }

    // TODO: play success sound
    setUsedChars(usedChars.concat(char))
    setSolvedChars(solvedChars.concat(char))
  }

  const handleLetterReveal = (index: number) => {
    setRevealedIndexes(revealedIndexes.concat(index))
  }

  const handlePuzzleChange = (direction: number) => {
    setSolvedChars([])
    setRevealedIndexes([])
    onPuzzleChange(direction)
  }

  const Wrapper = shouldPopOut
    ? NewWindow
    : ({children}: { children: any }) => children

  return (
      <div>
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

        <Wrapper>
          <div className="ControlBoard">
            <details>
              <summary>Spoiler</summary>
              <p>
                {puzzle.text}
              </p>
              <button onClick={handleSolve}>Solve</button>
            </details>
            <hr/>
            <button onClick={() => setShouldPopOut(!shouldPopOut)}>
              Pop {shouldPopOut ? 'In' : 'Out'}
            </button>

            <button onClick={() => handlePuzzleChange(-1)}>Previous Puzzle</button>
            <button onClick={() => handlePuzzleChange(1)}>Next Puzzle</button>
          </div>
        </Wrapper>
      </div>
  )
}

export default ControlBoard
