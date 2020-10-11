export type EditSectionsAction =
  | {
      type: "ADD_SECTION";
      index: number;
    }
  | {
      type: "DELETE_SECTION";
      index: number;
    };

export type QuestionType = "SHORT_ANSWER" | "MULTIPLE_CHOICE";

export type FormContext = {
  formId: string;
};

export type QuestionCard = {
  type: QuestionType;
  question: string;
  options?: Array<string>;
  required: boolean;
};

export type FormSection = {
  title: string;
  description: string;
  cards: Array<QuestionCard>;
};

export interface FormState {
  title: string;
  description: string;
  sections: Array<FormSection>;
}
