import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core";
import DragHandle from "@material-ui/icons/DragIndicator";

import { push } from "connected-react-router";

const useStyles = makeStyles({
  drag: {
    display: "inline-block",
    color: "#DADADA",
    marginRight: 26
  },
  root: {
    maxWidth: 800,
    height: 56,
    borderRadius: 0,
    boxShadow: "0px 2px 3px 1px #cccccc"
  },
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    "& div": {
      display: "inline-block",
      flexGrow: 1,
      fontSize: 14,
      fontWeight: "normal",
      lineHeight: "100%"
    }
  },
  company: {
    textAlign: "left",
    maxWidth: '150px'
  },
  rating: {
    textAlign: "center",
  },
  link: {
    textAlign: "right",
    "& a": {
      fontSize: 14,
      fontWeight: "normal",
      lineHeight: "inherit"
    }
  }
});

function RankingCard({ companyName, rating, appId, push }) {
  const classes = useStyles();
  let notRatingStyle = {};
  return (
    <Card className={classes.root} elevation={0}>
      <CardContent
        style={
          !rating
            ? { backgroundColor: "#F4F4F4" }
            : { backgroundColor: "white" }
        }
        style={{ padding: 10 }}
      >
        <div className={classes.content}>
          <DragHandle className={classes.drag} />
          <div className={classes.company}>{companyName}</div>
          {!rating && (
            <div className={classes.rating}>Your Rating: Not Rated</div>
          )}
          {rating && (
            <div className={classes.rating}>Your Rating: {rating}/5</div>
          )}
          <Button
            variant="contained"
            color="primary"
            target="_blank"
            onClick={() => {
              push(`/submissions/${appId}`);
            }}
          >
            <a>Open Application</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default connect(null, { push })(RankingCard);
