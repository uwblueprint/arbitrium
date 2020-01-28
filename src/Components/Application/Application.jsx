import React, { Component } from "react";
import { compose } from "redux";
import { withRouter } from 'react-router';
import { push } from "connected-react-router";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import Categories from "../Categories/Categories";
import DecisionCanvas from "../DecisionCanvas/DecisionCanvas";
import FlowSelector from "../FlowSelector/FlowSelector";
import Files from "../Files/Files";
import Rating from "../Rating/Rating";

import {
  MOCK_CATEGORY_DATA,
  MOCK_FILE_DATA,
  MOCK_RATING_DATA
} from "./mockData.json";

import { connect } from 'react-redux';


class Application extends Component {

  //transpilers will ensure data is converted to form usable by components

  transpileCategoryData = (applications=null) =>{
    //todo when category data is made available, currently leverages mock data
    return MOCK_CATEGORY_DATA;
    //example implementation
    //return Object.keys(applications[this.props.id])
    //.filter(category=>allCategories.indexOf(category)!=-1)
    //.map(adminCategory=>{title: adminCategory, value: applications[this.props.id][adminCategory]});
  }
  transpileFileData = (applications=null) => {
    //todo when file data is made available, currently leverages mock data
    return MOCK_FILE_DATA;
  }
  transpileRatingData = (applications=null) =>{
    //todo when rating data is made available, currently leverages mock data
    return MOCK_RATING_DATA;
  }

  findApplicationIndex = (applications) => {
    const { organizationId } = this.props.match.params;
    return applications.map(e => e._id).indexOf(organizationId);
  }

  render() {
    const { applications, push } = this.props;

    const currentAppIndex = applications!=null ? this.findApplicationIndex(applications) : null;
    const previousApplication = (applications && currentAppIndex > 0) ? "/submissions/"+applications[currentAppIndex-1]['_id'] : null;
    const nextApplication = (applications && currentAppIndex < applications.length-1) ? "/submissions/"+applications[currentAppIndex+1]['_id'] : null;
    
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
          <Categories categoryData={this.transpileCategoryData(applications)} />
          <hr />
          <Files fileData={this.transpileFileData(applications)} />
          <hr />
          <DecisionCanvas />
          <hr />
          <Rating ratingData={this.transpileRatingData(applications)} />
          <hr />
          <ApplicationSelector>
            <Button color="primary" disabled={!previousApplication} onClick={() => {previousApplication && push(previousApplication)}}>Previous Applicant</Button>
            <Button variant="contained" disabled={!nextApplication} color="primary" onClick={() => {nextApplication && push(nextApplication)}}>
              Next Applicant
            </Button>
          </ApplicationSelector>
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  applications: state.applications.applications,
});

export default compose(
  withRouter,
  connect(mapStateToProps, {push})
)(Application);

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
