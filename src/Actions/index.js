
import fetch from 'cross-fetch';

import {CHANGE_RATING, RECIEVE_QUESTIONS, REQUEST_QUESTIONS, REQUEST_OVERALL, RECIEVE_OVERALL, REQUEST_APPLICATION, RECIEVE_APPLICATION} from "../Constants/ActionTypes";

const proxy = "http://localhost:4000";

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
        .then(json => dispatch(receiveQuestions(json)))
  }
}

function requestOverall(){
  return {
    type: REQUEST_OVERALL
  }
}

function receiveOverall(json){
  return {
    type: RECIEVE_OVERALL,
    data: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function fetchOverall() {
  return dispatch => {
    dispatch(requestOverall());
    return fetch(proxy + 'api/overall', {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => response.json )
        .then(json => dispatch(receiveOverall(json)))
  }
}

function requestApplication(){
  return {
    type: REQUEST_APPLICATION
  }
}

function recieveApplicaton(json){
  return {
    type: RECIEVE_APPLICATION,
    data: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchApplication(){
  return dispatch => {
    dispatch(requestApplication());
    return fetch(proxy + "api/application", {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => response.json)
        .then(json => dispatch(recieveApplicaton(json)))
  }
}