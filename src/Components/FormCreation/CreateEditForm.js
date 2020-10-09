import React, { useReducer, useEffect, useState } from "react";
import { HEADER_HEIGHT } from "../Header/Header";
import styled from "styled-components";
import FormCard from "./FormCard";
import FormSection from "./FormSection";

import CreateEditFormHeader from "./CreateEditFormHeader";
import {
  CreateEditFormDispatchContext,
  CreateEditFormStateContext,
  defaultFormState
} from "./CreateEditFormStateManagement";
import customFormStateReducer from "../../Reducers/CustomFormStateReducer";

const Wrapper = styled.div`
  margin-top: ${HEADER_HEIGHT}px;
`;

const FormWrapper = styled.div`
  margin-top: 50px;
  padding-left: 10%;
`;

function CreateEditForm() {
  const [sections, setSections] = useState([]);
  const [formState, dispatch] = useReducer(
    customFormStateReducer,
    defaultFormState
  );

  useEffect(() => {
    const sections = [
      {
        title: "About Your Charity",
        desc: "Section Type: Admin Info",
        cards: [
          {
            type: "short_answer",
            question: "What is the name of your charity?",
            required: ""
          }
        ]
      },
      {
        title: "Untitled Section",
        desc: "Section Type: Decision Criteria",
        cards: [
          {
            type: "untitled",
            question: "Untitled Question",
            options: ["Option 1"],
            required: ""
          }
        ]
      }
    ];

    setSections(sections);
  }, []);

  return (
    <Wrapper>
      <CreateEditFormStateContext.Provider value={formState}>
        <CreateEditFormDispatchContext.Provider value={dispatch}>
          <CreateEditFormHeader />
        </CreateEditFormDispatchContext.Provider>
      </CreateEditFormStateContext.Provider>

      {sections.map((section, key) => (
        <FormWrapper key={key}>
          <FormSection
            key={key}
            numSections={sections.length}
            section={key + 1}
            title={section.title}
            description={section.desc}
          />
          <FormCard key={key} active={true} />
        </FormWrapper>
      ))}
    </Wrapper>
  );
}

export default CreateEditForm;
