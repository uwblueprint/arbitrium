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
    description: "This section is used to uniquely identify each applicant",
    deleted: 0,
    sectionType: "Admin Info",
    required: true,
    questions: [
      {
        name: "Test",
        description: "Description",
        type: "IDENTIFIER" as QuestionType,
        question: "What is the name of your charity?",
        required: true
      },
      {
        name: "Test 2",
        description: "Description",
        type: "SHORT_ANSWER" as QuestionType,
        question: "What is the name of your charity?",
        required: false
      }
    ]
  },
  {
    name: "Untitled Section2",
    description: "Description",
    deleted: 0,
    required: false,
    sectionType: "Decision Criteria",
    questions: [
      {
        name: "Test 3",
        description: "Description",
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
  description: "Description",
  deleted: 0,
  sectionType: "Decision Criteria",
  required: false,
  questions: [
    {
      name: "Untitled",
      description: "Description",
      type: "SHORT_ANSWER" as QuestionType,
      question: "Untitled Question",
      options: ["Option 1"],
      required: false
    }
  ]
};

export const defaultNewQuestion = {
  name: "Untitled",
  description: "Description",
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
