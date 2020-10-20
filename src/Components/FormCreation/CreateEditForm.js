<<<<<<< HEAD
import React, { useEffect, useState, useContext, useReducer } from "react";
=======
import React, { useReducer, useEffect, useState, useContext } from "react";
import { updateQuestion } from "./../../requests/forms";
import { HEADER_HEIGHT } from "../Header/Header";
>>>>>>> 597261e... added backend functionality
import styled from "styled-components";
import { HEADER_HEIGHT } from "../Header/Header";
import FormSection from "./FormSection";
import { AuthContext } from "../../Authentication/Auth.js";
import * as FORM from "../../requests/forms.js";
import usePromise from "../../Hooks/usePromise";
import CreateEditFormHeader from "./CreateEditFormHeader";
import { defaultFormState } from "./CreateEditFormStateManagement";
import customFormSectionsReducer from "../../Reducers/CustomFormSectionsReducer";

const Wrapper = styled.div`
  margin-top: ${HEADER_HEIGHT}px;
`;

const FormWrapper = styled.div`
  margin-top: 50px;
  padding-left: 15%;
`;

function CreateEditForm() {
  const { appUser } = useContext(AuthContext);
  const [sections, dispatchSectionsUpdate] = useReducer(
    customFormSectionsReducer,
    []
  );
  const [activeSection, setActiveSection] = useState(0);
  const [loadForm, refetch] = usePromise(FORM.getForm, {
    formId: appUser.currentProgram
  });
  const [headerData, setHeaderData] = useState({
    title: defaultFormState.title,
    description: defaultFormState.description
  });

  useEffect(() => {
    // Get form from databse using programID
    if (loadForm.isPending) return;
    dispatchSectionsUpdate({
      type: "LOAD",
      sections: defaultFormState.sections
    });
  }, [loadForm, appUser, refetch]);

  function updateActiveSection(sectionKey) {
    if (activeSection !== sectionKey) {
      setActiveSection(sectionKey);
    }
  }

  // eslint-disable-next-line no-unused-vars
  function handleSaveAll() {
    // TODO: Create backend endpoint to update an entire form
    // TODO: Call to update the entire form.
    // (don't use in place of updateActive())
  }

  // eslint-disable-next-line no-unused-vars
  function handleAddSection() {
    // TODO: add section to sections object
    // TODO: call handleSave to update all sections
    // TODO: call updateActive
  }

  // eslint-disable-next-line no-unused-vars
  function handleMoveSection() {
    // TODO: update section location in sections object
    // TODO: call handleSave to update all sections
    // TODO: call updateActive
  }

  return (
    <Wrapper>
      <CreateEditFormHeader {...headerData} onChange={setHeaderData} />
      {sections &&
        sections.map((section, key) => (
          <FormWrapper key={key}>
            <FormSection
              key={key + "_section"}
              numSections={sections.length}
              sectionNum={key + 1}
              sectionData={section}
              questions={section.questions}
              updateActiveSection={updateActiveSection}
              active={activeSection === key}
            />
          </FormWrapper>
        ))}
    </Wrapper>
  );
}

export default CreateEditForm;
