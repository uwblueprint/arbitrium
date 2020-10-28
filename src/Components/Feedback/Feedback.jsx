import React, { useContext, useState } from "react";
import { AuthContext } from "../../Authentication/Auth.js";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import CloseIcon from "@material-ui/icons/Close";
import FeedbackIcon from "@material-ui/icons/Feedback";
import * as UPDATE from "../../requests/update";

const StyledCard = styled(Card)`
  max-width: 340px;
  max-height: 571px;
  & .MuiPopover-paper {
    background-color: #6772e5;
    padding: 7px 14px;
  }
  & .MuiPaper-elevation0 {
    box-shadow: 2px 2px 4px 2px #cccccc;
  }
  .close {
    margin-left: 290px;
    font-size: 20px;
  }
  .title {
    font-size: 20px;
    font-weight: 500;
    padding-bottom: 16px;
  }
  .comment {
    font-size: 14px;
  }
  .subtitle {
    font-size: 16px;
    font-weight: 500;
  }
  .comment-box {
    font-size: 14px;
    min-width: 308px;
    padding-top: 12px;
    padding-bottom: 16px;
  }
  .button {
    min-width: 308px;
    font-size: 14px;
  }
  .container {
    box-shadow: 20px 20px red;
  }
`;

export default function Feedback() {
  const { currentUser, appUser } = useContext(AuthContext);
  const [experience, setExperience] = useState("");
  const [feedbackPar, setFeedbackPar] = useState("");
  const [comment, setComment] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const enabled = experience && feedbackPar && comment;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setExperience("");
    setAnchorEl(null);
  };

  const updateExperience = (experience) => () => {
    setExperience(experience);
  };

  const updateFeedbackPar = () => (event) => {
    setFeedbackPar(event.target.value);
  };

  const updateComment = () => (event) => {
    setComment(event.target.value);
  };

  const sendFeedback = () => (event) => {
    UPDATE.sendFeedbackEmail({
      userId: currentUser.uid,
      user: appUser,
      experience: experience,
      feedbackType: feedbackPar,
      comment: comment
    });
    handleClose();
  };

  return (
    <div>
      <FeedbackIcon cursor="pointer" onClick={handleClick} />
      <Dialog className="container" id={id} open={open}>
        <StyledCard>
          <CardContent>
            <div>
              <CloseIcon
                className="close"
                cursor="pointer"
                onClick={handleClose}
              />
            </div>
            <Typography className="title">Send us your feedback!</Typography>
            <Typography className="comment">
              Do you have a suggestion or found some bug? <br />
              Let us know in the field below
            </Typography>
            <hr />
            <Typography className="subtitle">
              How is your experience?
            </Typography>
            <div>
              <IconButton onClick={updateExperience("bad")}>
                <SentimentVeryDissatisfiedIcon
                  className="icons"
                  fontSize="large"
                  style={
                    experience === "bad"
                      ? { color: "#ED6362" }
                      : { color: "gray" }
                  }
                />
              </IconButton>
              <IconButton onClick={updateExperience("okay")}>
                <SentimentSatisfiedIcon
                  className="icons"
                  fontSize="large"
                  style={
                    experience === "okay"
                      ? { color: "#FDBC4B" }
                      : { color: "gray" }
                  }
                />
              </IconButton>
              <IconButton onClick={updateExperience("good")}>
                <SentimentSatisfiedAltIcon
                  className="icons"
                  fontSize="large"
                  style={
                    experience === "good"
                      ? { color: "#55A94E" }
                      : { color: "gray" }
                  }
                />
              </IconButton>
            </div>
            <Typography className="subtitle">
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
                className="comment-box"
                id="outlined-multiline-static"
                multiline
                rows={7}
                placeholder="Your comment"
                variant="outlined"
                onChange={updateComment()}
              />
            </div>
            <Button
              className="button"
              variant="contained"
              color="primary"
              onClick={sendFeedback()}
              disabled={!enabled}
            >
              Send Feedback
            </Button>
          </CardContent>
        </StyledCard>
      </Dialog>
    </div>
  );
}
