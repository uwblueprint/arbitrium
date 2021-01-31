import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormCard from "./FormCard";
import FormSettingsContext from "../FormSettingsContext";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles(() => ({
  content: {
    marginTop: -16
  },
  root: (props) => ({
    fontSize: 14,
    borderRadius: 0,
    borderTop: `8px solid #${props.themeColour}`,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816
  }),
  active: (props) => ({
    fontSize: 14,
    borderRadius: 0,
    borderTop: `8px solid #${props.themeColour}`,
    borderLeft: `4px solid #${props.themeColour}`,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816
  }),
  title: {
    color: "#000",
    fontSize: "20px",
    fontWeight: "400",
    lineHeight: "24px",
    paddingLeft: "16px"
  },
  section_title: (props) => ({
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    marginBottom: "0px",
    fontSize: "14px",
    backgroundColor: `#${props.themeColour}`,
    color: "white",
    width: "fit-content",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    paddingBottom: "5px"
  }),
  //Section Description
  sectionDescription: {
    width: 784,
    fontSize: 16,
    color: "black"
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
}));

const CardWrapper = styled.div`
  display: flex;
  padding: "16px";
`;

function FormSection({
  numSections,
  sectionNum,
  sectionData,
  saveAnswer,
  fileUploadURL,
  onValidUpdate
}) {
  const { themeColour } = useContext(FormSettingsContext);
  const classes = useStyles({ themeColour });
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questions] = useState(sectionData.questions);

  function updateActiveQuestion(sectionKey, questionKey) {
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

  const updateSubmission = (
    questionId,
    questionType,
    answerString,
    answerArray
  ) => {
    saveAnswer({
      type: questionType,
      answerString,
      answerArray,
      answerMatrix: [],
      sectionId: sectionData._id,
      questionId: questionId
    });
  };

  const filteredEmptyQuestions = questions.filter((question) => {
    if (
      (question.type === "CHECKBOXES" || question.type === "MULTIPLE_CHOICE") &&
      question.x_options.length === 0
    ) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <span className={classes.section_title}>
        Section {sectionNum} of {numSections}
      </span>
      <CardWrapper key={sectionNum}>
        <Card className={classes.active}>
          <p className={classes.title}>{sectionData.name}</p>
          <CardContent className={classes.content}>
            <InputBase
              disabled={true}
              style={{ color: "black" }}
              className={classes.sectionDescription}
              placeholder=""
              value={sectionData.description}
              multiline
              type="string"
            ></InputBase>
          </CardContent>
        </Card>
      </CardWrapper>
      {filteredEmptyQuestions.map((_question, questionKey) => (
        <CardWrapper
          key={questionKey}
          id={"question_" + questionKey + "_" + (sectionNum - 1)}
        >
          <FormCard
            card={filteredEmptyQuestions[questionKey]}
            key={questionKey + "_question"}
            active={activeQuestion === questionKey}
            handleActive={updateActiveQuestion}
            sectionKey={sectionNum - 1}
            questionKey={questionKey}
            sectionId={sectionData._id}
            updateSubmission={updateSubmission}
            themeColour={themeColour}
            fileUploadURL={fileUploadURL}
            onValidUpdate={onValidUpdate}
          />
        </CardWrapper>
      ))}
    </div>
  );
}

export default FormSection;
