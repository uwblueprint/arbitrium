// src/js/actions/index.js

import { LOAD_APPLICATIONS } from "../Constants/ActionTypes";

//Recall from store/index.js that an action is a javascript object
//That has a type and a payload (data)

//The reducer will use that string to determine how to calculate the next state
//To avoid errors; declare the action types as constants :)

export function loadApplications(payload) {
  return { type: LOAD_APPLICATIONS, payload };
}
