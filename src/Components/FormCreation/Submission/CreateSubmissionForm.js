import React, { useReducer, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import FormSection from "./FormSection";
import { AuthContext } from "../../../Authentication/Auth.js";
import * as FORM from "../../../requests/forms.js";
import usePromise from "../../../Hooks/usePromise";
import CreateEditFormHeader from "./SubmissionFormHeader";
import { defaultFormState } from "./SubmissionFormStateManagement";
import customFormSectionsReducer from "../../../Reducers/CustomFormSectionsReducer";

const FormWrapper = styled.div`
  padding-top: 70px;
  padding-left: 15%;
`;

function CreateSubmissionForm() {
  const { appUser } = useContext(AuthContext);
  const [sections, dispatchSectionsUpdate] = useReducer(
    customFormSectionsReducer,
    []
  );
  const [activeSection, setActiveSection] = useState(0);
  const [loadForm, refetch] = usePromise(FORM.getForm, {
    programId: appUser.currentProgram
  });
  const [headerData, setHeaderData] = useState({
    name: defaultFormState.name,
    description: defaultFormState.description
  });

  useEffect(() => {
    if (loadForm.isPending || !loadForm.value) return;
    // Get form from database using programID
    dispatchSectionsUpdate({
      type: "LOAD",
      sections: loadForm.value.sections
    });
    setHeaderData({
      name: loadForm.value.name,
      description: loadForm.value.description
    });
  }, [loadForm, appUser, refetch]);

  function updateActiveSection(sectionKey) {
    window.requestAnimationFrame(() => {
      const element = document.getElementById("section_" + sectionKey);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
    if (activeSection !== sectionKey) {
      setActiveSection(sectionKey);
    }
  }

  return (
    <div>
      <CreateEditFormHeader {...headerData} />
      {sections &&
        sections.map((section, key) => (
          <FormWrapper key={key} id={"section_" + key}>
            <FormSection
              key={key + "_section"}
              numSections={sections.length}
              sectionNum={key + 1}
              sectionData={section}
              updateActiveSection={updateActiveSection}
              active={activeSection === key}
            />
          </FormWrapper>
        ))}
    </div>
  );
}

export default CreateSubmissionForm;
