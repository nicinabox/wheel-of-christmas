import React, { useState } from 'react'
import $ from 'styled-components'

import PuzzleBoard from '../PuzzleBoard'

interface Props {}

const PuzzleBuilder: React.FC<Props> = (props) => {
    const [puzzle, setPuzzle] = useState('')
    const chars = puzzle.split('')
    const highlightedChars = chars.map((c) => c)
    const revealedIndexes = chars.map((c, i) => i)

    return (
      <Root>
        <PuzzleBoard />

        <Input
          onChange={(e) => setPuzzle(e.target.value.toUpperCase())}
          value={puzzle}
          autoFocus
        />
      </Root>
  )
}

const Root = $.div`
  display: flex;
  flex-direction: column;
`

const Input = $.input`
  font-family: monospace;
  font-size: 2rem;
  padding: 1rem;
`

export default PuzzleBuilder
