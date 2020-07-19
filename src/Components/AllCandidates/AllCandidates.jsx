import React, { Component } from "react";
import AllCandidatesTable from "./AllCandidatesTable";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Spinner from "react-spinner-material";

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

function convertToTableData(fetched, totalReviews) {
  const applicationList = [];
  if (fetched !== null) {
    fetched.forEach((application) => {
      applicationList.push({
        avgRanking: parseFloat(application.avgRanking),
        candidateName: application.candidateName,
        avgRating: application.avgRating + '/5',
        numReviews: application.numReviews + '/' + totalReviews,
        candidateLink: (
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
        totalReviews: users.length
      });
    });

    GET.getCandidateSubmissions().then((data) => {
      this.setState({
        applications: data
      });
    });

    GET.getAllRankingsAPI().then((data) => {
      this.setState({
        rankings: data
      });
    });

    GET.getAllReviewsAPI().then((data) => {
      this.setState({
        reviews: data
      });
    });
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
        {(this.state.applications !== null && this.state.applications.length !== 0) ? (
          <>
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
            </Header>
            <AllCandidatesTable
              data={convertToTableData(this.state.applications, this.state.totalReviews)}
              style={{marginBottom: '30px'}}
            />
          </>
        ) : (
          <>
            <h4>Loading All Candidates...</h4>
            <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
          </>
        )}
      </Wrapper>
    );
  }
}
