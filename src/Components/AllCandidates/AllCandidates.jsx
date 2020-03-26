import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { TableRow, TableHead, TableCell, TableBody } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import moment from "moment";

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

export default class AllCandidates extends Component {
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
    //Pre-calculate the applications array before rendering

    return (
      <Wrapper className="application-list">
        <Paper>
          <h1>All Candidates</h1>
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "25%" }}>Candidate Name</TableCell>
                <TableCell style={{ width: "25%" }} align="left">
                  Average Rating
                </TableCell>
                <TableCell style={{ width: "25%" }} align="left">
                  # of Reviews
                </TableCell>
                <TableCell style={{ width: "25%" }} align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.applications
                ? this.props.applications.map(application => (
                    <TableRow hover key={application._id}>
                      <TableCell component="th" scope="row">
                        {application["Organization Name"]}
                      </TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          color="primary"
                          target="_blank"
                          value="OpenApplication"
                          onClick={() => {
                            this.props.history.push(
                              "submissions/" + application._id
                            );
                          }}
                        >
                          Open
                        </Button>
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
