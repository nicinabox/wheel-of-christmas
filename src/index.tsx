import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './fonts/avenir-next.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

const rootEl = document.getElementById('root')

ReactDOM.render(<App />, rootEl)

// @ts-ignore
if (module.hot) {
// @ts-ignore
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    ReactDOM.render(<NextApp />, rootEl)
  })
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
