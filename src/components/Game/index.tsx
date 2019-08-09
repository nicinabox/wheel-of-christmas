import React, { useState, useReducer } from 'react'
import $ from 'styled-components'
import ReactSound from 'react-sound'

import * as Sounds from 'sounds'
import * as API from 'types'
import { getPuzzle } from 'utils'
import ControlBoard from '../ControlBoard'
import Snow from '../Snow'
import PuzzleBoard from '../PuzzleBoard'
import Category from '../Category'
import UsedLetterBoard from '../UsedLetterBoard'

import gameReducer, { GameContext, initialGameState } from 'store/reducers'

interface Props {
  puzzles: API.Puzzle[]
}

// @ts-ignore
const { PLAYING } = ReactSound.status

const Game: React.FC<Props> = ({ puzzles }) => {
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialGameState,
    puzzles,
  })

  const [currentSound, setCurrentSound] = useState(Sounds.PUZZLE_REVEAL)
  const puzzle = getPuzzle(state)

  return (
    <GameContext.Provider value={{
      state: { ...state, puzzle },
      dispatch,
      setCurrentSound
    }}>
      <Root>
        <Snow />

        <PuzzleBoard />

        <PuzzleBoardFooter>
          <Category category={puzzle.category} />
          <UsedLetterBoard />
        </PuzzleBoardFooter>

        <ControlBoard />

        {currentSound && (
          <ReactSound
            url={require(`sounds/${currentSound}`)}
            playStatus={PLAYING}
            onFinishedPlaying={() => setCurrentSound('')}
          />
        )}
      </Root>
    </GameContext.Provider>
  )
}

const Root = $.div`
  background: linear-gradient(#5C79FE, #2E3D7F);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const PuzzleBoardFooter = $.div`
  background: rgb(255,255,255);
  background: linear-gradient(180deg,
    rgba(255,255,255,1) 0%,
    rgba(252,252,253,1) 24%,
    rgba(242,244,245,1) 43%,
    rgba(225,230,232,1) 61%,
    rgba(202,211,216,1) 77%,
    rgba(169,183,191,1) 95%);
  padding-top: 2.6vw;
  width: 100%;
  flex: 1;
`

export default Game
