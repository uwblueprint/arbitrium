import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import customReducerExample from "./customReducerExample";

function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    customReducerExample
  });
}

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
