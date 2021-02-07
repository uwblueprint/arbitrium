import React, { useContext } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../../Authentication/Auth.js";
import { connect } from "react-redux";
import usePromise from "../../Hooks/usePromise";
import { HEADER_HEIGHT, MIN_WIDTH } from "./Header";
import { getApplicationTableData, getReviewCountAPI } from "../../requests/get";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ProgramContext } from "../../Contexts/ProgramContext";

const Container = styled.div`
  position: fixed;
  height: ${HEADER_HEIGHT}px;
  min-width: ${MIN_WIDTH}px;
  left: 0;
  width: 100vw;
  z-index: 100;
  background-color: white;

  border-bottom: 1px solid #cccccc;
  align-items: center;
  justify-content: center;

  .MuiButton-root:hover {
    background: transparent;
    font-weight: bold;
    background-color: lightgrey;
  }
`;

const useStyles = makeStyles({
  button: {
    height: "100%",
    width: "800px"
  },
  ratingsSelected: {
    background: "#2261AD",
    color: "white",
    borderRadius: 0,
    height: HEADER_HEIGHT,
    width: "200px",
    padding: "0px 0px 0px 0px",
    "pointer-events": "none",
    "&::after": {
      borderLeft: "28px solid #2261AD",
      borderTop: "28px solid lightgrey",
      borderBottom: "28px solid lightgrey",
      content: '" "'
    }
  },
  rankingsNotSelected: {
    background: "lightgrey",
    color: "black",
    borderRadius: 0,
    width: "200px",
    height: HEADER_HEIGHT,
    padding: "0px 0px 0px 0px",
    "&::after": {
      borderLeft: "28px solid lightgrey",
      borderTop: "28px solid white",
      borderBottom: "28px solid white",
      content: '" "'
    }
  },
  rankingsSelected: {
    background: "#2261AD",
    color: "white",
    borderRadius: 0,
    height: HEADER_HEIGHT,
    width: "200px",
    padding: "0px 0px 0px 0px",
    "pointer-events": "none",
    "&::after": {
      borderLeft: "28px solid #2261AD",
      borderTop: "28px solid white",
      borderBottom: "28px solid white",
      content: '" "'
    }
  },
  ratingsNotSelected: {
    background: "lightgrey",
    color: "black",
    borderRadius: 0,
    width: "200px",
    height: HEADER_HEIGHT,
    padding: "0px 0px 0px 0px",
    "&::after": {
      borderLeft: "28px solid lightgrey",
      borderTop: "28px solid #2261AD",
      borderBottom: "28px solid #2261AD",
      content: '" "'
    },
    "&::hover": {
      backgroundColor: "none"
    }
  },
  label: {
    textTransform: "capitalize"
  }
});

//The navigation header is loaded dynamically based on the url.
//It does NOT contain a state.
function NavigationHeader({
  program,
  history,
  admin,
  curRoute,
  reviewCount,
  updateNavbar
}) {
  //AuthContext returns two values {currentUser, appUser}. We are only using appUser
  const { appUser } = useContext(AuthContext);
  const stage =
    curRoute.path.includes("applications") ||
    curRoute.path.includes("submissions")
      ? true
      : false;

  const programContext = useContext(ProgramContext);

  const classes = useStyles();
  return (
    <div>
      <Container>
        <Button
          classes={{
            root: stage ? classes.ratingsSelected : classes.ratingsNotSelected, // class name, e.g. `classes-nesting-root-x`
            label: classes.label // class name, e.g. `classes-nesting-label-x`
          }}
          onClick={() => {
            history.push("/applications");
          }}
        >
          {" "}
          1. Rate Candidates
        </Button>
        <Button
          classes={{
            root: stage
              ? classes.rankingsNotSelected
              : classes.rankingsSelected, // class name, e.g. `classes-nesting-root-x`
            label: classes.label // class name, e.g. `classes-nesting-label-x`
          }}
          disabled={
            programContext.reviewCount < programContext.applications.length
          }
          onClick={() => {
            history.push("/rankings");
          }}
        >
          2. Stacked Rankings
        </Button>
        {curRoute.path.includes("applications") ||
        curRoute.path.includes("submissions") ? (
          <Button
            style={{ float: "right", margin: "10px", marginRight: "30px" }}
            variant="contained"
            color="primary"
            disabled={
              programContext.reviewCount < programContext.applications.length
            }
            onClick={() => {
              history.push("/rankings");
            }}
          >
            Next Step &gt;
          </Button>
        ) : null}
        {programContext ? (
          <LinearProgress
            variant="determinate"
            value={Math.min(
              100,
              (programContext.reviewCount /
                programContext.applications.length) *
                100
            )}
          />
        ) : null}
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  program: state.program,
  reviewCount: state.reviewCount,
  updateNavbar: state.updateNavbar
});

const connectedAuth = connect(mapStateToProps)(NavigationHeader);

export { connectedAuth as NavigationHeader };
