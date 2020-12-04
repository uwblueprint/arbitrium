import React, { useReducer, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import FormCard from "./FormCard";
import customFormQuestionsReducer from "../../../Reducers/CustomFormQuestionsReducer";

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
    width: 816
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
    color: "#000",
    fontSize: "20px",
    fontWeight: "500"
  },
  section_title: {
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
  active
}) {
  const classes = useStyles();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questions, dispatchQuestionsUpdate] = useReducer(
    customFormQuestionsReducer,
    sectionData.questions
  );

  useEffect(() => {
    dispatchQuestionsUpdate({
      type: "LOAD",
      questions: questions
    });
  }, [questions, dispatchQuestionsUpdate]);

  function updateActiveQuestion(sectionKey, questionKey) {
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
    setActiveQuestion(-1);
    updateActiveSection(sectionKey);
  }

  return (
    <div>
      <span className={classes.section_title}>
        Section {sectionNum} of {numSections}
      </span>
      <CardWrapper key={sectionNum}>
        <Card
          className={
            active && activeQuestion === -1 ? classes.active : classes.root
          }
          onClick={() => setSectionAsActive(sectionNum - 1)}
        >
          <CardHeader
            className={classes.title}
            title={sectionData.name}
            id={sectionNum}
          />
          <CardContent className={classes.content}>
            {sectionData.description}
          </CardContent>
        </Card>
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
            sectionKey={sectionNum - 1}
            questionKey={questionKey}
          />
        </CardWrapper>
      ))}
    </div>
  );
}

export default FormSection;
