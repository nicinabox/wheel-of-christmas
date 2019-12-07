import React from 'react'
import $ from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { receiveGame, removeGame } from 'store/actions/gamesActions';
import { RootState } from 'store/reducers';
import { createGame, deleteGame } from 'wheelAPI';

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const games = useSelector((state: RootState) => state.games)


  async function handleNewGameClick(e) {
    e.preventDefault()
    try {
      const { data } = await createGame()
      dispatch(receiveGame(data))
    } catch (e) {
      console.error(e)
    }
  }

  async function handleDelete(gameId: number) {
    const confirmed = window.confirm(`Delete Game ${gameId}?`)

    if (!confirmed) {
      return
    }

    try {
      await deleteGame(gameId)
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
                    <Link to={`/play/${gameId}/round/0`}>
                      Play
                    </Link>
                    {' | '}
                  </>
                )}

                <Link to={`/edit/${gameId}`}>
                  Edit
                </Link>
                {' | '}
                <button onClick={() => handleDelete(Number(gameId))}>
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
