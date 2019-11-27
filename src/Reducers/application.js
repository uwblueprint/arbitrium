import { CHANGE_RATING } from "../Constants/ActionTypes";

const initialState = {
    formInfo: [],
    questionInfo: [],
    questionRating: [],
    questionComments: [],
    overallRating: [],
    overallComments: [],
    appId: [],
    isFetching: false
};

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_RATING':
            return Object.assign({}, state, {
                questionRating: action.rating
            });
        case 'REQUEST_APPLICATION':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_APPLICATION':
            return Object.assign({}, state, state);
        default:
            return state
    }
};

export default applicationReducer;