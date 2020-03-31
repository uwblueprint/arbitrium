import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "../Reducers/index";

//Store is a result from createStore
//Which is a function from the react library
export const history = createBrowserHistory();
//Scroll to top for every route
history.listen(() => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});

//createStore takes in a reducer as the first argument
const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(thunk),
    //https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
    //Install extension to remove "cannot read property apply of undefined"
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : compose
  )
);

//You can also pass in an initial state to createStore if you wanted
//Which is useful for serverside rendering

//IMPORTANT:
//The state in redux comes from reducers; whereas in react they come from components
//Reducers produce the state of your application
export default store;

//What is a reducer?
//A reducer is just a javascript function.
//The reducer takes a current state and an action. (Similar to lifecycle methods)
//For example: should component update is function that takes the next prop and state

/*
The state must return entirely from reducers. Reducers produce states
This state is immutable; you cannot use setState
A reducer knows when to produce the next state by an action that is sent to the Store
Since the state is immutable; the resulting state is a copy of the current state plus the new data
*/

//What is an action?

/*
Each action is a javascript object that has a type and payload (data)
It is best practice to wrap every action within a function called an action creator
*/
