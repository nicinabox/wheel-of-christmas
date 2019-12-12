import React from 'react'
import $ from 'styled-components'
import { Route, Switch, NavLink } from 'react-router-dom'
import { RootState } from 'store/reducers'
import { useSelector, useDispatch } from 'react-redux'
import EditRound from './EditRound'
import { getFormattedCategory } from 'categories'
import EditGame from './EditGame'
import { GameStatus } from 'store/reducers/currentGame'
import { setGameStatus } from 'store/actions/gameActions'

interface EditorProps {
  match: {
    path: string
    url: string
    params: {
      gameId: string
    }
  }
}

export const Editor: React.FC<EditorProps> = ({ match }) => {
  const dispatch = useDispatch()
  const { url, path, params } = match
  const { gameId } = params
  const game = useSelector((state: RootState) => state.games[gameId])

  dispatch(setGameStatus(GameStatus.Active))

  return (
    <Root>
      <Sidebar>
        <Header>
          <Heading3>
            {game.name || `Game ${game.id}`}
          </Heading3>

          <TopNavLink to="/">
            All Games
          </TopNavLink>
        </Header>

        <ActionLink to={`${url}/round/new`}>
          + New Round
        </ActionLink>

        <Divider/>

        <RoundsList>
          {game.puzzles.map((puzzle, i) => (
              <RoundItem key={puzzle.id}>
                <RoundLink to={`${url}/round/${i}`} activeStyle={{background:'#eee'}}>
                  <div>
                    {puzzle.name || puzzle.phrase}
                  </div>
                  <RoundLinkSubtitle>
                    {getFormattedCategory(puzzle.category)}
                  </RoundLinkSubtitle>
                </RoundLink>
            </RoundItem>
          ))}
        </RoundsList>
      </Sidebar>

      <Main>
        <EditGame game={game} />

        <Switch>
          <Route exact path={`${path}/round/new`}>
          <EditRound game={game} />
        </Route>

        <Route exact path={`${path}/round/:roundIndex`}>
          <EditRound game={game} />
        </Route>

        <Route exact path={path}>
          <EmptyState>
            <h3>Please select a puzzle</h3>
          </EmptyState>
        </Route>
      </Switch>
    </Main>
    </Root>
  )
}

const Root = $.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background: #fafafa;
`

const Main = $.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Header = $.header`
  margin: 0 1rem;
  display: flex;
  align-items: center;
  line-height: 1;
`

const Heading3 = $.h3`
`

const Divider = $.hr`
  opacity: 0.5;
`

const TopNavLink = $(NavLink)`
  padding: 0.3rem;
  margin: 0 1rem;
  text-decoration: none;

  &:hover {
    background: #eee;
  }
`

const Sidebar = $.div`
  max-width: 300px;
  background: #fff;
`

const RoundsList = $.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  white-space: no-wrap;
`

const RoundLink = $(NavLink)`
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #111;

  &:hover {
    background: #eee;
  }
`

const ActionLink = $(RoundLink)`
  color: #455bbc;
`

const RoundLinkSubtitle = $.small`
  color: #666;
`

const RoundItem = $.li`
`

const EmptyState = $.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`

export default Editor
