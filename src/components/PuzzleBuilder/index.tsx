import React, { useState } from 'react'
import './styles.css'

import LetterBoard from '../LetterBoard'

interface Props {}

const PuzzleBuilder: React.FC<Props> = (props) => {
    const [puzzle, setPuzzle] = useState('')
    const chars = puzzle.split('')
    const activeChars = chars.map((c) => c)
    const solvedIndexes = chars.map((c, i) => i)

    return (
      <div className="PuzzleBuilder">
        <LetterBoard
          chars={chars}
          activeChars={activeChars}
          solvedIndexes={solvedIndexes}
          onLetterClick={() => {}}
        />

        <input
          onChange={(e) => setPuzzle(e.target.value.toUpperCase())}
          value={puzzle}
          autoFocus
        />
      </div>
  )
}

export default PuzzleBuilder
