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
        return action.sections;
      case "ADD_QUESTION":
        draftState.splice(action.index + 1, 0, defaultNewQuestion);
        break;
      case "DELETE_QUESTION":
        draftState.splice(action.index, 1);
        break;
      default:
        break;
    }
  });
}

export default customFormQuestionsReducer;
