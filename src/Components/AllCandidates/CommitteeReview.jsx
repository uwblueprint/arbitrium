import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { TableRow, TableHead, TableCell, TableBody } from "@material-ui/core";
// TODO: Uncomment when send email feature is complete
//import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
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

function checkCommittee(user) {
  for (let i = 0; i < user.programs.length; i++) {
    if (user.programs[i].name === "Emergency Fund") {
      return true
    }
  }
  return false
}

class CommitteeReview extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      members: [],
      reviews: [],
      appCount: -1,
    };
  }

  componentDidMount() {
    GET.getAllUsersAPI().then(users => {
      users = users.filter(checkCommittee)
      this.setState({ members: users });
      for (let i = 0; i < users.length; i++) {
        this.state.reviews.push(-1);
        GET.getReviewCountAPI(users[i].userId).then(count => {
          let reviews = [...this.state.reviews];
          reviews[i] = count;
          this.setState({reviews});
        })
      }
    });
    GET.getApplicationCount().then(appCount => {
      this.setState({ appCount: appCount });
    });
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
                <TableCell style={{ width: "35%" }} className="header"># of Candidates Reviewed</TableCell>
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
              {this.state.members
                ? this.state.members.map((member, key) => (
                    <TableRow hover key={member._id}>
                      <TableCell component="th" scope="row" className="tableContent">
                        {member.email}
                      </TableCell>
                      <TableCell align="left" className="tableContent">
                        {this.state.reviews[key]} / {this.state.appCount}
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
