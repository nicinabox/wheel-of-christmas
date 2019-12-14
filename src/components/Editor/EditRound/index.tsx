import React, { useEffect, useState } from 'react'
import $ from 'styled-components'
import API from 'interfaces/api'
import { useParams, useHistory } from 'react-router-dom'
import PuzzleBoard from 'components/PuzzleBoard'
import Category from 'components/Category'
import { setPuzzleSolved, setCurrentRound } from 'store/actions/roundActions'
import { useDispatch } from 'react-redux'
import FormFields, { FormValues } from '../FormFields'
import { createGameRound, updateGameRound, deleteGameRound, getGamePuzzles } from 'wheelAPI'
import { receiveGamePuzzles } from 'store/actions/gamesActions'

interface EditRoundProps {
  game: API.Game
}

const initialFormValues = {
  name: '',
  phrase: '',
  category: '',
  round_type: undefined,
  toss_up_reveal_order: [],
  position: 1,
}

const toFormValues = (resource, initialValues) => {
  return Object.keys(initialValues).reduce((acc, key) => {
    return { ...acc, [key]: resource[key] || initialValues[key] }
  }, initialValues)
}

export const EditRound: React.FC<EditRoundProps> = ({ game }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { roundIndex } = useParams()
  const puzzle = roundIndex ? game.puzzles[roundIndex] : {}

  const [formValues, setFormValues] = useState<FormValues>(
    toFormValues(puzzle, initialFormValues)
  )

  useEffect(() => {
    if (roundIndex) {
      setFormValues(toFormValues(puzzle, game.puzzles[roundIndex]))
    } else {
      setFormValues(initialFormValues)
    }
  }, [game.puzzles, roundIndex, puzzle])

  useEffect(() => {
    dispatch(setCurrentRound(formValues as API.Puzzle, 0))
    dispatch(setPuzzleSolved())
  }, [dispatch, formValues])

  async function createNewRound() {
    const { data } = await createGameRound(game.id, formValues)
    const nextPuzzles = game.puzzles.concat(data)
    dispatch(receiveGamePuzzles(game.id, nextPuzzles))

    const lastIndex = nextPuzzles.length - 1
    history.replace(`/edit/${game.id}/round/${lastIndex}`)
  }

  async function updateRound() {
    await updateGameRound(game.id, puzzle.id, formValues)
    const { data } = await getGamePuzzles(game.id)
    dispatch(receiveGamePuzzles(game.id, data))
    history.replace(`/edit/${game.id}/round/${formValues.position - 1}`)
  }

  async function handleSubmit() {
    if (roundIndex) {
      return await updateRound()
    }

    await createNewRound()
  }

  async function handleDelete() {
    await deleteGameRound(game.id, puzzle.id)

    const nextPuzzles = game.puzzles.reduce((acc: API.Puzzle[], p) => {
      if (p.id === puzzle.id) {
        return acc
      }
      return acc.concat(p)
    }, [])

    dispatch(receiveGamePuzzles(game.id, nextPuzzles))
    history.replace(`/edit/${game.id}`)
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
        onDelete={puzzle.id ? handleDelete : undefined}
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
