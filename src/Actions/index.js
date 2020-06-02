// src/js/actions/index.js

import * as ACTIONS from "../Constants/ActionTypes";

//Recall from store/index.js that an action is a javascript object
//That has a type and a payload (data)

export function initialAppLoad(applications, reviewCount) {
  return {
    type: ACTIONS.INITIAL_APP_LOAD,
    applications,
    reviewCount
  };
}

export function newReview() {
  return {
    type: ACTIONS.NEW_REVIEW
  };
}

export function authenticatedUser(user) {
  return {
    type: ACTIONS.AUTHENTICATE_USER,
    user
  };
}
