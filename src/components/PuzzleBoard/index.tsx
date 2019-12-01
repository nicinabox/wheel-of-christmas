import React, { useContext } from 'react'
import { range } from 'lodash'
import Letter from '../Letter'
import Tile from '../Tile'
import $ from 'styled-components'
import { GameContext } from 'store/reducers'
import { setRevealedIndexes } from 'store/actions'

import backgroundSvg from 'images/background.svg'

interface Props {
  width?: string;
}

const TILES = range(1, 53)

const PuzzleBoard: React.FC<Props> = ({ width = '90vw' }) => {
  const { state, dispatch } = useContext(GameContext)
  const { puzzle, highlightedChars, revealedIndexes, attemptedLetters } = state

  return (
    <Root width={width}>
      <Bars>
        <Tiles>
          {TILES.map((tileId, index) => {
            const char = puzzle.chars[index]
            const isSpace = /[\s]/.test(char)

            return (
              <Tile key={index} tileId={tileId}>
                {char && !isSpace && (
                  <Letter
                    char={char}
                    isHighlighted={highlightedChars.includes(char)}
                    isRevealed={revealedIndexes.includes(index)}
                    onReveal={() => dispatch(setRevealedIndexes(index))}
                  />
                )}
              </Tile>
            )
          })}
        </Tiles>
      </Bars>

      {attemptedLetters ? (
        <OverlayLetters>
          {attemptedLetters}
        </OverlayLetters>
      ) : null}
    </Root>
  )
}


const Root = $.div<{ width: string }>`
  margin: 4vw auto -3.6vw auto;
  display: flex;
  width: ${({ width }) => width};
  ${({ width }) => {
    const height = `calc(${width} * 0.44566777)`
    if (/%$/.test(width)) {
      return `
        height: 0;
        padding-top: ${height};
      `
    }
    return `height: ${height};`
  }}
  position: relative;
  z-index: 1;
`

const Bars = $.div`
  background-image: url(${backgroundSvg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: flex;
  flex: 1;
  position: absolute;
  top: 0;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const Tiles = $.div`
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 0.14vw;
  width: 90.8%;
  height: 79.6%;
`

const OverlayLetters = $.div`
  position: absolute;
  right: 0;
  top: -2vw;
  padding: 0.2vw;
  padding-left: 2vw;
  color: white;
  border-radius: 1.3vw;
  text-shadow: 0.2vw 0.2vw black;
  font-size: 4vw;
  font-weight: normal;
  letter-spacing: 1.6vw;
  background: black;
`

export default PuzzleBoard
