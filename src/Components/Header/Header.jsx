import React, { useState, useContext, useMemo } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
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

export const HEADER_HEIGHT = 56;

const Container = styled.div`
  position: fixed;
  height: ${HEADER_HEIGHT}px;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;

  background: #ffffff;
  border-bottom: 1px solid #cccccc;
  align-items: center;
  justify-content: center;
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
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
function Header({ program, loadProgram, history, admin }) {
  const { currentUser, appUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [allPrograms] = usePromise(getAllProgramsAPI);

  const programsMap = useMemo(() => {
    if (allPrograms.isPending) return {};
    const programMap = {};
    allPrograms.value.forEach((p) => {
      programMap[p._id] = p;
    });
    return programMap;
  }, [allPrograms]);

  const myProgramsMap = useMemo(() => {
    const programMap = {};
    appUser.programs.forEach((p) => (programMap[p.id] = p));
    return programMap;
  }, [appUser.programs]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = async (newProgram) => {
    setAnchorEl(null);
    await updateUserProgramAPI({
      userId: currentUser.uid,
      programId: newProgram._id
    });
    loadProgram(newProgram._id);
    if (!admin) {
      history.push("/applications");
    }
    //Load the application data into redux
  };

  const classes = useStyles();
  const validPrograms = allPrograms.isPending
    ? []
    : allPrograms.value.filter((p) => !!myProgramsMap[p._id]);

  return (
    <Container>
      <BodyWrapper>
        <AppName>
          <Tooltip title="Arbitrium" classes={{ tooltip: classes.tooltip }}>
            <div>
              <AppIcon />
            </div>
          </Tooltip>
        </AppName>

        <p>
          {" "}
          {program && programsMap[program]
            ? programsMap[program].displayName
            : "Select a program to view applications "}{" "}
        </p>
        <div>
          <ArrowDropDownCircleOutlinedIcon
            style={{ marginLeft: "4px", margin: "12px" }}
            onClick={handleClick}
          ></ArrowDropDownCircleOutlinedIcon>
          <Menu
            elevation={0}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => {
              setAnchorEl(null);
            }}
            style={{ marginTop: HEADER_HEIGHT / 2 }}
          >
            {validPrograms ? (
              <div style={{ border: "1px solid #ccc" }}>
                {validPrograms.map((p, index) => (
                  <MenuItem key={index} onClick={() => handleSelect(p)}>
                    {" "}
                    {p.displayName}
                  </MenuItem>
                ))}
                {validPrograms.length === 0 ? (
                  <MenuItem key={"None"}>
                    You don&apos;t have access to any programs
                  </MenuItem>
                ) : null}
              </div>
            ) : null}
          </Menu>
        </div>
        <UserDisplayWrapper>
          <UserDisplay />
        </UserDisplayWrapper>
      </BodyWrapper>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  program: state.program
});

const mapDispatchToProps = {
  loadProgram
};

const connectedAuth = connect(mapStateToProps, mapDispatchToProps)(Header);

export { connectedAuth as Header };
