import React, { useState } from "react";
import styled from "styled-components";
import { Button, Divider, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { Switch } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SelectQuestion from "./CardComponents/SelectQuestion";
import TextQuestion from "./CardComponents/TextQuestion";
import TextField from "@material-ui/core/TextField";
import FileQuestion from "./CardComponents/FileQuestion";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ShortTextIcon from "@material-ui/icons/ShortText";
import { Draggable } from "react-beautiful-dnd";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import SubjectIcon from "@material-ui/icons/Subject";
import StarsOutlinedIcon from "@material-ui/icons/StarsOutlined";

const MENU_BUTTON_HEIGHT = 40;
const useStyles = makeStyles({
  //Wraps the card
  content: {
    marginBottom: 16,
    marginLeft: 16,
    marginTop: 16,
    marginRight: 16,
    "&:last-child": {
      paddingBottom: 16
    }
  },

  //Question Title and Menu Wrapper
  questionTitleAndMenuWrapperActive: {
    display: "flex",
    paddingBottom: 16
  },
  questionTitleAndMenuWrapper: {
    display: "flex",
    paddingBottom: 16
  },

  //Question Title
  questionTitleActive: {
    borderRadius: 4,
    border: "1px solid #ffffff",
    background: "#f4f5f6",
    height: 56,
    width: 568,
    paddingLeft: 16,
    display: "flex",
    fontSize: 16
  },
  questionTitle: {
    width: 784,
    display: "flex",
    fontSize: 16
  },

  //Question Menu
  questionTypeMenu: {
    borderRadius: 4,
    border: "1px solid rgba(0, 0, 0, 0.12)",
    boxSizing: "border-box",
    background: "#FFFFFF",
    height: MENU_BUTTON_HEIGHT,
    width: 192,
    marginBottom: 16,
    marginLeft: 16,
    textAlign: "left",
    justifyContent: "left"
  },

  //Question Description
  questionDescription: {
    width: 744,
    marginBottom: 24
  },

  //Row of options at bottom wrapper
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
  //required
  switch: {
    textTransform: "none",
    paddingTop: 4,
    paddingLeft: 10
  },
  button: {
    textTransform: "none"
  },
  buttonLabel: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    letterSpacing: 0.4
  },

  menu_paper: {
    boxShadow:
      "0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)"
  },

  action_menu_item: {
    color: "rgba(0, 0, 0, 0.87)",
    height: 56,
    borderBottom: "1px solid #cccccc",
    width: 192,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.4,
    fontWeight: 400
  },
  //No border bottom
  action_menu_item2: {
    color: "rgba(0, 0, 0, 0.87)",
    height: 56,
    width: 192,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.4,
    fontWeight: 400
  },

  action_menu_icon: {
    paddingRight: 10
  }
});

//CSS for the card component
const QuestionCard = styled(Card)`
  && {
    font-size: 14px;
    border-radius: 0;
    border-left: ${(props) =>
      props.isActive ? `4px solid #${props.themeColour}` : "none"};
    box-shadow: 0 2px 3px 1px #cccccc;
    margin-bottom: 20px;
    width: 816px;
  }
