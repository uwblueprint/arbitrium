import { createContext, useContext } from "react";
import {
  DefaultFormState,
  QuestionType,
  FormContext,
  FormSectionBase
} from "../../Types/FormTypes";

export const sectionsStarter: FormSectionBase[] = [
  {
    name: "About Your Charity",
    description: "Section Type: Admin Info",
    deleted: "0",
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
    deleted: "0",
    questions: [
      {
        name: "Test 3",
        type: "SHORT_ANSWER" as QuestionType,
        question: "Untitled Question",
        options: ["Option 1"],
        required: false
      }
    ]
  }
];

export const defaultNewSection: FormSectionBase = {
  name: "Untitled Section",
  description: "Section Type: Decision Criteria",
  deleted: "0",
  questions: [
    {
      name: "Untitled",
      type: "SHORT_ANSWER" as QuestionType,
      question: "Untitled Question",
      options: ["Option 1"],
      required: false
    }
  ]
};

export const defaultNewQuestion = {
  name: "Untitled",
  type: "SHORT_ANSWER" as QuestionType,
  question: "Untitled Question",
  options: ["Option 1"],
  required: false
};

export const defaultFormState: DefaultFormState = {
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
