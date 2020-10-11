import { createContext, useContext } from "react";
import { FormState, QuestionType, FormContext } from "../../Types/FormTypes";

export const sectionsStarter = [
  {
    title: "About Your Charity",
    description: "Section Type: Admin Info",
    cards: [
      {
        type: "SHORT_ANSWER" as QuestionType,
        question: "What is the name of your charity?",
        required: false
      }
    ]
  },
  {
    title: "Untitled Section",
    description: "Section Type: Decision Criteria",
    cards: [
      {
        type: "SHORT_ANSWER" as QuestionType,
        question: "Untitled Question",
        options: ["Option 1"],
        required: false
      }
    ]
  }
];

export const defaultFormState: FormState = {
  title: "Untitled Form",
  description: "",
  sections: sectionsStarter
};

export const CreateEditFormContext = createContext<FormContext | undefined>(
  undefined
);

export function useFormContext(): FormContext {
  const state = useContext(CreateEditFormContext);
  if (state === undefined) {
    throw new Error(
      "useFormState must be used within a CreateEditFormContext provider"
    );
  }
  return state;
}
