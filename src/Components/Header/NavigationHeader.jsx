import React, { useState, useContext, useMemo } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import UserDisplay from "./UserDisplay";
import AppIcon from "./svgIcon.tsx";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownCircleOutlinedIcon from "@material-ui/icons/ArrowDropDownCircleOutlined";
import { updateUserProgramAPI } from "../../requests/update";
import { AuthContext } from "../../Authentication/Auth.js";
import { connect } from "react-redux";
import { getAllProgramsAPI } from "../../requests/get";
import usePromise from "../../Hooks/usePromise";
import { loadProgram } from "../../Actions/index.js";
import { HEADER_HEIGHT } from "./Header";

const Container = styled.div`
  height: ${HEADER_HEIGHT}px;
  margin-top: ${HEADER_HEIGHT};
  left: 0;
  width: 100vw;
  z-index: 100;

  background: #ffffff;
  border-bottom: 1px solid #cccccc;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
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
  tooltip: {
    fontSize: "16px",
    maxWidth: "none"
  }
});

//Load the program into redux
//Fetch the applications for the program and put it into redux
//Then redirect
//programs is a list of programs that the user has access to
function NavigationHeader({ program, loadProgram, history, admin }) {
  const { currentUser, appUser } = useContext(AuthContext);

  const classes = useStyles();

  return (
    <Container>
      <ButtonWrapper>
        <Button onClick={() => console.log("Clicked")}>
          {" "}
          All Applications
        </Button>
      </ButtonWrapper>
    </Container>
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
