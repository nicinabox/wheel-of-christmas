import React, { useState } from 'react'
import { uniq } from 'lodash'
import NewWindow from 'react-new-window'
import * as API from '../../interfaces/api'
import LetterBoard from '../LetterBoard'

import './styles.css'

interface Props {
  puzzle: API.Puzzle;
  onPuzzleChange: (direction: number) => void;
}

const generateAlphas = () => {
  const start = 'A'.charCodeAt(0)
  return new Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(start + i))
}

const ControlBoard: React.FC<Props> = ({ puzzle, onPuzzleChange }) => {
  const chars = puzzle.split('')
  const selectableChars = generateAlphas()

  const [shouldPopOut, setShouldPopOut] = useState(false)
  const [activeChars, setActiveChars] = useState<string[]>([])
  const [solvedIndexes, setSolvedIndexes] = useState<number[]>([])

  const isCharSolved = (char: string) => {
    const instanceIndexes = chars.reduce((acc: number[], c: string, i) => {
      if (c === char) return acc.concat(i)
      return acc
    }, [])

    return instanceIndexes
      .map((instanceIndex: number) => solvedIndexes.includes(instanceIndex))
      .every(f => f)
  }

  const handleSolve = () => {
    setSolvedIndexes(chars.map((c, i) => i))
  }

  const handlePuzzleChange = (direction: number) => {
    setActiveChars([])
    setSolvedIndexes([])
    onPuzzleChange(direction)
  }

  const handleRevealActiveLetters = () => {
    const indexes = activeChars.reduce((acc: number[], char) => {
      const result = chars.reduce((a: number[], c, i) => (c === char) ? a.concat(i) : a, [])
      return acc.concat(result)
    }, [])

    setSolvedIndexes(solvedIndexes.concat(indexes))
    setActiveChars([])
  }

  const Wrapper = shouldPopOut
    ? NewWindow
    : ({children}: { children: any }) => children

  return (
      <div>
        <LetterBoard
          chars={chars}
          activeChars={activeChars}
          solvedIndexes={solvedIndexes}
          onLetterClick={(index) => {
            setSolvedIndexes(solvedIndexes.concat(index))
            setActiveChars([])
          }}
        />

        <Wrapper>
          <div className="ControlBoard">
            <div className="ControlBoard-letters">
              {selectableChars.map((char) => (
                <button
                  key={char}
                  disabled={isCharSolved(char)}
                  onClick={() => {
                    const nextChars = uniq(activeChars.concat(char))
                    setActiveChars(nextChars)
                  }}>
                  {char}
                </button>
              ))}
            </div>
            <button
              onClick={handleRevealActiveLetters}
              disabled={!activeChars.length}>
              Reveal
            </button>
            <hr/>
            <details>
              <summary>Spoiler</summary>
              <p>
                {puzzle}
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
