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
  const [showMoveSectionsDialog, setShowMoveSectionsDialog] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const programId = appUser.currentProgram;
  const [loadForm, refetch] = usePromise(FORM.getForm, {
    programId: appUser.currentProgram
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

  //----------------------------------------------------------------------------
  //FORM INIT/SAVE FUNCTIONS
  //----------------------------------------------------------------------------

  const saveForm = useCallback(() => {
    if (!loadForm.isPending && loadForm.value && sections !== []) {
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
  }, [loadForm, appUser, refetch, initiateForm]);

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
  //FORM HEADER UPDATE / CUSTOMIZATION
  //----------------------------------------------------------------------------

  async function updateHeader(title, description) {
    const newForm = loadForm.value;
    newForm.description = description;
    newForm.name = title;
    newForm.sections = sections;
    await FORM.updateForm(loadForm.value._id, newForm);
  }

  //TODO: Add header customization here
  return (
    <div>
      <CreateEditFormHeader
        {...headerData}
        onChange={updateHeader}
        id={"header_" + 1}
        key={1}
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
      {sections &&
        sections.map((section, key) => (
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
        ))}
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
