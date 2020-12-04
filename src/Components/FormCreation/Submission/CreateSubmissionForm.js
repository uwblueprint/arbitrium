import React, { useReducer, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import FormSection from "./FormSection";
import { AuthContext } from "../../../Authentication/Auth.js";
import * as FORM from "../../../requests/forms.js";
import usePromise from "../../../Hooks/usePromise";
import CreateEditFormHeader from "./SubmissionFormHeader";
import { defaultFormState } from "./SubmissionFormStateManagement";
import customFormSectionsReducer from "../../../Reducers/CustomFormSectionsReducer";
import Button from "@material-ui/core/Button";

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
  const [page, setPage] = useState(-1);
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

  return (
    <div>
      {page === -1 ? (
        <CreateEditFormHeader {...headerData} />
      ) : sections && page < sections.length ? (
        <FormWrapper key={page} id={"section_" + page}>
          <FormSection
            key={page + "_section"}
            numSections={sections.length}
            sectionNum={page + 1}
            sectionData={sections[page]}
          />
        </FormWrapper>
      ) : null}
      <Button
        variant="contained"
        disabled={page === -1}
        color="primary"
        onClick={() => setPage(page - 1)}
      >
        Previous
      </Button>
      <Button
        variant="contained"
        disabled={page === sections.length - 1}
        color="primary"
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}

export default CreateSubmissionForm;
