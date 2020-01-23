import React, { Component } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import Categories from "../Categories/Categories";
import DecisionCanvas from "../DecisionCanvas/DecisionCanvas";
import FlowSelector from "../FlowSelector/FlowSelector";
import Files from "../Files/Files";
import Rating from "../Rating/Rating";
//column categories
import {fileCategories, adminCategories, ratingCategories } from "./column_categories"

//import templates

import {
  MOCK_CATEGORY_DATA,
  MOCK_FILE_DATA,
  MOCK_RATING_DATA
} from "./mockData.json";

import { connect } from 'react-redux';


class Application extends Component {

  //transpilers will ensure data is converted to form usable by components

  getRelevantCategories = (categoryType) => (
    Object.keys(applications[this.props.id])
    .filter(category=>categoryType.indexOf(category)!=-1)
  )

  transpileCategoryData = (applications=null) =>{
    //todo when category data is made available, currently leverages mock data
    return this.getRelevantCategories(adminCategories)
          .map(adminCategory=>({title: adminCategory, value: applications[this.props.id][adminCategory]}));
  }
  transpileFileData = (applications=null) => {
    return this.getRelevantCategories(fileCategories)
          .map((fileCategory, index) =>({name: fileCategory, size: index*500}));
  }
  transpileRatingData = (applications=null) =>{
    //todo when rating data is made available, currently leverages mock data
    return MOCK_RATING_DATA;
  }

  render() {
    return (
      <div className='pagecontainer'>
         <FlowSelector>
          <button>1. Letter of Interest</button>
          <button disabled>2. Full Application</button>
        </FlowSelector>
        <Wrapper>
          <h1>
            <Button className="all-applicants">&lt; All Applicants</Button>
            UW Blueprint
          </h1>
          <hr />
          <Categories categoryData={this.transpileCategoryData(this.props.applications)} />
          <hr />
          <Files fileData={this.transpileFileData(this.props.applications)} />
          <hr />
          <DecisionCanvas />
          <hr />
          <Rating ratingData={this.transpileRatingData(this.props.applications)} />
          <hr />
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
