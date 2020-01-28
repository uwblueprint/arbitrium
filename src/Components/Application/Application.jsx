import React, { Component, useContext, useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import Categories from "../Categories/Categories";
import DecisionCanvas from "../DecisionCanvas/DecisionCanvas";
import FlowSelector from "../FlowSelector/FlowSelector";
import Files from "../Files/Files";
import Rating from "../Rating/Rating";
import { AuthContext } from "../../Authentication/Auth.js";
//column categories
import {fileCategories, adminCategories, ratingCategories } from "./column_categories"
import { push } from "connected-react-router";

//import templates

import {
  MOCK_CATEGORY_DATA,
  MOCK_FILE_DATA,
  MOCK_RATING_DATA
} from "./mockData.json";

import { connect } from 'react-redux';
import { NotificationRvHookup } from "material-ui/svg-icons";
import Rubric from "../Rubric/Rubric";

class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      appId: "",
      reviewId: ""
    };
  }

  //transpilers will ensure data is converted to form usable by components

  getApplicationDetails = () => {
    return this.props.applications.applications.filter(application=>application['_id']===this.props.match.params.organizationId)[0]
  }

  applicantExists = () => (
    this.getApplicationDetails() !== undefined
  )

  transpileCategoryData = () =>{
    //todo when category data is made available, currently leverages mock data
    const applicant = this.getApplicationDetails();
    return Object.keys(adminCategories)
          .map(adminCategory=>({title: adminCategory, value: applicant[adminCategory]}));
  }
  transpileFileData = () => {
    const applicant = this.getApplicationDetails();
    return Object.keys(fileCategories)
          .map((fileCategory, index)=>({name: fileCategory, link: applicant[fileCategory], size: index*500}));
  }
  transpileRatingData = () =>{
    //todo when rating data is made available, currently leverages mock data
    return MOCK_RATING_DATA;
  }

  handleReviewUpdate = (type, data) => {

  }

  componentDidMount() {
    let appId = this.getApplicationDetails()._id;
    let userId = this.props.user.uid;
    this.setState({appId: appId })
    this.setState({userId: userId})
    let reviews = this.props.applications.reviews.filter(function(item){
      return item.applicationId == appId && item.userId == userId;
    })
    console.log(reviews)
    this.setState({review: reviews[0]})
  }




  render() {
    console.log("Application ID");
    console.log(this.getApplicationDetails()._id);
    console.log("UserId");
    console.log(this.props.user.uid)
    console.log(this.props)
    return (
      <div className='pagecontainer'>
         <FlowSelector>
          <button>1. Letter of Interest</button>
          <button disabled>2. Full Application</button>
        </FlowSelector>
        <Wrapper>
          <h1>
            <Button className="all-applicants" onClick={() => push("/applications")}>
              &lt; All Applicants
            </Button>
            <br />UW Blueprint
          </h1>
          <Rubric />
          <hr />
          {this.props.applications.applications.length>0 && this.applicantExists() ?
          <div className="application-information">
            <Categories categoryData={this.transpileCategoryData()} />
            <hr />
            <Files fileData={this.transpileFileData()} />
            <hr />
            <DecisionCanvas />
            <hr />
            <Rating ratingData={this.transpileRatingData()} />
            <hr />
          </div>
           : null}
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
  applications: state.applications,
});

export default connect(mapStateToProps, null)(Application)

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
