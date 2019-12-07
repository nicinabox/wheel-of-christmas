import React from 'react'
import API from 'interfaces/api'
import { useParams } from 'react-router-dom'

interface EditRoundProps {
  game: API.Game
}

export const EditRound: React.FC<EditRoundProps> = ({ game }) => {
  const { roundIndex } = useParams()

  return (
    <div>
      Edit Round - {game.id} - round {roundIndex}
    </div>
  )
}

export default EditRound
