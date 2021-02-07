import React, { useMemo, useReducer } from "react";
import { produce } from "immer";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import CanvasCard from "./CanvasCard";

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
    text-transform: none;
  }
  h2 {
    margin-right: auto;
  }
`;

function expandArrayReducer(expandedArr, { type, index }) {
  return produce(expandedArr, (draftExpanded) => {
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

function DecisionCanvas({ update, review, categoryData }) {
  const [expandArray, dispatch] = useReducer(
    expandArrayReducer,
    categoryData.map(() => false)
  );

  const categoryToReviewMap = useMemo(() => {
    if (review == null) return {};
    return review.questionList.reduce((reviewMap, review) => {
      reviewMap[review.id] = review;
      return reviewMap;
    }, {});
  }, [review]);

  return (
    <SectionWrapper>
      <CanvasHeader>
        <h2>Decision Canvas</h2>
        <Button onClick={() => dispatch({ type: "COLLAPSE_ALL" })}>
          Collapse all
        </Button>
        <Spacer />
        <Button
          color="primary"
          onClick={() => dispatch({ type: "EXPAND_ALL" })}
          variant="contained"
        >
          Expand all
        </Button>
      </CanvasHeader>
      {categoryData
        ? categoryData.map((section, index) => (
            <CanvasCard
              expanded={expandArray[index]}
              key={section.id}
              id={"canvas_" + section.id}
              onHeaderClick={() => dispatch({ type: "TOGGLE", index })}
              onLinkClick={() => dispatch({ type: "EXPAND", index })}
              review={categoryToReviewMap["canvas_" + section.id]}
              title={section.title}
              update={update}
            >
              <CardBody>
                <h4> {section.description} </h4>
                <div className="questions">
                  <h3>Question(s):</h3>
                  <ol>
                    {section.answers.map((item, i) => (
                      <li key={i}>
                        {item.question
                          .replace(/-/g, ".")
                          .replace("One.Line", "One-Line")
                          .replace("COVID.19", "COVID-19")
                          .replaceAll("_dot_", ".")
                          .replaceAll("_dash_", "-")}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="answers">
                  <h3>Candidate Answer</h3>
                  <ol>
                    {section.answers.map((item, i) =>
                      typeof item.response === "object" ? (
                        <React.Fragment key={i}>
                          <li key={i}>{item.question}</li>
                          <ul>
                            <li key={i + "Primary"}>
                              {"Primary (Select 3 Max):"}
                            </li>
                            {Object.keys(item.response).map((key, j) => {
                              if (
                                item.response[key].includes(
                                  "Primary (Select 3 Max)"
                                )
                              ) {
                                return (
                                  <ul
                                    style={{ paddingLeft: "35px" }}
                                    key={j + i + key + "Primary"}
                                  ></ul>
                                );
                              }
                              return null;
                            })}
                            <li key={i + "All"}>
                              {"All Who Apply:"}
                              {Object.keys(item.response).map((key, j) => {
                                if (
                                  item.response[key].includes("All Who Apply")
                                ) {
                                  return (
                                    <ul
                                      style={{ paddingLeft: "35px" }}
                                      key={j + i + key + "All"}
                                    >
                                      {key}
                                    </ul>
                                  );
                                }
                                return null;
                              })}
                            </li>
                          </ul>
                          <h1> {"    "}</h1>
                        </React.Fragment>
                      ) : (
                        <React.Fragment key={i}>
                          <li key={i}>{item.response}</li>
                          {item.question ===
                          "One-Line Description (approximately 25 words)" ? (
                            <p>
                              {" "}
                              ---------------------------------------------------------------------------------------------{" "}
                            </p>
                          ) : (
                            <h1> {"    "}</h1>
                          )}
                        </React.Fragment>
                      )
                    )}
                  </ol>
                </div>
              </CardBody>
            </CanvasCard>
          ))
        : null}
    </SectionWrapper>
  );
}

export default DecisionCanvas;
