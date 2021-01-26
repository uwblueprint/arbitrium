import React, { useReducer, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import FormSection from "./FormSection";
import * as FORM from "../../../requests/forms.js";
import usePromise from "../../../Hooks/usePromise";
import { defaultFormState } from "./../CreateEditFormStateManagement";
import SubmissionFormHeader from "./SubmissionFormHeader";
import customSubmissionAnswerReducer from "../../../Reducers/CustomSubmissionAnswersReducers";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import moment from "moment";
import * as FILE from "../../../requests/file";
import * as SUBMISSION from "../../../requests/submission";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormSettingsContext from "../FormSettingsContext";

//----------------------------------------------------------------------------
/*
This component behaves similarly to the CreateEditForm but with signifcantly reduced functionality
*/
//----------------------------------------------------------------------------

const useStyles = makeStyles({
  button: {
    marginRight: 11
  },
  sectionProgress: {
    marginTop: 13,
    marginBottom: 13
  }
});

const FormWrapper = styled.div`
  padding-top: 70px;
  padding-left: 15%;
`;

const ButtonGroup = styled.div`
  padding-left: 15%;
  margin-top: 24px;
  display: flex;
  flex-direction: row;
`;

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    width: 300
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 300 : 700]
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#55A94E"
  }
}))(LinearProgress);

