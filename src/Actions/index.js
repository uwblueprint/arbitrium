// src/js/actions/index.js

import { LOAD_REVIEWS,
         LOAD_STACKEDRANKINGS,
         LOAD_APPLICATIONS,
         SWITCH_VIEW } from "../Constants/ActionTypes";

//Recall from store/index.js that an action is a javascript object
//That has a type and a payload (data)

export function switchView(payload) {
  return { type: SWITCH_VIEW, payload };
}

//The reducer will use that string to determine how to calculate the next state
//To avoid errors; declare the action types as constants :)

export function loadApplications(payload) {
  return { type: LOAD_APPLICATIONS, payload }
};

export function loadReviews(payload) {
  return { type: LOAD_REVIEWS, payload }
};

export function loadStackedRankings(payload) {
  return { type: LOAD_STACKEDRANKINGS, payload }
};
