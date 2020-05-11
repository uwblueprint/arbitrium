import React, { Component } from "react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import fetchAdminViewStats from "../../../Actions/admin";

const ApplicationStats = props => {
  useEffect(() => {
    props.fetchAdminViewStats(this.props.match.params.app_id);
  }, []);

  const getFormattedComments = () =>
    props.comments.map((comment, index) => (
      <span key={"comment-" + index}>{comment.content}</span>
    ));

  return (
    <div className="application-stats">
      <div className="application-stats-chart"></div>
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
