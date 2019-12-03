import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../Home'
import Game from '../Game'
import { receiveGames } from 'store/actions/gamesActions';
import { useDispatch } from 'react-redux';
import useAPI from 'hooks/useAPI';
// import PuzzleBuilder from '../PuzzleBuilder'

export default () => {
  const dispatch = useDispatch()
  const { get } = useAPI()

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

  return (

    <Switch>
      <Route path="/" exact component={Home} />
      {/* <Route path="/games/new" exact component={PuzzleBuilder} /> */}
      <Route path="/games/:gameId/round/:roundIndex" exact component={Game} />
    </Switch>
  )
}
