import React from "react";
import { Answer } from "../../Types/FormTypes";

const SubmissionAnswersContext = React.createContext<Answer>([]);

export default SubmissionAnswersContext;
