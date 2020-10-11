import { produce } from "immer";
import { FormSection, EditSectionsAction } from "../Types/FormTypes";

function customFormSectionsReducer(
  state: FormSection[],
  action: EditSectionsAction
): FormSection[] {
  return produce(state, (draftState: FormSection[]) => {
    switch (action.type) {
      case "ADD_SECTION":
        // TODO
        break;
      case "DELETE_SECTION":
        // TODO
        draftState.splice(action.index, 1);
        break;
      default:
        break;
    }
  });
}

export default customFormSectionsReducer;
