import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CreateEditMultipleChoice from "../CreateEditMultipleChoice";
import CreateEditCheckbox from "../CreateEditCheckbox";
import CreateEditShortAnswer from "../CreateEditShortAnswer";
import CreateEditParagraph from "../CreateEditParagraph";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";

const useStyles = makeStyles({
  content: {
    marginTop: -16
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
  },
  questionTitle: {
    borderRadius: 4,
    border: "1px solid #ffffff",
    background: "#f4f5f6",
    height: 56,
    width: 768,
    paddingLeft: 16,
    marginBottom: 16
  }
});

const TitleWrapper = styled.div`
  margin-top: 24px;
  margin-left: 8px;
  margin-bottom: 16px;
  margin-right: 16px;
  position: "flex";
`;

//Other props { numCards, card, type, question, options, required }
//commented due to lint error
function FormCard({ card, active, handleActive, sectionKey, questionKey }) {
  const classes = useStyles();
  const [title, setTitle] = useState(card.name);
  const [description, setDescription] = useState(card.description);
  const [questionMenuAnchor, setQuestionMenuAnchor] = useState(false);

  return (
    <div className={classes.container}>
      <Card
        onClick={() => handleActive(sectionKey, questionKey)}
        className={active ? classes.active : classes.root}
      >
        <CardContent className={classes.content}>
          <TitleWrapper>
            <InputBase
              className={classes.questionTitle}
              placeholder="Question"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus={true}
              rowsMax={1}
              fullWidth="true"
              type="string"
            ></InputBase>
            <TextField
              placeholder="New Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rowsMax={10}
              fullWidth="true"
              type="string"
            ></TextField>
          </TitleWrapper>
          {card && card.type === "MULTIPLE_CHOICE" ? (
            <CreateEditMultipleChoice data={card.options} />
          ) : null}
          {card && card.type === "SHORT_ANSWER" ? (
            <CreateEditShortAnswer />
          ) : null}
          {card && card.type === "PARAGRAPHS" ? <CreateEditParagraph /> : null}
          {card && card.type === "CHECKBOXES" ? (
            <CreateEditCheckbox data={card.options} />
          ) : null}
          {card && card.type === "FILE_UPLOAD" ? <div>todo</div> : null}
          {card && card.type === "CHECKBOX_GRID" ? <div>todo</div> : null}
        </CardContent>
      </Card>
    </div>
  );
}

export default FormCard;
