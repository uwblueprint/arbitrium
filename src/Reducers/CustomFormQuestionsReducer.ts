import { produce } from "immer";
import { QuestionCard, EditQuestionsAction } from "../Types/FormTypes";
import { defaultNewQuestion } from "../Components/FormCreation/CreateEditFormStateManagement";

function customFormQuestionsReducer(
  state: QuestionCard[],
  action: EditQuestionsAction
): QuestionCard[] {
  return produce(state, (draftState: QuestionCard[]) => {
    console.log("test");
    switch (action.type) {
      case "LOAD":
        console.log("test4");
        return action.questions;
      case "ADD_QUESTION":
        console.log("add question");
        draftState.splice(action.index + 1, 0, defaultNewQuestion);
        console.log("done add question");
        break;
      case "DELETE_QUESTION":
        console.log("test3");
        draftState.splice(action.index, 1);
        break;
      default:
        console.log("test2");
        break;
    }
  });
}

export default customFormQuestionsReducer;
