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
      default:
        break;
    }
  });
}

export default customFormSectionsReducer;
