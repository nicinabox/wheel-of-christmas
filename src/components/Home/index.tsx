import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { receiveGame } from 'store/actions/gamesActions';
import { RootState } from 'store/reducers';
import $ from 'styled-components';
import { Button } from 'styled/buttons';
import { createGame } from 'wheelAPI';

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

  function getGamesIds() {
    return Object.keys(games)
      .sort((a, b) => Number(a) - Number(b))
  }

  function hasPuzzles(gameId: string) {
    return games[gameId].puzzles.length > 0
  }

  return (
      <Wrapper>
        <Button onClick={handleNewGameClick}>
          New Game
        </Button>

        <OrderedList>
          {getGamesIds().map((gameId) => {
            return (
              <ListItem key={gameId}>
                {games[gameId].name}

                <Actions>
                    {hasPuzzles(gameId) && (
                      <React.Fragment>
                        <Link to={`/play/${gameId}/round/0`}>
                        Play
                      </Link>
                      {' | '}
                    </React.Fragment>
                    )}

                    <Link to={`/edit/${gameId}`}>
                      Edit
                    </Link>
                </Actions>
              </ListItem>
            )
          })}
        </OrderedList>
      </Wrapper>
  )
}

const Wrapper = $.div`
  margin: 0 auto;
  padding: 30px;
  width: 600px;
`

const OrderedList = $.ol`
  padding: 0;
  margin: 0;
  margin-top: 1rem;
  list-style: none;
`

const ListItem = $.li`
  padding: 0.8rem 0;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Actions = $.div`
`

export default Home
