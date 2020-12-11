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

  //Check to see if this is a preview link or not
  let preview = true;
  if (match.path === "/form/:formId") {
    preview = false;
  }

  const [sections, dispatchSectionsUpdate] = useReducer(
    customFormSectionsReducer,
    []
  );
  const [page, setPage] = useState(-1);

  //Query based on if this is a preview or not
  const [loadForm, refetch] = usePromise(
    preview ? FORM.getFormByPreview : FORM.getFormBySubmission,
    {
      id: match.params.formId
    }
  );
  const [headerData, setHeaderData] = useState({
    name: defaultFormState.name,
    description: defaultFormState.description
  });
  const [submitted, setSubmitted] = useState(false);
  const [validLink, setValidLink] = useState(false);

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
      //Has the form closed? AND is it not a draft?
      setValidLink(
        !moment(link.close).isBefore(moment()) && !loadForm.value.draft
      );
    }
  }, [loadForm, refetch, match.params.formId, preview]);

  // Used to scroll to top when moving between sections
  useEffect(() => {
    window.requestAnimationFrame(() => {
      const element = document.getElementById("root");

      element.scrollIntoView({
        behavior: "smooth",
        alignToTop: true
      });
    });
  }, [page]);

  const handleSubmit = () => {
    setSubmitted(true);

    //If preview don't record the response
    if (preview) return;

    //TODO: Save the response
  };

  // Used to scroll to top when moving between sections
  useEffect(() => {
    window.requestAnimationFrame(() => {
      const element = document.getElementById("root");

      element.scrollIntoView({
        behavior: "smooth",
        alignToTop: true
      });
    });
  }, [page]);

  const norm_progress = (pageNum) => {
    return (pageNum * 100) / sections.length;
  };

  if (!validLink && (!loadForm.isPending || loadForm.value == null)) {
    if (preview) {
      return (
        <div> Preview Link has been disabled as the form is published</div>
      );
    } else {
      return <div> Form has closed!</div>;
    }
  }

  return (
    <div>
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
