import { SET_ADMIN_VIEW_STATS } from "../Constants/ActionTypes";

const defaultState = {
  allComments: [],
  allRatings: [],
  averageRating: null
};

function adminReducer(state = defaultState, action) {
  //create mutable copy of state rather than mutating given state parameter
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_ADMIN_VIEW_STATS:
      newState.allComments = action.payload.allComments;
      newState.allComments = action.payload.allRatings;
      newState.allComments = action.payload.averageRating;
      return newState;
    default:
      return state;
  }
}

export default adminReducer;
