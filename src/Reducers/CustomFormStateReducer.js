import { produce } from "immer";

export const EDIT_TITLE = "EDIT_TITLE";
export const EDIT_DESCRIPTION = "EDIT_DESCRIPTION";

function customFormStateReducer(formState, action) {
  return produce(formState, (draftFormState) => {
    switch (action.type) {
      case EDIT_TITLE:
        draftFormState.title = action.title;
        break;
      case EDIT_DESCRIPTION:
        draftFormState.description = action.description;
        break;
      default:
        break;
    }
  });
}

export default customFormStateReducer;
