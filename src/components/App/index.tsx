import React from 'react'
import $ from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from '../Routes'

interface Props {}

const App: React.FC<Props> = (props) => {
    return (
      <AppWrapper>
        <Router>
          <Routes />
        </Router>
      </AppWrapper>
  )
}

const AppWrapper = $.div``

export default App
