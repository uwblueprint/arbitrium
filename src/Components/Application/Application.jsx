import React, { useReducer, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Categories from "../Categories/Categories";
import DecisionCanvas from "../DecisionCanvas/DecisionCanvas";
import FlowSelector from "../FlowSelector/FlowSelector";
import Spinner from "react-spinner-material";
import Rating from "../Rating/Rating";

//column categories
import {
  createReview,
  transpileCategoryData,
  transpileFileData,
  transpileLongAnswerData
} from "./applicationDataHelpers";
import { LOAD_REVIEW, reviewReducer } from "./reviewReducer";

import { connect } from "react-redux";
import { newReview } from "../../Actions";
const GET = require("../../requests/get");
const UPDATE = require("../../requests/update");

function Application({ applications, newReview, history, match, user }) {
  const appId = match.params.organizationId;
  const [review, dispatchReviewUpdate] = useReducer(reviewReducer, null);
  const isRated = useRef(false);

  //Returns a review from DB if exists, otherwise null
  useEffect(() => {
    GET.getReviewAPI(user, appId).then((res) => {
      const reviewExists = res != null;
      if (reviewExists) {
        isRated.current = res.rating > -1;
      }
      dispatchReviewUpdate({
        type: LOAD_REVIEW,
        review: reviewExists ? res : createReview(user, appId)
      });
    });
  }, [appId, user]);

  //Updates a review when any update happens from the user
  useEffect(() => {
    if (appId == null || user == null || review == null) {
      return;
    }
    UPDATE.updateReviewAPI(review).then((res) => {
      if (!isRated.current && review.rating > -1) {
        isRated.current = true;
        newReview();
      }
      if (res.ok !== 1) {
        alert("Error in saving your review!");
      }
    });
  }, [appId, newReview, review, user]);

  const [application, appIndex] = useMemo(() => {
    return getApplicationDetails(applications, appId);
  }, [applications, appId]);

  const appData = useMemo(() => {
    if (application == null) return null;
    return {
      categoryData: transpileCategoryData(application),
      fileData: transpileFileData(application),
      longAnswers: transpileLongAnswerData(application)
    };
  }, [application]);

  const previousApplication =
    applications && appIndex > 0
      ? "/submissions/" + applications[appIndex - 1]["_id"]
      : null;
  const nextApplication =
    applications && appIndex < applications.length - 1
      ? "/submissions/" + applications[appIndex + 1]["_id"]
      : null;

  let name = "Loading... (Submission not found)";
  if (application) {
    name = application["Organization Name"];
  }

  return (
    <div className="pagecontainer">
      <FlowSelector>
        <button>1. Letter of Interest</button>
        <button disabled>2. Full Application</button>
      </FlowSelector>
      <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
      <Wrapper>
        <h1>
          <Button
            className="all-applicants"
            onClick={() => history.push("/applications")}
          >
            &lt; All Applicants
          </Button>
          <br />
          {name}
        </h1>
        {/*}<Rubric />*/}
        <hr />
        {applications.length > 0 && application != null ? (
          <div className="application-information">
            <Categories categoryData={appData.categoryData} />
            <hr />
            <span>
              <a
                className="name"
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/open?id=1qS3AOeihtyJD3uL2EDYvN5IK18QCTmoc"
              >
                {" "}
                {"Link to Decision Making Matrix"}
              </a>
            </span>
            {/*}<Files fileData={appData.fileData} />*/}
            <hr />
            <DecisionCanvas
              categoryData={appData.longAnswers}
              update={dispatchReviewUpdate}
              review={review}
            />
            <hr />
            <Rating review={review} update={dispatchReviewUpdate} />
            <hr />
          </div>
        ) : null}
        <ApplicationSelector>
          <Button
            variant="contained"
            color="primary"
            disabled={!previousApplication}
            onClick={() => {
              previousApplication
                ? history.push(previousApplication)
                : console.log("Previous Application doesn't exist");
            }}
          >
            Previous Applicant
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!nextApplication}
            onClick={() => {
              nextApplication
                ? history.push(nextApplication)
                : console.log("Previous Application doesn't exist");
            }}
          >
            Next Applicant
          </Button>
        </ApplicationSelector>
      </Wrapper>
    </div>
  );
}

//Helper function
// returns tuple: [appData, appIndex in appList]
function getApplicationDetails(appList, appId) {
  for (let i = 0; i < appList.length; ++i) {
    const app = appList[i];
    if (app["_id"] === appId) {
      return [app, i];
    }
  }
  return [null, -1];
}

const mapStateToProps = (state) => ({
  applications: state.applications
});

const mapDispatchToProps = {
  newReview
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);

const Wrapper = styled.div`
  margin: 0 auto;
  padding-top: 50px;
  max-width: 800px;
  h1 {
    font-size: 28px;
    font-weight: normal;
    .all-applicants {
      display: block;
      color: #888888;
      border-radius: 0;
      transform: translateX(-4px);
    }
  }
  h2 {
    font-size: 20px;
    font-weight: 500;
  }
  hr {
    border: 0px solid #cccccc;
    border-bottom-width: 1px;
    margin: 20px 0;
  }
`;

const ApplicationSelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 37px;
  button {
    border-radius: 0px;
  }
`;
