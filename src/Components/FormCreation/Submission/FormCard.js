import React, { useCallback, useContext, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SelectQuestion from "../CardComponents/SelectQuestion";
import TextQuestion from "./../CardComponents/TextQuestion";
import styled from "styled-components";
import FileQuestion from "./../CardComponents/FileQuestion";
import FormSettingsContext from "../FormSettingsContext";
import SubmissionAnswersContext from "./../Submission/SubmissionAnswersContext";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles({
  content: {
    marginTop: -16,
    color: "black"
  },
  root: {
    fontSize: 14,
    borderRadius: 0,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816
  },
  active: (props) => ({
    fontSize: 14,
    borderRadius: 0,
    borderLeft: `4px solid #${props.themeColour}`,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816
  }),
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
  //Section Description
  description: {
    display: "block",
    fontSize: 12,
    overflowy: "auto"
  },
  questionTitle: {
    borderRadius: 4,
    border: "1px solid #ffffff",
    background: "#f4f5f6",
    height: 56,
    width: 784,
    marginBottom: 16
  }
});

const TitleWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 16px;
  position: "flex";
`;

const NameField = styled.div`
  font-size: 16px;
  width: 846px;
  margin-bottom: 16px;
  line-height: 22px;
`;

const DescriptionField = styled(InputBase)`
  width: 784px;
  color: black;
`;

//Other props { numCards, card, type, question, options, required }
//commented due to lint error
function FormCard({
  card,
  active,
  handleActive,
  sectionKey,
  questionKey,
  updateSubmission,
  fileUploadURL,
  sectionId,
  onValidUpdate,
  isTextValid
}) {
  const { themeColour } = useContext(FormSettingsContext);
  const answers = useContext(SubmissionAnswersContext);
  const classes = useStyles({ themeColour });

  const onQuestionUpdate = useCallback(
    (data) => {
      if (card.type === "CHECKBOXES" || card.type === "MULTIPLE_CHOICE") {
        //We are storing the selected options by id in the submissions
        //To get the values we will cross-reference with the form
        const answerArray = card.x_options
          .filter((opt) => data[opt.value])
          .map((opt) => opt._id);
        updateSubmission(card._id, card.type, "", answerArray);
      } else if (
        card.type === "SHORT_ANSWER" ||
        card.type === "PARAGRAPHS" ||
        card.type === "IDENTIFIER"
      ) {
        //Stored as a string
        updateSubmission(card._id, card.type, data, []);
      } else if (card.type === "FILE_UPLOAD") {
        //Stored as an array of strings of file links
        updateSubmission(card._id, card.type, "", data);
      } else if (card.type === "CHECKBOX_GRID") {
        //TODO
      }
    },
    [card, updateSubmission]
  );

  const initialAnswer = answers.find((ans) => {
    return ans.questionId === card._id && ans.sectionId === sectionId;
  });

  const questionTypes = useMemo(() => {
    return [
      {
        name: "IDENTIFIER",
        value: "Identifier",
        style: classes.action_menu_item,
        isDeletable: false,
        render: (
          <TextQuestion
            short_answer={true}
            submission={true}
            onChange={onQuestionUpdate}
            initialAnswer={initialAnswer?.answerString}
          />
        ),
        renderInactive: card.type
      },
      {
        name: "SHORT_ANSWER",
        value: "Short Answer",
        style: classes.action_menu_item2,
        isDeletable: true,
        render: (
          <TextQuestion
            short_answer={true}
            submission={true}
            initialValidation={card.validations}
            onChange={onQuestionUpdate}
            initialAnswer={initialAnswer?.answerString}
          />
        ),
        renderInactive: card.type
      },
      {
        name: "PARAGRAPHS",
        value: "Paragraphs",
        style: classes.action_menu_item,
        isDeletable: true,
        render: (
          <TextQuestion
            short_answer={false}
            submission={true}
            initialValidation={card.validations}
            onChange={onQuestionUpdate}
            initialAnswer={initialAnswer?.answerString}
            onValidUpdate={onValidUpdate}
            isTextValid={isTextValid}
          />
        ),
        renderInactive: card.type
      },
      {
        name: "CHECKBOXES",
        value: "Checkboxes",
        style: classes.action_menu_item2,
        isDeletable: true,
        render: (
          <SelectQuestion
            onChange={onQuestionUpdate}
            initialOptions={
              card && card.x_options.map((option) => [option.value, option._id])
            }
            multiSelect={true}
            submission={true}
            initialAnswers={initialAnswer?.answerArray}
          />
        ),
        renderInactive: card.type
      },
      {
        name: "MULTIPLE_CHOICE",
        value: "Multiple Choice",
        style: classes.action_menu_item,
        isDeletable: true,
        render: (
          <SelectQuestion
            submission={true}
            onChange={onQuestionUpdate}
            initialOptions={
              card && card.x_options.map((option) => [option.value, option._id])
            }
            multiSelect={false}
            initialAnswers={initialAnswer?.answerArray}
          />
        ),
        renderInactive: card.type
      },
      {
        name: "FILE_UPLOAD",
        value: "File Upload",
        style: classes.action_menu_item2,
        isDeletable: true,
        render: (
          <FileQuestion
            active={true}
            submission={true}
            onChange={onQuestionUpdate}
            fileUploadURL={fileUploadURL}
            initialNumFiles={
              card && card.x_options[0] && card.x_options[0].value
            }
            initialAnswer={initialAnswer?.answerArray}
          />
        ),
        renderInactive: (
          <FileQuestion
            active={false}
            onChange={onQuestionUpdate}
            submission={true}
            initialNumFiles={
              card && card.x_options[0] && card.x_options[0].value
            }
            initialAnswer={initialAnswer?.answerArray}
          />
        )
      }
    ];
  }, [
    card,
    classes,
    fileUploadURL,
    initialAnswer,
    isTextValid,
    onQuestionUpdate,
    onValidUpdate
  ]);

  return (
    <div className={classes.container}>
      <Card
        onClick={() => handleActive(sectionKey, questionKey)}
        className={active ? classes.active : classes.root}
      >
        <CardContent className={classes.content}>
          <TitleWrapper>
            <NameField style={{ display: "flex" }}>
              {card.name ? (
                <div style={{ maxWidth: "784px", overflowWrap: "break-word" }}>
                  {card.name}
                  {card.required ? <font color="red">{" *"}</font> : ""}
                </div>
              ) : (
                ""
              )}
            </NameField>
            {card.description ? (
              <DescriptionField
                style={{ color: "black" }}
                className={classes.description}
                disabled={true}
                placeholder=""
                value={card.description ? card.description : ""}
                multiline
                type="string"
              ></DescriptionField>
            ) : null}
          </TitleWrapper>
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
        </CardContent>
      </Card>
    </div>
  );
}

export default FormCard;
