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
      case "EDIT_QUESTION_TYPE":
        draftState[action.index].type = action.questionType;
        //If the question type is unchanged; don't update it
        //If the question type change is between MULTIPLE_CHOICE and CHECKBOXES then don't erase options
        //Otherwise erase options
        if (
          ((state[action.index].type === "CHECKBOXES" ||
            state[action.index].type === "MULTIPLE_CHOICE") &&
            (action.questionType === "MULTIPLE_CHOICE" ||
              action.questionType === "CHECKBOXES")) ||
          action.questionType === state[action.index].type
        ) {
          //do nothing
        } else {
          draftState[action.index].x_options = [];
          draftState[action.index].y_options = [];
          draftState[action.index].validations = null;
        }
        break;
      case "REQUIRED_TOGGLE":
        draftState[action.index].required = !state[action.index].required;
        break;
      case "EDIT_CONTENT":
        draftState[action.index].x_options = action.xoptions;
        draftState[action.index].y_options = action.yoptions;
        break;
      case "EDIT_VALIDATION":
        draftState[action.index].validations = action.validations;
        break;
      case "DUPLICATE_QUESTION": {
        //It is important to not duplicate the question _id
        const question = draftState[action.index];
        question._id = undefined;
        const newQuestion = JSON.parse(JSON.stringify(question));
        draftState.splice(action.index, 0, newQuestion);
        break;
      }
      default:
        break;
    }
  });
}

export default customFormQuestionsReducer;
