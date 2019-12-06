import React, { useEffect, useState, useReducer } from 'react'
import $ from 'styled-components'
import Sound from 'react-sound'

import * as Sounds from 'sounds'
import ControlBoard from '../ControlBoard'
import Snow from '../Snow'
import PuzzleBoard from '../PuzzleBoard'
import Category from '../Category'
import UsedLetterBoard from '../UsedLetterBoard'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { setCurrentRound } from 'store/actions/roundActions';
import { setGameState } from 'store/actions/gameActions';
import { setCurrentSound } from 'store/actions/soundsActions';

interface GameProps {
  match: {
    params: {
      gameId: string
      roundIndex: string
    }
  }
}

const Game: React.FC<GameProps> = ({ match }) => {
  const { gameId, roundIndex } = match.params
  const dispatch = useDispatch()

  const game = useSelector((state: RootState) => state.games[gameId])
  const { category } = useSelector((state: RootState) => state.currentRound)
  const currentSound = useSelector((state: RootState) => state.currentSound)

  useEffect(() => {
    dispatch(setGameState(Number(gameId), Number(roundIndex)))
  }, [gameId, roundIndex])

  useEffect(() => {
    if (!game) return

    dispatch(setCurrentRound(game.puzzles[roundIndex]))
    dispatch(setCurrentSound(Sounds.PUZZLE_REVEAL))
  }, [game, roundIndex])

  if (!game) {
    return null
  }

  return (
    <Root>
      <Snow />

      <PuzzleBoard />

      <PuzzleBoardFooter>
        <Category category={category} />
        <UsedLetterBoard />
      </PuzzleBoardFooter>

      <ControlBoard puzzlesCount={game.puzzles.length} />

      {currentSound.sound && (
        <Sound
          url={require(`sounds/${currentSound.sound}`)}
          playStatus={currentSound.status}
          volume={currentSound.volume}
          onFinishedPlaying={() => dispatch(setCurrentSound(''))}
        />
      )}
    </Root>
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
