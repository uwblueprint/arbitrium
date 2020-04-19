import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Spinner from 'react-spinner-material';
import { connect } from "react-redux";

const GET = require("../../requests/get");

const Wrapper = styled.div`
  margin-top: 148px;
`;



async function calc(rankings, applications, reviews){
  //console.log("Applications")
  //console.log(applications)

  let display = []

  applications.map(application =>{

    //"vBUgTex5MeNd57fdB8u4wv7kXZ52"
    //"hM9QRmlybTdaQkLX25FupXqjiuF2"

      let numRank = 0
      let rankingTotal = 0

      //Calculate the average ranking
      rankings.map(rank => {
        if (rank.userId != "vBUgTex5MeNd57fdB8u4wv7kXZ52" && rank.userId != "hM9QRmlybTdaQkLX25FupXqjiuF2"){
          let apps = rank.applications
          let pos = 0

          let found = false;
          apps.map((app) => {
            if (!found){
              pos += 1;
            }
            if (app.appId == application._id){
              found = true
            }
          })
          if (pos != 0){
            numRank += 1
            rankingTotal += pos;
          }
        }
      })
      let averageRanking = (rankingTotal / numRank).toFixed(2);

      //console.log(reviews)
      let ratingTotal = 0;
      let numRated = 0;
      reviews.map(review => {
        if (review.applicationId == application._id && review.userId != "vBUgTex5MeNd57fdB8u4wv7kXZ52" && review.userId != "hM9QRmlybTdaQkLX25FupXqjiuF2"){
          numRated += 1
          ratingTotal += review.rating
        }
      })

      let averageRating = (ratingTotal / numRated).toFixed(2);

      //console.log(application["Organization Name"])
      //console.log(averageRanking)
      //console.log(averageRating)

      let dis = {
        name: application["Organization Name"],
        amount: application["Amount Requested (up to $20,000)"],
        avgRanking: averageRanking,
        avgRating: averageRating
      }
      display.push(dis)

  })

  console.log(display)

  display.map((d) =>{
    console.log(d.avgRanking);
  })
}

function Admin({ applications }) {
  const [rankings, setRankings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    GET.getAllRankingsAPI().then((rankings) => {
      setRankings(rankings);
    })
    GET.getAllReviewsAPI().then((reviews) => {
      setReviews(reviews);
    })
  }, [])

  if (rankings != [] && reviews != []){
    calc(rankings, applications, reviews);
  }


  return (
  <Wrapper>
    <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
  </Wrapper>
)}



//connecting applications to redux
const mapStateToProps = state => ({
  applications: state.applications,
  reviews: state.reviews
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
