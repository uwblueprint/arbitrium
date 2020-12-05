export type EditSectionsAction =
  | {
      type: "LOAD";
      sections: FormSection[];
    }
  | {
      type: "REORDER";
      sections: FormSection[];
    }
  | {
      type: "ADD_SECTION";
      index: number;
    }
  | {
      type: "DELETE_SECTION";
      index: number;
    }
  | {
      type: "EDIT_TITLE";
      index: number;
      title: string;
    }
  | {
      type: "EDIT_DESCRIPTION";
      index: number;
      description: string;
    }
  | {
      type: "EDIT_SECTION_TYPE";
      index: number;
      sectionType: string;
    };

export type QuestionType =
  | "SHORT_ANSWER"
  | "MULTIPLE_CHOICE"
  | "PARAGRAPHS"
  | "CHECKBOXES"
  | "FILE_UPLOAD"
  | "CHECKBOX_GRID"
  | "IDENTIFIER";

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
    }
  | {
      type: "EDIT_TITLE";
      index: number;
      title: string;
    }
  | {
      type: "EDIT_DESCRIPTION";
      index: number;
      description: string;
    }
  | {
      type: "EDIT_QUESTION_TYPE";
      index: number;
      questionType: QuestionType;
    }
  | {
      type: "REQUIRED_TOGGLE";
      index: number;
    };

export type FormContext = {
  formId: string;
};

export type QuestionCard = {
  _id?: string;
  name: string;
  description: string;
  type: QuestionType;
  question: string;
  options?: Array<string>;
  required: boolean;
};

export interface FormSectionBase {
  name: string;
  description: string;
  questions: Array<QuestionCard>;
  deleted: number;
  sectionType: string;
  required: boolean;
}

export interface FormSection extends FormSectionBase {
  _id: string;
}

export interface FormStateBase {
  name: string;
  description: string;
}
export interface DefaultFormState extends FormStateBase {
  sections: Array<FormSectionBase>;
}

export interface FormState extends FormStateBase {
  sections: Array<FormSection>;
}
