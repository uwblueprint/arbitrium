import React, { useReducer, useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FormCard from "./FormCard";
import InputBase from "@material-ui/core/InputBase";
import AddCardComponent from "./AddCardComponent";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { deleteQuestion } from "../../requests/forms";
import TextField from "@material-ui/core/TextField";
import { AuthContext } from "../../Authentication/Auth.js";
import customFormQuestionsReducer from "../../Reducers/CustomFormQuestionsReducer";

const useStyles = makeStyles({
  content: {
    marginTop: -16
  },
  root: {
    fontSize: 14,
    borderRadius: 0,
    borderTop: "8px solid #2261AD",
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816,
    minWidth: 400
  },
  active: {
    fontSize: 14,
    borderRadius: 0,
    borderTop: "8px solid #2261AD",
    borderLeft: "4px solid #2261AD",
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816
  },
  title: {
    height: 36,
    marginBottom: 16,
    width: 816,
    marginTop: 32
  },
  section_index: {
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    marginBottom: "0px",
    fontSize: "14px",
    backgroundColor: "#2261AD",
    color: "white",
    width: "fit-content",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    paddingBottom: "5px"
  },
  sectionTitleBox: {
    height: 36,
    width: 440,
    marginLeft: 28,
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 400
  },
  sectionMenu: {
    marginLeft: "auto",
    float: "right"
  },
  paper: {
    boxShadow: "0 2px 3px 1px #cccccc"
  }
});

const HeaderWrapper = styled.div`
  margin-top: 32px;
  margin-left: 12px;
  margin-bottom: 25px;
  marginright: 1px;
`;

const CardWrapper = styled.div`
  display: flex;
`;

function FormSection({
  numSections,
  sectionNum,
  sectionData,
  updateActiveSection,
  active,
  handleAddSection,
  handleTitleUpdate,
  handleDescriptionUpdate
}) {
  const classes = useStyles();
  const { appUser } = useContext(AuthContext);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questions, dispatchQuestionsUpdate] = useReducer(
    customFormQuestionsReducer,
    sectionData.questions
  );
  const [title, setTitle] = useState(sectionData.title);

  // For actions menu for each form section
  const [anchorEl, setAnchorEl] = useState(null);
  const handleAnchorClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    //Loading Questions
    dispatchQuestionsUpdate({
      type: "LOAD",
      questions: questions
    });
  }, [questions, dispatchQuestionsUpdate]);

  function updateActiveQuestion(sectionKey, questionKey) {
    //Saving is done on focus change and is handled at the section level
    //Every question change updates the active section and saves the changes
    console.log("Active Question Changed: " + questionKey);
    // handleUpdateQuestion(sectionKey, questionKey);
    updateActiveSection(sectionKey);
    if (activeQuestion !== questionKey) {
      setActiveQuestion(questionKey);
    }
  }

  function setSectionAsActive(sectionKey) {
    //This is called when the header for the section is focused
    //A question id of -1 means that we are editing the section itself
    setActiveQuestion(-1);
    updateActiveSection(sectionKey);
  }

  function handleAddQuestion() {
    //When a question is added we update the DB with the new question
    dispatchQuestionsUpdate({
      type: "ADD_QUESTION",
      index: activeQuestion
    });
    updateActiveQuestion(sectionNum - 1, activeQuestion + 1);
  }

  // eslint-disable-next-line no-unused-vars
  function handleMoveQuestion() {
    // TODO: update question location in section within sections object
    // TODO: call the update section API endpoint
    // TODO: call updateActive
  }

  function handleDeleteQuestion(questionKey) {
    //We should be able to undo the deletion of a section
    //To implement this we will do a soft delete

    deleteQuestion(
      { formId: appUser.currentProgram },
      sectionData._id,
      questions[questionKey]._id
    );
    dispatchQuestionsUpdate({ type: "DELETE_QUESTION", index: questionKey });
    if (questionKey !== 0) {
      setActiveQuestion(questionKey - 1);
    }
  }

  // async function handleUpdateQuestion(prevSection, prevQuestion) {
  //   // update recently de-selected question
  //   const response = await FORM.updateQuestion(
  //     appUser.currentProgram,
  //     prevSection,
  //     sectionData.questions[prevQuestion]
  //   );

  //   // check status of update
  //   if (response.status !== 200) {
  //     console.error(`ERROR: Status - ${response.status}`);
  //   }
  // }

  return (
    <div>
      <span className={classes.section_index}>
        Section {sectionNum} of {numSections}
      </span>
      <CardWrapper key={sectionNum}>
        <Card
          className={
            active && activeQuestion === -1 ? classes.active : classes.root
          }
          onClick={() => setSectionAsActive(sectionNum - 1)}
        >
          <div className={classes.title}>
            <InputBase
              className={classes.sectionTitleBox}
              placeholder="Untitled Section"
              value={sectionData.title}
              onChange={(e) => handleTitleUpdate(e.target.value)}
              autoFocus={true}
              rowsMax={1}
              type="string"
            ></InputBase>
            <IconButton
              className={classes.sectionMenu}
              aria-label="actions"
              aria-controls="actions-menu"
              onClick={handleAnchorClick}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
          <TextField
            className={classes.sectionTitleBox}
            placeholder="New Description"
            value={"New Description"}
            onChange={(e) => handleDescriptionUpdate(e.target.value)}
            multiline
            rowsMax={10}
            fullWidth="true"
            type="string"
          ></TextField>
          <CardContent className={classes.content}>{"Admin Info"}</CardContent>
        </Card>
        {active && activeQuestion === -1 ? (
          <AddCardComponent
            handleAddSection={handleAddSection}
            handleAddQuestion={handleAddQuestion}
          />
        ) : null}
      </CardWrapper>
      {questions.map((_question, questionKey) => (
        <CardWrapper key={questionKey}>
          <FormCard
            card={questions[questionKey]}
            key={questionKey + "_question"}
            active={active && activeQuestion === questionKey}
            handleActive={updateActiveQuestion}
            handleDelete={handleDeleteQuestion}
            sectionKey={sectionNum - 1}
            questionKey={questionKey}
          />
          {active && activeQuestion === questionKey ? (
            <AddCardComponent
              handleAddSection={handleAddSection}
              handleAddQuestion={handleAddQuestion}
            />
          ) : null}
        </CardWrapper>
      ))}
      <Menu
        id="actions-menu"
        classes={classes}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleAnchorClose}
      >
        <MenuItem onClick={() => console.info("b")}>Move section</MenuItem>
        <MenuItem onClick={() => console.info("a")}>Delete section</MenuItem>
      </Menu>
    </div>
  );
}

export default FormSection;
