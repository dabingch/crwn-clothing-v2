import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

// Configure middleware
const middleWares = [logger]
const composedEnhancers = compose(applyMiddleware(...middleWares))

// root-reducer
export const store = createStore(rootReducer, undefined, middleWares)
