// src/js/actions/index.js

import * as ACTIONS from "../Constants/ActionTypes";

//Recall from store/index.js that an action is a javascript object
//That has a type and a payload (data)

export function loadApplications(applications, reviewCount) {
  return {
    type: ACTIONS.LOAD_APPLICATIONS,
    applications,
    reviewCount
  };
}

export function loadProgram(program) {
  return {
    type: ACTIONS.LOAD_PROGRAM,
    program
  }
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
