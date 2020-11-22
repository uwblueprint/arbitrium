import { produce } from "immer";
import { FormSection, EditSectionsAction } from "../Types/FormTypes";
import { defaultNewSection } from "../Components/FormCreation/CreateEditFormStateManagement";

function customFormSectionsReducer(
  state: FormSection[],
  action: EditSectionsAction
): FormSection[] {
  return produce(state, (draftState: FormSection[]) => {
    switch (action.type) {
      case "LOAD":
        return action.sections;
      case "ADD_SECTION":
        console.log(action.index + 1);
        draftState.splice(action.index + 1, 0, defaultNewSection);
        break;
      case "DELETE_SECTION":
        draftState.splice(action.index, 1);
        break;
      default:
        break;
    }
  });
}

export default customFormSectionsReducer;
