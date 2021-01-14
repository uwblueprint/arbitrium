import { produce } from "immer";
import { Answer, EditAnswersAction } from "../Types/FormTypes";

function customSubmissionAnswerReducer(
  state: Answer[],
  action: EditAnswersAction
): Answer[] {
  return produce(state, (draftState: Answer[]) => {
    switch (action.type) {
      case "LOAD":
        return [...action.answers];
      case "EDIT_ANSWER":
        draftState.splice(action.index, 1, action.answer);
        break;
      case "ADD_ANSWER":
        return [...state, action.answer];
        break;
      default:
        break;
    }
  });
}

export default customSubmissionAnswerReducer;
