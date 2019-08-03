import React from 'react'
import { range } from 'lodash'
// import * as API from '../../interfaces/api'
import Letter from '../Letter'
import Tile from '../Tile'

import './styles.css'

interface Props {
  chars: string[];
  activeChars: string[];
  solvedIndexes: number[];
  onLetterClick: (index: number) => void;
}

// const ROW_RANGES = [
//   [0, 10],
//   [0, 12],
//   [0, 12],
//   [0, 10],
// ]

const LetterBoard: React.FC<Props> = ({ chars, activeChars, solvedIndexes, onLetterClick }) => {
  // let tileNum = 0

  return (
    <div className="LetterBoard">
      {/* {ROW_RANGES.map((rowRange, rowIndex) => {
        const row = puzzleRows[rowIndex]
        const rowChars = row ? row.split('') : []
        const [start, end] = rowRange;

        return (
          <div key={rowIndex} className="LetterBoard-row">
            {range(start, end).map((_, tileIndex) => {
              const char = rowChars[tileIndex]
              tileNum++

              return (
                <Tile key={tileNum} className={`Tile-${tileNum}`}>
                  {char ? (
                    <Letter
                      letter={char}
                      isActive={activeChars.includes(char)}
                      isSolved={solvedIndexes.includes(tileNum)}
                      onClick={() => onLetterClick(tileNum)}
                    />
                  ) : null}
                </Tile>
              )
            })}
          </div>
        )
      })} */}

      {range(1,45).map((tileId, index) => {
        const char = chars[index]

        return (
          <Tile key={index} className={`Tile-${tileId}`}>
            {char ? (
              <Letter
                letter={char}
                isActive={activeChars.includes(char)}
                isSolved={solvedIndexes.includes(index)}
                onClick={() => onLetterClick(index)}
              />
            ) : null}
          </Tile>
        )
      })}
    </div>
  )
}

export default LetterBoard
