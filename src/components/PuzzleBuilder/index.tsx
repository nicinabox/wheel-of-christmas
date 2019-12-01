import React, { useState } from 'react'
import $ from 'styled-components'

import PuzzleBoard from '../PuzzleBoard'
import Category from '../Category'

import { GameContext, initialGameState } from 'store/reducers'

import CATEGORIES from 'categories'

interface Props {}

const PuzzleBuilder: React.FC<Props> = (props) => {
    const [phrase, setPhrase] = useState('')
    const [category, setCategory] = useState('')
    const chars = phrase.split('')
    const highlightedChars = chars.map((c) => c)
    const revealedIndexes = chars.map((c, i) => i)

    const puzzle = {
      text: phrase,
      category,
      chars,
    }

    const state = {
      highlightedChars,
      revealedIndexes,
    }

    return (
      <GameContext.Provider value={{
        state: { ...state, puzzle },
        dispatch: () => {},
        setCurrentSound: () => {}
      }}>
        <Root>
          <RoundsList>
            <RoundsListItem>
              Round 1
            </RoundsListItem>
          </RoundsList>

          <PuzzleEditor>
            <PuzzleBoard width="100%" />

            <PuzzleBoardFooter>
              <Category category={category} />
            </PuzzleBoardFooter>

            <Input
              name="phrase"
              onChange={(e) => setPhrase(e.target.value.toUpperCase())}
              value={phrase}
              placeholder="Enter a word or phrase"
              autoFocus
            />

            <Select
              name="category"
              onChange={(e) => setCategory(e.target.value.toUpperCase())}
              value={category}>
              <Option value="">Select Category...</Option>
              {CATEGORIES.map((text: string) => (
                <Option value={text}>{text}</Option>
              ))}
            </Select>
          </PuzzleEditor>
        </Root>
      </GameContext.Provider>
  )
}

const Root = $.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`

const RoundsList = $.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  flex: 1;
  background: #eee;
  white-space: no-wrap;
`

const RoundsListItem = $.li`
  padding: 0.5rem 1rem;
`

const PuzzleEditor = $.div`
  background: linear-gradient(#5C79FE, #2E3D7F);
  flex: 4;
  padding: 2rem;
`

const PuzzleBoardFooter = $.div`
  padding-top: 2.6vw;
  width: 100%;
  flex: 1;
`

const Input = $.input`
  font-family: monospace;
  font-size: 1rem;
  padding: 1rem;
`

const Select = $.select`
  font-size: 1rem;
  padding: 1rem;
`

const Option = $.option`
`

export default PuzzleBuilder
