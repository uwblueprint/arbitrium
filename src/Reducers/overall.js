import { CHANGE_RATING } from "../Constants/ActionTypes";

const initialState = {
    name: [],
    overallRating: [],
    lastUpdated: [],
    progress: [],
    rating: []
};

const overallReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_RATING':
            break;
        default:
            return state
    }
};

export default  overallReducer;