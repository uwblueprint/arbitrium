import React, { useReducer, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import FormSection from "./FormSection";
import { AuthContext } from "../../../Authentication/Auth.js";
import * as FORM from "../../../requests/forms.js";
import usePromise from "../../../Hooks/usePromise";
import CreateEditFormHeader from "./SubmissionFormHeader";
import { defaultFormState } from "./SubmissionFormStateManagement";
import customFormSectionsReducer from "../../../Reducers/CustomFormSectionsReducer";
import DeleteSectionConfirmation from "../DeleteSectionConfirmation";
//import Button from "@material-ui/core/Button";
//import Snackbar from "@material-ui/core/Snackbar";

const FormWrapper = styled.div`
  padding-top: 70px;
  padding-left: 15%;
`;

const DialogOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 150%;
  width: 100vw;
  z-index: 110;
  background: rgba(0, 0, 0, 0.5);
  .dialogButton {
    text-transform: none;
  }
`;

function CreateSubmissionForm() {
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
    name: defaultFormState.name,
    description: defaultFormState.description
  });
  const [
    showDeleteSectionConfirmation,
    setShowDeleteSectionConfirmation
  ] = useState(false);
  //const [deletedSection, setDeletedSection] = useState(null);

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

  // eslint-disable-next-line no-unused-vars
  function handleSaveAll() {
    // TODO: Create backend endpoint to update an entire form
    // TODO: Call to update the entire form.
    // (don't use in place of updateActive())
  }

  function handleAddSection() {
    dispatchSectionsUpdate({
      type: "ADD_SECTION",
      index: activeSection
    });
    updateActiveSection(activeSection + 1);
  }

  function handleMoveSection() {
    // TODO: update section location in sections object
    // TODO: call handleSave to update all sections
    // TODO: call updateActive
  }

  async function deleteSection() {
    // call API to delete
    const response = FORM.deleteSection(
      loadForm.value._id,
      loadForm.value.sections[activeSection]._id
    )
      .then(() => {
        //setDeletedSection({...loadForm.value.sections[activeSection]});

        dispatchSectionsUpdate({
          type: "LOAD",
          index: activeSection
        });
        updateActiveSection(activeSection !== 0 ? activeSection - 1 : 0);
      })
      .catch(() => {
        //setDeletedSection(null);

        alert("Something went wrong. Form section deleted unsuccessfully.");
        console.error(`ERROR: Status - ${response}`);
      });
  }

  function closeDeleteSectionConfirmation() {
    setShowDeleteSectionConfirmation(false);
  }

  function handleDeleteSection() {
    // prompt user for confirmation
    setShowDeleteSectionConfirmation(true);
  }

  return (
    <div>
      <CreateEditFormHeader {...headerData} onChange={setHeaderData} />
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
              handleAddSection={handleAddSection}
              handleMoveSection={handleMoveSection}
              handleDeleteSection={handleDeleteSection}
            />
          </FormWrapper>
        ))}
      {showDeleteSectionConfirmation && (
        <>
          <DialogOverlay />
          <DeleteSectionConfirmation
            confirm={deleteSection}
            close={closeDeleteSectionConfirmation}
            sectionName={loadForm.value.sections[activeSection].name}
            questionCount={
              loadForm.value.sections[activeSection].questions.length
            }
          />
        </>
      )}
      {/* deletedSection && (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={deletedSection}
          onClose={setDeletedSection(null)}
          message={deletedSection ? '"' + deletedSection.name + '" deleted' : ""}
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={undoDeleteSection}>
                UNDO
              </Button>
            </React.Fragment>
          }
        />
        ) */}
    </div>
  );
}

export default CreateSubmissionForm;
