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
        draftState.splice(action.index + 1, 0, defaultNewSection);
        break;
      case "TOGGLE_DELETE_SECTION":
        const deletedSection = JSON.parse(
          JSON.stringify(draftState[action.index])
        );
        deletedSection.deleted = deletedSection.deleted === 1 ? 0 : 1;
        draftState.splice(action.index, 1, deletedSection);
        break;
      default:
        break;
    }
  });
}

export default customFormSectionsReducer;
