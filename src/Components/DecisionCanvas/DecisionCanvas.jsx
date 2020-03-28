import React, { useMemo, useReducer } from "react";
import { produce } from "immer";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import CanvasCard from "./CanvasCard";
import AdminCanvasCard from "./AdminCanvasCard";

const SectionWrapper = styled.div`
  text-align: left;
`;

const Spacer = styled.div`
  width: 16px;
`;

const CardBody = styled.div`
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
  .averageRating {
    color: #888888;
    h3 {
      color: #000;
      font-size: 14px;
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

function DecisionCanvas({ update, review, categoryData, isAdminView = false }) {
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

  const renderUserCanvasCards = () => (
    <>
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
                <div className="questions">
                  <h3>Question(s):</h3>
                  <ol>
                    {section.answers.map((item, i) => (
                      <li key={i}>{item.question}</li>
                    ))}
                  </ol>
                </div>
                <div className="answers">
                  <h3>Candidate Answer</h3>
                  <ol>
                    {section.answers.map((item, i) => (
                      <React.Fragment key={i}>
                        <li key={i}>{item.response}</li>
                        <h1> {"    "}</h1>
                      </React.Fragment>
                    ))}
                  </ol>
                </div>
              </CardBody>
            </CanvasCard>
          ))
        : null}
    </>
  );

  const renderAdminCanvasCards = () => (
    <>
      {categoryData
        ? categoryData.map((section, index) => (
            <AdminCanvasCard
              expanded={expandArray[index]}
              key={section.id}
              id={"canvas_" + section.id}
              onHeaderClick={() => dispatch({ type: "TOGGLE", index })}
              onLinkClick={() => dispatch({ type: "EXPAND", index })}
              title={section.title}
            >
              <CardBody>
                <div className="questions">
                  <h3>Question(s):</h3>
                  <ol>
                    {section.answers.map((item, i) => (
                      <li key={i}>{item.question}</li>
                    ))}
                  </ol>
                </div>
                <div className="answers">
                  <h3>Candidate Answer</h3>
                  <ol>
                    {section.answers.map((item, i) => (
                      <React.Fragment key={i}>
                        <li key={i}>{item.response}</li>
                        <h1> {"    "}</h1>
                      </React.Fragment>
                    ))}
                  </ol>
                </div>
                <div className="averageRating">
                  <h3>Average Rating</h3>
                  <p> 4.5/5 </p>
                </div>
              </CardBody>
            </AdminCanvasCard>
          ))
        : null}
    </>
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
      {isAdminView ? renderAdminCanvasCards() : renderUserCanvasCards()}
    </SectionWrapper>
  );
}

export default DecisionCanvas;
