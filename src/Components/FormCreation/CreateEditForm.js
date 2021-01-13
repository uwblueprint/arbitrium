import React, {
  useReducer,
  useEffect,
  useState,
  useContext,
  useCallback
} from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import FormSection from "./FormSection";
import { AuthContext } from "../../Authentication/Auth.js";
import * as FORM from "../../requests/forms.js";
import usePromise from "../../Hooks/usePromise";
import CreateEditFormHeader from "./CreateEditFormHeader";
import PublishedFormHeader from "./PublishedFormHeader";
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
import moment from "moment";
import * as FILE from "../../requests/file";
import CircularProgress from "@material-ui/core/CircularProgress";

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
function CreateEditForm({ programId }) {
  const classes = useStyles();
  const { appUser } = useContext(AuthContext);
  const [sections, dispatchSectionsUpdate] = useReducer(
    customFormSectionsReducer,
    []
  );

  const [showFormSettings, setShowFormSettings] = useState(false);
  const [showMoveSectionsDialog, setShowMoveSectionsDialog] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  //const programId = appUser.currentProgram;

  //Only GET and UPDATE form uses programId, every other form update uses formId
  const [loadForm, refetch] = usePromise(
    FORM.getForm,
    {
      programId: programId
    },
    null,
    [programId]
  );
  const [formSettings, setFormSettings] = useState({
    themeColour: "2261AD",
    headerImage: null,
    confirmationMessage: "Your response has been recorded."
  });
  const [loadFile] = usePromise(
    FILE.downloadFile,
    {
      bucketname: "arbitrium-public",
      filename: formSettings.headerImage?.replace(
        process.env.REACT_APP_AWS_PUBLIC,
        ""
      )
    },
    null,
    [loadForm.settings]
  );
  const [headerData, setHeaderData] = useState({
    name: defaultFormState.name,
    description: defaultFormState.description
  });
  const [isPublished, setPublished] = useState(false);
  const [previewLink, setPreviewLink] = useState(
    "Loading Link... Please wait..."
  );
  const [applicantLink, setApplicantLink] = useState(
    "Loading Link... Please wait"
  );

  const submissionLink = window.location.protocol + "//" + window.location.host;

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

  //----------------------------------------------------------------------------
  //FORM INIT/SAVE FUNCTIONS
  //----------------------------------------------------------------------------

  //usecallback prevents functions from being re-created on every render.
  //This is useful when a function is a dependency of useEffect (otherwise you get infinite renders)
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
        sections: defaultFormState.sections,
        settings: {
          themeColour: "2261AD",
          confirmationMessage: "Your response has been recorded.",
          headerImage: null
        },
        previewLink: defaultFormState.previewLink,
        submissionLinks: defaultFormState.submissionLinks
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
    //Load the form settings
    setFormSettings(loadForm.value.settings);

    setPublished(!loadForm.value.draft);
    setPreviewLink(
      submissionLink + "/form-preview/" + loadForm.value.previewLink._id
    );

    //Submission links are stored in an array. Right now we support one open at a time which will be the last element in the array
    setApplicantLink(
      submissionLink +
        "/form/" +
        loadForm.value.submissionLinks[
          loadForm.value.submissionLinks.length - 1
        ]._id
    );

    //Set the active form to be the first one
    //updateActiveSection(0);
  }, [loadForm, appUser, initiateForm, submissionLink]);

  //When the sections changes we will update the form.
  //1. When an input on the section card itself changes focus OR
  //2. The section changes focus in general
  useEffect(() => {
    saveForm();
  }, [sections, saveForm]);

  /*****************************************************************************
   * Form customization
   *****************************************************************************/

  const onFormSettingsSave = useCallback(
    (newSettings) => {
      setFormSettings(newSettings);
      const newForm = {
        ...loadForm.value,
        settings: newSettings
      };
      FORM.updateForm(loadForm.value._id, newForm);
    },
    [loadForm.value]
  );

  const handleOpenFormSettings = useCallback(() => {
    setShowFormSettings(true);
  }, []);

  const handleCloseFormSettings = useCallback(() => {
    setShowFormSettings(false);
  }, []);

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

  async function publishForm() {
    const newForm = loadForm.value;
    newForm.sections = sections;
    newForm.draft = false;
    newForm.previewLink.close = moment();
    await FORM.updateForm(loadForm.value._id, newForm);
    refetch({ programId: programId });
  }

  async function handleSaveFormAccess(date) {
    const newForm = loadForm.value;
    newForm.sections = sections;

    //if date == null then the form doesn't have a closing date
    //i.e user has selected to close it manually vs schedule
    if (date) {
      newForm.submissionLinks[
        loadForm.value.submissionLinks.length - 1
      ].close = moment(date);
    } else {
      newForm.submissionLinks[
        loadForm.value.submissionLinks.length - 1
      ].close = null;
    }

    await FORM.updateForm(loadForm.value._id, newForm);
    refetch({ programId: programId });
  }

  async function openFormWithNewLink() {
    const newForm = loadForm.value;
    newForm.sections = sections;
    //defaultFormState.previewLink is a default link object
    newForm.submissionLinks.push(defaultFormState.previewLink);
    await FORM.updateForm(loadForm.value._id, newForm);
    refetch({ programId: programId });
  }

  let link = "";
  if (!loadFile.isPending && loadFile.value) {
    const bytes = new Uint8Array(loadFile.value.Body.data); // pass your byte response to this constructor
    const blob = new Blob([bytes], { type: "application/octet-stream" }); // change resultByte to bytes
    link = window.URL.createObjectURL(blob);
  } else {
    link = "";
  }

  //----------------------------------------------------------------------------

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
        {isPublished ? (
          <PublishedFormHeader
            submissionLink={applicantLink}
            handleSaveFormAccess={handleSaveFormAccess}
            linkData={
              loadForm.value.submissionLinks[
                loadForm.value.submissionLinks.length - 1
              ]
            }
            openFormWithNewLink={openFormWithNewLink}
            id={"header_" + 1}
            key={1}
          />
        ) : (
          <div>
            <CreateEditFormHeader
              {...headerData}
              onChange={updateHeader}
              previewLink={previewLink}
              handlePublish={publishForm}
              id={"header_" + 1}
              key={1}
              onFormSettingsClick={handleOpenFormSettings}
            />
            <FormSettingsDrawer
              key={formSettings.headerImage}
              open={showFormSettings}
              handleCloseFormSettings={handleCloseFormSettings}
              onSave={onFormSettingsSave}
              headerFile={link}
              programId={programId}
            />
          </div>
        )}
        <ControlledDialogTrigger
          showDialog={showMoveSectionsDialog}
          Dialog={CreateEditFormMoveSectionDialog}
          dialogProps={{
            onClose: closeMoveSectionDialog,
            onSubmit: handleMoveSection,
            initSections: sections
          }}
        />
        {formSettings.headerImage ? (
          link !== "" ? (
            <img
              key={link}
              alt="header"
              style={{ display: "flex", paddingLeft: "20%", marginTop: "5%" }}
              src={link}
              width="640px"
              height="160px"
            ></img>
          ) : (
            <CircularProgress
              style={{ display: "center", marginLeft: "40%", marginTop: "5%" }}
            />
          )
        ) : null}
        <DragDropContext onDragEnd={onDragEnd}>
          {sections &&
            sections.map((section, key) => (
              <div key={uniquekey + section._id}>
                <FormWrapper key={section._id} id={"section_" + key}>
                  <FormSection
                    key={key + "_section"}
                    formId={loadForm.value._id}
                    numSections={sections.length}
                    refetch={refetch}
                    sectionNum={key + 1}
                    sectionData={section}
                    questionData={section.questions}
                    updateActiveSection={updateActiveSection}
                    setInitialActiveQuestion={setInitialActiveQuestion}
                    initialActiveQuestion={initialActiveQuestion}
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
          <div>
            <Snackbar
              ContentProps={{ classes: { root: classes.snackbar } }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
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
          </div>
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
      </FormSettingsContext.Provider>
    </div>
  );
}

const mapStateToProps = (state) => ({
  programId: state.program
});

export default connect(mapStateToProps)(CreateEditForm);
