import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
  content: {
    marginLeft: 10,
    padding: 0
  },
  root: {
    fontSize: 14,
    borderRadius: 0,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    marginLeft: 30,
    width: 150,
    height: 55,
    display: "flex"
  },
  text: {
    color: "#2261AD",
    fontSize: 14,
    margin: 5,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal"
  },
  icon: {
    height: "15px",
    width: "15px",
    marginRight: 10,
    marginBottom: 5,
    verticalAlign: "-0.5em"
  },
  icon_container: {
    cursor: "pointer",
    color: "#2261AD"
  }
});

function AddCardComponent({ handleAddSection, handleAddQuestion }) {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <p className={classes.text}>
            <span
              className={classes.icon_container}
              onClick={handleAddQuestion}
            >
              <FontAwesomeIcon className={classes.icon} icon={faPlus} />
              Add Question
            </span>
          </p>
          <p className={classes.text}>
            <span className={classes.icon_container} onClick={handleAddSection}>
              <FontAwesomeIcon className={classes.icon} icon={faLayerGroup} />
              Add Section
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddCardComponent;
