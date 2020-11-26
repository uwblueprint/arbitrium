import React, { useReducer, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import FormSection from "./FormSection";
import { AuthContext } from "../../Authentication/Auth.js";
import * as FORM from "../../requests/forms.js";
import usePromise from "../../Hooks/usePromise";
import CreateEditFormHeader from "./CreateEditFormHeader";
import {
  defaultFormState,
  defaultNewSection
} from "./CreateEditFormStateManagement";
import customFormSectionsReducer from "../../Reducers/CustomFormSectionsReducer";
import DeleteSectionConfirmation from "./DeleteSectionConfirmation";
import CreateEditFormMoveSectionDialog from "./CreateEditFormMoveSectionDialog";
import ControlledDialogTrigger from "../Common/Dialogs/DialogTrigger";

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

function CreateEditForm() {
  const { appUser } = useContext(AuthContext);
  const [sections, dispatchSectionsUpdate] = useReducer(
    customFormSectionsReducer,
    []
  );
  const [showMoveSectionsDialog, setShowMoveSectionsDialog] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const formId = appUser.currentProgram;
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
    if (loadForm.value == null) return;
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

  async function handleAddSection() {
    const newForm = await FORM.createSection(formId, {
      section: defaultNewSection,
      index: activeSection + 1
    });
    dispatchSectionsUpdate({
      type: "LOAD",
      sections: newForm.sections
    });
    updateActiveSection(activeSection + 1);
  }

  async function handleMoveSection(reorderedSections) {
    if (
      reorderedSections == null ||
      reorderedSections.length !== sections.length
    ) {
      return;
    }
    const newForm = await FORM.updateSection(formId, reorderedSections);
    if (newForm == null) return;
    dispatchSectionsUpdate({
      type: "LOAD",
      sections: newForm.sections
    });
  }

  function closeMoveSectionDialog() {
    setShowMoveSectionsDialog(false);
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
      <ControlledDialogTrigger
        showDialog={showMoveSectionsDialog}
        Dialog={CreateEditFormMoveSectionDialog}
        dialogProps={{
          onClose: closeMoveSectionDialog,
          onSubmit: handleMoveSection,
          initSections: sections
        }}
      />
      {sections &&
        sections.map((section, index) => (
          <FormWrapper key={section._id}>
            <FormSection
              numSections={sections.length}
              sectionNum={index + 1}
              sectionData={section}
              updateActiveSection={updateActiveSection}
              active={activeSection === index}
              handleAddSection={handleAddSection}
              handleMoveSection={handleMoveSection}
              handleDeleteSection={handleDeleteSection}
              setShowMoveSectionsDialog={setShowMoveSectionsDialog}
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
    </div>
  );
}

export default CreateEditForm;
