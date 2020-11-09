export type EditSectionsAction =
  | {
      type: "LOAD";
      sections: FormSection[];
    }
  | {
      type: "ADD_SECTION";
      index: number;
    }
  | {
      type: "DELETE_SECTION";
      index: number;
    };

export type EditQuestionsAction =
  | {
      type: "LOAD";
      sections: QuestionCard[];
    }
  | {
      type: "ADD_QUESTION";
      index: number;
    }
  | {
      type: "DELETE_QUESTION";
      index: number;
    };

export type QuestionType =
  | "SHORT_ANSWER"
  | "MULTIPLE_CHOICE"
  | "PARAGRAPHS"
  | "CHECKBOXES"
  | "FILE_UPLOAD"
  | "CHECKBOX_GRID";

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
  name: string;
  description: string;
  questions: Array<QuestionCard>;
};

export interface FormState {
  name: string;
  description: string;
  sections: Array<FormSection>;
}
