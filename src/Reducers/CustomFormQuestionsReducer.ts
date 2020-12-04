import { produce } from "immer";
import { QuestionCard, EditQuestionsAction } from "../Types/FormTypes";
import { defaultNewQuestion } from "../Components/FormCreation/CreateEditFormStateManagement";

function customFormQuestionsReducer(
  state: QuestionCard[],
  action: EditQuestionsAction
): QuestionCard[] {
  return produce(state, (draftState: QuestionCard[]) => {
    switch (action.type) {
      case "LOAD":
        return action.questions;
      case "ADD_QUESTION":
        draftState.splice(action.index + 1, 0, defaultNewQuestion);
        break;
      case "DELETE_QUESTION":
        draftState.splice(action.index, 1);
        break;
      case "EDIT_TITLE":
        draftState[action.index].name = action.title;
        break;
      case "EDIT_DESCRIPTION":
        draftState[action.index].description = action.description;
        break;
      case "DUPLICATE_QUESTION": {
        const newQuestion = JSON.parse(
          JSON.stringify(draftState[action.index])
        );
        draftState.splice(action.index, 0, newQuestion);
        break;
      }
      default:
        break;
    }
  });
}

export default customFormQuestionsReducer;
