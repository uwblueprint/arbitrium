import React from "react";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Spinner from "react-spinner-material";
import AllApplicationsTable from "./AllApplicationsTable";
import { connect } from "react-redux";

import usePromise from "../../../Hooks/usePromise";

import {
  getApplicationTableData,
  getReviewCountAPI
} from "../../../requests/get";

const Wrapper = styled.div`
  margin-top: 150px;
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
  button {
    max-width: 200px;
    padding: 5px 5px;
    font-size: 15px;
    text-transform: none;
  }
`;

function convertToTableData(fetched) {
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
          application["Organization Name (legal name)"],
        lastEdited: application["lastReviewed"],
        applicantLink: (
          <a href={`/submissions/${application._id}`}>
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
  // Applications, with reviews attached
  const [applications] = usePromise(
    getApplicationTableData,
    { user },
    [],
    [program]
  );

  const [reviewCount] = usePromise(
    getReviewCountAPI,
    user.userId,
    [],
    [program]
  );

  return (
    <div>
      <Wrapper>
        <Paper>
          {!applications.isPending && !reviewCount.isPending ? (
            <div>
              <h1 style={{ fontSize: "24px" }}>Candidate Submissions</h1>
              <p style={{ fontSize: "14px" }}>
                {
                  "These are all the candidate submissions. All candidates need to be rated in order to move on to the next step"
                }
              </p>
              <hr />
              <AllApplicationsTable
                reviewCount={reviewCount.value}
                applicationCount={applications.value.length}
                data={convertToTableData(applications.value, program)}
              />
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
