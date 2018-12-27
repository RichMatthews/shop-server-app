import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter } from "react-router-dom"

import Routes from 'components/routes'
import reducer from 'redux/reducers'
import modalMiddleware from 'redux/middlewares/modal'
import * as serviceWorker from './serviceWorker'

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [thunk, modalMiddleware]

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

class Component extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<Component />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
