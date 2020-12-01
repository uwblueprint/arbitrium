import React, { useReducer, useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import CreateEditFormMoveSectionDialog from "./CreateEditFormMoveSectionDialog";
import ControlledDialogTrigger from "../Common/Dialogs/DialogTrigger";
import { DragDropContext } from "react-beautiful-dnd";

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
  const classes = useStyles();
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
  const [deletedSection, setDeletedSection] = useState(null);

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
    if (deletedSection && activeSection !== deletedSection.index) {
      setDeletedSection(null);
    }
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
    const section = sections[activeSection];

    const response = FORM.deleteSection(loadForm.value._id, section._id)
      .then(() => {
        setDeletedSection({
          index: activeSection,
          sectionId: section._id,
          name: section.name
        });

        dispatchSectionsUpdate({
          type: "DELETE_SECTION",
          index: activeSection
        });
        updateActiveSection(activeSection !== 0 ? activeSection - 1 : 0);
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
      deletedSection.sectionId
    )
      .then(() => {
        dispatchSectionsUpdate({
          type: "LOAD",
          sections: loadForm.value.sections
        });

        updateActiveSection(deletedSection.index);
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

  async function reorderQuestion(
    sectionIndex,
    sectionTargetIndex,
    questionIndex,
    questionTargetIndex
  ) {
    const sectionsCopy = sections.map((section) => ({ ...section }));
    const questionRemovedArray = Array.from(
      sectionsCopy[sectionIndex].questions
    );
    const [movedQuestion] = questionRemovedArray.splice(questionIndex, 1);

    if (sectionIndex === sectionTargetIndex) {
      questionRemovedArray.splice(questionTargetIndex, 0, movedQuestion);
    } else {
      const questionAddArray = Array.from(
        sectionsCopy[sectionTargetIndex].questions
      );
      questionAddArray.splice(questionTargetIndex, 0, movedQuestion);
      sectionsCopy[sectionTargetIndex].questions = questionAddArray;
    }

    sectionsCopy[sectionIndex].questions = questionRemovedArray;

    const newForm = await FORM.updateSection(
      appUser.currentProgram,
      sectionsCopy
    );
    if (newForm == null) return;

    dispatchSectionsUpdate({
      type: "LOAD",
      sections: newForm.sections
    });
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // return if item was dropped outside

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    reorderQuestion(
      parseInt(source.droppableId),
      parseInt(destination.droppableId),
      source.index,
      destination.index
    );
  };

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
      <DragDropContext onDragEnd={onDragEnd}>
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
      </DragDropContext>
      {showDeleteSectionConfirmation && (
        <>
          <DialogOverlay />
          <DeleteSectionConfirmation
            confirm={deleteSection}
            close={closeDeleteSectionConfirmation}
            sectionName={sections[activeSection].name}
            questionCount={sections[activeSection].questions.length}
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
            deletedSection ? '"' + deletedSection.name + '" deleted' : ""
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
