import { createContext, useContext } from "react";
import { FormState, DispatchFunc } from "../../Reducers/CustomFormStateReducer";

export const defaultFormState: FormState = {
  title: "Untitled Form",
  description: ""
};

export const CreateEditFormDispatchContext = createContext<
  DispatchFunc | undefined
>(undefined);

export const CreateEditFormStateContext = createContext<FormState | undefined>(
  undefined
);

export function useFormState(): FormState {
  const state = useContext(CreateEditFormStateContext);
  if (state === undefined) {
    throw new Error(
      "useFormState must be used within a CreateEditFormStateContext provider"
    );
  }
  return state;
}

export function useFormDispatch(): DispatchFunc {
  const dispatch = useContext(CreateEditFormDispatchContext);
  if (dispatch === undefined) {
    throw new Error(
      "useFormDispatch must be used within a CreateEditFormDispatchContext provider"
    );
  }
  return dispatch;
}
