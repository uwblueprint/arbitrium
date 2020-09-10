import { produce } from "immer";

export type FormAction =
  | {
      type: "EDIT_TITLE";
      title: string;
    }
  | {
      type: "EDIT_DESCRIPTION";
      description: string;
    };

export type DispatchFunc = (action: FormAction) => void;

export interface FormState {
  title: string;
  description: string;
}

function customFormStateReducer(
  formState: FormState,
  action: FormAction
): FormState {
  return produce(formState, (draftState: FormState) => {
    switch (action.type) {
      case "EDIT_TITLE":
        draftState.title = action.title;
        break;
      case "EDIT_DESCRIPTION":
        draftState.description = action.description;
        break;
      default:
        break;
    }
  });
}

export default customFormStateReducer;
