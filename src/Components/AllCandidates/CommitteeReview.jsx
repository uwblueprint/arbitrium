import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { TableRow, TableHead, TableCell, TableBody } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';

const GET = require("../../requests/get");

const Wrapper = styled.div`
  margin-top: 150px;
  padding: 0 136px;
  h1 {
    font-size: 24px;
    font-weight: normal;
  }
  .table {
    border-radius: 4px 4px 0px 0px;

    max-width: 864px;
    margin: 0 auto;
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
    this.state = {
      reviews: []
    };
  }

  componentDidMount() {
    GET.getUserReviewsAPI(this.props.user).then(res => {
      this.setState({ reviews: res });
    });
  }

  render() {
    return (
      <Wrapper className="application-list">
        <Paper>
          <h1>Committee Review Completion</h1>
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "20%" }}>Committee Member</TableCell>
                <TableCell style={{ width: "30%" }}># of Candidates Reviewed</TableCell>
                <TableCell style={{ width: "30%" }} align="left"></TableCell>
                <TableCell style={{ width: "20%" }} align="right">
                  Select All 
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
                      <TableCell component="th" scope="row">
                        {application["Organization Name"]}
                      </TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left"></TableCell>
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
