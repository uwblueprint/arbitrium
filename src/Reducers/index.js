import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import customReducerExample from "./customReducerExample";

function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    customReducerExample
  });
}


/*
  if (action.type === ADD_ARTICLE) {
    state.articles.push(action.payload);
  }
*/

  //Why do we use this code instead of the code above?
  //Because array.prototype.push is an impure function
  //i.e it breaks immutability
  //Recall: A pure function is one that returns the exact same output for the given input
  // if (action.type === ADD_ARTICLE) {
  //   return Object.assign({}, state, {
  //     articles: state.articles.concat(action.payload)
  //   });
  // }

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
