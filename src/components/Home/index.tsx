import React, { useEffect } from 'react'
import $ from 'styled-components'
import { Link } from 'react-router-dom'
import useAPI from 'hooks/useAPI'
import { useDispatch, useSelector } from 'react-redux';
import { receiveGames, receiveGame } from 'store/actions/gamesActions';
import { RootState } from 'store/reducers';

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const games = useSelector((state: RootState) => state.games)
  const { get, post } = useAPI()

  useEffect(() => {
    async function getGames() {
      try {
        const games = await get('/games')
        dispatch(receiveGames(games))
      } catch (e) {
        console.error(e)
      }
    }

    getGames()
  }, [])

  async function handleNewGameClick(e) {
    e.preventDefault()
    try {
      const game = await post('/games')
      dispatch(receiveGame(game))
    } catch (e) {
      console.error(e)
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
              <li>
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
