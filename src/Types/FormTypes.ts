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
    }
  | {
      type: "EDIT_CONTENT";
      index: number;
      xoptions: any[];
      yoptions: any[];
    }
  | {
      type: "EDIT_VALIDATION";
      index: number;
      validations: Validation;
    };

export type ValidationTypeEnum =
  | "CHECKBOX"
  | "EMAIL"
  | "LINK"
  | "WORD"
  | "CHAR";

export type ValidationType = {
  type: string;
  default: "WORD";
};

export type ValidationMin = {
  type: number;
  default: 0;
};

export type ValidationMax = {
  type: number;
  default: 0;
};

export type Validation = {
  type: string;
  expression: string | null;
  min: number;
  max: number;
  active: boolean;
} | null;

export type FormContext = {
  formId: string;
};

export type QuestionCard = {
  _id?: string;
  name: string;
  description: string;
  type: QuestionType;
  question: string;
  x_options: any[];
  y_options: any[];
  validations: Validation;
  required: boolean;
};

export type Link = {
  open: moment.Moment | null;
  close: moment.Moment | null;
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
  previewLink: Link;
  submissionLinks: Array<Link>;
}

export interface FormState extends FormStateBase {
  sections: Array<FormSection>;
}

export type FormSettingsType = {
  headerImage: string | null;
  themeColour: string;
  confirmationMessage: string;
};

export type Answer = {
  type: QuestionType;
  answerString: string | null;
  answerArray: Array<string> | null;
  answerMatrix: Array<Array<string>> | null;
  sectionID: string;
  questionID: string;
};

export type EditAnswersAction =
  | {
      type: "LOAD";
      answers: Answer[];
    }
  | {
      type: "EDIT_ANSWER";
      index: number;
      answer: Answer;
    }
  | {
      type: "ADD_ANSWER";
      answer: Answer;
    };
