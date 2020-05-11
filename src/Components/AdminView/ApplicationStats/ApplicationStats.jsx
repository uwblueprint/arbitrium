import React, { Component, useMemo } from "react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import fetchAdminViewStats from "../../../Actions/admin";
import { Chart } from "react-charts";

const ApplicationStats = props => {
  useEffect(() => {
    props.fetchAdminViewStats(this.props.match.params.app_id);
  }, []);

  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: [
          [0, 1],
          [1, 2],
          [2, 4],
          [3, 2],
          [4, 7]
        ]
      }
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );

  const getApplicationStatsRankingsChart = () => {
    //TODO: transpile rankings data and pass as props to chart
    return (
      <div>
        <Chart data={data} axes={axes} />
      </div>
    );
  };

  const getApplicationStatsRatingsChart = () => {
    //TODO: transpile ratings data and pass as props to chart
    return (
      <div>
        <Chart data={data} axes={axes} />
      </div>
    );
  };

  const getFormattedComments = () =>
    //TODO: style comments appropriately
    props.comments &&
    props.comments.map((comment, index) => (
      <span key={"comment-" + index}>{comment.content}</span>
    ));

  return (
    <div className="application-stats">
      <div className="application-stats-rankings">
        <h4 className="application-stats-rankings-title">Overall Ranking</h4>
        <div className="application-stats-rankings-chart">
          <div className="application-stats-rankings-chart-title">
            <h4>Ranking distribution</h4>
          </div>
          {getApplicationStatsRankingsChart()}
        </div>
      </div>
      <div className="application-stats-ratings">
        <div className="application-stats-ratings">
          <h4 className="application-stats-ratings-title">Ratings</h4>
        </div>
        <div className="application-stats-ratings-chart">
          <div className="application-stats-ratings-chart-title">
            <h4>Rating distribution</h4>
          </div>
          {getApplicationStatsRatingsChart()}
        </div>
      </div>

      <div className="application-stats-comments-section">
        {getFormattedComments()}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  comments: state.adminReducer.allComments,
  ratings: state.adminReducer.allRatings,
  averageRating: state.adminReducer.averageRating
});

const mapDispatchToProps = dispatch => ({
  fetchAdminViewStats: app_id => dispatch(fetchAdminViewStats(app_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationStats);
