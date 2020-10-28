import React, { useContext } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../../Authentication/Auth.js";
import { connect } from "react-redux";
import usePromise from "../../Hooks/usePromise";
import { loadProgram } from "../../Actions/index.js";
import { HEADER_HEIGHT } from "./Header";
import { getApplicationTableData, getReviewCountAPI } from "../../requests/get";
import LinearProgress from "@material-ui/core/LinearProgress";

const Container = styled.div`
  height: ${HEADER_HEIGHT}px;
  margin-top: ${HEADER_HEIGHT};
  left: 0;
  width: 100vw;
  z-index: 100;

  border-bottom: 1px solid #cccccc;
  align-items: center;
  justify-content: center;

  .MuiButton-root:hover {
    background: transparent;
    font-size: 14px;
    font-weight: bold;
    background-color: lightgrey;
  }
`;

//TODO: Use a globally defined font variable for tooltips
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

//Load the program into redux
//Fetch the applications for the program and put it into redux
//Then redirect
//programs is a list of programs that the user has access to
function NavigationHeader({ program, loadProgram, history, admin, curRoute }) {
  //AuthContext returns two values {currentUser, appUser}. We are only using appUser
  const { appUser } = useContext(AuthContext);

  const stage = curRoute.path === "/applications" ? true : false;

  const [applications] = usePromise(
    getApplicationTableData,
    { user: appUser },
    [],
    [program]
  );

  const [reviewCount] = usePromise(
    getReviewCountAPI,
    appUser.userId,
    [],
    [program]
  );

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
          disabled={reviewCount.value < applications.value.length}
          onClick={() => {
            history.push("/rankings");
          }}
        >
          2. Stacked Rankings
        </Button>
        {curRoute.path === "/applications" ? (
          <Button
            style={{ float: "right", margin: "10px", marginRight: "30px" }}
            variant="contained"
            color="primary"
            disabled={
              reviewCount.value < applications.value.length ||
              curRoute.path !== "/applications"
            }
            onClick={() => {
              history.push("/rankings");
            }}
          >
            Next Stage &gt;
          </Button>
        ) : null}
      </Container>
      {!reviewCount.isPending || !applications.isPending ? (
        <LinearProgress
          variant="determinate"
          value={Math.min(
            100,
            (reviewCount.value / applications.value.length) * 100
          )}
        />
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  program: state.program
});

const mapDispatchToProps = {
  loadProgram
};

const connectedAuth = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationHeader);

export { connectedAuth as NavigationHeader };
