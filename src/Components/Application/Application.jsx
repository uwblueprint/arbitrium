import React, { useReducer, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Categories from "../Categories/Categories";
import DecisionCanvas from "../DecisionCanvas/DecisionCanvas";
import Rating from "../Rating/Rating";
import Files from "../Files/Files";
import LoadingOverlay from "../Common/LoadingOverlay";
//column categories
import {
  createReview,
  transpileCategoryData,
  transpileFileData,
  transpileLongAnswerData,
  transpileCheckBoxData
} from "./applicationDataHelpers";
import { LOAD_REVIEW, reviewReducer } from "./reviewReducer";
import { connect } from "react-redux";
import { newReview } from "../../Actions";
import usePromise from "../../Hooks/usePromise";
import * as GET from "../../requests/get";
import * as UPDATE from "../../requests/update";

const PageWrapper = styled.div`
  padding-top: 50px;
`;

const BodyWrapper = styled.div`
  margin: 0 auto;
  padding-left: 80px;
  padding-right: 80px;
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

function Application({ applications, newReview, history, match, user, program }) {

  const appId = match.params.organizationId;
  const [review, dispatchReviewUpdate] = useReducer(reviewReducer, null);
  const isRated = useRef(false);

  // const [loadedReview, refetch] = usePromise(GET.getReviewAPI, {
  //   user,
  //   applicationId: appId
  // });
  //
  // useEffect(() => {
  //   refetch({user, applicationId: appId});
  // }, [])


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

  // // Load the fetched review
  // useEffect(() => {
  //   if (loadedReview.isPending) return;
  //   isRated.current = loadedReview.value.rating > -1;
  //   dispatchReviewUpdate({
  //     type: LOAD_REVIEW,
  //     review: loadedReview.value
  //   });
  // }, [loadedReview]);
  //
  // //Updates a review when the review is changed
  // useEffect(() => {
  //   if (
  //     review == null ||
  //     loadedReview.isPending ||
  //     review === loadedReview.value ||
  //     review.applicationId !== loadedReview.value.applicationId
  //   ) {
  //     // Do not update the review if we are still fetching the review or
  //     // if it has not been modified
  //     return;
  //   }
  //   UPDATE.updateReviewAPI(review).then((res) => {
  //     if (!isRated.current && review.rating > -1) {
  //       isRated.current = true;
  //       newReview();
  //     }
  //     if (res.ok !== 1) {
  //       alert("Error in saving your review!");
  //     }
  //   });
  // }, [loadedReview, newReview, review]);


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

  const [application, appIndex, appData] = useMemo(() => {
    const [_application, _appIndex] = getApplicationDetails(
      applications,
      appId
    );
    let _appData = null;
    if (_application != null) {
      _appData = {
        categoryData: transpileCategoryData(_application, program.databaseName),
        fileData: transpileFileData(_application, program.databaseName),
        longAnswers: transpileLongAnswerData(_application, program.databaseName),
        checkBoxAnswers: transpileCheckBoxData(_application, program.databaseName)
      };
    }
    return [_application, _appIndex, _appData];
  }, [applications, appId]);

  console.log(appData)

  const previousApplication =
    applications && appIndex > 0
      ? "/submissions/" + applications[appIndex - 1]["_id"]
      : null;
  const nextApplication =
    applications && appIndex < applications.length - 1
      ? "/submissions/" + applications[appIndex + 1]["_id"]
      : null;


  return (
    <PageWrapper>
      <LoadingOverlay show={!review} />
      <BodyWrapper>
        <h1>
          <Button
            className="all-applicants"
            onClick={() => history.push("/applications")}
          >
            &lt; All Applicants
          </Button>
          <br />
          {application ? (application["Organization Name"] || application["Organization Name (legal name)"]) : (
            <div>
              <p> This application data is not available at the moment </p>
              <p> Some applications are unavailable due to using an older version of the application. </p>
              <p> Please contact us to have the data migrated (arbitrium@uwblueprint.org) </p>
            </div>
          )}
        </h1>
        {/*}<Rubric />*/}
        <hr />
        {applications.length > 0 && application != null ? (
          <div className="application-information">
            <Categories categoryData={appData.categoryData} />
            <hr />
            <Files fileData={appData.fileData} />
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
      </BodyWrapper>
    </PageWrapper>
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
  applications: state.applications,
  program: state.program
});

const mapDispatchToProps = {
  newReview
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
