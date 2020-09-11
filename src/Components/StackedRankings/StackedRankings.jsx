import React, { useEffect, useMemo, useState, useRef, useContext } from "react";
import { Redirect } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core";
import RankingCard from "./RankingCard";
import usePromise from "../../Hooks/usePromise";
import { getAllStackingsAPI } from "../../requests/get";
import * as UPDATE from "../../requests/update";
import { reorder } from "../../Utils/dragAndDropUtils";
import { ProgramContext } from "../../Contexts/ProgramContext";
import { AuthContext } from "../../Authentication/Auth";

const CARD_HEIGHT = 56;
const CARD_SPACING = 12;

const maxWidth = "100%";

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
      maxWidth: maxWidth,
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
    maxWidth: maxWidth,
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

function compare(a, b) {
  if (a.rating < b.rating) {
    return 1;
  }
  if (a.rating > b.rating) {
    return -1;
  }
  return 0;
}

function StackedRankings() {
  const { appUser: user } = useContext(AuthContext);
  const { applications, reviewCount } = useContext(ProgramContext);
  const [fetchedRankings, refetch] = usePromise(
    getAllStackingsAPI,
    { user },
    []
  );
  const [rankings, setRankings] = useState(fetchedRankings.value);
  const shouldTranslate = useRef(false);
  const shouldSort = useRef(false);
  const classes = useStyles();

  const shouldRedirect =
    reviewCount == null || reviewCount < applications.length;

  useEffect(() => {
    async function createRankings() {
      // we should initialize the user's rankings
      alert("no");
      const initApps = applications.map((app) => ({ appId: app._id }));
      await UPDATE.updateStackedAPI({
        userId: user.userId,
        rankings: initApps
      });
      shouldSort.current = true;
      refetch({ user });
    }

    if (
      !fetchedRankings.isPending &&
      fetchedRankings.value.length !== applications.length
    ) {
      console.log(fetchedRankings.value);
      console.log(applications.length);
      createRankings();
    } else {
      let updatedRankings = fetchedRankings.value;
      if (shouldSort.current) {
        updatedRankings = [...fetchedRankings.value].sort(compare);
        shouldSort.current = false;
        UPDATE.updateStackedAPI({
          userId: user.userId,
          rankings: updatedRankings.map((app) => ({ appId: app._id }))
        });
      }
      setRankings(
        updatedRankings.map((rank) => ({
          ...rank,
          name:
            rank["Organization Name (legal name)"] || rank["Organization Name"]
        }))
      );
    }
  }, [fetchedRankings, applications, user, refetch]);

  const numOrgs = rankings.length;
  const column = useMemo(() => {
    const numbers = [];
    for (let i = 0; i < numOrgs; ++i) {
      numbers.push(
        <React.Fragment key={i}>
          <RankNumber>{i + 1}</RankNumber>
          {/*i === 4 && (
            <div className={classes.cutoff}>
              <div>Cutoff</div>
            </div>
          )*/}
        </React.Fragment>
      );
    }
    return <NumbersColumn>{numbers}</NumbersColumn>;
  }, [numOrgs]);

  if (shouldRedirect) {
    return <Redirect to="/" />;
  }

  const onDragEnd = (result) => {
    // dropped outside the list
    shouldTranslate.current = false;
    if (!result.destination) {
      return;
    }
    const before = rankings;
    const reorderedList = reorder(
      rankings,
      result.source.index,
      result.destination.index
    );
    try {
      setRankings(reorderedList);
      UPDATE.updateStackedAPI({
        userId: user.userId,
        rankings: reorderedList.map((app) => ({ appId: app._id }))
      });
    } catch (e) {
      setRankings(before);
      console.error(e);
      // TODO error message
      window.alert("Unable to update stacked rankings.");
    }
  };

  const onBeforeDragStart = (provided) => {
    if (provided.source.index <= 4) {
      shouldTranslate.current = true;
    }
  };

  return (
    <div className={classes.root}>
      <h1>Stacked Rankings</h1>
      <p>
        Stacked Rankings are based on your overall ratings. You can move
        applicants around in your order of preference.
      </p>
      <p>Your rankings will be saved automatically.</p>
      <div className={classes.rankings}>
        {column}
        <DragDropContext
          onBeforeDragStart={onBeforeDragStart}
          onDragEnd={onDragEnd}
        >
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                className={classes.droppableSection}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {rankings.map((item, index) => (
                  <React.Fragment key={item._id}>
                    <Draggable draggableId={item._id} index={index}>
                      {(provided) => (
                        <div
                          className={classes.draggableCard}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <RankingCard
                            appId={item._id}
                            companyName={item.name}
                            rating={item.rating}
                            suggested={item.suggested}
                          />
                        </div>
                      )}
                    </Draggable>
                    {/*}
                    {index === 4 && (
                      <div className={classes.divider}>
                        <div
                          className={classNames([
                            shouldTranslate.current && classes.translateDivider
                          ])}
                        />
                      </div>
                    )}
                    */}
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
