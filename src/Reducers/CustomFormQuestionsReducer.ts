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
        console.log(state);
        break;
      case "DELETE_QUESTION":
        draftState.splice(action.index, 1);
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
