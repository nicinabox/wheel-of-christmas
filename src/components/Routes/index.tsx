import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { receiveGames } from 'store/actions/gamesActions'
import Game from '../Game'
import Home from '../Home'
import Editor from '../Editor'
import { fetchGames } from 'wheelAPI'

export default () => {
  const dispatch = useDispatch()
  const [didLoad, setDidLoad] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const { data } = await fetchGames()
      dispatch(receiveGames(data))
      setDidLoad(true)
    }

    fetchData()
  }, [dispatch])

  if (!didLoad) {
    return null
  }

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/edit/:gameId" component={Editor} />
      <Route path="/play/:gameId/round/:roundIndex" exact component={Game} />
    </Switch>
  )
}
