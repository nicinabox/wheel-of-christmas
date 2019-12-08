import React, { useEffect, useState } from 'react'
import $ from 'styled-components'
import API from 'interfaces/api'
import { useParams, useHistory } from 'react-router-dom'
import PuzzleBoard from 'components/PuzzleBoard'
import Category from 'components/Category'
import { setRevealedIndexes, setCurrentRound } from 'store/actions/roundActions'
import { useDispatch } from 'react-redux'
import FormFields, { FormValues } from '../FormFields'
import { createGameRound, updateGameRound } from 'wheelAPI'
import { receiveGamePuzzles } from 'store/actions/gamesActions'

interface EditRoundProps {
  game: API.Game
}

const initialFormValues = {
  name: '',
  phrase: '',
  category: '',
  bonus_round: false,
}

export const EditRound: React.FC<EditRoundProps> = ({ game }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { roundIndex } = useParams()

  const [formValues, setFormValues] = useState<FormValues>({
    ...initialFormValues,
    ...(roundIndex ? game.puzzles[roundIndex] : {}),
  })

  useEffect(() => {
    if (roundIndex) {
      setFormValues(game.puzzles[roundIndex])
    } else {
      setFormValues(initialFormValues)
    }
  }, [roundIndex])

  useEffect(() => {
    const phraseChars = formValues.phrase.split('')
    const revealedIndexes = phraseChars.map((_, i) => i)

    dispatch(setCurrentRound(formValues))
    dispatch(setRevealedIndexes(revealedIndexes))
  }, [formValues])

  async function createNewRound() {
    const { data } = await createGameRound(game.id, formValues)
    const nextPuzzles = game.puzzles.concat(data)
    dispatch(receiveGamePuzzles(game.id, nextPuzzles))

    const lastIndex = nextPuzzles.length - 1
    history.replace(`/edit/${game.id}/round/${lastIndex}`)
  }

  async function updateRound() {
    const { data } = await updateGameRound(game.id, formValues.id!, formValues)
    const nextPuzzles = game.puzzles.map((puzzle) => {
      if (puzzle.id === data.id) {
        return data
      }
      return puzzle
    })

    dispatch(receiveGamePuzzles(game.id, nextPuzzles))
  }

  async function handleSubmit() {
    if (roundIndex) {
      return await updateRound()
    }

    await createNewRound()
  }

  function handleChange(name: string, value: any) {
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  return (
    <Root>
      <PuzzleBoard width="100%" />

      <PuzzleBoardFooter>
        <Category category={formValues.category} />
      </PuzzleBoardFooter>

      <FormFields
        values={formValues}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Root>
  )
}

const Root = $.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 1rem;
`

const PuzzleBoardFooter = $.div`
  padding-top: 2.7vw;
  margin-bottom: 2.7vw;
  width: 100%;
`

export default EditRound
