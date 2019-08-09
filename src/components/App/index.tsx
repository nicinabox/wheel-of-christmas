import React, { useState } from 'react'
import $ from 'styled-components'

import Game from '../Game'
import PuzzleBuilder from '../PuzzleBuilder'

import PUZZLES_FIXTURE from 'puzzles'

interface Props {}

const App: React.FC<Props> = (props) => {
    const [mode, setMode] = useState('play')

    return (
      <AppWrapper>
        {mode === 'play' && (
          <Game puzzles={PUZZLES_FIXTURE} />
        )}

        {mode === 'build' && (
          <PuzzleBuilder />
        )}

        <div>
          {mode === 'build' && <button onClick={() => setMode('play')}>Play</button>}
          {mode === 'play' && <button onClick={() => setMode('build')}>Build</button>}
        </div>
      </AppWrapper>
  )
}

const AppWrapper = $.div``

export default App
