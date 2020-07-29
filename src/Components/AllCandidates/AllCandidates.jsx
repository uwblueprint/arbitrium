import React, { Component } from "react";
import AllCandidatesTable from "./AllCandidatesTable";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Spinner from "react-spinner-material";
import { CSVLink } from 'react-csv';
import moment from "moment";

const GET = require("../../requests/get");

const Header = styled.div`
    display: flex;
    align-items: center;
    h1 {
      font-size: 24px;
      font-weight: normal;
      font-size: 24px;
      display: inline-block;
      margin-right: auto;
    }
    .button-container {
      display: inline-block;
    }
  }
`;


const Wrapper = styled.div`
  margin-top: 150px;
  padding: 0 136px;
  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 36px;
    width: 90vw;
    margin: 0;
    text-align: left;
  }
  .table {
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

function convertToTableData(fetched) {
  const applicationList = [];
  if (fetched !== null) {
    fetched.forEach((application) => {
      applicationList.push({
        avgRanking: parseFloat(application.avgRanking),
        candidateName: application.candidateName,
        avgRating: application.avgRating,
        numReviews: application.numReviews,
        candidateLink: (
          <a href={`/submissions/${application._id}`}>
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              value="OpenApplication"
            >
              Open
            </Button>
          </a>
        )
      });
    });
  }
  return applicationList;
}

export default class AllCandidates extends Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.state = {
      applications: [],
      comments: [],
      totalReviews: -1,
      rankings: [],
      reviews: [],
      avgRankings: []
    };
  }

  componentDidMount() {
    GET.getAllUsersAPI().then((users) => {
      users = users.filter((user) => {
        return Array.isArray(user.programs) && (
          user.programs.some(
            (program) => program.name === process.env.REACT_APP_PROGRAM
          ) &&
          user.userId !== "vBUgTex5MeNd57fdB8u4wv7kXZ52" &&
          user.userId !== "hM9QRmlybTdaQkLX25FupXqjiuF2"
        )
      });
      this.setState({
        totalReviews: users.length,
        users: users
      });
    });

    GET.getCandidateSubmissions().then((apps) => {
      this.setState({
        applications: apps
      });
    });

    GET.getAllRankingsAPI().then((rankings) => {
      this.setState({
        rankings: rankings
      });
    });

    GET.getAllReviewsAPI().then((reviews) => {
      this.setState({
        reviews: reviews
      });
    });
  }

  // Calculate the average ranking and rating for each application
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

  // Get comments from users on each application
  getComments = () => {
    let commentsTotal = []
    this.state.applications.sort().forEach((application, i) => {
      let comments = []
      this.state.reviews.forEach((review) => {
        if (
          review.applicationId === application._id &&
          review.userId !== "vBUgTex5MeNd57fdB8u4wv7kXZ52" &&
          review.userId !== "hM9QRmlybTdaQkLX25FupXqjiuF2"
        ) {
          //Go through questions and tally the comments
          let temp = []
          review.comments.forEach(comment =>{
            temp.push(comment)
          });
          review.questionList.forEach(question =>{
            question.notes.forEach(note => {
              temp.push(note)
            });
          });
          let email = ""
          this.state.users.forEach(user => {
            if (user.userId === review.userId){
              email = user.email
            }
          });

          let comment = {
            comments: temp,
            userId: email
          }
          if (comment.comments.length !== 0){
            comments.push(comment)
          }

        }
      })
      let newComment = {
        Name: application.candidateName + ' (Total Commenters: ' + comments.length + ')',
        Comments: ""
      }
      commentsTotal.push(newComment)
      comments.forEach(comment => {
        comment.comments.forEach(c => {
          let newComment = {
            Name: "",
            Comments: c.value + ' (' + comment.userId + ')'
          }
          commentsTotal.push(newComment)
        });
      });
    });
    return commentsTotal;
  };

  exportData = () => {
    let exportApps = this.refs.csvApplications;
    let exportComments = this.refs.csvComments;
    exportApps.link.click();
    exportComments.link.click();
  }

  render() {
    this.calculateAverageRanking();
    let comments = this.getComments()
    return (
      <Wrapper>
        {(this.state.applications !== null && this.state.applications.length !== 0) ? (
          <div>
            <Header>
              <h1 style={{color: 'black'}}>All Candidates</h1>
              <div className="button-container">
                <Button
                  variant="contained"
                  color="primary"
                  target="_blank"
                  value="OpenCommittee"
                  style={{width: '250px', maxWidth: '250px'}}
                  onClick={() => {
                    this.props.history.push(
                      "/admin/committeereview"
                    );
                  }}
                >
                  View Committee Review
                </Button>
              </div>
              <div className="button-container">
                <CSVLink ref="csvApplications" filename={'Ratings and Rankings - ' + moment().format("DD-MM-YYYY hh-mm-ss") + '.csv'} data={ this.state.applications.map(({ _id, ...item }) => item) } style={{display:'none'}}/>
                <CSVLink ref="csvComments" filename={'Comments - ' + moment().format("DD-MM-YYYY hh-mm-ss") + '.csv'} data={ comments } style={{display:'none'}}/>
                <Button
                  variant="contained"
                  color="primary"
                  target="_blank"
                  value="ExportData"
                  style={{width: '250px', maxWidth: '250px', marginLeft: '10px'}}
                  onClick={() => { this.exportData() }}
                >
                  Export Data
                </Button>
              </div>
            </Header>
            <AllCandidatesTable
              data={convertToTableData(this.state.applications)}
              totalReviews={this.state.totalReviews}
              style={{marginBottom: '30px'}}
            />
          </div>
        ) : (
          <div>
            <h4>Loading All Candidates...</h4>
            <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
          </div>
        )}
      </Wrapper>
    );
  }
}
