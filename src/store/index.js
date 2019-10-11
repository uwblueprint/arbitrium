import { createStore } from "redux";
import rootReducer from "../reducers/index";

//Store is a result from createStore
//Which is a function from the react library

//createStore takes in a reducer as the first argument
const store = createStore(rootReducer);

//You can also pass in an initial state to createStore if you wanted
//Which is useful for serverside rendering

//IMPORTANT:
//The state in redux fromes from reduces; whereas in react they come from components
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
