import React, { useReducer, useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import FormSection from "./FormSection";
import { AuthContext } from "../../Authentication/Auth.js";
import * as FORM from "../../requests/forms.js";
import usePromise from "../../Hooks/usePromise";
import CreateEditFormHeader from "./CreateEditFormHeader";
import { defaultFormState } from "./CreateEditFormStateManagement";
import customFormSectionsReducer from "../../Reducers/CustomFormSectionsReducer";
import DeleteSectionConfirmation from "./DeleteSectionConfirmation";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles({
  snackbar: {
    background: "rgba(0, 0, 0, 0.87)",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
    letterSpacing: "0.25px"
  },
  snackbar_button_label: {
    paddingRight: "12px",
    color: "#EB9546"
  }
});

const FormWrapper = styled.div`
  margin-top: 50px;
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
  const classes = useStyles();
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
  const [deletedSection, setDeletedSection] = useState(null);

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

  // eslint-disable-next-line no-unused-vars
  function handleMoveSection() {
    // TODO: update section location in sections object
    // TODO: call handleSave to update all sections
    // TODO: call updateActive
  }

  async function deleteSection() {
    const response = FORM.deleteSection(
      loadForm.value._id,
      loadForm.value.sections[activeSection]._id
    )
      .then(() => {
        setDeletedSection(activeSection);

        dispatchSectionsUpdate({
          type: "TOGGLE_DELETE_SECTION",
          index: activeSection
        });
        updateActiveSection(
          activeSection !== 0 ? activeSection - 1 : activeSection + 1
        );
      })
      .catch(() => {
        setDeletedSection(null);

        alert("Something went wrong. Form section deleted unsuccessfully.");
        console.error(`ERROR: Status - ${response}`);
      });
  }

  async function undoDeleteSection() {
    const response = FORM.deleteSection(
      loadForm.value._id,
      loadForm.value.sections[activeSection]._id
    )
      .then(() => {
        dispatchSectionsUpdate({
          type: "TOGGLE_DELETE_SECTION",
          index: deletedSection
        });

        updateActiveSection(deletedSection);
        setDeletedSection(null);
      })
      .catch(() => {
        alert("Something went wrong. Form section could not be restored.");
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
        sections
          .filter((section) => section.deleted !== 1)
          .map((section, key) => (
            <FormWrapper key={section._id}>
              <FormSection
                key={key + "_section"}
                numSections={
                  sections.filter((section) => section.deleted !== 1).length
                }
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
      {deletedSection && (
        <Snackbar
          ContentProps={{ classes: { root: classes.snackbar } }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={deletedSection}
          message={
            deletedSection
              ? '"' + loadForm.value.sections[deletedSection].name + '" deleted'
              : ""
          }
          action={
            <React.Fragment>
              <Button
                classes={{ label: classes.snackbar_button_label }}
                size="small"
                onClick={undoDeleteSection}
              >
                UNDO
              </Button>
            </React.Fragment>
          }
        />
      )}
    </div>
  );
}

export default CreateEditForm;
