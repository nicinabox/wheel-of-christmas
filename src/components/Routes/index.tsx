import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../Home'
import Game from '../Game'
// import PuzzleBuilder from '../PuzzleBuilder'

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    {/* <Route path="/games/new" exact component={PuzzleBuilder} /> */}
    <Route path="/games/:gameId/round/:roundIndex" exact component={Game} />
  </Switch>
)
