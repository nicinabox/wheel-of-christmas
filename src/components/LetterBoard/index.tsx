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

const LetterBoard: React.FC<Props> = ({ chars, activeChars, solvedIndexes, onLetterClick }) => {

  return (
    <div className="LetterBoard">
      {range(1,49).map((tileId, index) => {
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
