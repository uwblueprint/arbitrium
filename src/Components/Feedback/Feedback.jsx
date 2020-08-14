import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";

const useStyles = makeStyles({
  root: {
    maxWidth: 340,
    maxHeight: 571,
    borderRadius: 0,
    boxShadow: "0px 2px 3px 1px #cccccc"
  },
  title: {
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: 500,
    paddingTop: 10,
    paddingBottom: 16
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: 500,
    paddingBottom: 12
  },
  comment: {
    fontSize: 14,
    fontFamily: "Roboto"
  },
  commentBox: {
    fontSize: 14,
    fontFamily: "Roboto",
    minWidth: 308,
    paddingTop: 24,
    paddingBottom: 16
  },
  button: {
    minWidth: 308,
    fontSize: 14,
    alignItems: "right"
  },
  icons: {
    fontSize: 40,
    paddingRight: 16,
    paddingBottom: 12,
    color: "gray",
    cursor: "pointer"
  }
});

export default function Feedback() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title}>
          Send us your feedback!
        </Typography>
        <Typography className={classes.comment}>
          Do you have a suggestion or found some bug? <br></br>
          Let us know in the field below
        </Typography>
        <hr></hr>
        <Typography className={classes.subtitle}>
          How is your experience?
        </Typography>
        <div>
          <SentimentVeryDissatisfiedIcon
            className={classes.icons}
            onClick={console.log("test")}
          />
          <SentimentSatisfiedIcon
            className={classes.icons}
            onClick={console.log("test")}
          />
          <SentimentSatisfiedAltIcon
            className={classes.icons}
            onClick={console.log("test")}
          />
        </div>
        <Typography className={classes.subtitle}>
          Do you have anything to tell us?
        </Typography>
        <div>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="position " name="position">
              <FormControlLabel
                value="Bug"
                control={<Radio color="primary" />}
                label="Bug"
              />
              <FormControlLabel
                value="Suggestion"
                control={<Radio color="primary" />}
                label="Suggestion"
                labelPlacement="end"
              />
              <FormControlLabel
                value="Other"
                control={<Radio color="primary" />}
                label="Other"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <TextField
            className={classes.commentBox}
            id="outlined-multiline-static"
            multiline
            rows={7}
            placeholder="Your comment"
            variant="outlined"
          />
        </div>
        <Button className={classes.button} variant="contained" color="primary">
          Send Feedback
        </Button>
      </CardContent>
    </Card>
  );
}
