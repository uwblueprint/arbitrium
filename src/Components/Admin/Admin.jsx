import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Spinner from "react-spinner-material";
import { connect } from "react-redux";
import { isNonEmptyArray } from "../../common/array-helpers";

const GET = require("../../requests/get");

const Wrapper = styled.div`
  margin-top: 148px;
`;

async function calc(rankings, applications, reviews) {
  //console.log("Applications")
  //console.log(applications)

  const display = [];

  applications.forEach((application) => {
    let numRank = 0;
    let rankingTotal = 0;

    //Calculate the average ranking
    rankings.forEach((rank) => {
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

    let ratingTotal = 0;
    let numRated = 0;
    reviews.forEach((review) => {
      if (
        review.applicationId === application._id &&
        review.userId !== "vBUgTex5MeNd57fdB8u4wv7kXZ52" &&
        review.userId !== "hM9QRmlybTdaQkLX25FupXqjiuF2"
      ) {
        numRated += 1;
        ratingTotal += review.rating;
      }
    });

    const averageRating = (ratingTotal / numRated).toFixed(2);

    const dis = {
      name: application["Organization Name"],
      amount: application["Amount Requested (up to $20,000)"],
      avgRanking: averageRanking,
      avgRating: averageRating
    };
    display.push(dis);
  });
}

function Admin({ applications }) {
  const [rankings, setRankings] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    GET.getAllRankingsAPI().then((rankings) => {
      setRankings(rankings);
    });
    GET.getAllReviewsAPI().then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  if (isNonEmptyArray(rankings) && isNonEmptyArray(reviews)) {
    calc(rankings, applications, reviews);
  }

  return (
    <Wrapper>
      <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
    </Wrapper>
  );
}

//connecting applications to redux
const mapStateToProps = (state) => ({
  applications: state.applications
});

export default connect(mapStateToProps, null)(Admin);
