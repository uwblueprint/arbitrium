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
import IconButton from "@material-ui/core/IconButton";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import * as UPDATE from "../../requests/update";

const UPDATE = require("../../requests/update");

const useStyles = makeStyles({
  root: {
    maxWidth: 340,
    maxHeight: 571,
    borderRadius: 0,
    boxShadow: "0 2px 2px 2px #cccccc"
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    paddingTop: 10,
    paddingBottom: 16
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 500
  },
  comment: {
    fontSize: 14
  },
  commentBox: {
    fontSize: 14,
    minWidth: 308,
    paddingTop: 12,
    paddingBottom: 16
  },
  button: {
    minWidth: 308,
    fontSize: 14,
    alignItems: "right"
  },
  icons: {
    fontSize: 40,
    color: "grey"
  }
});

export default function Feedback(user) {
  const [experience, setExperience] = useState("");
  const [feedbackPar, setFeedbackPar] = useState("");
  const [comment, setComment] = useState("");

  const classes = useStyles();

  const updateComment = () => (event) => {
    console.log(event.target.value);
    setComment(event.target.value);
    console.log(comment);
    console.log("----");
    console.log(experience);
    console.log("----");
  };

  const updateFeedbackPar = () => (event) => {
    console.log(event.target.value);
    setFeedbackPar(event.target.value);
    console.log(feedbackPar);
  };

  const sendFeedback = () => (event) => {
    let obj = {
      userId: "",
      experience: experience,
      feedbackPar: feedbackPar,
      comment: comment
    };
    console.log(obj);
    // UPDATE.createReviewAPI({
    //   userId: "",
    //   experience: experience,
    //   feedbackPar: feedbackPar,
    //   comment: comment
    // })
  };

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
          <IconButton onClick={setExperience("bad")}>
            <SentimentVeryDissatisfiedIcon className={classes.icons} />
          </IconButton>
          <IconButton onClick={setExperience("okay")}>
            <SentimentSatisfiedIcon className={classes.icons} />
          </IconButton>
          <IconButton onClick={setExperience("good")}>
            <SentimentSatisfiedAltIcon className={classes.icons} />
          </IconButton>
        </div>
        <Typography className={classes.subtitle}>
          Do you have anything to tell us?
        </Typography>
        <div>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="position"
              onChange={updateFeedbackPar()}
            >
              <FormControlLabel
                value="Bug"
                control={<Radio color="primary" />}
                label="Bug"
                labelPlacement="end"
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
            onChange={updateComment()}
          />
        </div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={sendFeedback()}
        >
          Send Feedback
        </Button>
      </CardContent>
    </Card>
  );
}
