import { createContext, useContext } from "react";
import {
  DefaultFormState,
  QuestionType,
  FormContext,
  FormSectionBase
} from "../../../Types/FormTypes";

export const SubmissionFormContext = createContext<FormContext | undefined>(
  undefined
);

export function useFormContext(): FormContext {
  const state = useContext(SubmissionFormContext);
  if (state === undefined) {
    throw new Error(
      "useFormState must be used within a SubmissionFormContext provider"
    );
  }
  return state;
}
