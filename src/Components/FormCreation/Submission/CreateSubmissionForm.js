import React, { useReducer, useEffect, useState } from "react";
import styled from "styled-components";
import FormSection from "./FormSection";
import * as FORM from "../../../requests/forms.js";
import usePromise from "../../../Hooks/usePromise";
import { defaultFormState } from "./../CreateEditFormStateManagement";
import SubmissionFormHeader from "./SubmissionFormHeader";
import customFormSectionsReducer from "../../../Reducers/CustomFormSectionsReducer";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import moment from "moment";

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

  const [sections, dispatchSectionsUpdate] = useReducer(
    customFormSectionsReducer,
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

  //----------------------------------------------------------------------------
  //SUBMISSION INIT/SAVE FUNCTIONS
  //----------------------------------------------------------------------------

  useEffect(() => {
    if (loadForm.isPending || !loadForm.value) return;

    dispatchSectionsUpdate({
      type: "LOAD",
      sections: loadForm.value.sections
    });
    setHeaderData({
      name: loadForm.value.name,
      description: loadForm.value.description
    });

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

  //Save the form for a final time after hitting submit
  const handleSubmit = () => {
    setSubmitted(true);

    //If preview don't record the response
    if (preview) return;

    //TODO: Save the response
  };

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
                preview
                  ? "Preview Link has been disabled as the form is published"
                  : "This form is closed. If you think this is a mistake, please contact the publisher of this form."
              }
            />
          </FormWrapper>
        </div>
      </div>
    );
  }

  return (
    <div>
      <img
        style={{ display: "center", marginLeft: "25%", marginTop: "10%" }}
        id="image"
        width="640px"
        height="160px"
        alt="header"
      />
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
                key={page + "_section"}
                numSections={sections.length}
                sectionNum={page + 1}
                sectionData={sections[page]}
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
    </div>
  );
}

export default CreateSubmissionForm;
