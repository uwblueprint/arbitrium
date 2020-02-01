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
import { fileCategories, adminCategories } from "./column_categories";
import { push } from "connected-react-router";

//import templates

import { MOCK_RATING_DATA } from "./mockData.json";

import { connect } from "react-redux";
import Rubric from "../Rubric/Rubric";
import { INSERT_REVIEW } from "../../Constants/ActionTypes";

const GET = require("../../requests/get")
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
    return Object.keys(adminCategories).map(adminCategory => ({
      title: adminCategory,
      value: applicant[adminCategory]
    }));
  };

  transpileFileData = () => {
    const applicant = this.getApplicationDetails();
    return Object.keys(fileCategories).map((fileCategory, index) => ({
      name: fileCategory,
      link: applicant[fileCategory],
      size: index * 500
    }));
  };

  /*
  transpileLongAnswerData = () => {
    const applicant = this.getApplicationDetails();
    let answers = Object.keys(longAnswerCategories).map(longAnswerCategory => ({
      id: ,
      answers: {
        questions:
        response:
      },
      title:
    }));
  }
  */

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
    review.lastReviewed = moment.now();
    if (data.id === "master") {
      if (type === "comment") {
        let com = {
          lastReviewed: moment.now(),
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
          lastReviewed: moment.now(),
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
      if (res.nUpserted === 1) {
        this.props.dispatch({ type: INSERT_REVIEW });
      }
    });
  };

  createReview = () => {
    let review = {};
    let comments = [];
    let questionList = [];

    //THIS NEEDS TO BE MADE DYNAMIC IN THE FUTURE
    questionList.push({
      id: "canvas_Problem",
      notes: [],
      rating: -1
    });
    questionList.push({
      id: "canvas_Business Model",
      notes: [],
      rating: -1
    });
    questionList.push({
      id: "canvas_Ownership",
      notes: [],
      rating: -1
    });
    questionList.push({
      id: "canvas_Product",
      notes: [],
      rating: -1
    });
    questionList.push({
      id: "canvas_Market",
      notes: [],
      rating: -1
    });
    review = {
      applicationId: this.state.appId,
      userId: this.state.userId,
      rating: -1,
      comments: comments,
      lastReviewed: moment.now(),
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

  render() {
    console.log(this.state.review)
    let review = this.createReview();
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
              onClick={() => push("/applications")}
            >
              &lt; All Applicants
            </Button>
            <br />
            UW Blueprint
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
                categoryData={this.transpileCategoryData()}
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
            <Button color="primary">Previous Applicant</Button>
            <Button variant="contained" color="primary">
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
  max-width: 800px;
  h1 {
    font-size: 24px;
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
