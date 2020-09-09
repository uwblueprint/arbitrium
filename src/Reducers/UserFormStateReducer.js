import { produce } from "immer";

export const EDIT_NAME = "EDIT_NAME";
export const EDIT_PREFERRED_NAME = "EDIT_PREFERRED_NAME";
export const EDIT_EMAIL = "EDIT_EMAIL";
export const EDIT_ROLE = "EDIT_ROLE";
export const EDIT_PROGRAMS = "EDIT_PROGRAMS";

export function userFormStateReducer(formState, action) {
  return produce(formState, (draftFormState) => {
    switch (action.type) {
      case EDIT_NAME:
        draftFormState.name = action.name;
        break;
      case EDIT_PREFERRED_NAME:
        draftFormState.preferredName = action.name;
        break;
      case EDIT_EMAIL:
        draftFormState.email = action.email;
        break;
      case EDIT_ROLE:
        draftFormState.role = action.role;
        break;
      case EDIT_PROGRAMS:
        console.log(action.program)
        draftFormState.programs.has(action.program)
          ? draftFormState.programs.delete(action.program)
          : draftFormState.programs.add(action.program);
        break;
      default:
        break;
    }
  });
}
