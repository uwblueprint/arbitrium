import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import navigationReducer from "./navigation";

function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    navigation: navigationReducer
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
