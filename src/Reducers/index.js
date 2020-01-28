import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import customReducerExample from "./customReducerExample";
import {
  LOAD_REVIEWS,
  LOAD_STACKED_RANKINGS,
  LOAD_APPLICATIONS,
  SWITCH_VIEW
} from "../Constants/ActionTypes";

const initialState = {
  articles: [],
  applications: [],
  reviews: [],
  stackedRankings: []
};

//Reducers take 2 params, a state and an action
//Notice how the initial state is passed as a default parameter
function applications(state = initialState, action) {
  //console.log("Called app reducer");
  switch (action.type) {
    case LOAD_APPLICATIONS:
      return { ...state, applications: action.payload || [] };
    case LOAD_REVIEWS:
      return { ...state, reviews: action.payload };
    case LOAD_STACKED_RANKINGS:
      return { ...state, stackedRankings: action.payload || [] };
    default:
      return state;
  }
}

function navigation(state = initialState, action) {
  //console.log("Called navigationReducer");
  switch (action.type) {
    case SWITCH_VIEW:
      return {
        ...state,
        view: action.payload
      };
    default:
      return state;
  }
}

function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    navigation,
    applications
  });
}

//This returns the initial state
// return state;

//Remember: reducers produce the state of the application
export default createRootReducer;

//Extra notes
/*
We want to avoid mutating state in redux
The best way to do this is to use concat(), slice(), etc... for arrays and
object.assign(), etc... for objects

Notice how we are using an if statement (we could also use a switch)
When our app becomes big we will want to split up our reducer and combine them
using combineReducers
*/
