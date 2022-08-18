import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from './reducers'
import logger from 'redux-logger'

const initalState = {}

const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger)
}

export const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

const makeStore = () => store

export const wrapper = createWrapper(makeStore)
