import { produce } from "immer";
import { FormSection, EditSectionsAction } from "../Types/FormTypes";

function customFormSectionsReducer(
  state: FormSection[],
  action: EditSectionsAction
): FormSection[] {
  return produce(state, (draftState: FormSection[]) => {
    switch (action.type) {
      case "LOAD":
        return [...action.sections];
      case "DELETE_SECTION":
        draftState.splice(action.index, 1);
        break;
      case "EDIT_TITLE":
        draftState[action.index].name = action.title;
        break;
      case "EDIT_DESCRIPTION":
        draftState[action.index].description = action.description;
        break;
      case "EDIT_RUBRIC":
        draftState[action.index].rubric = action.rubric;
        break;
      case "EDIT_SECTION_TYPE":
        draftState[action.index].sectionType = action.sectionType;
        break;
      default:
        break;
    }
  });
}

export default customFormSectionsReducer;
