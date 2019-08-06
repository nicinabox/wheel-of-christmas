import React from 'react'
import { range } from 'lodash'
// import * as API from '../../interfaces/api'
import Letter from '../Letter'
import Tile from '../Tile'

import './styles.css'
import { ReactComponent as Logo } from '../../images/logo.svg';

interface Props {
  chars: string[];
  solvedChars: string[];
  revealedIndexes: number[];
  onLetterReveal: (index: number) => void;
}

const PuzzleBoard: React.FC<Props> = ({ chars, solvedChars, revealedIndexes, onLetterReveal }) => {

  return (
    <div className="PuzzleBoard">
      <div className="PuzzleBoard-tiles">
        {range(1,53).map((tileId, index) => {
          const char = chars[index]
          const isSpace = /[\s]/.test(char)

          return (
            <Tile key={index} className={`Tile-${tileId}`}>
              {char && !isSpace ? (
                <Letter
                  char={char}
                  isSolved={solvedChars.includes(char)}
                  isRevealed={revealedIndexes.includes(index)}
                  onReveal={() => onLetterReveal(index)}
                />
              ) : (
                <Logo className="Tile-logo" width="100%" height="100%" />
              )}
            </Tile>
          )
        })}
      </div>
    </div>
  )
}

export default PuzzleBoard
