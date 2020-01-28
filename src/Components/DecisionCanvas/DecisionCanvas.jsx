import React, { useReducer } from "react";
import { produce } from "immer";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import CanvasCard from "./CanvasCard";

import SectionList from "../../mock/decisionSections.json";

const SectionWrapper = styled.div`
  text-align: left;
`;

const Spacer = styled.div`
  width: 16px;
`;

const CardBody = styled.div`
  margin-bottom: 16px;
  .answers {
    font-weight: normal;
    h3 {
      font-size: 14px;
    }
  }
  .questions {
    color: #888888;
    ol {
      list-style-type: lower-roman;
      list-style-position: inside;
      padding: 0;
    }
    h3 {
      color: #000;
      font-size: 14px;
      font-weight: normal;
      margin-top: 0;
    }
  }
`;

const CanvasHeader = styled.div`
  display: flex;
  button {
    height: fit-content;
    padding: 10px 16px;
    text-transform: uppercase;
  }
  h2 {
    margin-right: auto;
  }
`;

function expandArrayReducer(expandedArr, { type, index }) {
  return produce(expandedArr, draftExpanded => {
    switch (type) {
      case "TOGGLE":
        draftExpanded[index] = !expandedArr[index];
        break;
      case "EXPAND":
        draftExpanded[index] = true;
        break;
      case "EXPAND_ALL":
        draftExpanded.fill(true);
        break;
      case "COLLAPSE":
        draftExpanded[index] = false;
        break;
      case "COLLAPSE_ALL":
        draftExpanded.fill(false);
        break;
      default:
    }
  });
}

function DecisionCanvas() {
  const [expandArray, dispatch] = useReducer(
    expandArrayReducer,
    SectionList.map(() => false)
  );

  return (
    <SectionWrapper>
      <CanvasHeader>
        <h2>Decision Canvas</h2>
        <Button onClick={() => dispatch({ type: "COLLAPSE_ALL" })}>
          Collapse All
        </Button>
        <Spacer />
        <Button
          color="primary"
          onClick={() => dispatch({ type: "EXPAND_ALL" })}
          variant="contained"
        >
          Expand All
        </Button>
      </CanvasHeader>
      {SectionList.map((section, index) => (
        <CanvasCard
          expanded={expandArray[index]}
          key={section.title}
          onHeaderClick={() => dispatch({ type: "TOGGLE", index })}
          onLinkClick={() => dispatch({ type: "EXPAND", index })}
          rating={0}
          title={section.title}
        >
          <CardBody>
            <div className="questions">
              <h3>Question(s):</h3>
              <ol>
                {section.questions.map((question, i) => (
                  <li key={i}>{question}</li>
                ))}
              </ol>
            </div>
            <div className="answers">
              <h3>Application Answer</h3>some answers and such
            </div>
          </CardBody>
        </CanvasCard>
      ))}
    </SectionWrapper>
  );
}

export default DecisionCanvas;
