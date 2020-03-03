import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import moment from "moment";
import Categories from "../Categories/Categories";
import DecisionCanvas from "../DecisionCanvas/DecisionCanvas";
import FlowSelector from "../FlowSelector/FlowSelector";
import Files from "../Files/Files";
import Rating from "../Rating/Rating";
//column categories
import {
  fileCategories,
  adminCategories,
  longAnswerCategories
} from "./column_categories";

//import templates

import { MOCK_RATING_DATA } from "./mockData.json";

import { connect } from "react-redux";
import Rubric from "../Rubric/Rubric";
import { NEW_REVIEW, UPDATE_REVIEW } from "../../Constants/ActionTypes";

const GET = require("../../requests/get");
const UPDATE = require("../../requests/update");

function createReview(user, appId) {
  let review = {};
  let comments = [];
  let questionList = [];

  //THIS NEEDS TO BE MADE DYNAMIC IN THE FUTURE
  questionList.push({
    id: "canvas_1",
    notes: [],
    rating: -1
  });
  questionList.push({
    id: "canvas_2",
    notes: [],
    rating: -1
  });
  questionList.push({
    id: "canvas_3",
    notes: [],
    rating: -1
  });
  questionList.push({
    id: "canvas_4",
    notes: [],
    rating: -1
  });
  questionList.push({
    id: "canvas_5",
    notes: [],
    rating: -1
  });
  review = {
    applicationId: appId,
    userId: user.uid,
    rating: -1,
    comments: comments,
    lastReviewed: moment(),
    questionList: questionList
  };
  return review;
}

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

function Application({ applications, dispatch, history, match, user }) {
  const appId = match.params.organizationId;
  const [review, setReview] = useState(null);

  useEffect(() => {
    GET.getReviewAPI(user, appId).then(res => {
      console.log(res[0]);
      setReview(res[0]);
    });
  }, [appId]);

  const [application, appIndex] = useMemo(() => {
    return getApplicationDetails(applications, appId);
  }, [applications, appId]);

  const transpileCategoryData = () => {
    //todo when category data is made available, currently leverages mock data
    return {
      contact: Object.keys(adminCategories.contact).map(adminCategory => ({
        title: adminCategory,
        value: application[adminCategory]
      })),
      socialMedia: Object.keys(adminCategories.socialMedia).map(
        adminCategory => ({
          title: adminCategory,
          value: application[adminCategory]
        })
      ),
      organizationInformation: Object.keys(
        adminCategories.organizationInformation
      ).map(adminCategory => ({
        title: adminCategory,
        value: application[adminCategory]
      })),
      applicationInformation: Object.keys(
        adminCategories.applicationInformation
      ).map(adminCategory => ({
        title: adminCategory,
        value: application[adminCategory]
      }))
    };
  };

  const transpileFileData = () => {
    let files = Object.keys(fileCategories).map((fileCategory, index) => ({
      name: fileCategory,
      link: application[fileCategory],
      size: index * 500
    }));
    let fileLinks = [];
    files.map(file => {
      if (file.link == null) return;
      file.link.split(",").map((link, index) => {
        let append = "";
        if (file.link.split(",").length > 1) {
          append = "(" + (index + 1) + ")";
        }
        fileLinks.push({
          name: file.name + append,
          link: link,
          size: file.size
        });
      });
    });
    return fileLinks;
  };

  const transpileLongAnswerData = () => {
    let answers = Object.keys(longAnswerCategories).map(longAnswerCategory => ({
      id: longAnswerCategories[longAnswerCategory],
      answers: {
        question: longAnswerCategory,
        response: application[longAnswerCategory]
      },
      title: "Undetermined" + longAnswerCategories[longAnswerCategory]
    }));

    let data = [];
    data.push({
      id: 1,
      answers: [],
      title: "Mission and Vision"
    });
    data.push({
      id: 2,
      answers: [],
      title: "Leadership"
    });
    data.push({
      id: 3,
      answers: [],
      title: "Projects"
    });
    data.push({
      id: 4,
      answers: [],
      title: "Plan"
    });
    data.push({
      id: 5,
      answers: [],
      title: "Opportunities and Challenges"
    });
    answers.map(answer => {
      data.map(item => {
        if (answer.id === item.id) {
          item.answers.push({
            question: answer.answers.question,
            response: answer.answers.response
          });
        }
      });
    });
    return data;
  };

  //Types:
  //Notes update - {questionId, notes}
  //Rating update - {questionId, rating}
  //Comment update - comment
  //rating update - rating
  const handleReviewUpdate = (type, data) => {
    let editedReview = review;
    //If a review doesn't exist then create one
    if (editedReview == null) {
      editedReview = createReview(user, appId);
    }

    //Update the data in the review
    editedReview.lastReviewed = moment();
    if (data.id === "master") {
      if (type === "comment") {
        let com = {
          lastReviewed: moment(),
          value: data.text
        };
        editedReview.comments.push(com);
      }
      if (type === "rating") {
        editedReview.rating = data.rate;
      }
    } else {
      if (type === "comment") {
        let com = {
          lastReviewed: moment(),
          value: data.text
        };
        editedReview.questionList.forEach(item => {
          if (item.id === data.id) {
            let newComments = item.notes;
            newComments.push(com);
            item.notes = newComments;
          }
        });
      }
      if (type === "rating") {
        editedReview.questionList.forEach(item => {
          if (item.id === data.id) {
            item.rating = data.rate;
          }
        });
      }
    }

    //Update the review
    setReview(editedReview);
    UPDATE.updateReviewAPI(editedReview).then(res => {
      if (res.upserted) {
        this.props.dispatch({ type: NEW_REVIEW });
      }
    });
  };

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
        <Rubric />
        <hr />
        {applications.length > 0 && application != null ? (
          <div className="application-information">
            <Categories categoryData={transpileCategoryData()} />
            <hr />
            <Files fileData={transpileFileData()} />
            <hr />
            <DecisionCanvas
              categoryData={transpileLongAnswerData()}
              update={handleReviewUpdate}
              review={review}
            />
            <hr />
            <Rating ratingData={review} update={handleReviewUpdate} />
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

const mapStateToProps = state => ({
  applications: state.applications
});

const mapDispatchToProps = dispatch => ({ dispatch });

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
