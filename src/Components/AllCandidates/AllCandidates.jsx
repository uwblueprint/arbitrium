import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { TableRow, TableHead, TableCell, TableBody } from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
    text-align: left;
  }
  .table {
    max-width: 864px;
    margin: 0 auto;
  }
  table.MuiTable-root {
    border: 1px solid #cccccc;
    margin-bottom: 30px;
  }
  button {
    max-width: 200px;
    padding: 5px 5px;
    text-transform: uppercase;
    font-size: 15px;
  }
`;

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 20,
    fontWeight: 500
  }
}))(TableCell);

export default class AllCandidates extends Component {
  hasUnmounted = false;

  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.state = {
      applications: [],
      totalReviews: -1,
      rankings: [],
      reviews: [],
      avgRankings: []
    };
  }

  componentDidMount() {
    GET.getAllUsersAPI().then((users) => {
      users = users.filter((user) => {
        return (
          Array.isArray(user.programs) &&
          user.programs.some(
            (program) => program.name === process.env.REACT_APP_PROGRAM
          ) &&
            user.userId !== "vBUgTex5MeNd57fdB8u4wv7kXZ52" &&
            user.userId !== "hM9QRmlybTdaQkLX25FupXqjiuF2"
        );
      });
      if (!this.hasUnmounted) {
        this.setState({
          totalReviews: users.length
        });
      }
    });

    GET.getCandidateSubmissions().then((data) => {
      if (!this.hasUnmounted) {
        this.setState({
          applications: data
        });
      }
    });

    GET.getAllRankingsAPI().then((data) => {
      if (!this.hasUnmounted) {
        this.setState({
          rankings: data
        });
      }
    });

    GET.getAllReviewsAPI().then((data) => {
      if (!this.hasUnmounted) {
        this.setState({
          reviews: data
        });
      }
    });
  }

  componentWillUnmount() {
    this.hasUnmounted = true;
  }

  //Calculate the average ranking
  calculateAverageRanking = () => {
    this.state.applications.forEach((application) => {
      let numRank = 0;
      let rankingTotal = 0;

      //Calculate the average ranking
      this.state.rankings.forEach((rank) => {
        if (
          rank.userId !== "vBUgTex5MeNd57fdB8u4wv7kXZ52" &&
          rank.userId !== "hM9QRmlybTdaQkLX25FupXqjiuF2"
        ) {
          const apps = rank.applications;
          let pos = 0;

          let found = false;
          apps.forEach((app) => {
            if (!found) {
              pos += 1;
            }
            if (app.appId === application._id) {
              found = true;
            }
          });
          if (pos !== 0) {
            numRank += 1;
            rankingTotal += pos;
          }
        }
      });
      const averageRanking = (rankingTotal / numRank).toFixed(2);

      application.avgRanking = averageRanking;
    });
  };

  routeChange() {
    let path = `/admin/committeereview`;
    this.props.history.push(path);
  }

  render() {
    this.calculateAverageRanking();
    return (
      <Wrapper>
        <Paper>
          <h1>All Candidates</h1>
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "20%" }}>Average Rank</TableCell>
                <TableCell style={{ width: "20%" }}>Candidate Name</TableCell>
                <TableCell style={{ width: "20%" }}>Average Rating</TableCell>
                <TableCell
                  style={{ width: "20%", cursor: "pointer", color: "#2261AD" }}
                  align="left"
                  onClick={this.routeChange}
                >
                  # of Reviews
                </TableCell>
                <TableCell style={{ width: "20%" }} align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.applications
                ? this.state.applications
                    .sort((a, b) =>
                      parseFloat(a.avgRanking) > parseFloat(b.avgRanking)
                        ? 1
                        : -1
                    )
                    .map((application, index) => (
                      <TableRow hover key={application._id}>
                        <StyledTableCell component="th" scope="row">
                          {application.avgRanking > 0
                            ? application.avgRanking
                            : "N/A"}
                        </StyledTableCell>
                        <TableCell align="left">
                          {application.candidateName}
                        </TableCell>
                        <TableCell align="left">
                          {application.avgRating > 0
                            ? application.avgRating
                            : 0}
                          /5
                        </TableCell>
                        <TableCell align="left">
                          {application.numReviews}/{this.state.totalReviews}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="primary"
                            target="_blank"
                            value="OpenApplication"
                            onClick={() => {
                              this.props.history.push(
                                "/submissions/" + application._id
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
