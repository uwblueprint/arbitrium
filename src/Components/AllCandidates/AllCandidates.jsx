import React, { useMemo, useRef, useContext } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Spinner from "react-spinner-material";
import AllCandidatesTable from "./AllCandidatesTable";
import { CSVLink } from "react-csv";
import moment from "moment";
import usePromise from "../../Hooks/usePromise";
import { createForm } from "../../requests/forms";
import { AuthContext } from "../../Authentication/Auth.js";
import { defaultFormState } from "../FormCreation/CreateEditFormStateManagement";

import {
  getCandidateSubmissions,
  getAllUsersAPI,
  getAllRankingsAPI,
  getAllReviewsAPI
} from "../../requests/get";

const HiddenCSVLink = styled(CSVLink)`
  display: none;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    h1 {
      font-size: 24px;
      font-weight: normal;
      font-size: 24px;
      display: inline-block;
      margin-right: auto;
    }
    .button-container {
      display: inline-block;
    }
  }
`;

const Wrapper = styled.div`
  margin-top: 50px;
  padding: 0 136px;
  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 36px;
    width: 90vw;
    margin: 0;
    text-align: left;
  }
  .table {
    max-width: 864px;
    margin: 0 auto;
  }
  table.MuiTable-root {
    border: 1px solid #cccccc;
  }
  button {
    max-width: 200px;
    padding: 5px 5px;
    text-transform: none;
    font-size: 15px;
  }
`;

function convertToTableData(applications) {
  if (applications == null) return [];
  return applications.map((application) => ({
    avgRanking: application.avgRanking,
    candidateName: application.candidateName || application.candidateName2,
    avgRating: application.avgRating || 0,
    numReviews: application.numReviews,
    candidateLink: (
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
  }));
}

async function getComments({ applications }) {
  if (applications == null || applications.length === 0) return [];
  const reviews = await getAllReviewsAPI();
  const appsMap = {};
  applications.forEach((app) => (appsMap[app._id] = app));
  let commentsSortedByApp = [];
  reviews.forEach((review) => {
    if (
      appsMap[review.applicationId] == null ||
      (process.env.REACT_APP_NODE_ENV !== "development" &&
        (review.email.endsWith("uwblueprint.org") ||
          review.email.endsWith("test.com")))
    ) {
      return;
    }
    const comments = [...review.comments];
    review.questionList.forEach((question) => comments.concat(question.notes));
    // Push application name
    commentsSortedByApp.push({
      Name: `${appsMap[review.applicationId].candidateName ||
        appsMap[review.applicationId].candidateName2} (Total Commenters: ${
        comments.length
      })`,
      Comments: ""
    });
    // Push application comments
    commentsSortedByApp = commentsSortedByApp.concat(
      comments.map((c) => ({
        Name: "",
        Comments: c.value
      }))
    );
    commentsSortedByApp.push({
      Name: "",
      Comment: ""
    });
  });
  return commentsSortedByApp;
}

async function getCandidateSubmissionInfo() {
  const rankings = await getAllRankingsAPI();
  const applications = await getCandidateSubmissions();

  const appIdToAverageRanking = {};
  applications.forEach((app) => (appIdToAverageRanking[app._id] = []));
  rankings.forEach((rank) => {
    rank.applications.forEach(
      (app, ind) =>
        appIdToAverageRanking[app.appId] &&
        appIdToAverageRanking[app.appId].push(ind + 1)
    );
  });
  // Convert arrays to averages
  return applications.map((app) => {
    const numRankings = appIdToAverageRanking[app._id].length;
    const rankingsSum = appIdToAverageRanking[app._id].reduce(
      (sum, val) => sum + val,
      0
    );
    const avgRanking =
      numRankings > 0
        ? parseFloat((rankingsSum / numRankings).toFixed(2))
        : "No Rankings";
    return {
      ...app,
      avgRanking,
      numReviews: app.numReviews
    };
  });
}

function AllCandidates({ history, program }) {
  // eslint-disable-next-line no-unused-vars
  const { currentUser, appUser } = useContext(AuthContext);
  const [applications] = usePromise(getCandidateSubmissionInfo, {}, []);
  const [allUsers] = usePromise(getAllUsersAPI, {}, []);
  const [comments] = usePromise(
    getComments,
    { applications: applications.value },
    []
  );
  const commentsDownloadLink = useRef();
  const appsDownloadLink = useRef();

  const totalReviewers = useMemo(
    () =>
      allUsers.value.filter(
        (user) =>
          Array.isArray(user.programs) &&
          program &&
          user.programs.some((p) => p.id === program) &&
          !user.email.includes("uwblueprint.org") &&
          !user.email.includes("test.com")
      ).length,
    [allUsers, program]
  );

  function exportAllData() {
    commentsDownloadLink.current.link.click();
    appsDownloadLink.current.link.click();
  }

  async function initiateForm() {
    const data = {
      formId: program,
      name: defaultFormState.name,
      description: defaultFormState.description,
      createdBy: appUser.userId,
      draft: true,
      sections: defaultFormState.sections
    };
    const res = await createForm(data);
    if (res) {
      history.push("/admin/form/" + program);
    }
  }

  const dataReady = !(applications.isPending || allUsers.isPending);
  const applicationsCSVFilename = `Ratings and Rankings - ${moment().format(
    "DD-MM-YYYY hh-mm-ss"
  )}.csv`;
  const commentsCSVFilename = `Comments - ${moment().format(
    "DD-MM-YYYY hh-mm-ss"
  )}.csv`;

  return (
    <Wrapper>
      {dataReady ? (
        <div>
          <Header>
            <h1 style={{ color: "black" }}>All Candidates</h1>
            <div className="button-container">
              <Button
                variant="contained"
                color="primary"
                target="_blank"
                value="CreateForm"
                style={{ width: "250px", maxWidth: "250px" }}
                onClick={initiateForm}
              >
                Create form
              </Button>
            </div>
            <div className="button-container">
              <Button
                variant="contained"
                color="primary"
                target="_blank"
                value="OpenCommittee"
                style={{
                  width: "250px",
                  maxWidth: "250px",
                  marginLeft: "10px"
                }}
                onClick={() => {
                  history.push("/admin/committeereview");
                }}
              >
                View committee review
              </Button>
            </div>
            <div className="button-container">
              <HiddenCSVLink
                ref={appsDownloadLink}
                filename={applicationsCSVFilename}
                // eslint-disable-next-line no-unused-vars
                data={applications.value.map(({ _id, ...item }) => item)}
              />
              <HiddenCSVLink
                ref={commentsDownloadLink}
                filename={commentsCSVFilename}
                data={comments.value}
              />
              <Button
                variant="contained"
                color="primary"
                target="_blank"
                value="ExportData"
                disabled={applications.isPending || comments.isPending}
                style={{
                  width: "250px",
                  maxWidth: "250px",
                  marginLeft: "10px"
                }}
                onClick={exportAllData}
              >
                Export data
              </Button>
            </div>
          </Header>
          <AllCandidatesTable
            data={convertToTableData(applications.value)}
            totalReviews={totalReviewers}
            style={{ marginBottom: "30px" }}
          />
        </div>
      ) : (
        <div>
          <h4>Loading All Candidates...</h4>
          <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
        </div>
      )}
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  program: state.program
});

export default connect(mapStateToProps)(AllCandidates);
