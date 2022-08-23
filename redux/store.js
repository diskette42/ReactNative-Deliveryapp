import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const initStore = () => {
  let store

  store = createStore(rootReducer, applyMiddleware(thunk))
  return store
}

export default initStore
