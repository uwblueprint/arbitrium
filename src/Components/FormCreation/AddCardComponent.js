import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
  collapse: {
    marginBottom: 16
  },
  content: {
    marginLeft: 10,
    padding: 0
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  root: () => ({
    fontSize: 14,
    borderRadius: 0,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    marginLeft: 30,
    width: 150,
    height: 55,
    display: "flex"
  }),
  text: {
    color: "#2261AD",
    fontSize: 14,
    margin: 5,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal"
  }
});

function AddCardComponent() {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardContent classes={{ root: classes.content }}>
          <p className={classes.text}>
            <span style={{ cursor: "pointer", color: "#2261AD" }}>
              <FontAwesomeIcon
                style={{
                  height: "15px",
                  width: "15px",
                  marginRight: 10,
                  marginBottom: 5,
                  verticalAlign: "-0.5em",
                  color: "#2261AD"
                }}
                icon={faPlus}
              />
              Add Question
            </span>
          </p>
          <p className={classes.text}>
            <span style={{ cursor: "pointer", color: "#2261AD" }}>
              <FontAwesomeIcon
                style={{
                  height: "15px",
                  width: "15px",
                  marginRight: 10,
                  marginBottom: 5,
                  verticalAlign: "-0.5em",
                  color: "#2261AD"
                }}
                icon={faLayerGroup}
              />
              Add Section
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddCardComponent;
