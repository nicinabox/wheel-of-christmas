import React from 'react'
import { range } from 'lodash'
import * as API from 'types'
import Letter from '../Letter'
import Tile from '../Tile'
import $ from 'styled-components'
interface Props {
  chars: API.Char[];
  highlightedChars: API.Char[];
  revealedIndexes: API.Index[];
  attemptedLetters?: API.Char;
  onLetterReveal: (index: number) => void;
}

const PuzzleBoard: React.FC<Props> = ({ chars, highlightedChars, revealedIndexes, attemptedLetters, onLetterReveal }) => {

  return (
    <Root>
      <Bars>
        <Tiles>
          {range(1,53).map((tileId, index) => {
            const char = chars[index]
            const isSpace = /[\s]/.test(char)

            return (
              <Tile key={index} tileId={tileId}>
                {char && !isSpace && (
                  <Letter
                    char={char}
                    isHighlighted={highlightedChars.includes(char)}
                    isRevealed={revealedIndexes.includes(index)}
                    onReveal={() => onLetterReveal(index)}
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

const Root = $.div`
  margin: 4vw auto -3.6vw auto;
  display: flex;
  width: 90vw;
  height: calc(90vw * 0.44566777);
  position: relative;
  z-index: 1;
`

const Bars = $.div`
  padding: 4.1vw;
  background-image: url(${require('images/background.svg')});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: flex;
`

const Tiles = $.div`
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 0.14vw;
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
