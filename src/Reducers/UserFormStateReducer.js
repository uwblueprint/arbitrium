import { produce, enableMapSet } from "immer";

enableMapSet();

export const EDIT_EMAIL = "EDIT_EMAIL";
export const EDIT_ROLE = "EDIT_ROLE";
export const EDIT_PROGRAMS = "EDIT_PROGRAMS";

export function userFormStateReducer(formState, action) {
  return produce(formState, (draftFormState) => {
    switch (action.type) {
      case EDIT_EMAIL:
        draftFormState.email = action.email;
        break;
      case EDIT_ROLE:
        draftFormState.role = action.role;
        break;
      case EDIT_PROGRAMS:
        draftFormState.programs.has(action.program)
          ? draftFormState.programs.delete(action.program)
          : draftFormState.programs.add(action.program);
        break;
      default:
        break;
    }
  });
}
