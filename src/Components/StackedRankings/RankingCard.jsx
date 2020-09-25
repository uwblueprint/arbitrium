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
    minHeight: 56,
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
    maxWidth: "200px",
    width: "150px",
    fontSize: 14,
    fontWeight: "normal"
  },
  rating: {
    textAlign: "left"
  },
  link: {
    textAlign: "right",
    "& a": {
      fontSize: 14,
      fontWeight: "normal",
      lineHeight: "inherit"
    }
  },
  button: {
    textTransform: "none"
  }
});

function RankingCard({ companyName, rating, appId, push, suggested }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent
        style={{ padding: 10, backgroundColor: !rating ? "#F4F4F4" : "white" }}
      >
        <div className={classes.content}>
          <DragHandle className={classes.drag} />
          <div className={classes.company}>{companyName}</div>
          {(!rating || rating === -1) && (
            <div className={classes.rating}>Your Rating: Not Rated</div>
          )}
          {rating && rating !== -1 && (
            <div className={classes.rating}>Your Rating: {rating}/5</div>
          )}
          {!rating || rating === -1 ? (
            <div className={classes.rating}>Suggested Rating: Not Rated</div>
          ) : (
            <div className={classes.rating}>
              Suggested Rating:{" "}
              {suggested != null && suggested !== 0
                ? suggested.toFixed(2)
                : rating.toFixed(2)}
              /5
            </div>
          )}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            target="_blank"
            onClick={() => {
              push(`/submissions/${appId}`);
            }}
          >
            Open application
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default connect(null, { push })(RankingCard);
