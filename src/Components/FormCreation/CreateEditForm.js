import React, {
  useReducer,
  useEffect,
  useState,
  useContext,
  useCallback
} from "react";
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
import FormSettingsDrawer from "./FormSettingsDrawer";
import FormSettingsContext from "./FormSettingsContext";

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

//Users can access this page in two ways
//1. By clicking on the form from within a table
//TODO: 2. By pasting the url with the programId in it

//In case 2 we will update the program to the one in the ID, so the proper form
//will load. In the event they don't have admin access to the program they will
//denied access
function CreateEditForm() {
  const classes = useStyles();
  const { appUser } = useContext(AuthContext);
  const [sections, dispatchSectionsUpdate] = useReducer(
    customFormSectionsReducer,
    []
  );

  const [formSettings, setFormSettings] = useState({
    themeColour: "2261AD",
    headerImage: null,
    confirmationMessage: "Your response has been recorded."
  });

  const [showFormSettings, setShowFormSettings] = useState(false);
  const [showMoveSectionsDialog, setShowMoveSectionsDialog] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const programId = appUser.currentProgram;

  //Only GET and UPDATE form uses programId, every other form update uses formId
  const [loadForm, refetch] = usePromise(FORM.getForm, {
    programId: appUser.currentProgram
  });
  const [headerData, setHeaderData] = useState({
    name: defaultFormState.name,
    description: defaultFormState.description
  });

  //1. Used when a drag finishes to indiate which question should be active afterwards
  //2. For the purposes of drag and drop, the child section can set its inital active question
  //   And then call the parent to refetch the entire form (so it has all the question changes including _ids)
  //   Without this, adding a question and then moving it creates un-intended behavior
  //   (A child only calls this when a question is added/deleted so the parent can update itself with changes only made in the child)
  const [initialActiveQuestion, setInitialActiveQuestion] = useState(0);

  const [
    showDeleteSectionConfirmation,
    setShowDeleteSectionConfirmation
  ] = useState(false);
  const [deletedSection, setDeletedSection] = useState(null);

  /*****************************************************************************
   * Form customization
   *****************************************************************************/

  const onFormSettingsSave = useCallback((newSettings) => {
    setFormSettings(newSettings);
  }, []);

  const handleOpenFormSettings = useCallback(() => {
    setShowFormSettings(true);
  }, []);

  const handleCloseFormSettings = useCallback(() => {
    setShowFormSettings(false);
  }, []);

  //----------------------------------------------------------------------------
  //FORM INIT/SAVE FUNCTIONS
  //----------------------------------------------------------------------------

  const saveForm = useCallback(() => {
    if (
      !loadForm.isPending &&
      loadForm.value &&
      sections.length > 0 &&
      sections !== loadForm.value.sections
    ) {
      const newForm = loadForm.value;
      newForm.sections = sections;
      FORM.updateForm(loadForm.value._id, newForm);
    }
  }, [sections, loadForm.value, loadForm.isPending]);

  //If a form doesn't exist then create a new one from the default template
  const initiateForm = useCallback(() => {
    async function initiate() {
      const data = {
        programId: programId,
        name: defaultFormState.name,
        description: defaultFormState.description,
        createdBy: appUser.userId,
        draft: true,
        sections: defaultFormState.sections
      };

      await FORM.createForm(data);
      refetch({ programId: programId });
    }
    initiate();
  }, [appUser, refetch, programId]);

  useEffect(() => {
    if (loadForm.isPending) return;
    if (!loadForm.value) {
      //Create a form and refetch
      initiateForm();
      return;
    }
    //Check to see if it is still null after initalizing
    if (loadForm.value == null) return;

    //Load the sections Data
    dispatchSectionsUpdate({
      type: "LOAD",
      sections: loadForm.value.sections
    });
    //Load the headerData
    setHeaderData({
      name: loadForm.value.name,
      description: loadForm.value.description
    });

    //Set the active form to be the first one
    //updateActiveSection(0);
  }, [loadForm, appUser, initiateForm]);

  //When the sections changes we will update the form.
  //1. When an input on the section card itself changes focus OR
  //2. The section changes focus in general
  useEffect(() => {
    saveForm();
  }, [sections, saveForm]);

  //----------------------------------------------------------------------------
  //UPDATE/ADD/MOVE SECTION
  //----------------------------------------------------------------------------

  //Save the current section and update the current section
  async function updateActiveSection(sectionKey) {
    //Remove the ability to undo if the section changed
    if (deletedSection && activeSection !== deletedSection.index) {
      setDeletedSection(null);
    }

    if (sectionKey === activeSection) {
      return;
    }

    //Scroll to the new active section
    window.requestAnimationFrame(() => {
      const element = document.getElementById("section_" + sectionKey);

      //If the element is the first section; scroll to the top instead of center
      if (element) {
        if (sectionKey === 0) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "end"
          });
        } else {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      }
    });

    //Update section if it changed
    if (activeSection !== sectionKey) {
      setActiveSection(sectionKey);
    }
  }

  async function handleAddSection() {
    const newForm = await FORM.createSection(loadForm.value._id, {
      section: defaultNewSection,
      index: activeSection + 1
    });
    updateActiveSection(activeSection + 1);
    await dispatchSectionsUpdate({
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
    const newForm = await FORM.updateSections(
      loadForm.value._id,
      reorderedSections
    );

    if (newForm == null) return;
    dispatchSectionsUpdate({
      type: "LOAD",
      sections: newForm.sections
    });
  }

  //----------------------------------------------------------------------------
  //UPDATE CARD CONTENTS
  //----------------------------------------------------------------------------

  function handleTitleUpdate(title) {
    dispatchSectionsUpdate({
      type: "EDIT_TITLE",
      index: activeSection,
      title: title
    });
  }

  function handleDescriptionUpdate(description) {
    dispatchSectionsUpdate({
      type: "EDIT_DESCRIPTION",
      index: activeSection,
      description: description
    });
  }

  function handleSectionTypeUpdate(sectionType) {
    dispatchSectionsUpdate({
      type: "EDIT_SECTION_TYPE",
      index: activeSection,
      sectionType: sectionType
    });
  }

  function closeMoveSectionDialog() {
    setShowMoveSectionsDialog(false);
  }

  //----------------------------------------------------------------------------
  //DELETE/UNDO-DELETE SECTION
  //----------------------------------------------------------------------------

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

  //----------------------------------------------------------------------------
  //DRAG/DROP QUESTIONS
  //----------------------------------------------------------------------------

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

    dispatchSectionsUpdate({
      type: "LOAD",
      sections: sectionsCopy
    });

    //Set the updated active section/question after moving
    setInitialActiveQuestion(questionTargetIndex);
    updateActiveSection(sectionTargetIndex);
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

  //----------------------------------------------------------------------------
  //FORM HEADER UPDATE / CUSTOMIZATION
  //----------------------------------------------------------------------------

  async function updateHeader(title, description) {
    const newForm = loadForm.value;
    newForm.description = description;
    newForm.name = title;
    newForm.sections = sections;
    await FORM.updateForm(loadForm.value._id, newForm);
  }

  //When we move a question/section this uniquekey string will be changed
  //which will cause a complete re-render of the formSections
  let uniquekey = "";
  sections.forEach((section) => {
    uniquekey += section._id;
    section.questions.forEach((question) => {
      uniquekey += question._id;
    });
  });

  return (
    <div>
      <FormSettingsContext.Provider value={formSettings}>
        <CreateEditFormHeader
          {...headerData}
          onChange={updateHeader}
          id={"header_" + 1}
          key={1}
          onFormSettingsClick={handleOpenFormSettings}
        />
        <FormSettingsDrawer
          open={showFormSettings}
          handleCloseFormSettings={handleCloseFormSettings}
          onSave={setFormSettings}
        />
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
            sections.map((section, key) => (
              <div key={uniquekey + section._id}>
                <FormWrapper key={section._id} id={"section_" + key}>
                  <FormSection
                    key={key + "_section"}
                    numSections={sections.length}
                    sectionNum={key + 1}
                    sectionData={section}
                    updateActiveSection={updateActiveSection}
                    active={activeSection === key}
                    handleAddSection={handleAddSection}
                    handleTitleUpdate={handleTitleUpdate}
                    handleDescriptionUpdate={handleDescriptionUpdate}
                    handleSectionTypeUpdate={handleSectionTypeUpdate}
                    handleMoveSection={handleMoveSection}
                    handleDeleteSection={handleDeleteSection}
                    setShowMoveSectionsDialog={setShowMoveSectionsDialog}
                  />
                </FormWrapper>
              </div>
            ))}
        </DragDropContext>
        <ControlledDialogTrigger
          showDialog={showDeleteSectionConfirmation}
          Dialog={DeleteSectionConfirmation}
          dialogProps={{
            confirm: deleteSection,
            close: closeDeleteSectionConfirmation,
            sectionName: sections.length && sections[activeSection].name,
            questionCount:
              sections.length && sections[activeSection].questions.length
          }}
        />
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
      </FormSettingsContext.Provider>
    </div>
  );
}

export default CreateEditForm;
