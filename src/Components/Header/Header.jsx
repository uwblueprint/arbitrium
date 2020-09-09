import React, { useState, useContext } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import UserDisplay from "./UserDisplay";
import AppIcon from "./svgIcon.tsx";
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import usePromise from "../../Hooks/usePromise";
import * as GET from "../../requests/get";
import { loadProgram, loadApplications } from "../../Actions";
import { AuthContext } from "../../Authentication/Auth.js";
import { connect } from "react-redux";
import { history } from "../../Store";

export const HEADER_HEIGHT = 56;

const Container = styled.div`
  position: fixed;
  height: ${HEADER_HEIGHT}px;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;

  background: #FFFFFF;
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
const useStyles = makeStyles((theme) => ({
  tooltip: {
    fontSize: "16px",
    maxWidth: "none"
  },
}));


//Load the program into redux
//Fetch the applications for the program and put it into redux
//Then redirect
async function updateProgram(program, loadProgram, loadApplications, currentUser) {
  loadProgram(program)

  const applications = await GET.getAllApplicationsAPI();
  let reviewCount = 0
  if (currentUser != null){
    reviewCount = await GET.getReviewCountAPI(currentUser.uid);
  }

  //Load the application data into redux
  loadApplications(applications, reviewCount);
}

//programs is a list of programs that the user has access to
function Header({ loadProgram, loadApplications, programFromRedux, programs, ...props }) {

  const { currentUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [program, setProgram] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (program) => {
    setAnchorEl(null);
    updateProgram(program, loadProgram, loadApplications, currentUser)
    setProgram(program)
    history.push("/"+program._id+"/applications")
  };


  //On first header load for each refresh
  if (program == null && programs != null && programs.length > 0) {

    //Does the url contain a program? Load that into the header
    //Private Route (caller of header) handles access permissions
    let curProgram = programs.indexOf(programs.find((program, index) =>
      program._id === window.location.pathname.split("/")[1]
    ));

    //If curProgram is -1 then choose the first program in the list to load
    //Temporary: If it is an admin page don't load the program (waiting on designs)
    if (curProgram < 0) {
      if (!window.location.pathname.includes("admin")){
        updateProgram(programs[0], loadProgram, loadApplications, currentUser)
        setProgram(programs[0])
        history.push("/"+programs[0]._id+"/applications")
    }}
    else {
      updateProgram(programs[curProgram], loadProgram, loadApplications, currentUser)
      setProgram(programs[curProgram])
    }
  }

  const classes = useStyles()
  return (
    <Container>
      <BodyWrapper>
        <AppName>
          <Tooltip title="Arbitrium" classes={{ tooltip: classes.tooltip }}>
            <div>
              <AppIcon/>
            </div>
          </Tooltip>
        </AppName>

        <p> {program ? program.displayName : "Select a program to view applications "} </p>
        <div>
          <ArrowDropDownCircleOutlinedIcon style={{marginLeft: "4px", margin: "12px"}} onClick={handleClick}>
          </ArrowDropDownCircleOutlinedIcon>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => {setAnchorEl(null)}}
            style={{ marginTop: HEADER_HEIGHT/2}}
          >
            {programs ? (
              <div style={{border: '1px solid #ccc'}}>
                { programs.map((program, index) => (
                  <MenuItem key={index} onClick={() => handleSelect(program)}> {program.displayName}</MenuItem>
                ))}
                { programs.length === 0 ? (
                  <MenuItem key={"None"} >You don't have access to any programs</MenuItem>
                ): null}
              </div>
            ) : null }
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
  loadProgram,
  loadApplications
};

const connectedAuth = connect(mapStateToProps, mapDispatchToProps)(Header);

export { connectedAuth as Header };
