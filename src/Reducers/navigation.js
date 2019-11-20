import { SWITCH_VIEW } from "../Constants/ActionTypes";

const initialState = {
  view: "HOME"
};

function navigation(state = initialState, action) {
  /*
  if (action.type === ADD_ARTICLE) {
    state.articles.push(action.payload);
  }
  */

  //Why do we use this code instead of the code above?
  //Because array.prototype.push is an impure function
  //i.e it breaks immutability
  //Recall: A pure function is one that returns the exact same output for the given input
  // if (action.type === ADD_ARTICLE) {
  //   return Object.assign({}, state, {
  //     articles: state.articles.concat(action.payload)
  //   });
  // }
  switch (action.type) {
    case SWITCH_VIEW:
      return {
        ...state,
        view: action.payload
      };
    default:
      return state;
  }
}

export default navigation;
