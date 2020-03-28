import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Categories from "../Categories/Categories";
import DecisionCanvas from "../DecisionCanvas/DecisionCanvas";
import Files from "../Files/Files";
import Rating from "../Rating/Rating";
import Rubric from "../Rubric/Rubric";
import AdminRating from "../Rating/AdminRating";

const ApplicationSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 30px;
  button {
    border-radius: 0px;
    height: 38px;
  }
`;

function ApplicationView(props) {
  const {
    appData,
    previousApplication,
    nextApplication,
    organizationName,
    review,
    dispatchReviewUpdate,
    isAdminView,
    history
  } = props;

  const buttonControls = title => (
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
      <h1>{title}</h1>
      <Button
        variant="contained"
        color="primary"
        disabled={!nextApplication}
        p
        onClick={() => {
          nextApplication
            ? history.push(nextApplication)
            : console.log("Previous Application doesn't exist");
        }}
      >
        Next Applicant
      </Button>
    </ApplicationSelector>
  );

  const userView = () => (
    <>
      <h1>
        <Button
          className="all-applicants"
          onClick={() => history.push("/applications")}
        >
          &lt; All Applicants
        </Button>
        <br />
        {organizationName}
      </h1>
      <Rubric />
      <hr />
      {appData != null ? (
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
      {buttonControls()}
    </>
  );

  const adminView = () => (
    <>
      {buttonControls(organizationName)}
      <hr />
      {appData != null ? (
        <div className="application-information">
          <Categories categoryData={appData.categoryData} />
          <hr />
          <Files fileData={appData.fileData} />
          <hr />
          <DecisionCanvas
            categoryData={appData.longAnswers}
            update={dispatchReviewUpdate}
            review={review}
            isAdminView={true}
          />
          <hr />
          <AdminRating />
          <hr />
        </div>
      ) : null}
      {buttonControls()}
    </>
  );

  return isAdminView ? adminView() : userView();
}

export default ApplicationView;
