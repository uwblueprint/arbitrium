import React, { Component } from "react";
import fetchAdminViewStats from "../../../Actions/admin";

class ApplicationStats extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetchAdminViewStats(this.props.match.params.app_id);
  }

  render() {}
}

const mapStateToProps = state => ({
  comments: state.adminReducer.allComments,
  ratings: state.adminReducer.allRatings,
  averageRating: state.adminReducer.averageRating
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Application);
