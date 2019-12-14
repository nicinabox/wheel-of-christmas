import React, { useState } from 'react'
import $ from 'styled-components'
import { Label, TextInput } from 'styled/forms'
import API from 'interfaces/api'
import { useDispatch } from 'react-redux'
import { updateGame, deleteGame } from 'wheelAPI'
import { receiveGame, removeGame } from 'store/actions/gamesActions'
import { DestructiveButton, Button } from 'styled/buttons'
import { useHistory } from 'react-router-dom'

interface EditGameProps {
  game: API.Game
}

export const EditGame: React.FC<EditGameProps> = ({ game }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [formValues, setFormValues] = useState({ name: game.name || '' })

  function handleChange({ target }) {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { data } = await updateGame(game.id, formValues)
    dispatch(receiveGame(data))
  }

  async function handleDelete() {
    const confirmed = window.confirm(`Delete ${game.name}?`)

    if (!confirmed) {
      return
    }

    try {
      await deleteGame(game.id)
      history.replace('/')
      dispatch(removeGame(game.id))
    } catch (e) {
      alert('There was a problem deleting game id: ' + game.name)
      console.warn(e)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        <TextInput type="text" name="name" value={formValues.name} onChange={handleChange}
          placeholder="Game name"
        />
      </Label>

      <Button type="submit">
        Save
      </Button>

      <DestructiveButton onClick={handleDelete}>
        Delete Game
      </DestructiveButton>
    </Form>
  )
}

const Form = $.form`
  padding: 1rem;
  display: flex;
  flex-direction: row;
`

export default EditGame
