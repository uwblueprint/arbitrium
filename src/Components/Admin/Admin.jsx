import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Spinner from "react-spinner-material";
import { connect } from "react-redux";
import { isNonEmptyArray } from "../../common/arrayHelpers";

const GET = require("../../requests/get");

const Wrapper = styled.div`
  margin-top: 148px;
`;

async function calc(rankings, applications, reviews) {

  const display = [];

  applications.forEach((application, i) => {
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
        review.userId !== "hM9QRmlybTdaQkLX25FupXqjiuF2" &&
        review.rating !== -1
      ) {
        numRated += 1;
        ratingTotal += review.rating;
      }
    });

    const averageRating = (ratingTotal / numRated).toFixed(2);

    const dis = {
      name: application["Organization Name (legal name)"],
      amount: application["What is the total grant request from United Way Waterloo Region Communities (Ex- 20000)"],
      numRanked: numRank,
      service: application["Service Name"],
      avgRanking: averageRanking,
      numRated: numRated,
      avgRating: averageRating
    };
    display.push(dis);
    // console.log(dis.avgRating)
    // if (i % 2 == 0){
    //   console.log(dis.numRated)
    // }
    // else {
    //   console.log(dis.numRated)
    // }
  });


}

async function getComments(applications, reviews, users){
  let commentsTotal = []
  applications.forEach((application, i) => {
    let comments = []
    reviews.forEach((review) => {
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
        users.forEach(user => {
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
    let commentList = []
    comments.forEach(comment => {

      comment.comments.forEach(c => {
        let t = {
          comment: c.value,
          user: comment.userId
        }
        commentList.push(t)
      });
    });
    let newComment = {
      name: application["Organization Name (legal name)"],
      comments: commentList
    }
    commentsTotal.push(newComment)
  });


  commentsTotal.forEach((app, i) => {
      //console.log(app.name + "( Total Comments: " + app.comments.length + ")")
      //if (i % 2 == 0){
      //console.log("<<<")
      //  }
      //else {
      //console.log(">>>")
      //  }
    app.comments.forEach((c, index) => {
      //console.log( '"' + c.comment + '"' + " (" + c.user + ")")
      // if (index % 2 == 0){
      //   console.log("<<<")
      // }
      // else {
      //   console.log(">>>")
      // }
    });
  })
}

function Admin({ applications }) {
  const [rankings, setRankings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    GET.getAllRankingsAPI().then((rankings) => {
      setRankings(rankings);
    });
    GET.getAllReviewsAPI().then((reviews) => {
      setReviews(reviews);
    });
    GET.getAllUsersAPI().then((users) => {
      setUsers(users)
    })
  }, []);

  if (isNonEmptyArray(rankings) && isNonEmptyArray(reviews)) {
    calc(rankings, applications, reviews);
    getComments(applications, reviews, users)
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
