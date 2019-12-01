import React from 'react'
import $ from 'styled-components'
import { Link } from 'react-router-dom';
import * as API from 'types'

interface Props {
}

const Home: React.FC<Props> = ({ }) => {

  return (
      <Wrapper>
        <Link to="/games/new">New Game</Link>
        <Link to="/games/1">Game 1</Link>
      </Wrapper>
  )
}

const Wrapper = $.div`
  width: 100%;
  height: 100%;
`

export default Home
