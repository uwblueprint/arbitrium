import React from "react";
import { Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import AddCardComponent from "./AddCardComponent";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

const useStyles = makeStyles({
  collapse: {
    marginBottom: 16
  },
  content: {
    marginTop: -16
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  root: {
    fontSize: 14,
    borderRadius: 0,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816
  },
  active: {
    fontSize: 14,
    borderRadius: 0,
    borderLeft: "4px solid #2261AD",
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816
  },
  title: {
    color: "#000",
    fontSize: "20px",
    fontWeight: "500"
  },
  container: {
    display: "flex"
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8
  },
<<<<<<< HEAD
  buttonContainer: {
    marginRight: 5,
    marginLeft: 5
  },
  button: {
    textTransform: "none"
  },
  buttonLabel: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    letterSpacing: 0.4
=======
  button: {
    textTransform: "none"
>>>>>>> changed styles to FormCard buttons and removed unused function in CreateEditForm
  }
});

//Other props { numCards, card, type, question, options, required }
//commented due to lint error
function FormCard({
  card,
  question,
  active,
  handleActive,
  sectionKey,
  questionKey
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card
        onClick={() => handleActive(sectionKey, questionKey)}
        className={active ? classes.active : classes.root}
      >
        <CardHeader className={classes.title} title={question} id={card} />
        <CardContent className={classes.content}>
          todo
          <Divider />
          <div className={classes.buttonRow}>
            <div className="button-container">
              <Button size="small" className={classes.button}>
                <DeleteOutlineIcon style={{ marginRight: 5 }} /> Delete
              </Button>
            </div>
            <div className="button-container">
              <Button size="small" className={classes.button}>
                <FileCopyOutlinedIcon style={{ marginRight: 5 }} /> Duplicate
              </Button>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className="button-container">
              <Button size="small" className={classes.button}>
                <SettingsOutlinedIcon style={{ marginRight: 5 }} /> Validation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FormCard;
