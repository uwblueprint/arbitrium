import React, { Component } from "react";
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

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      appId: "",
      reviewId: "",
      review: null
    };
  }

  //transpilers will ensure data is converted to form usable by components

  getApplicationDetails = () => {
    return this.props.applications.applications.filter(
      application =>
        application["_id"] === this.props.match.params.organizationId
    )[0];
  };

  applicantExists = () => this.getApplicationDetails() !== undefined;

  transpileCategoryData = () => {
    //todo when category data is made available, currently leverages mock data
    const applicant = this.getApplicationDetails();
    return {
      contact: Object.keys(adminCategories.contact).map(adminCategory => ({
        title: adminCategory,
        value: applicant[adminCategory]
      })),
      socialMedia: Object.keys(adminCategories.socialMedia).map(
        adminCategory => ({
          title: adminCategory,
          value: applicant[adminCategory]
        })
      ),
      organizationInformation: Object.keys(
        adminCategories.organizationInformation
      ).map(adminCategory => ({
        title: adminCategory,
        value: applicant[adminCategory]
      })),
      applicationInformation: Object.keys(
        adminCategories.applicationInformation
      ).map(adminCategory => ({
        title: adminCategory,
        value: applicant[adminCategory]
      }))
    };
  };

  transpileFileData = () => {
    const applicant = this.getApplicationDetails();
    let files = Object.keys(fileCategories).map((fileCategory, index) => ({
      name: fileCategory,
      link: applicant[fileCategory],
      size: index * 500
    }));
    let fileLinks = []
    files.map((file, index) =>{
      console.log(file.link.split(","))
      file.link.split(",").map((link, index) =>{
        let append = "";
        console.log(file.link.length);
        if (file.link.split(",").length > 1){
          append = "(" + (index+1) + ")"
        }
        fileLinks.push({
          name: file.name + append,
          link: link,
          size: file.size
        })
      })
    })
    console.log(fileLinks);
    return fileLinks
  };

  transpileLongAnswerData = () => {
    const applicant = this.getApplicationDetails();
    let answers = Object.keys(longAnswerCategories).map(
      (longAnswerCategory, index) => ({
        id: longAnswerCategories[longAnswerCategory],
        answers: {
          question: longAnswerCategory,
          response: applicant[longAnswerCategory]
        },
        title: "Untermined" + longAnswerCategories[longAnswerCategory]
      })
    );

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
    answers.map((answer, index) => {
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
    /*
    //hard coded
    //Vision and Mission: 1
    1,2
    //Leadership: 2
    3,4,5,6
    //Projects: 3
    9, 10
    //Plan:4
    8,7
    //Challenges and Opportunriwa: 5
    11,12,13
    */
  };

  transpileRatingData = () => {
    //todo when rating data is made available, currently leverages mock data
    return MOCK_RATING_DATA;
  };

  //Types:
  //Notes update - {questionId, notes}
  //Rating update - {questionId, rating}
  //Comment update - comment
  //rating update - rating
  handleReviewUpdate = (type, data) => {
    let review;
    //If a review doesn't exist then create one
    if (this.state.review == null) {
      review = this.createReview();
    } else {
      review = this.state.review;
    }

    //Update the data in the review
    review.lastReviewed = moment();
    if (data.id === "master") {
      if (type === "comment") {
        let com = {
          lastReviewed: moment(),
          value: data.text
        };
        review.comments.push(com);
      }
      if (type === "rating") {
        review.rating = data.rate;
      }
    } else {
      if (type === "comment") {
        let com = {
          lastReviewed: moment(),
          value: data.text
        };
        review.questionList.forEach(item => {
          if (item.id === data.id) {
            let newComments = item.notes;
            newComments.push(com);
            item.notes = newComments;
          }
        });
      }
      if (type === "rating") {
        review.questionList.forEach(item => {
          if (item.id === data.id) {
            item.rating = data.rate;
          }
        });
      }
    }

    //Update the review
    this.setState({ review: review });
    UPDATE.updateReviewAPI(review).then(res => {
      if (res.upserted) {
        this.props.dispatch({ type: NEW_REVIEW });
      }
    });
  };

  createReview = () => {
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
      applicationId: this.state.appId,
      userId: this.state.userId,
      rating: -1,
      comments: comments,
      lastReviewed: moment(),
      questionList: questionList
    };
    return review;
  };

  findReview = appId => {
    GET.getReviewAPI(this.props.user, appId).then(res => {
      this.setState({ review: res[0] });
    });
  };

  componentWillMount() {
    let appId = this.getApplicationDetails()
      ? this.getApplicationDetails()._id
      : null;
    let userId = this.props.user.uid;
    this.setState({ appId: appId });
    this.setState({ userId: userId });

    GET.getReviewAPI(this.props.user, appId).then(res => {
      this.setState({ review: res[0] });
    });
  }

  findApplicationIndex = () => {
    const { organizationId } = this.props.match.params;
    return this.props.applications.applications
      .map(e => e._id)
      .indexOf(organizationId);
  };

  componentDidUpdate() {
    let appId = this.getApplicationDetails();
    if (appId) {
      if (this.state.appId != appId._id) {
        GET.getReviewAPI(this.props.user, appId._id).then(res => {
          this.setState({ review: res[0], appId: appId._id });
        });
      }
    }
  }

  render() {
    let applications = this.props.applications.applications;

    const currentAppIndex =
      applications != null ? this.findApplicationIndex() : null;
    const previousApplication =
      applications && currentAppIndex > 0
        ? "/submissions/" + applications[currentAppIndex - 1]["_id"]
        : null;
    const nextApplication =
      applications && currentAppIndex < applications.length - 1
        ? "/submissions/" + applications[currentAppIndex + 1]["_id"]
        : null;

    let name = "Loading... (Submission not found)";
    let app = this.getApplicationDetails();
    if (app) {
      name = app["Organization Name"];
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
              onClick={() => this.props.history.push("/applications")}
            >
              &lt; All Applicants
            </Button>
            <br />
            {name}
          </h1>
          <Rubric />
          <hr />
          {this.props.applications.applications.length > 0 &&
          this.applicantExists() ? (
            <div className="application-information">
              <Categories categoryData={this.transpileCategoryData()} />
              <hr />
              <Files fileData={this.transpileFileData()} />
              <hr />
              <DecisionCanvas
                categoryData={this.transpileLongAnswerData()}
                update={this.handleReviewUpdate}
                review={this.state.review}
              />
              <hr />
              <Rating
                ratingData={this.transpileRatingData()}
                update={this.handleReviewUpdate}
                review={this.state.review}
              />
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
                  ? this.props.history.push(previousApplication)
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
                  ? this.props.history.push(nextApplication)
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
