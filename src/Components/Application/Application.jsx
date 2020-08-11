import React, { useReducer, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Categories from "../Categories/Categories";
import DecisionCanvas from "../DecisionCanvas/DecisionCanvas";
import Rating from "../Rating/Rating";
import Files from "../Files/Files";
import LoadingOverlay from "../Common/LoadingOverlay";
import Pdf from "react-to-pdf";
import ReactDOMServer from "react-dom/server";
import { PDFExport } from '@progress/kendo-react-pdf';
//column categories
import {
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

const ref = React.createRef();

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

function Application({ applications, newReview, history, match, user }) {
  const appId = match.params.organizationId;
  const [printing, setPrinting] = useState(false);

  const [loadedReview] = usePromise(GET.getReviewAPI, {
    user,
    applicationId: appId
  });

  const [review, dispatchReviewUpdate] = useReducer(reviewReducer, null);
  const isRated = useRef(false);

  // Load the fetched review
  useEffect(() => {
    if (loadedReview.isPending) return;
    isRated.current = loadedReview.value.rating > -1;
    dispatchReviewUpdate({
      type: LOAD_REVIEW,
      review: loadedReview.value
    });
  }, [loadedReview]);

  //Updates a review when the review is changed
  useEffect(() => {
    if (
      review == null ||
      loadedReview.isPending ||
      review === loadedReview.value ||
      review.applicationId !== loadedReview.value.applicationId
    ) {
      // Do not update the review if we are still fetching the review or
      // if it has not been modified
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
  }, [loadedReview, newReview, review]);

  const [application, appIndex, appData] = useMemo(() => {
    const [_application, _appIndex] = getApplicationDetails(
      applications,
      appId
    );
    let _appData = null;
    if (_application != null) {
      _appData = {
        categoryData: transpileCategoryData(_application),
        fileData: transpileFileData(_application),
        longAnswers: transpileLongAnswerData(_application),
        checkBoxAnswers: transpileCheckBoxData(_application)
      };
    }
    return [_application, _appIndex, _appData];
  }, [applications, appId]);

  const previousApplication =
    applications && appIndex > 0
      ? "/submissions/" + applications[appIndex - 1]["_id"]
      : null;
  const nextApplication =
    applications && appIndex < applications.length - 1
      ? "/submissions/" + applications[appIndex + 1]["_id"]
      : null;

  const options = {
    orientation: 'p',
    unit: 'in',
    format: [1000,800]
  };
  let resume = null

  const exportPDF = () => {
    setPrinting(true)
  }

  async function print() {
    let res = await resume.save();
    setPrinting(false)
  }

  return (
    <div>
    <PDFExport paperSize={'Letter'}
      fileName="_____.pdf"
      title=""
      subject=""
      keywords=""
      ref={(r) => resume = r}>
        <div style={{
         padding: 'none',
         backgroundColor: 'white',
         boxShadow: '5px 5px 5px black',
         margin: 'auto',
         overflowX: 'hidden',
         overflowY: 'hidden'
       }}>
    <PageWrapper>
      <LoadingOverlay show={loadedReview.isPending} />

      <BodyWrapper>
        <button onClick={exportPDF}>prepare to print</button>
        <button onClick={print}>print</button>
        <h1>
          <Button
            className="all-applicants"
            onClick={() => history.push("/applications")}
          >
            &lt; All Applicants
          </Button>
          <br />
          {application && application["Organization Name (legal name)"]}
        </h1>
        {/*}<Rubric />*/}
        <hr />
        {applications.length > 0 && application != null ? (
          <div className="application-information" ref={ref}>
            <Categories categoryData={appData.categoryData} />
            <hr />
            <Files fileData={appData.fileData} />
            <hr />
            <DecisionCanvas
              printing={printing}
              categoryData={appData.longAnswers}
              update={dispatchReviewUpdate}
              review={review}
            />
            <hr />
            {!printing ? (
              <Rating review={review} update={dispatchReviewUpdate} />
            ) : null}
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
    </div>
    </PDFExport>
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
