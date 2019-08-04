import React from 'react'
// import cx from 'classnames'
// import * as API from '../../interfaces/api'

import './styles.css'

interface Props {
  usedChars: string[];
  onLetterClick: (char: string) => void;
}

const generateAlphas = () => {
  const start = 'A'.charCodeAt(0)
  return new Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(start + i))
}

const PuzzleKey: React.FC<Props> = ({ onLetterClick, usedChars }) => {
  const chars = generateAlphas()

  return (
    <div className="PuzzleKey">
      {chars.map((char) => (
        <button
          key={char}
          disabled={usedChars.includes(char)}
          onClick={() => onLetterClick(char)}>
          {char}
        </button>
      ))}
    </div>
  )
}

export default PuzzleKey
