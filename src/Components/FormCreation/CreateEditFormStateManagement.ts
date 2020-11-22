import { createContext, useContext } from "react";
import { FormState, QuestionType, FormContext } from "../../Types/FormTypes";

export const sectionsStarter = [
  {
    name: "About Your Charity",
    description: "Section Type: Admin Info",
    questions: [
      {
        name: "Test",
        type: "IDENTIFIER" as QuestionType,
        question: "What is the name of your charity?",
        required: true
      },
      {
        name: "Test 2",
        type: "SHORT_ANSWER" as QuestionType,
        question: "What is the name of your charity?",
        required: false
      }
    ]
  },
  {
    name: "Untitled Section",
    description: "Section Type: Decision Criteria",
    questions: [
      {
        type: "MULTIPLE_CHOICE" as QuestionType,
        question: "Untitled Question",
        options: ["Option 1"],
        required: false
      }
    ]
  }
];

export const defaultNewSection = {
  name: "Untitled Section",
  description: "Section Type: Decision Criteria",
  questions: [
    {
      type: "SHORT_ANSWER" as QuestionType,
      question: "Untitled Question",
      options: ["Option 1"],
      required: false
    }
  ]
};

export const defaultNewQuestion = {
  type: "SHORT_ANSWER" as QuestionType,
  question: "Untitled Question",
  options: ["Option 1"],
  required: false
};

export const defaultFormState: FormState = {
  name: "Untitled Form",
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
