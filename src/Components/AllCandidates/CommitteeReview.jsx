import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { TableRow, TableHead, TableCell, TableBody } from "@material-ui/core";
// TODO: Uncomment when send email feature is complete
//import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

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
`;

// TODO: Filter the users based on their committee, schema might change
// function checkCommittee(user) {
//   for (let i = 0; i < user.programs.length; i++) {
//     if (user.programs[i].name === "Emergency Fund") {
//       return true
//     }
//   }
//   return false
// }

class CommitteeReview extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.sortCommittee = this.sortCommittee.bind(this);
    this.state = {
      committee: [],
      appCount: -1,
      sortDescending: true,
      committeeSize: -1,
    };
  }

  componentDidMount() {
    GET.getApplicationCount().then(appCount => {
      this.setState({ appCount: appCount });
    });
    GET.getAllUsersAPI().then(users => {
      // TODO: Filter the users based on their committee, schema might change
      // users = users.filter(checkCommittee)

      this.setState({ committeeSize: users.length });
      for (let i = 0; i < users.length; i++) {
        GET.getReviewCountAPI(users[i].userId).then(count => {
          let committee = [...this.state.committee];
          committee[i] = {'member': users[i], 'review': count};
          this.setState({committee});
        })
      }
    });
  }

  sortCommittee() {
    let tempCommittee;
    if (this.state.sortDescending) {
      tempCommittee = this.state.committee.sort((a,b)=>b.review-a.review)
    } else {
      tempCommittee = this.state.committee.sort((a,b)=>a.review-b.review)
    }

    let newCommittee = []
    for (var i = 0, n = tempCommittee.length; i<n; i++) {
      newCommittee[i] = this.state.committee[i];
    }

    this.setState(prevState => ({
      sortDescending: !prevState.sortDescending,
      committee: newCommittee,
    }));
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <Wrapper className="application-list">
        <Paper style={{paddingBottom: '30px'}}>
          <p align="left" onClick={this.goBack}>
            <span style={{cursor: 'pointer'}}>
              <FontAwesomeIcon
                style={{ height: "25px", width: "25px", verticalAlign: "-0.5em" }}
                icon={faAngleLeft}
              />
              Back to Candidate Submissions
            </span>
          </p>
          <h1 align="left">Committee Review Completion</h1>
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "35%" }} className="header">Committee Member</TableCell>
                <TableCell style={{ width: "35%", cursor: "pointer" }} className="header" onClick={this.sortCommittee}>
                  # of Candidates Reviewed
                  <FontAwesomeIcon
                    style={{ height: "15px", width: "15px", verticalAlign: "-0.25em", paddingLeft: '5px' }}
                    icon={this.state.sortDescending ? faSortUp : faSortDown}
                  />
                </TableCell>
                <TableCell style={{ width: "10%" }} align="left"></TableCell>
                <TableCell style={{ width: "20%" }} className="tableContent" align="right">
                  {/* TODO: Uncomment when send email feature is complete
                  Select all
                  <Checkbox
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                  */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(this.state.committee && this.state.committee !== [] && !this.state.committee.includes(undefined))
                ? this.state.committee.map((committee, key) => (
                    <TableRow hover key={committee.member.id}>
                      <TableCell component="th" scope="row" className="tableContent">
                        {committee.member.email}
                      </TableCell>
                      <TableCell align="left" className="tableContent">
                        {committee.review} / {this.state.appCount}
                      </TableCell>
                      <TableCell align="left" className="tableContent"></TableCell>
                      <TableCell align="right">
                        {/* TODO: Uncomment when send email feature is complete
                        <Checkbox
                          color="primary"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                        */}
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

const mapStateToProps = (state) => {
  return {
    applications: state.applications,
    reviewCount: state.reviewCount
  };
};

export default connect(mapStateToProps)(CommitteeReview);
