import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core";
import DragHandle from "@material-ui/icons/DragIndicator";

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
    textAlign: "left"
  },
  rating: {
    textAlign: "center"
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

function RankingCard({ companyName, rating }) {
  const classes = useStyles();
  return (
    <Card className={classes.root} elevation={0}>
      <CardContent style={!rating && {backgroundColor: "#F4F4F4"}}>
        <div className={classes.content}>
          <DragHandle className={classes.drag} />
          <div className={classes.company}>{companyName}</div>
          {!rating && <div className={classes.rating}>Your Rating: Not Rated</div>}
          {rating && <div className={classes.rating}>Your Rating: {rating}/5</div>}
          <div className={classes.link}>
            <a>Open Application</a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RankingCard;
