import React, { useEffect } from 'react'
import $ from 'styled-components'
import API from 'interfaces/api'
import { useParams } from 'react-router-dom'
import PuzzleBoard from 'components/PuzzleBoard'
import Category from 'components/Category'
import { setRevealedIndexes, setCurrentRound } from 'store/actions/roundActions'
import { useDispatch } from 'react-redux'

interface EditRoundProps {
  game: API.Game
}

export const EditRound: React.FC<EditRoundProps> = ({ game }) => {
  const dispatch = useDispatch()
  const { roundIndex } = useParams()
  const puzzle = game.puzzles[roundIndex!]
  const { category } = puzzle

  useEffect(() => {
    const phraseChars = puzzle.phrase.split('')
    const revealedIndexes = phraseChars.map((_, i) => i)

    dispatch(setCurrentRound(puzzle))
    dispatch(setRevealedIndexes(revealedIndexes))

  }, [puzzle])

  return (
    <Root>
      <PuzzleBoard width="100%" />

      <PuzzleBoardFooter>
        <Category category={category} />
      </PuzzleBoardFooter>
    </Root>
  )
}

const Root = $.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 1rem;
  height: 100vh;
`

const PuzzleBoardFooter = $.div`
  padding-top: 2.6vw;
  width: 100%;
  flex: 1;
`

export default EditRound
