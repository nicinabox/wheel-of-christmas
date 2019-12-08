import React from 'react'
import $ from 'styled-components'
import { Route, Switch, Link } from 'react-router-dom'
import { RootState } from 'store/reducers'
import { useSelector } from 'react-redux'
import EditRound from './EditRound'
import { getFormattedCategory } from 'categories'

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
  const { url, path, params } = match
  const { gameId } = params
  const game = useSelector((state: RootState) => state.games[gameId])

  return (
    <Root>
      <Sidebar>
        <Header>
          <Heading3>
            Game {gameId}
          </Heading3>

          <NavLink to="/">
            All Games
          </NavLink>
        </Header>

        <ActionLink to={`${url}/round/new`}>
          + New Round
        </ActionLink>

        <Divider/>

        <RoundsList>
          {game.puzzles.map((puzzle, i) => (
              <RoundItem key={puzzle.id}>
                <RoundLink to={`${url}/round/${i}`}>
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
    </Root>
  )
}

const Root = $.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background: #fafafa;

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

const NavLink = $(Link)`
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

const RoundLink = $(Link)`
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
