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
import Feedback from "../Feedback/Feedback.jsx";
import { connect } from "react-redux";
import { getAllProgramsAPI } from "../../requests/get";
import usePromise from "../../Hooks/usePromise";
import { loadProgram } from "../../Actions/index.js";

export const HEADER_HEIGHT = 56;
export const MIN_WIDTH = 960;

const Container = styled.div`
  position: sticky;
  display: flex;
  height: ${HEADER_HEIGHT}px;
  min-width: ${MIN_WIDTH}px;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  background-color: white;

  border-bottom: 1px solid #cccccc;
  align-items: center;
  justify-content: center;
`;

const BodyWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
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

const RightSideHeaderWrapper = styled.div`
  float: right;
  align-items: center;
  margin-left: auto;
  display: flex;

  /* H5/ Roboto Regular 24 */
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;

  p {
    font-size: 14px;
  }
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
//curRoute is the current route object from appRoutes
//routes is a list of routes that should be displayed in the header
function Header({ program, loadProgram, history, admin, curRoute, routes }) {
  const { currentUser, appUser } = useContext(AuthContext);
  const [programMenuAnchor, setprogramMenuAnchor] = useState(null);
  const [adminMenuAnchor, setAdminMenuAnchor] = useState(null);
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

  const handleClickProgramMenu = (event) => {
    setprogramMenuAnchor(event.currentTarget);
  };
  const handleClickAdminMenu = (event) => {
    setAdminMenuAnchor(event.currentTarget);
  };

  const handleSelect = async (newProgram) => {
    setprogramMenuAnchor(null);
    await updateUserProgramAPI({
      userId: currentUser.uid,
      programId: newProgram._id
    });
    loadProgram(newProgram._id);
    //Load the application data into redux
  };
  const classes = useStyles();
  const validPrograms = allPrograms.isPending
    ? []
    : allPrograms.value.filter((p) => !!myProgramsMap[p._id]);

  const hasAdminAccessForCurrentProgram = true;
  //TODO: This is handled in privateRoute.js. Remove once migration is done
  // if (programsMap[program]) {
  //   const userProgram = appUser.programs.find((prog) => {
  //     return programsMap[program]._id === prog.id;
  //   });
  //   if (userProgram && userProgram.role === "admin") {
  //     hasAdminAccessForCurrentProgram = true;
  //   }
  // }
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
          {" • "}
          {program && programsMap[program]
            ? programsMap[program].displayName
            : "Select a program to view applications "}{" "}
        </p>
        <div>
          <ArrowDropDownCircleOutlinedIcon
            style={{ marginLeft: "4px", margin: "12px" }}
            onClick={handleClickProgramMenu}
          ></ArrowDropDownCircleOutlinedIcon>
          <Menu
            elevation={0}
            id="simple-menu"
            anchorEl={programMenuAnchor}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(programMenuAnchor)}
            onClose={() => {
              setprogramMenuAnchor(null);
            }}
            style={{ marginTop: HEADER_HEIGHT / 2 + 4 }}
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
                    You don't have access to any programs
                  </MenuItem>
                ) : null}
              </div>
            ) : null}
          </Menu>
        </div>
        <RightSideHeaderWrapper>
          {appUser.role === "Admin" || hasAdminAccessForCurrentProgram ? (
            <RightSideHeaderWrapper>
              <p style={{ marginLeft: "4px", margin: "12px" }}>
                {" "}
                {curRoute.title}{" "}
              </p>
              {routes.length > 0 ? (
                <div>
                  <ArrowDropDownCircleOutlinedIcon
                    style={{ marginRight: "12px" }}
                    onClick={handleClickAdminMenu}
                  ></ArrowDropDownCircleOutlinedIcon>
                  <Menu
                    elevation={0}
                    id="simple-menu"
                    anchorEl={adminMenuAnchor}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(adminMenuAnchor)}
                    onClose={() => {
                      setAdminMenuAnchor(null);
                    }}
                    style={{
                      marginTop: HEADER_HEIGHT / 2 + 4
                    }}
                  >
                    {routes != null ? (
                      <div style={{ border: "1px solid #ccc" }}>
                        {routes.map((route, index) => {
                          if (route.title !== curRoute.title) {
                            return (
                              <MenuItem
                                key={index}
                                onClick={() => history.push(route.path)}
                                visible={(
                                  route.title !== curRoute.title
                                ).toString()}
                              >
                                {route.title}
                              </MenuItem>
                            );
                          }
                          return null;
                        })}
                        {validPrograms.length === 0 ? (
                          <MenuItem key={"None"}>
                            You don't have access to other pages
                          </MenuItem>
                        ) : null}
                      </div>
                    ) : null}
                  </Menu>
                </div>
              ) : null}
            </RightSideHeaderWrapper>
          ) : null}
          <Feedback user={currentUser} />
          <UserDisplay />
        </RightSideHeaderWrapper>
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
