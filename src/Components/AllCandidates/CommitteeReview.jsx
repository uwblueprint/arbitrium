import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import CommitteeReviewTable from "./CommitteeReviewTable";
import styled from "styled-components";
// TODO: Uncomment when send email feature is complete
//import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
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
    max-width: 854px;
    width: 90vw;
    margin: 0;
  }
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.5px;
    color: #2261ad;
    max-width: 854px;
    width: 90vw;
    margin: 0;
    padding-bottom: 15px;
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

function convertToTableData(fetched) {
  const committeeList = [];
  if (fetched !== null) {
    fetched.forEach((member) => {
      committeeList.push({
        committeeMember: member.member.email,
        candidatesReviewed: member.review
      });
    });
  }
  return committeeList;
}

function CommitteeReview() {
  const [committee, setCommittee] = useState([]);
  const [appCount, setAppCount] = useState(-1);
  const [sortDescending, setSortDescending] = useState(true);
  const [committeeSize, setCommitteeSize] = useState(-1);

  useEffect(() => {
    GET.getApplicationCount().then((appCount) => {
      setAppCount({ appCount: appCount });
    });
    GET.getAllUsersAPI().then((users) => {
      // TODO: Filter the users based on their committee, schema might change
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

      setCommitteeSize({ committeeSize: users.length });
      for (let i = 0; i < users.length; i++) {
        GET.getReviewCountAPI(users[i].userId).then((count) => {
          let newCommittee = committee;
          newCommittee[i] = { member: users[i], review: count };
          setCommittee([...newCommittee]);
          // setCommittee([...committee, { member: users[i], review: count }])
        });
      }
    });
  });

  const goBack = () => {
    const history = useHistory();
    history.push({
      pathname: "/admin/allcandidates"
    });
    // this.props.history.push("/admin/allcandidates");
  };

  return (
    <Wrapper>
      {committee && committee !== [] && !committee.includes(undefined) ? (
        <div>
          <Header>
            <p align="left" onClick={goBack}>
              <span style={{ cursor: "pointer", color: "#2261AD" }}>
                <FontAwesomeIcon
                  style={{
                    height: "25px",
                    width: "25px",
                    verticalAlign: "-0.5em",
                    color: "#2261AD"
                  }}
                  icon={faAngleLeft}
                />
                Back to Candidate Submissions
              </span>
            </p>
          </Header>
          <h1 align="left" style={{ color: "black" }}>
            Committee Review Completion
          </h1>
          <CommitteeReviewTable
            data={convertToTableData(committee)}
            appCount={appCount}
            style={{ marginBottom: "30px" }}
          />
        </div>
      ) : (
        <div>
          <h4>Loading Committee Members...</h4>
          <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
        </div>
      )}
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    applications: state.applications,
    reviewCount: state.reviewCount
  };
};

export default connect(mapStateToProps)(CommitteeReview);
