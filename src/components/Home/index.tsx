import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { receiveGame } from 'store/actions/gamesActions';
import { RootState } from 'store/reducers';
import $ from 'styled-components';
import { Button, SecondaryButton } from 'styled/buttons';
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
        <Header>
          <h1>
            <span role="img" aria-label="tree">🎄</span>
            Wheel of Christmas
          </h1>

          <Button onClick={handleNewGameClick}>
            New Game
          </Button>
        </Header>

        <OrderedList>
          {getGamesIds().map((gameId) => {
            return (
              <ListItem key={gameId}>
                {games[gameId].name}

                <Actions>
                  {hasPuzzles(gameId) && (
                    <Button as={Link} to={`/play/${gameId}/round/0`}>
                      Play
                    </Button>
                  )}
                  <SecondaryButton as={Link} to={`/edit/${gameId}`}>
                    Edit
                  </SecondaryButton>
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

const Header = $.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