`;

const StyledSwitch = withStyles({
  switchBase: {
    color: "#48484a"
  }
})(Switch);

//Other props { numCards, card, type, question, options, required, handleQuestionValidationsUpdate }
//commented due to lint error
function FormCard({
  card,
  active,
  handleActive,
  handleDuplicate,
  handleDelete,
  sectionKey,
  questionKey,
  handleQuestionDescriptionUpdate,
  handleQuestionTitleUpdate,
  handleQuestionTypeUpdate,
  handleQuestionContentUpdate,
  handleQuestionValidationsUpdate,
  handleRequiredToggle,
  themeColour,
  isPublished = false
}) {
  const classes = useStyles();
  const [title, setTitle] = useState(card.name || "");
  const [description, setDescription] = useState(card.description || "");
  const [questionMenuAnchor, setQuestionMenuAnchor] = useState(null);

  const onQuestionUpdate = (options) => {
    if (card.type === "CHECKBOXES" || card.type === "MULTIPLE_CHOICE") {
      const opt = {
        xoptions: options.map((option) => {
          return { value: option[0] };
        }),
        yoptions: null
      };
      handleQuestionContentUpdate(opt);
    }
    if (card.type === "CHECKBOX_GRID") {
      //todo
    }
    if (card.type === "FILE_UPLOAD") {
      const opt = {
        xoptions: [{ value: options }],
        yoptions: null
      };
      handleQuestionContentUpdate(opt);
    }
  };

  const onValidationUpdate = (options) => {
    if (card.type === "PARAGRAPHS") {
      handleQuestionValidationsUpdate(options);
    }
  };

  const handleValidationToggle = () => {
    if (!card.validations) {
      const validation = {
        type: "WORD",
        expression: null,
        max: 0,
        min: 0,
        active: true
      };
      onValidationUpdate(validation);
    } else {
      const validation = {
        type: card.validations.type.toUpperCase(),
        expression: null,
        max: card.validations.max,
        min: card.validations.min,
        active: !card.validations.active
      };
      onValidationUpdate(validation);
    }
  };

  const questionTypes = [
    {
      name: "IDENTIFIER",
      value: "Identifier",
      icon: <StarsOutlinedIcon className={classes.action_menu_icon} />,
      style: classes.action_menu_item,
      isDeletable: false,
      render: <TextQuestion short_answer={true} />,
      renderInactive: card.type
    },
    {
      name: "SHORT_ANSWER",
      value: "Short Answer",
      icon: <ShortTextIcon className={classes.action_menu_icon} />,
      style: classes.action_menu_item2,
      isDeletable: true,
      render: <TextQuestion short_answer={true} />,
      renderInactive: card.type
    },
    {
      name: "PARAGRAPHS",
      value: "Paragraphs",
      icon: <SubjectIcon className={classes.action_menu_icon} />,
      style: classes.action_menu_item,
      isDeletable: true,
      render: (
        <TextQuestion
          short_answer={false}
          onValidation={onValidationUpdate}
          initialValidation={card.validations}
        />
      ),
      renderInactive: card.type
    },
    {
      name: "CHECKBOXES",
      value: "Checkboxes",
      icon: <CheckBoxIcon className={classes.action_menu_icon} />,
      style: classes.action_menu_item2,
      isDeletable: true,
      render: (
        <SelectQuestion
          data={card.options}
          onChange={onQuestionUpdate}
          initialOptions={
            card && card.x_options.map((option) => [option.value])
          }
          multiSelect={true}
          isPublished={isPublished}
        />
      ),
      renderInactive: card.type
    },
    {
      name: "MULTIPLE_CHOICE",
      value: "Multiple Choice",
      icon: <RadioButtonCheckedIcon className={classes.action_menu_icon} />,
      style: classes.action_menu_item,
      isDeletable: true,
      render: (
        <SelectQuestion
          data={card.options}
          onChange={onQuestionUpdate}
          initialOptions={
            card && card.x_options.map((option) => [option.value])
          }
          multiSelect={false}
          isPublished={isPublished}
        />
      ),
      renderInactive: card.type
    },
    {
      name: "FILE_UPLOAD",
      value: "File Upload",
      icon: <CloudUploadOutlinedIcon className={classes.action_menu_icon} />,
      style: classes.action_menu_item2,
      isDeletable: true,
      render: (
        <FileQuestion
          active={true}
          onChange={onQuestionUpdate}
          submission={false}
          initialNumFiles={card && card.x_options[0] && card.x_options[0].value}
          isPublished={true}
        />
      ),
      renderInactive: (
        <FileQuestion
          active={false}
          onChange={onQuestionUpdate}
          submission={false}
          initialNumFiles={card && card.x_options[0] && card.x_options[0].value}
          isPublished={true}
        />
      )
    }
  ];
  return (
    <div>
      <Draggable
        draggableId={String(card._id)}
        index={questionKey}
        key={questionKey}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={classes.container}>
              <QuestionCard
                themeColour={themeColour}
                onClick={() => handleActive(sectionKey, questionKey)}
                isActive={active}
              >
                <CardContent className={classes.content}>
                  <div
                    className={
                      active
                        ? classes.questionTitleAndMenuWrapperActive
                        : classes.questionTitleAndMenuWrapper
                    }
                  >
                    <InputBase
                      key={"Question_title_" + questionKey}
                      className={
                        active
                          ? classes.questionTitleActive
                          : classes.questionTitle
                      }
                      placeholder="Question"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={() =>
                        title !== card.name
                          ? handleQuestionTitleUpdate(title)
                          : null
                      }
                      multiline={!active}
                      type="string"
                    ></InputBase>
                    {active ? (
                      <div>
                        <Button
                          disabled={
                            !card || card.type === "IDENTIFIER" || isPublished
                          }
                          className={classes.questionTypeMenu}
                          variant="outlined"
                          onClick={(event) =>
                            setQuestionMenuAnchor(event.currentTarget)
                          }
                        >
                          {card
                            ? questionTypes
                                .filter((type) => type.name === card.type)
                                .map((button) => {
                                  return (
                                    <div
                                      key={card._id + "_MenuButton"}
                                      style={{ display: "flex" }}
                                    >
                                      {button.icon}
                                      {button.value}
                                    </div>
                                  );
                                })
                            : null}
                        </Button>
                        <Menu
                          anchorEl={questionMenuAnchor}
                          elevation={0}
                          id="simple-menu"
                          classes={{
                            paper: classes.menu_paper
                          }}
                          style={{ marginTop: 50 }}
                          keepMounted
                          open={Boolean(questionMenuAnchor)}
                          onClose={() => setQuestionMenuAnchor(null)}
                        >
                          {questionTypes.map((button) => {
                            if (button.isDeletable) {
                              return (
                                <MenuItem
                                  classes={{
                                    root: button.style
                                  }}
                                  onClick={() => {
                                    handleQuestionTypeUpdate(button.name);
                                    setQuestionMenuAnchor(null);
                                  }}
                                >
                                  {button.icon}
                                  {button.value}
                                </MenuItem>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </Menu>
                      </div>
                    ) : null}
                  </div>
                  {active ? (
                    <div>
                      <TextField
                        key={"Question_description_" + questionKey}
                        placeholder="New Description"
                        className={classes.questionDescription}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={() =>
                          description !== card.description
                            ? handleQuestionDescriptionUpdate(description)
                            : null
                        }
                        multiline
                        rowsMax={10}
                        type="string"
                      ></TextField>
                      {card
                        ? questionTypes
                            .filter((type) => type.name === card.type)
                            .map((question) => {
                              return (
                                <div key={card._id + "_QuestionContent"}>
                                  {question.render}
                                </div>
                              );
                            })
                        : null}
                      <Divider />
                    </div>
                  ) : (
                    <div>
                      {card
                        ? questionTypes
                            .filter((type) => type.name === card.type)
                            .map((question) => {
                              return (
                                <div key={card._id + "_QuestionContent"}>
                                  {question.renderInactive}
                                </div>
                              );
                            })
                        : null}
                      <Divider />
                    </div>
                  )}
                  {active ? (
                    <div className={classes.buttonRow}>
                      <div className={classes.buttonContainer}>
                        <Button
                          disabled={
                            (card && card.type === "IDENTIFIER") || isPublished
                          }
                          size="small"
                          className={classes.button}
                          onClick={() => {
                            handleDelete(questionKey);
                          }}
                        >
                          <DeleteOutlineIcon style={{ marginRight: 5 }} />{" "}
                          <span className={classes.buttonLabel}>Delete</span>
                        </Button>
                      </div>
                      <div className={classes.buttonContainer}>
                        <Button
                          disabled={
                            (card && card.type === "IDENTIFIER") || isPublished
                          }
                          size="small"
                          className={classes.button}
                          onClick={() => handleDuplicate(questionKey)}
                        >
                          <FileCopyOutlinedIcon style={{ marginRight: 5 }} />{" "}
                          <span className={classes.buttonLabel}>Duplicate</span>
                        </Button>
                      </div>
                      <Divider orientation="vertical" flexItem />
                      <div className={classes.buttonContainer}>
                        <Button
                          size="small"
                          className={classes.button}
                          disabled={isPublished}
                          onClick={() => handleValidationToggle()}
                        >
                          <SettingsOutlinedIcon style={{ marginRight: 5 }} />{" "}
                          <span className={classes.buttonLabel}>
                            Validation
                          </span>
                        </Button>
                      </div>
                      <div className={classes.switch}>
                        <FormControlLabel
                          control={
                            <StyledSwitch
                              disabled={
                                (card && card.type === "IDENTIFIER") ||
                                isPublished
                              }
                              size="small"
                              checked={card.required}
                              color="primary"
                              onChange={() => handleRequiredToggle()}
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
                  ) : null}
                </CardContent>
              </QuestionCard>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
}

export default FormCard;
