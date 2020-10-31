import React, { useState } from "react";
import { Button, Divider, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import AddCardComponent from "./AddCardComponent";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { Switch } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
  },
  switch: {
    textTransform: "none",
    paddingTop: 4,
    paddingLeft: 10
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
  const [required, setRequired] = useState(true);
  const StyledSwitch = withStyles({
    switchBase: {
      color: "#48484a"
    }
  })(Switch);
  const handleSwitch = () => {
    setRequired((prev) => !prev);
  };

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
            <div className={classes.buttonContainer}>
              <Button size="small" className={classes.button}>
                <DeleteOutlineIcon style={{ marginRight: 5 }} />{" "}
                <span className={classes.buttonLabel}>Delete</span>
              </Button>
            </div>
            <div className={classes.buttonContainer}>
              <Button
                size="small"
                className={classes.button}
                //onClick={handleDuplicate({ sectionKey, questionKey, question })}
              >
                <FileCopyOutlinedIcon style={{ marginRight: 5 }} />{" "}
                <span className={classes.buttonLabel}>Duplicate</span>
              </Button>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.buttonContainer}>
              <Button size="small" className={classes.button}>
                <SettingsOutlinedIcon style={{ marginRight: 5 }} />{" "}
                <span className={classes.buttonLabel}>Validation</span>
              </Button>
            </div>
            <div className={classes.switch}>
              <FormControlLabel
                control={
                  <StyledSwitch
                    size="small"
                    checked={required}
                    onChange={handleSwitch}
                    color="primary"
                  />
                }
                label={
                  <Typography className={classes.buttonLabel}>
                    Required
                  </Typography>
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FormCard;
