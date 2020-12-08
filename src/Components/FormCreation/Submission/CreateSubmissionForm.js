import React, { useReducer, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import FormSection from "./FormSection";
import { AuthContext } from "../../../Authentication/Auth.js";
import * as FORM from "../../../requests/forms.js";
import usePromise from "../../../Hooks/usePromise";
import { defaultFormState } from "./../CreateEditFormStateManagement";
import SubmissionFormHeader from "./SubmissionFormHeader";
import customFormSectionsReducer from "../../../Reducers/CustomFormSectionsReducer";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

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

function CreateSubmissionForm() {
  const classes = useStyles();

  const { appUser } = useContext(AuthContext);
  const [sections, dispatchSectionsUpdate] = useReducer(
    customFormSectionsReducer,
    []
  );
  const [page, setPage] = useState(-1);
  const [loadForm, refetch] = usePromise(FORM.getForm, {
    programId: appUser.currentProgram
  });
  const [headerData, setHeaderData] = useState({
    name: defaultFormState.name,
    description: defaultFormState.description
  });
  const [submitted, setSubmitted] = useState(false);

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

  const norm_progress = (pageNum) => {
    return (pageNum * 100) / sections.length;
  };

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
            {page === sections.length - 1 ? (
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
                  setSubmitted(true);
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
