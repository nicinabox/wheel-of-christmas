import React, { useState } from 'react'
import './styles.css'

import Game from '../Game'
import PuzzleBuilder from '../PuzzleBuilder'

import PUZZLES_FIXTURE from 'puzzles'

interface Props {}

const App: React.FC<Props> = (props) => {
    const [mode, setMode] = useState('play')

    return (
      <div className="App">
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

      </div>
  )
}

export default App
