import React from 'react'
import $ from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import store from 'store'

import Routes from '../Routes'
import { Provider } from 'react-redux';

const App: React.FC = () => {
    return (
      <Provider store={store}>
        <AppWrapper>
          <Router>
            <Routes />
          </Router>
        </AppWrapper>
      </Provider>
  )
}

const AppWrapper = $.div``

export default App
