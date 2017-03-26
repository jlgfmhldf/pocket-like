import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

const logger = createLogger()

export default createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
)

