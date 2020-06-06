import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { TableRow, TableHead, TableCell, TableBody } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const GET = require("../../requests/get");

const Wrapper = styled.div`
  margin-top: 150px;
  padding: 0 136px;
  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 36px;
    max-width: 854px;
    width: 90vw;
    margin: 0 auto;
    padding-bottom: 20px;
  }
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.5px;
    color: #2261AD;
    max-width: 854px;
    width: 90vw;
    margin: 0 auto;
    padding-bottom: 20px;
    vertical-align: center;
  }
  .table {
    border-radius: 4px 4px 0px 0px;
    max-width: 864px;
    width: 90vw;
    margin: 0 auto;
  }
  .tableContent {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
  }
  .header {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
  }
  table.MuiTable-root {
    border: 1px solid #cccccc;
  }
  button {
    max-width: 200px;
    padding: 5px 5px;
    text-transform: uppercase;
    font-size: 15px;
  }
`;

export default class CommitteeReview extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      reviews: []
    };
  }

  componentDidMount() {
    GET.getUserReviewsAPI(this.props.user).then(res => {
      this.setState({ reviews: res });
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <Wrapper className="application-list">
        <Paper>
          <p align="left" onClick={this.goBack}>
            <FontAwesomeIcon
              style={{ height: "25px", width: "25px", verticalAlign: "-0.5em" }}
              icon={faAngleLeft}
            />
            Back to Candidate Submissions
          </p>
          <h1 align="left">Committee Review Completion</h1>
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "20%" }} className="header">Committee Member</TableCell>
                <TableCell style={{ width: "30%" }} className="header"># of Candidates Reviewed</TableCell>
                <TableCell style={{ width: "30%" }} align="left"></TableCell>
                <TableCell style={{ width: "20%" }} className="tableContent" align="right">
                  Select all 
                  <Checkbox
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.reviews
                ? this.state.reviews.map(application => (
                    <TableRow hover key={application._id}>
                      <TableCell component="th" scope="row" className="tableContent">
                        {application["Organization Name"]}
                      </TableCell>
                      <TableCell align="left" className="tableContent"></TableCell>
                      <TableCell align="left" className="tableContent"></TableCell>
                      <TableCell align="right">
                        <Checkbox
                          color="primary"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : "ERROR LOADING APPLICATIONS FROM DATABASE"}
            </TableBody>
          </Table>
        </Paper>
      </Wrapper>
    );
  }
}
