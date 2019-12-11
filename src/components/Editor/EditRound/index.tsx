import React, { useEffect, useState } from 'react'
import $ from 'styled-components'
import API from 'interfaces/api'
import { useParams, useHistory } from 'react-router-dom'
import PuzzleBoard from 'components/PuzzleBoard'
import Category from 'components/Category'
import { setPuzzleSolved, setCurrentRound } from 'store/actions/roundActions'
import { useDispatch } from 'react-redux'
import FormFields, { FormValues } from '../FormFields'
import { createGameRound, updateGameRound, deleteGameRound } from 'wheelAPI'
import { receiveGamePuzzles } from 'store/actions/gamesActions'
import { GameStatus } from 'store/reducers/currentGame'
import { setGameStatus } from 'store/actions/gameActions'

interface EditRoundProps {
  game: API.Game
}

const initialFormValues = {
  name: '',
  phrase: '',
  category: '',
  position: 0,
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
      dispatch(setGameStatus(GameStatus.Active))
    } else {
      setFormValues(initialFormValues)
    }
  }, [game.puzzles, roundIndex])

  useEffect(() => {
    dispatch(setCurrentRound(formValues, 0))
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

  async function handleDelete() {
    await deleteGameRound(game.id, formValues.id!)

    const nextPuzzles = game.puzzles.reduce((acc: API.Puzzle[], puzzle) => {
      if (puzzle.id === formValues.id) {
        return acc
      }
      return acc.concat(puzzle)
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
        onDelete={formValues.id ? handleDelete : undefined}
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
