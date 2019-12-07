import React, { useEffect, useState } from 'react'
import $ from 'styled-components'
import API from 'interfaces/api'
import PuzzleBoard from 'components/PuzzleBoard'
import Category from 'components/Category'
import { setCurrentRound, setRevealedIndexes } from 'store/actions/roundActions'
import { useDispatch } from 'react-redux'
import FormFields, { FormValues } from '../FormFields'
import { createGameRound } from 'wheelAPI'
import { useHistory } from 'react-router-dom'
import { receiveGamePuzzles } from 'store/actions/gamesActions'

interface NewRoundProps {
  game: API.Game
}

export const NewRound: React.FC<NewRoundProps> = ({ game }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    phrase: '',
    category: '',
    bonus_round: false
  })

  useEffect(() => {
    const phraseChars = formValues.phrase.split('')
    const revealedIndexes = phraseChars.map((_, i) => i)

    dispatch(setCurrentRound({
      id: 0,
      ...formValues,
    }))
    dispatch(setRevealedIndexes(revealedIndexes))
  }, [formValues])

  async function handleSubmit() {
    const { data } = await createGameRound(game.id, formValues)
    const nextPuzzles = game.puzzles.concat(data)
    dispatch(receiveGamePuzzles(game.id, nextPuzzles))

    const lastIndex = nextPuzzles.length - 1
    history.replace(`/edit/${game.id}/round/${lastIndex}`)
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

export default NewRound
