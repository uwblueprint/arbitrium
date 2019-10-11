// src/js/actions/index.js

import { ADD_ARTICLE } from "../constants/action-types";

//Recall from store/index.js that an action is a javascript object
//That has a type and a payload (data)
export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
};

//The reducer will use that string to determine how to calculate the next state
//To avoid errors; declare the action types as constants :)
