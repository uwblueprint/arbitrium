import React, { useReducer, useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FormCard from "./FormCard";
import InputBase from "@material-ui/core/InputBase";
import AddCardComponent from "./AddCardComponent";
import { deleteQuestion } from "../../requests/forms";
import TextField from "@material-ui/core/TextField";
import { AuthContext } from "../../Authentication/Auth.js";
import customFormQuestionsReducer from "../../Reducers/CustomFormQuestionsReducer";

const useStyles = makeStyles({
  //Wraps the card
  content: {
    marginBottom: 8,
    marginLeft: 24,
    marginTop: 24,
    marginRight: 16
  },

  root: {
    borderRadius: 0,
    borderTop: "8px solid #2261AD",
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    minWidth: 816,
    width: 816
  },
  rootActive: {
    borderRadius: 0,
    borderTop: "8px solid #2261AD",
    borderLeft: "4px solid #2261AD",
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    minWidth: 816,
    width: 816
  },

  //Question Title and Menu Wrapper
  sectionTitleAndMenuWrapper: {
    display: "flex"
  },

  //Display for "Section 1 of 2"
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

  //Section Title
  sectionTitle: {
    height: 36,
    width: 440,
    fontSize: 24
  },

  //Section Menu
  sectionMenu: {
    marginLeft: "auto",
    float: "right",
    marginBottom: 10
  },

  //Section Description
  sectionDescription: {
    height: 21,
    width: 764,
    marginBottom: 16
  },

  paper: {
    boxShadow: "0 2px 3px 1px #cccccc"
  },
  action_menu: {
    boxShadow:
      "0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    width: "158px"
  },
  action_menu_content: {
    paddingTop: "8px",
    paddingBottom: "8px"
  },
  action_menu_item: {
    fontSize: "14px",
    color: "rgba(0, 0, 0, 0.87)",
    lineHeight: "20px",
    letterSpacing: "0.25px"
  }
});

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
  handleDescriptionUpdate,
  handleMoveSection,
  handleDeleteSection,
  setShowMoveSectionsDialog
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const { appUser } = useContext(AuthContext);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questions, dispatchQuestionsUpdate] = useReducer(
    customFormQuestionsReducer,
    sectionData.questions
  );
  const [title, setTitle] = useState(sectionData.title);
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
      window.requestAnimationFrame(() => {
        const element = document.getElementById(
          "question_" + questionKey + "_" + sectionKey
        );
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      });
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

  function handleDuplicateQuestion(questionId) {
    dispatchQuestionsUpdate({
      type: "DUPLICATE_QUESTION",
      index: questionId,
      targetIndex: questionId + 1
    });
    updateActiveQuestion(sectionNum - 1, questionId + 1);
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

  return (
    <div>
      <span className={classes.section_index}>
        Section {sectionNum} of {numSections}
      </span>
      <CardWrapper>
        <Card
          className={
            active && activeQuestion === -1 ? classes.rootActive : classes.root
          }
          onClick={() => setSectionAsActive(sectionNum - 1)}
        >
          <CardContent className={classes.content}>
            <div className={classes.sectionTitleAndMenuWrapper}>
              <InputBase
                className={classes.sectionTitle}
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
              className={classes.sectionDescription}
              placeholder="New Description"
              value={sectionData.description}
              onChange={(e) => handleDescriptionUpdate(e.target.value)}
              multiline
              rowsMax={10}
              fullWidth="true"
              type="string"
            ></TextField>
          </CardContent>
          <Menu
            anchorEl={anchorEl}
            classes={{
              paper: classes.action_menu,
              list: classes.action_menu_content
            }}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleAnchorClose}
          >
            <MenuItem
              classes={{ root: classes.action_menu_item }}
              onClick={() => {
                handleAnchorClose();
                setShowMoveSectionsDialog(true);
              }}
            >
              Move section
            </MenuItem>
            <MenuItem
              classes={{ root: classes.action_menu_item }}
              onClick={() => {
                handleDeleteSection();
              }}
            >
              Delete section
            </MenuItem>
          </Menu>
          <CardContent className={classes.content}>
            {sectionData.description}
          </CardContent>
        </Card>
        {active && activeQuestion === -1 ? (
          <AddCardComponent
            handleAddSection={handleAddSection}
            handleAddQuestion={handleAddQuestion}
          />
        ) : null}
      </CardWrapper>
      {questions.map((_question, questionKey) => (
        <CardWrapper
          key={questionKey}
          id={"question_" + questionKey + "_" + (sectionNum - 1)}
        >
          <FormCard
            card={questions[questionKey]}
            key={questionKey + "_question"}
            active={active && activeQuestion === questionKey}
            handleActive={updateActiveQuestion}
            handleDuplicate={handleDuplicateQuestion}
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
    </div>
  );
}

export default FormSection;
