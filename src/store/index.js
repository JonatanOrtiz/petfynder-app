import { combineReducers } from 'redux'
import { createStore } from 'redux'

import petReducer from '../reducers/petReducer'
import appReducer from '../reducers/appReducer'

const reducers = combineReducers({
  petReducer,
  appReducer
})

const store = createStore(reducers);

export default store;
