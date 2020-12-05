import React, { useState } from "react";
import { Button, Divider, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import { Switch } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CreateEditMultipleChoice from "./CreateEditMultipleChoice";
import CreateEditCheckbox from "./CreateEditCheckbox";
import TextQuestion from "./CardComponents/TextQuestion";
import TextField from "@material-ui/core/TextField";
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
    marginBottom: 8,
    marginLeft: 24,
    marginTop: 24,
    marginRight: 16
  },

  //CSS for the card component
  root: {
    fontSize: 14,
    borderRadius: 0,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816
  },
  rootActive: {
    fontSize: 14,
    borderRadius: 0,
    borderLeft: "4px solid #2261AD",
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816
  },

  //Question Title and Menu Wrapper
  questionTitleAndMenuWrapperActive: {
    display: "flex",
    paddingBottom: 24
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
    height: 24,
    width: 145,
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
    width: 764,
    height: 21,
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
    fontSize: 12,
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

const StyledSwitch = withStyles({
  switchBase: {
    color: "#48484a"
  }
})(Switch);

//Other props { numCards, card, type, question, options, required }
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
  handleRequiredToggle
}) {
  const classes = useStyles();
  const [title, setTitle] = useState(card.name);
  const [description, setDescription] = useState(card.description);
  const [questionMenuAnchor, setQuestionMenuAnchor] = useState(null);

  const questionTypes = [
    {
      name: "IDENTIFIER",
      value: "Identifier",
      icon: <StarsOutlinedIcon className={classes.action_menu_icon} />,
      style: classes.action_menu_item,
      isDeletable: false
    },
    {
      name: "SHORT_ANSWER",
      value: "Short Answer",
      icon: <ShortTextIcon className={classes.action_menu_icon} />,
      style: classes.action_menu_item2,
      isDeletable: true
    },
    {
      name: "PARAGRAPHS",
      value: "Paragraphs",
      icon: <SubjectIcon className={classes.action_menu_icon} />,
      style: classes.action_menu_item,
      isDeletable: true
    },
    {
      name: "CHECKBOXES",
      value: "checkboxes",
      icon: <CheckBoxIcon className={classes.action_menu_icon} />,
      style: classes.action_menu_item2,
      isDeletable: true
    },
    {
      name: "MULTIPLE_CHOICE",
      value: "Multiple Choice",
      icon: <RadioButtonCheckedIcon className={classes.action_menu_icon} />,
      style: classes.action_menu_item,
      isDeletable: true
    },
    {
      name: "FILE_UPLOAD",
      value: "File Upload",
      icon: <CloudUploadOutlinedIcon className={classes.action_menu_icon} />,
      style: classes.action_menu_item2,
      isDeletable: true
    }
  ];

  return (
    <div>
      <Draggable draggableId={String(card._id)} index={questionKey}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={classes.container}>
              <Card
                onClick={() => handleActive(sectionKey, questionKey)}
                className={active ? classes.rootActive : classes.root}
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
                      className={
                        active
                          ? classes.questionTitleActive
                          : classes.questionTitle
                      }
                      placeholder="Question"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={() => handleQuestionTitleUpdate(title)}
                      rowsMax={1}
                      type="string"
                    ></InputBase>
                    {active ? (
                      <div>
                        <Button
                          disabled={!card || card.type === "IDENTIFIER"}
                          className={classes.questionTypeMenu}
                          variant="outlined"
                          onClick={(event) =>
                            setQuestionMenuAnchor(event.currentTarget)
                          }
                        >
                          {card
                            ? questionTypes
                                .filter((type) => type.name == card.type)
                                .map((button) => {
                                  return (
                                    <div style={{ display: "flex" }}>
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
                        placeholder="New Description"
                        className={classes.questionDescription}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={() =>
                          handleQuestionDescriptionUpdate(description)
                        }
                        multiline
                        rowsMax={10}
                        type="string"
                      ></TextField>
                      {card && card.type === "MULTIPLE_CHOICE" ? (
                        <CreateEditMultipleChoice data={card.options} />
                      ) : null}
                      {card && card.type === "IDENTIFIER" ? (
                        <TextQuestion short_answer={true} />
                      ) : null}
                      {card && card.type === "SHORT_ANSWER" ? (
                        <TextQuestion short_answer={true} />
                      ) : null}
                      {card && card.type === "PARAGRAPHS" ? (
                        <TextQuestion short_answer={false} />
                      ) : null}
                      {card && card.type === "CHECKBOXES" ? (
                        <CreateEditCheckbox data={card.options} />
                      ) : null}
                      {card && card.type === "FILE_UPLOAD" ? (
                        <div>todo</div>
                      ) : null}
                      {card && card.type === "CHECKBOX_GRID" ? (
                        <div>todo</div>
                      ) : null}
                      <Divider />
                    </div>
                  ) : (
                    <div>
                      {" "}
                      {card.type}
                      <Divider />
                    </div>
                  )}
                  {active ? (
                    <div className={classes.buttonRow}>
                      <div className={classes.buttonContainer}>
                        <Button
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
                        <Button size="small" className={classes.button}>
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
              </Card>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
}

export default FormCard;
