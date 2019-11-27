import { CHANGE_RATING } from "../Constants/ActionTypes";

const initialState = {
    name: [],
    overallRating: [],
    lastUpdated: [],
    progress: [],
    rating: [],
    isFetching: false
};

const overallReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_RATING':
            return Object.assign({}, state, {
                rating: action.rating,
            });
        case 'REQUEST_OVERALL':
            return Object.assign({}, state, {
               isFetching: true
            });
        case 'RECEIVE_OVERALL':
            return Object.assign({}, state, state);
        default:
            return state
    }
};

export default  overallReducer;