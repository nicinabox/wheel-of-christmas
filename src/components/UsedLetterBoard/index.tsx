import React from 'react'
// import cx from 'classnames'
import * as API from 'types'
import { VOWELS } from 'utils'

import './styles.css'

interface Props {
  usedChars: API.Char[];
  onLetterClick: (char: string) => void;
  className?: string;
}

const generateAlphas = () => {
  const start = 'A'.charCodeAt(0)
  return new Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(start + i))
}

const UsedLetterBoard: React.FC<Props> = ({ onLetterClick, usedChars, className = 'UsedLetterBoard' }) => {
  const chars = generateAlphas()

  return (
    <div className={className}>
      <div className={`${className}-background`}>
        {chars.map((char) => (
          <button
            key={char}
            disabled={usedChars.includes(char)}
            className={VOWELS.includes(char) ? `${className}--vowel` : undefined}
            onClick={() => onLetterClick(char)}>
            {char}
          </button>
        ))}
      </div>
    </div>
  )
}

export default UsedLetterBoard
