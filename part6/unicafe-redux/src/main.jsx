import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const launchDispach = (t) => () => {
    const rating = {good: 'GOOD', ok:'OK', bad:'BAD', zero:'ZERO'}
    store.dispatch({
      type: rating[t]
    })
  }

  return (
    <div>
      <button onClick={ launchDispach('good')}>good</button> 
      <button onClick={ launchDispach('ok')}>ok</button> 
      <button onClick={ launchDispach('bad')}>bad</button>
      <button onClick={ launchDispach('zero')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok }</div>
      <div>bad {store.getState().bad }</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
