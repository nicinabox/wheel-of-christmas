import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import store from 'store'

import Routes from '../Routes'
import { Provider } from 'react-redux';

const App: React.FC = () => {
    return (
      <Provider store={store}>
        <GlobalStyle />

        <Router>
          <Routes />
        </Router>
      </Provider>
  )
}

const GlobalStyle = createGlobalStyle`
html {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}

    *,
    *::before,
    *::after {
        -webkit-box-sizing: inherit;
           -moz-box-sizing: inherit;
                box-sizing: inherit;
    }
`

export default App
