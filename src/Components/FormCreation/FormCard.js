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
import CreateEditShortAnswer from "./CreateEditShortAnswer";
import CreateEditParagraph from "./CreateEditParagraph";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ShortTextIcon from "@material-ui/icons/ShortText";
import { Draggable } from "react-beautiful-dnd";

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
  questionTitleAndMenuWrapper: {
    display: "flex",
    paddingBottom: 16
  },

  //Question Title
  questionTitle: {
    borderRadius: 4,
    border: "1px solid #ffffff",
    background: "#f4f5f6",
    height: 56,
    width: 568,
    paddingLeft: 16,
    display: "flex"
  },

  //Question Menu
  questionTypeMenu: {
    borderRadius: 4,
    border: "1px solid rgba(0, 0, 0, 0.12)",
    boxSizing: "border-box",
    background: "#FFFFFF",
    height: 40,
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
  questionKey
}) {
  const classes = useStyles();
  const [required, setRequired] = useState(card.required);
  const [title, setTitle] = useState(card.name);
  const [description, setDescription] = useState(card.description);
  const [questionMenuAnchor, setQuestionMenuAnchor] = useState(false);

  const handleSwitch = () => {
    setRequired((prev) => !prev);
  };

  return (
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
                <div className={classes.questionTitleAndMenuWrapper}>
                  <InputBase
                    className={classes.questionTitle}
                    placeholder="Question"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus={true}
                    rowsMax={1}
                    type="string"
                  ></InputBase>
                  <Button
                    className={classes.questionTypeMenu}
                    variant="outlined"
                    onClick={() => setQuestionMenuAnchor(true)}
                  >
                    <ShortTextIcon />
                    Open Menu
                  </Button>
                  <Menu
                    elevation={0}
                    id="simple-menu"
                    anchorEl={questionMenuAnchor}
                    keepMounted
                    open={Boolean(questionMenuAnchor)}
                    onClose={() => setQuestionMenuAnchor(null)}
                  >
                    <MenuItem> {"Test"}</MenuItem>
                    <MenuItem> {"Test2"}</MenuItem>
                    <MenuItem> {"Test3"}</MenuItem>
                    <MenuItem> {"Test4"}</MenuItem>
                  </Menu>
                </div>
                <TextField
                  placeholder="New Description"
                  className={classes.questionDescription}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rowsMax={10}
                  type="string"
                ></TextField>
                {card && card.type === "MULTIPLE_CHOICE" ? (
                  <CreateEditMultipleChoice data={card.options} />
                ) : null}
                {card && card.type === "SHORT_ANSWER" ? (
                  <CreateEditShortAnswer />
                ) : null}
                {card && card.type === "PARAGRAPHS" ? (
                  <CreateEditParagraph />
                ) : null}
                {card && card.type === "CHECKBOXES" ? (
                  <CreateEditCheckbox data={card.options} />
                ) : null}
                {card && card.type === "FILE_UPLOAD" ? <div>todo</div> : null}
                {card && card.type === "CHECKBOX_GRID" ? <div>todo</div> : null}
                <Divider />
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
        </div>
      )}
    </Draggable>
  );
}

export default FormCard;
