// src/js/reducers/index.js

import { combineReducers } from 'redux'
import applicationReducer from './application'
import overallReducer from "./overall"

export default combineReducers({
  applicationReducer,
  overallReducer
})