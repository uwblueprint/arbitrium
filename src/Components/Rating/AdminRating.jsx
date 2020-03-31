import React, { useState, useMemo } from "react";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import Comment from "../Comment/Comment";
import { makeStyles } from "@material-ui/core/styles";

const StyledPaper = styled(Paper)`
  font-size: 14px;
  box-shadow: 0 2px 4px 2px #cccccc;
  padding: 0px;
  border-radius: 1px;
  display: block;
  text-align: left;
  h3 {
    margin: 0 0 8px;
    color: #000;
    font-size: 20px;
    font-weight: 500;
  }
  .overallRatingNumber {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const useStyles = makeStyles({
  root: {
    padding: "16px",
    fontSize: 14,
    borderRadius: 0,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20
  },
  orderByLabel: {
    fontSize: 15
  }
});

const compareByDate = (a, b) => {
  if (a.lastReviewed < b.lastReviewed) return -1;
  if (a.lastReviewed > b.lastReviewed) return 1;
  return 0;
};
const compareByName = (a, b) => {
  if (a._id < b._id) return -1;
  if (a._id > b._id) return 1;
  return 0;
};

const AdminRating = ({ adminData }) => {
  const [sortBy, setSortBy] = useState(0);
  const classes = useStyles();
  const comments = useMemo(() => {
    if (!adminData || !adminData.comments) return null;
    let sorted = adminData.comments;
    switch (sortBy) {
      case 0:
        sorted.sort(compareByDate);
        break;
      case 1:
        sorted.sort(compareByName);
        break;
    }
    return sorted;
  }, [adminData.comments, sortBy]);

  return (
    <StyledPaper>
      <Card className={classes.root}>
        <h3>Average Overall Rating</h3>
        <p className="overallRatingNumber">{adminData.overallRating}</p>
        <Grid container justify="space-between" alignItems={"center"}>
          <Grid item sm={7} md={9}>
            <h3>Overall Comments</h3>
          </Grid>
          <Grid item>
            <label className={classes.orderByLabel} htmlFor="orderBySelect">
              Sort by:
            </label>
          </Grid>
          <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                native
                value={sortBy}
                onChange={event => {
                  setSortBy(event.target.value);
                }}
                inputProps={{ id: "orderBySelect" }}
              >
                <option value={0}>Posted date</option>
                <option value={1}>Members</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {comments &&
          comments.map((comment, i) => <Comment comment={comment} key={i} />)}
      </Card>
    </StyledPaper>
  );
};

export default AdminRating;
