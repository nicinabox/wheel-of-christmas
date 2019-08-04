import React, { useState } from 'react'
import './styles.css'

import PuzzleBoard from '../PuzzleBoard'

interface Props {}

const PuzzleBuilder: React.FC<Props> = (props) => {
    const [puzzle, setPuzzle] = useState('')
    const chars = puzzle.split('')
    const solvedChars = chars.map((c) => c)
    const revealedIndexes = chars.map((c, i) => i)

    return (
      <div className="PuzzleBuilder">
        <PuzzleBoard
          chars={chars}
          solvedChars={solvedChars}
          revealedIndexes={revealedIndexes}
          onLetterReveal={() => {}}
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
