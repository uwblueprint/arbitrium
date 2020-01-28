import React, { useMemo, useState, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import classNames from "classnames";
import styled from "styled-components";

import RankingCard from "./RankingCard";
import { makeStyles } from "@material-ui/core";

const CARD_HEIGHT = 56;
const CARD_SPACING = 12;

const useStyles = makeStyles({
  rankings: {
    display: "flex",
    position: "relative"
  },
  root: {
    marginTop: 136,
    padding: "0 168px",
    textAlign: "left",
    "& h1": {
      fontSize: 24,
      fontWeight: "normal"
    },
    "& p": {
      color: "#888888",
      fontSize: 14,
      marginBottom: 20
    }
  },
  cutoff: {
    height: 0,
    fontSize: 10,
    position: "relative",
    overflow: "visible",
    "& div": {
      textAlign: "right",
      letterSpacing: 1.5,
      color: "#FF0000",
      fontWeight: 500,
      textTransform: "uppercase",
      position: "absolute",
      top: -10,
      right: 0
    }
  },
  divider: {
    height: 0,
    position: "relative",
    overflow: "visible",
    "& div": {
      position: "absolute",
      maxWidth: 800,
      left: 0,
      right: 0,
      bottom: 4,
      borderTop: "2px dashed #FF0000"
    }
  },
  translateDivider: {
    transform: `translate(0, ${CARD_HEIGHT + CARD_SPACING}px)`
  },
  draggableCard: {
    marginBottom: 12,
    maxWidth: 800,
    minWidth: 300,
    textAlign: "center"
  },
  droppableSection: {
    display: "inline-block",
    flexGrow: 1
  }
});

const RankNumber = styled.div`
  font-weight: bold;
  height: ${CARD_HEIGHT}px;
  line-height: ${CARD_HEIGHT}px;
  margin-bottom: ${CARD_SPACING}px;
  text-align: right;
`;

const NumbersColumn = styled.div`
  display: inline-block;
  font-size: 20px;
  padding-right: 30px;
  position: absolute;
  right: 100%;
`;

// a little function to help us with reordering the result
function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const dummy = Array(100)
  .fill(1)
  .map((e, i) => ({ text: "item " + (i + 1), id: `${i}` }));

function StackedRankings() {
  const classes = useStyles();
  // TODO: replace this with list from store or props when connecting to DB :)
  const [orgList, setOrgList] = useState(dummy);
  const shouldTranslate = useRef(false);

  const numOrgs = orgList.length;
  const column = useMemo(() => {
    const numbers = [];
    for (let i = 0; i < numOrgs; ++i) {
      numbers.push(
        <React.Fragment key={i}>
          <RankNumber>#{i + 1}</RankNumber>
          {i === 4 && (
            <div className={classes.cutoff}>
              <div>Cutoff</div>
            </div>
          )}
        </React.Fragment>
      );
    }
    return <NumbersColumn>{numbers}</NumbersColumn>;
  }, [classes.cutoff, numOrgs]);

  const onDragEnd = result => {
    // dropped outside the list
    shouldTranslate.current = false;
    if (!result.destination) {
      return;
    }
    const reorderedList = reorder(
      orgList,
      result.source.index,
      result.destination.index
    );
    setOrgList(reorderedList);
  };

  const onBeforeDragStart = provided => {
    if (provided.source.index <= 4) {
      shouldTranslate.current = true;
    }
  };

  return (
    <div className={classes.root}>
      <h1>Stacked Rankings</h1>
      <p>
        Stacked Rankings are based on your overall ratings. You can move
        applicants around if you disagree with the rankings.
      </p>
      <div className={classes.rankings}>
        {column}
        <DragDropContext
          onBeforeDragStart={onBeforeDragStart}
          onDragEnd={onDragEnd}
        >
          <Droppable droppableId="droppable">
            {provided => (
              <div
                className={classes.droppableSection}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {orgList.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <Draggable draggableId={item.id} index={index}>
                      {provided => (
                        <div
                          className={classes.draggableCard}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <RankingCard companyName={item.text} />
                        </div>
                      )}
                    </Draggable>
                    {index === 4 && (
                      <div className={classes.divider}>
                        <div
                          className={classNames([
                            shouldTranslate.current && classes.translateDivider
                          ])}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default StackedRankings;
