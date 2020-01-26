import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { TableRow, TableHead, TableCell, TableBody } from "@material-ui/core";
import { withRouter, Redirect } from "react-router";
import { push } from "connected-react-router";

const APPLICATION_STAGE = {
  LETTER_OF_INTEREST: 0,
  FULL_APPLICATION: 1
};


const Wrapper = styled.div`
  margin-top: 150px;
  padding: 0 136px;
  h1 {
    font-size: 24px;
    font-weight: normal;
  }
  .table {
    max-width: 864px;
    margin: 0 auto;
  }
  table.MuiTable-root {
    border: 1px solid #cccccc;
  }
`;

export default class ApplicationList extends Component {

    render() {
      console.log(this.props);
      //Pre-calculate the applications array before rendering

        return (
          <Wrapper className="application-list">
            <Paper>
              <h1>All Applicants</h1>
              <Table className="table">
                <TableHead>
                  <TableRow>
                    <TableCell>Applicant Name</TableCell>
                    <TableCell align="left">Rating</TableCell>
                    <TableCell align="left">Last reviewed</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.applications ?
                    this.props.applications.map(application => (
                      <TableRow hover>
                              <TableCell component="th" scope="row">
                                  {application[ 'Organization Name']}
                              </TableCell>
                              <TableCell align="left">{application['rating'] || "0/5" }</TableCell>
                              <TableCell align="left">{application['last reviewed'] || "never" }</TableCell>
                              <TableCell align="left">
                                <button rel="noopener noreferrer" target="_blank" onClick={() => {this.props.history.push('submissions/'+application._id)}}>Open application
                                </button>
                                </TableCell>
                          </TableRow>
                      ))
                    : "ERROR LOADING APPLICATIONS FROM DATABASE"}
                </TableBody>
              </Table>
            </Paper>
          </Wrapper>
        )
    }
}
