import React, { useEffect, useReducer } from 'react'
import $ from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import useAPI from 'hooks/useAPI'
import { gamesReducer, initialGamesState, receiveGames, receiveGame } from 'store/games'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const history = useHistory()
  const [state, dispatch] = useReducer(gamesReducer, initialGamesState)
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
    return Object.keys(state)
      .sort((a, b) => Number(a) - Number(b))
  }

  return (
      <Wrapper>
        <button onClick={handleNewGameClick}>
          New Game
        </button>

        <ul>
          {getGamesIds().map((id) => {
            return (
              <li>
                <Link to={`/games/${id}`}>Game {id}</Link> <small>(<Link to={`/games/${id}/edit`}>edit</Link>)</small>
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
