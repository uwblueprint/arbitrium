import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchAdminViewStats } from "../../../Actions/admin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import moment from "moment";

import "./ApplicationStats.css";

const ApplicationStats = (props) => {
  useEffect(() => {
    props.fetchAdminViewStats(props.match.params.organizationId);
  }, []);

  const [sortType, setSortType] = useState("none");

  const getSortedComments = (comments) => {
    if (sortType == "date") {
      return comments.sort(
        (a, b) => moment(a.lastReviewed) < moment(b.lastReviewed)
      );
    } else if (sortType == "name") {
      return comments.sort((a, b) => {
        return a.email.localeCompare(b.email);
      });
    } else {
      return comments;
    }
  };

  const getFormattedComments = () => {
    const formattedComments =
      props.comments &&
      getSortedComments([...props.comments]).map((comment, index) => (
        <div className="comment" key={"comment-" + index}>
          <div className="comment-details">
            <div className="comment-logo">
              {comment.email.substring(0, 2).toUpperCase()}
            </div>
            <div className="comment-email">
              <b>{comment.email}</b>
            </div>
            <div className="comment-date">
              {moment(comment.lastReviewed)
                .toDate()
                .toString()
                .substring(4, 16)}
            </div>
          </div>
          <div className="comment-content">{comment.value}</div>
        </div>
      ));

    return (
      <div className="application-stats-comments-section-body">
        <div className="application-stats-comments-section-controller">
          <h4>Overall Comments</h4>
          <div className="application-stats-comments-section-sort">
            <FormControl
              className={"application-stats-comments-section-sort-dropdown"}
            >
              <InputLabel htmlFor="demo-customized-select-native">
                Sort by
              </InputLabel>
              <NativeSelect
                id="demo-customized-select-native"
                value={sortType}
                onChange={(evt) => setSortType(evt.target.value)}
              >
                <option value={"none"}>None</option>
                <option value={"date"}>Date</option>
                <option value={"name"}>Name</option>
              </NativeSelect>
            </FormControl>
          </div>
        </div>
        <div className="application-stats-comments-section-results">
          {formattedComments}
        </div>
      </div>
    );
  };

  const getData = (type) => {
    let transpiledData;
    if (type == "Rankings") {
      transpiledData = props.rankings;
    } else {
      transpiledData = props.ratings;
    }
    if (!transpiledData) {
      return null;
    }
    transpiledData = Object.values(transpiledData);
    return [
      {
        name: "1",
        [type]: transpiledData.filter((x) => x == 1).length
      },
      {
        name: "2",
        [type]: transpiledData.filter((x) => x == 2).length
      },
      {
        name: "3",
        [type]: transpiledData.filter((x) => x == 3).length
      },
      {
        name: "4",
        [type]: transpiledData.filter((x) => x == 4).length
      },
      {
        name: "5",
        [type]: transpiledData.filter((x) => x == 5).length
      }
    ];
  };

  const getAverage = (type, text, key) => {
    return (
      <div className={`application-stats-${type}-average`}>
        <h6 className="application-stats-ratings-title">
          AVERAGE OVERALL {text}
        </h6>
        <div className={`application-stats-${type}-average-value`}>
          {props[key]}
        </div>
      </div>
    );
  };

  const getApplicationStatsRankingsChart = () => {
    const data = getData("Rankings");

    return (
      data && (
        <div>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Rankings" fill="#8884d8" />
          </BarChart>
        </div>
      )
    );
  };

  const getApplicationStatsRatingsChart = () => {
    const data = getData("Ratings");

    return (
      data && (
        <div>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Ratings" fill="#32a84e" />
          </BarChart>
        </div>
      )
    );
  };

  return (
    <div className="application-stats">
      <div className="application-stats-rankings">
        <h3 className="application-stats-rankings-section-title">
          Overall Ranking
        </h3>
        {getAverage("ranking", "RANKING", "averageRanking")}
        <div className="application-stats-rankings-chart">
          <div className="application-stats-rankings-chart-title">
            <h4>Ranking distribution</h4>
          </div>
          {getApplicationStatsRankingsChart()}
        </div>
      </div>
      <hr className="chartDivider" />
      <div className="application-stats-ratings">
        <h3 className="application-stats-ratings-section-title">Ratings</h3>
        {getAverage("rating", "RATING", "averageRating")}
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

const mapStateToProps = (state) => ({
  comments: state.adminReducer.allComments,
  ratings: state.adminReducer.allRatings,
  averageRating: state.adminReducer.averageRating
});

const mapDispatchToProps = (dispatch) => ({
  fetchAdminViewStats: (app_id) => dispatch(fetchAdminViewStats(app_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationStats);
