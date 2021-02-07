import React, { useState, useEffect, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Spinner from "react-spinner-material";
import AllApplicationsTable from "./AllApplicationsTable";
import { connect } from "react-redux";
import usePromise from "../../Hooks/usePromise";
import { ProgramContext } from "../../Contexts/ProgramContext";

import { getApplicationTableData } from "../../requests/get";

import * as SUBMISSION from "../../requests/submission";

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 0 136px;
  text-align: left;
  padding-bottom: 30px;
  h1 {
    font-size: 24px;
    font-weight: normal;
  }
  table.MuiTable-root {
    border: 1px solid #cccccc;
  }
  a {
    text-decoration: none;
  }
  button {
    max-width: 200px;
    padding: 5px 5px;
    font-size: 15px;
    text-transform: none;
  }
`;

function convertToTableData(fetched, appVersion) {
  if (!fetched) {
    return;
  }
  const applicantsList = [];
  if (fetched !== null) {
    fetched.forEach((application) => {
      applicantsList.push({
        rating:
          !application.rating || application.rating === -1
            ? "Not Rated"
            : application.rating,
        applicantName:
          application["Organization Name"] ||
          application["Organization Name (legal name)"] ||
          application["identifier"],
        lastEdited: application["lastReviewed"],
        applicantLink: (
          <a
            href={
              appVersion === 1
                ? `/submissions/legacy/${application._id}`
                : `/submissions/${application._id}`
            }
          >
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              value="OpenApplication"
            >
              Open
            </Button>
          </a>
        )
      });
    });
  }
  return applicantsList;
}

function AllApplications({ user, program }) {
  //We now have two version of submissions
  //1: From google forms
  //2: From in house form creation

  const [applications, setApplications] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);

  const programContext = useContext(ProgramContext);

  // Applications, with rating attached
  //We don't use the applications in the program Context because it doesn't include reviews
  //And we want it to be read only as we don't want to reload the context (and the entire app) each review
  const [loadApplications] = usePromise(
    programContext.appVersion !== 1
      ? SUBMISSION.getSubmissionTableData
      : getApplicationTableData,
    { user, program },
    null,
    [program]
  );

  useEffect(() => {
    if (
      loadApplications.isPending ||
      !loadApplications.value ||
      loadApplications.error
    ) {
      return;
    }
    console.log(loadApplications);
    setApplications(loadApplications.value);
    setReviewCount(programContext.reviewCount);
  }, [loadApplications, programContext]);

  return (
    <div>
      <Wrapper>
        <Paper>
          {!loadApplications.isPending && loadApplications.value ? (
            <div>
              <h1 style={{ fontSize: "24px" }}>Candidate Submissions</h1>
              <p style={{ fontSize: "14px" }}>
                {"These are all the candidate submissions."}
                <b>
                  {
                    " All candidates need to be rated in order to move on to the next step."
                  }
                </b>
              </p>
              <AllApplicationsTable
                reviewCount={reviewCount}
                applicationCount={applications && applications.length}
                data={convertToTableData(
                  applications,
                  programContext.appVersion
                )}
              />
              <hr />
            </div>
          ) : (
            <div>
              <h1>Loading Applications...</h1>
              <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
            </div>
          )}
        </Paper>
      </Wrapper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  program: state.program
});

export default connect(mapStateToProps)(AllApplications);
