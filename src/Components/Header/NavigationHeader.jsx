import React, { useState, useContext } from "react";
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
`;

const AppName = styled.div`
  display: inline-block;
  margin-left: 16px;
  margin-right: 16px;

  /* H5/ Roboto Regular 24 */
  font-family: Roboto;
  letter-spacing: 2px;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 28px;
`;

const UserDisplayWrapper = styled.div`
  margin-left: auto;
  height: 28px;

  /* H5/ Roboto Regular 24 */
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;

  color: #ffffff;
`;

//TODO: Use a globally defined font variable for tooltips
const useStyles = makeStyles({
  button: {
    height: "100%",
    width: "800px"
  },
  root: {
    background: "#2261AD",
    color: "white",
    borderRadius: 0,
    height: HEADER_HEIGHT,
    width: "200px",
    padding: "0px 0px 0px 0px",
    "&::after": {
      borderLeft: "28px solid #2261AD",
      borderTop: "28px solid lightgrey",
      borderBottom: "28px solid lightgrey",
      content: '" "'
    },
    "&::hover": {
      color: "#2261AD"
    }
  },
  root2: {
    background: "lightgrey",
    color: "black",
    borderRadius: 0,
    width: "200px",
    height: HEADER_HEIGHT,
    padding: "0px 0px 0px 0px",
    "pointer-events": "none",
    "&::after": {
      borderLeft: "28px solid lightgrey",
      borderTop: "28px solid white",
      borderBottom: "28px solid white",
      content: '" "'
    }
  },
  root5: {
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
  root6: {
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
  root3: {
    background: "#2261AD",
    color: "white",
    borderRadius: 0,
    padding: "0px 20px",
    height: HEADER_HEIGHT
  },
  root4: {
    background: "#2261AD",
    color: "white",
    borderRadius: 0,
    padding: "0px 20px",
    height: HEADER_HEIGHT,
    transform: "rotateY(180deg)",
    borderLeft: "28px solid #2261AD",
    borderTop: "28px solid lightblue",
    borderBottom: "28px solid lightblue"
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
  const { currentUser, appUser } = useContext(AuthContext);
  const [stage, setStage] = useState(
    curRoute.path == "applications" ? true : false
  );

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
  console.log(reviewCount);
  console.log(applications);

  const handleStageChange = () => {
    setStage(!stage);
  };

  const classes = useStyles();

  return (
    <div>
      <Container>
        <Button
          classes={{
            root: stage ? classes.root : classes.root6, // class name, e.g. `classes-nesting-root-x`
            label: classes.label // class name, e.g. `classes-nesting-label-x`
          }}
          onClick={() => handleStageChange()}
        >
          {" "}
          1. Rate Candidates
        </Button>
        <Button
          classes={{
            root: stage ? classes.root2 : classes.root5, // class name, e.g. `classes-nesting-root-x`
            label: classes.label // class name, e.g. `classes-nesting-label-x`
          }}
          onClick={() => handleStageChange()}
        >
          {" "}
          2. Stacked Rankings
        </Button>
        <Button
          style={{ float: "right", margin: "10px", marginRight: "30px" }}
          variant="contained"
          color="primary"
          disabled={
            reviewCount.value < applications.value.length ||
            curRoute.path != "applications"
          }
          onClick={() => {
            history.push("/rankings");
          }}
        >
          Next Stage &gt;
        </Button>
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
