import React, { useReducer, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import ApplicationView from "./ApplicationView";
import FlowSelector from "../FlowSelector/FlowSelector";
import Files from "../Files/Files";
import Rating from "../Rating/Rating";
import Spinner from "react-spinner-material";

//column categories
import {
  createReview,
  transpileCategoryData,
  transpileFileData,
  transpileLongAnswerData
} from "./applicationDataHelpers";
import { LOAD_REVIEW, reviewReducer } from "./reviewReducer";

import { connect } from "react-redux";
import { NEW_REVIEW } from "../../Constants/ActionTypes";
const GET = require("../../requests/get");
const UPDATE = require("../../requests/update");

function Application({
  applications,
  dispatch,
  history,
  match,
  user,
  isAdminView = true
}) {
  const appId = match.params.organizationId;
  const [review, dispatchReviewUpdate] = useReducer(reviewReducer, null);
  const isRated = useRef(false);

  //Returns a review from DB if exists, otherwise null
  useEffect(() => {
    GET.getReviewAPI(user, appId).then(res => {
      const reviewExists = res != null && res.length > 0;
      if (reviewExists) {
        isRated.current = res[0].rating > -1;
      }
      dispatchReviewUpdate({
        type: LOAD_REVIEW,
        review: reviewExists ? res[0] : createReview(user, appId)
      });
    });
  }, [appId, user]);

  //Updates a review when any update happens from the user
  useEffect(() => {
    if (appId == null || user == null || review == null) {
      return;
    }
    UPDATE.updateReviewAPI(review).then(res => {
      if (!isRated.current && review.rating > -1) {
        isRated.current = true;
        dispatch({ type: NEW_REVIEW });
      }
      if (res.ok !== 1) {
        alert("Error in saving your review!");
      }
    });
  }, [appId, dispatch, review, user]);

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
        <ApplicationView
          isAdminView={isAdminView}
          appData={appData}
          previousApplication={previousApplication}
          nextApplication={nextApplication}
          organizationName={name}
          review={review}
          dispatchReviewUpdate={dispatchReviewUpdate}
          history={history}
        />
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

const mapStateToProps = state => ({
  applications: state.applications
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

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
