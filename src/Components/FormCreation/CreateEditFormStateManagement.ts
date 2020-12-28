import { createContext, useContext } from "react";
import {
  DefaultFormState,
  QuestionType,
  FormContext,
  FormSectionBase,
  Link
} from "../../Types/FormTypes";
import moment from "moment";

let defaultQuestion = {
  name: "Untitled",
  description: "",
  type: "SHORT_ANSWER" as QuestionType,
  question: "Untitled Question",
  x_options: [],
  y_options: [],
  validations: [],
  required: true
};

export const sectionsStarter: FormSectionBase[] = [
  {
    name: "About Your Charity",
    description:
      "This section is used to uniquely identify each applicant (Change me)",
    deleted: 0,
    sectionType: "Admin Info",
    required: true,
    questions: [
      {
        name: "Organization Name",
        description: "",
        type: "IDENTIFIER" as QuestionType,
        question: "What is the name of your charity?",
        x_options: [],
        y_options: [],
        validations: [],
        required: true
      },
      defaultQuestion
    ]
  },
  {
    name: "Untitled Section2",
    description: "",
    deleted: 0,
    required: false,
    sectionType: "Decision Criteria",
    questions: [defaultQuestion]
  }
];

export const defaultNewSection: FormSectionBase = {
  name: "Untitled Section",
  description: "",
  deleted: 0,
  sectionType: "Decision Criteria",
  required: false,
  questions: [defaultQuestion]
};

export const defaultNewQuestion = defaultQuestion;

const defaultPreviewLink: Link = {
  open: moment(),
  close: null
};

export const defaultFormState: DefaultFormState = {
  name: "Untitled Form",
  description: "",
  sections: sectionsStarter,
  previewLink: defaultPreviewLink,
  submissionLinks: [defaultPreviewLink]
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
