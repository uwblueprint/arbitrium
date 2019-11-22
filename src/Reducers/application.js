import { CHANGE_RATING } from "../Constants/ActionTypes";

const initialState = {
    formInfo: [],
    questionInfo: [],
    questionRating: [],
    questionComments: [],
    overallRating: [],
    overallComments: [],
    appId: []
};

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_RATING':
            break;
        default:
            return state
    }
};

export default applicationReducer;