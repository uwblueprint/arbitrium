
import fetch from 'cross-fetch';

import {ADD_ARTICLE, CHANGE_RATING, RECIEVE_QUESTIONS, REQUEST_QUESTIONS} from "../Constants/ActionTypes";

const proxy = "http://localhost:4000";

//Recall from store/index.js that an action is a javascript object
//That has a type and a payload (data)
export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
};

//The reducer will use that string to determine how to calculate the next state
//To avoid errors; declare the action types as constants :)

export const changeRating = (rating, question) => ({
  type: CHANGE_RATING,
  rating,
  question
});

function requestQuestions() {
  return {
    type: REQUEST_QUESTIONS,
  }
}

function receiveQuestions(json) {
  return {
    type: RECIEVE_QUESTIONS,
    questions: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function fetchQuestions(){
  return dispatch => {
    dispatch(requestQuestions());
    return fetch(proxy+'/api/questions', {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => response.json())
        .then(json => dispatch(receiveQuestions()))
  }
}