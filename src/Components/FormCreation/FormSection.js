import React, { useReducer, useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FormCard from "./FormCard";
import InputBase from "@material-ui/core/InputBase";
import AddCardComponent from "./AddCardComponent";
import { deleteQuestion } from "../../requests/forms";
import TextField from "@material-ui/core/TextField";
import { AuthContext } from "../../Authentication/Auth.js";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Divider } from "@material-ui/core";
import customFormQuestionsReducer from "../../Reducers/CustomFormQuestionsReducer";
import { Droppable } from "react-beautiful-dnd";

const useStyles = makeStyles({
  //Wraps the card

  //Used when content is active
  contentActive: {
    marginBottom: 8,
    marginLeft: 24,
    marginTop: 24,
    marginRight: 16
  },
  content: {
    marginBottom: 0,
    marginLeft: 24,
    marginTop: 0,
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
    width: 764
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
  questionData,
  updateActiveSection,
  active,
  handleAddSection,
  handleTitleUpdate,
  handleDescriptionUpdate,
  handleSectionTypeUpdate,
  handleDeleteSection,
  setShowMoveSectionsDialog
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const { appUser } = useContext(AuthContext);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questions, dispatchQuestionsUpdate] = useReducer(
    customFormQuestionsReducer,
    questionData
  );

  //States to manage content of section card
  const [title, setTitle] = useState(sectionData.name);
  const [description, setDescription] = useState(sectionData.description);
  const [sectionType, setSectionType] = useState(sectionData.sectionType);

  //Menu open/close
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
    //TODO: Post the question to mongo and then reload
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

  function handleDeleteQuestion(questionKey) {
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
          <CardContent
            className={active ? classes.contentActive : classes.content}
          >
            <div className={classes.sectionTitleAndMenuWrapper}>
              <InputBase
                className={classes.sectionTitle}
                placeholder="Untitled Section"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => handleTitleUpdate(title)}
                rowsMax={1}
                type="string"
              ></InputBase>
              {active ? (
                <IconButton
                  className={classes.sectionMenu}
                  aria-label="actions"
                  aria-controls="actions-menu"
                  onClick={handleAnchorClick}
                >
                  <MoreVertIcon />
                </IconButton>
              ) : null}
            </div>
            {active ? (
              <TextField
                className={classes.sectionDescription}
                placeholder="New Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                onBlur={() => handleDescriptionUpdate(description)}
                rowsMax={10}
                type="string"
              ></TextField>
            ) : null}
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
            {!sectionData.required ? (
              <MenuItem
                classes={{ root: classes.action_menu_item }}
                onClick={() => {
                  handleDeleteSection();
                }}
              >
                Delete section
              </MenuItem>
            ) : null}
          </Menu>
          {active ? (
            <CardContent
              className={active ? classes.contentActive : classes.content}
            >
              <Divider />
              <p style={{ fontWeight: 500 }}>
                {" "}
                How will information from this section be used?{" "}
              </p>
              <div>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="Decision Criteria"
                    value={sectionType}
                    //We can call handleSectionTypeUpdate prop on each change
                    //since there is very little updates compared to text input
                    onChange={(e) => {
                      setSectionType(e.target.value);
                      handleSectionTypeUpdate(e.target.value);
                    }}
                    onBlur={() => handleSectionTypeUpdate(sectionType)}
                  >
                    <FormControlLabel
                      value="Admin Info"
                      control={<Radio color="primary" />}
                      label="Admin Info"
                    />
                    <FormControlLabel
                      value="Decision Criteria"
                      control={<Radio color="primary" />}
                      label="Decision Criteria"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </CardContent>
          ) : (
            <CardContent className={classes.content}>
              <p style={{ fontWeight: 500 }}>
                {"Section Type: " + sectionType}
              </p>
            </CardContent>
          )}
        </Card>
        {active && activeQuestion === -1 ? (
          <AddCardComponent
            handleAddSection={handleAddSection}
            handleAddQuestion={handleAddQuestion}
          />
        ) : null}
      </CardWrapper>
      <Droppable droppableId={String(sectionNum - 1)}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {questions.map((question, questionKey) => (
              <CardWrapper
                key={question._id}
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
                <div style={{ marginLeft: snapshot.isDraggingOver ? 820 : 0 }}>
                  {active && activeQuestion === questionKey ? (
                    <AddCardComponent
                      handleAddSection={handleAddSection}
                      handleAddQuestion={handleAddQuestion}
                    />
                  ) : null}
                </div>
              </CardWrapper>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default FormSection;