function CreateSubmissionForm({ match }) {
  const classes = useStyles();
  const [page, setPage] = useState(-1);
  const [submitted, setSubmitted] = useState(false);
  const [validLink, setValidLink] = useState(false);

  const [headerData, setHeaderData] = useState({
    name: defaultFormState.name,
    description: defaultFormState.description
  });
  const [formSettings, setFormSettings] = useState({
    themeColour: "2261AD",
    headerImage: null,
    confirmationMessage: "Your response has been recorded."
  });

  const [sections, setSections] = useState([]);
  const [identifierQuestion, setIdentifierQuestion] = useState("");
  const [answers, dispatchAnswersUpdate] = useReducer(
    customSubmissionAnswerReducer,
    []
  );

  //----------------------------------------------------------------------------
  //Check to see if Preview or closed
  //----------------------------------------------------------------------------

  //Check to see if this is a preview link
  let preview = true;
  //preview link is "/form-preview/:formId"
  if (match.path === "/form/:formId") {
    preview = false;
  }

  //Query form based on if this is a preview or not
  const [loadForm, refetch] = usePromise(
    preview ? FORM.getFormByPreview : FORM.getFormBySubmission,
    {
      id: match.params.formId
    }
  );

  //Currently no way to load a submission
  //So one will always be created
  const [submissionId, setSubmissionId] = useState(null);
  //Grab the submission
  const [loadSubmission, refetchSubmission] = usePromise(
    SUBMISSION.getSubmission,
    {
      submissionId: submissionId
    },
    null,
    [submissionId]
  );

  //Header image
  const [loadFile] = usePromise(
    FILE.downloadFile,
    {
      bucketname: "arbitrium-public",
      filename: formSettings.headerImage?.replace(
        process.env.REACT_APP_AWS_PUBLIC,
        ""
      ),
      requiresAuth: false
    },
    null,
    [loadForm.settings]
  );

  //----------------------------------------------------------------------------
  //SUBMISSION INIT/SAVE FUNCTIONS
  //----------------------------------------------------------------------------

  //If a form doesn't exist then create a new one from the default template
  const initiateSubmission = useCallback(() => {
    async function initiate() {
      const data = {
        formId: loadForm.value._id,
        linkId: match.params.formId,
        SubmissionDate: null,
        lastSaveDate: moment(),
        answers: [],
        identifier: ""
      };

      const result = await SUBMISSION.createSubmission(data);
      setSubmissionId(result._id);
      refetchSubmission({ submissionId: result._id });
    }
    //Only create a form if this isn't a preview link
    if (!preview) {
      initiate();
    }
  }, [loadForm.value, match.params.formId, refetchSubmission, preview]);

  //Load the form values into the sub-states like in FormCreation
  //The form can't be edited in submissions so this won't be called often.
  useEffect(() => {
    if (loadForm.isPending || !loadForm.value) return;

    setSections(loadForm.value.sections);
    setHeaderData({
      name: loadForm.value.name,
      description: loadForm.value.description
    });
    //Load the form settings
    setFormSettings(loadForm.value.settings);

    //Preview: Is Draft
    //Submission: Not Draft
    if (preview) {
      //Has the form closed? AND is it a draft?
      setValidLink(
        !moment(loadForm.value.previewLink.close).isBefore(moment()) &&
          loadForm.value.draft
      );
    } else {
      const link = loadForm.value.submissionLinks.find(
        (link) => link._id === match.params.formId
      );
      //Has the form closed? AND is it NOT a draft?
      setValidLink(
        !moment(link.close).isBefore(moment()) && !loadForm.value.draft
      );
    }
  }, [loadForm, refetch, match.params.formId, preview]);

  //Similar to above ^
  //Load Submission values into sub-states or create a new submission if null
  useEffect(() => {
    if (loadSubmission.isPending || loadForm.isPending || !loadForm.value)
      return;
    if (!loadSubmission.value) {
      initiateSubmission();
    }

    //Here is where we would load the submission into state
    //Currently we don't allow this functionality

    /*
    dispatchAnswersUpdate({
      type: "LOAD",
      answers: loadSubmission.value.answers
    });
    */
  }, [initiateSubmission, loadSubmission, loadForm]);

  //usecallback prevents functions from being re-created on every render.
  //This is useful when a function is a dependency of useEffect (otherwise you get infinite renders)
  const saveSubmission = useCallback(() => {
    if (
      !loadForm.isPending &&
      loadForm.value &&
      !loadSubmission.isPending &&
      loadSubmission.value
    ) {
      const newSubmission = loadSubmission.value;

      newSubmission.answers = answers;
      newSubmission.lastSaveDate = moment();
      newSubmission.identifier = identifierQuestion;
      newSubmission.submissionDate = submitted ? moment() : null;

      SUBMISSION.updateSubmission(loadSubmission.value._id, newSubmission);
    }
  }, [loadForm, loadSubmission, answers, submitted, identifierQuestion]);

  //Update the submission
  useEffect(() => {
    saveSubmission();
  }, [answers, saveSubmission]);

  const handleSave = (answer) => {
    //The identifier question has its own state
    if (answer.type === "IDENTIFIER") {
      setIdentifierQuestion(answer.answerString);
    }

    //Find the index of the answer if it exists
    const curAnswer = answers.findIndex(
      (ans) =>
        ans.questionId === answer.questionId &&
        ans.sectionId === answer.sectionId
    );

    if (curAnswer !== -1) {
      //replace answer
      dispatchAnswersUpdate({
        type: "EDIT_ANSWER",
        index: curAnswer,
        answer: answer
      });
    } else {
      //new answer
      dispatchAnswersUpdate({
        type: "ADD_ANSWER",
        answer: answer
      });
    }
  };

  //Save the form for a final time after hitting submit
  const handleSubmit = () => {
    if (preview) {
      //Has the form closed? AND is it a draft?
      setValidLink(
        !moment(loadForm.value.previewLink.close).isBefore(moment()) &&
          loadForm.value.draft
      );
    } else {
      const link = loadForm.value.submissionLinks.find(
        (link) => link._id === match.params.formId
      );
      //Has the form closed? AND is it NOT a draft?
      setValidLink(
        !moment(link.close).isBefore(moment()) && !loadForm.value.draft
      );
    }
    setSubmitted(true);
  };

  //Save one last time after the submission screen is shown
  if (submitted) {
    saveSubmission();
  }

  //----------------------------------------------------------------------------
  //PAGE MOVEMENT
  //----------------------------------------------------------------------------

  // Used to scroll to top when moving between sections
  useEffect(() => {
    window.requestAnimationFrame(() => {
      const element = document.getElementById("root");

      element.scrollIntoView({
        behavior: "auto",
        alignToTop: true
      });
    });
  }, [page]);

  const norm_progress = (pageNum) => {
    return (pageNum * 100) / sections.length;
  };

  //----------------------------------------------------------------------------
  //INVALID LINK RENDERS
  //----------------------------------------------------------------------------

  if (!validLink && (!loadForm.isPending || loadForm.value == null)) {
    return (
      <div>
        {" "}
        <div>
          <FormWrapper>
            <SubmissionFormHeader
              name={headerData.name}
              description={
                preview ? (
                  "Preview Link has been disabled as the form is published"
                ) : answers.length === 0 ? (
                  "This form is closed. If you think this is a mistake, please contact the publisher of this form."
                ) : (
                  <div style={{ margin: "16px", paddingBottom: "50px" }}>
                    <h>
                      {
                        "This form is now closed. We've saved a copy of your responses in the backend."
                      }{" "}
                    </h>
                    <h>
                      {
                        "If you think this is a mistake, please contact the publisher of this form."
                      }
                    </h>
                  </div>
                )
              }
            />
          </FormWrapper>
        </div>
      </div>
    );
  }

  //----------------------------------------------------------------------------
  //HEADER
  //----------------------------------------------------------------------------

  let link = "";
  if (!loadFile.isPending && loadFile.value) {
    const bytes = new Uint8Array(loadFile.value.Body.data); // pass your byte response to this constructor
    const blob = new Blob([bytes], { type: "application/octet-stream" }); // change resultByte to bytes
    link = window.URL.createObjectURL(blob);
  } else {
    link = "";
  }

  const formId = loadSubmission.value != null && loadSubmission.value.formId;
  const Id = loadSubmission.value && loadSubmission.value._id;
  const fileUploadURL = "forms/" + formId + "/" + Id + "/";

  return (
    <div>
      <FormSettingsContext.Provider value={formSettings}>
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
        {submitted ? (
          <div>
            <FormWrapper>
              <SubmissionFormHeader
                name={headerData.name}
                description={"Your response has been recorded"}
              />
            </FormWrapper>
          </div>
        ) : (
          <div>
            <FormWrapper key={page} id={"section_" + page}>
              <SubmissionFormHeader {...headerData} />
              {page !== -1 && sections && page < sections.length ? (
                <FormSection
                  saveAnswer={handleSave}
                  key={page + "_section"}
                  numSections={sections.length}
                  sectionNum={page + 1}
                  sectionData={sections[page]}
                  fileUploadURL={fileUploadURL}
                />
              ) : null}
              {page === sections.length - 1 && !loadForm.isPending ? (
                <div style={{ marginTop: 10 }}>
                  By clicking &quot;Submit&quot;, your application will be
                  submitted to the owner of this form.{" "}
                </div>
              ) : (
                <div></div>
              )}
            </FormWrapper>
            <ButtonGroup>
              <Button
                variant="outlined"
                className={classes.button}
                disabled={page === -1}
                color="primary"
                onClick={() => setPage(page - 1)}
              >
                Back
              </Button>
              {page === sections.length - 1 ? (
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  className={classes.button}
                  disabled={page === sections.length - 1}
                  color="primary"
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              )}
              {page === -1 ? (
                <div></div>
              ) : (
                <div style={{ width: 500, marginLeft: 140 }}>
                  <BorderLinearProgress
                    variant="determinate"
                    value={norm_progress(page + 1)}
                  />
                  Section {page + 1} of {sections.length}
                </div>
              )}
            </ButtonGroup>
          </div>
        )}
      </FormSettingsContext.Provider>
    </div>
  );
}

export default CreateSubmissionForm;
