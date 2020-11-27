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
      questions: QuestionCard[];
    }
  | {
      type: "ADD_QUESTION";
      index: number;
    }
  | {
      type: "DELETE_QUESTION";
      index: number;
    }
  | {
      type: "DUPLICATE_QUESTION";
      index: number;
      targetIndex: number;
    };

export type QuestionType =
  | "SHORT_ANSWER"
  | "MULTIPLE_CHOICE"
  | "PARAGRAPHS"
  | "CHECKBOXES"
  | "FILE_UPLOAD"
  | "CHECKBOX_GRID"
  | "IDENTIFIER";

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
  deleted: number;
};

export interface FormState {
  name: string;
  description: string;
  sections: Array<FormSection>;
}
