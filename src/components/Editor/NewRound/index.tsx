import React from 'react'
import API from 'interfaces/api'

interface NewRoundProps {
  game: API.Game
}

export const NewRound: React.FC<NewRoundProps> = ({ game }) => {
  return (
    <div>
      New Round - {game.id}
    </div>
  )
}

export default NewRound
