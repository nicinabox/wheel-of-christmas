import React, { useEffect } from 'react'
import $ from 'styled-components'
import { Link } from 'react-router-dom'
import useAPI from 'hooks/useAPI'
import { useDispatch, useSelector } from 'react-redux';
import { receiveGame, removeGame } from 'store/actions/gamesActions';
import { RootState } from 'store/reducers';

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const games = useSelector((state: RootState) => state.games)
  const { post, destroy } = useAPI()

  async function handleNewGameClick(e) {
    e.preventDefault()
    try {
      const game = await post('/games')
      dispatch(receiveGame(game))
    } catch (e) {
      console.error(e)
    }
  }

  async function handleDelete(gameId) {
    const confirmed = window.confirm(`Delete Game ${gameId}?`)

    if (!confirmed) {
      return
    }

    try {
      await destroy(`/games/${gameId}`)
      dispatch(removeGame(gameId))
    } catch (e) {
      alert('There was a problem deleting game id: ' + gameId)
      console.warn(e)
    }
  }

  function getGamesIds() {
    return Object.keys(games)
      .sort((a, b) => Number(a) - Number(b))
  }

  function hasPuzzles(gameId: string) {
    return games[gameId].puzzles.length > 0
  }

  return (
      <Wrapper>
        <button onClick={handleNewGameClick}>
          New Game
        </button>

        <ul>
          {getGamesIds().map((gameId) => {
            return (
              <li key={gameId}>
                Game {gameId}
                {' '}

                {hasPuzzles(gameId) && (
                  <>
                    <Link to={`/games/${gameId}/round/0`}>
                      Play
                    </Link>
                    {' | '}
                  </>
                )}

                <Link to={`/games/${gameId}/edit`}>
                  Edit
                </Link>
                {' | '}
                <button onClick={() => handleDelete(gameId)}>
                  Delete
                </button>
              </li>
            )
          })}
        </ul>
      </Wrapper>
  )
}

const Wrapper = $.div`
  margin: 0 auto;
  padding: 30px;
  width: 600px;
`

export default Home
