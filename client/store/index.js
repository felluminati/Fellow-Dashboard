import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import reactos from './reacto'
import calendar from './calendar'
import cohort from './cohort'

const reducer = combineReducers({user, reactos, calendar, cohort})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './reacto'
export * from './calendar'
export * from './cohort'
