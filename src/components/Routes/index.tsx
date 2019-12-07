import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { receiveGames } from 'store/actions/gamesActions'
import Game from '../Game'
import Home from '../Home'
import PuzzleBuilder from '../PuzzleBuilder'
import { fetchGames } from 'wheelAPI'

export default () => {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      const { data } = await fetchGames()
      dispatch(receiveGames(data))
    }

    fetchData()
  }, [dispatch])

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/games/:gameId/edit" exact component={PuzzleBuilder} />
      <Route path="/games/:gameId/round/:roundIndex" exact component={Game} />
    </Switch>
  )
}
