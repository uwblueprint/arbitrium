
import React, { useState } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import SectionList from "../../mock/decisionSections.json";
import NavigationList from "../../mock/navigationSections.json";

import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import "./Navigation.css";
const useStyles = makeStyles({
  root: {
    // Entire Nav
    "& .MuiDrawer-paper": {
      marginTop: "56px",
      maxWidth: "300px",
      padding: "4px 0",
      position: "fixed",
      marginBottom: "50px"
    },
    // Workflow Selector
    "& #workflow.MuiSelect-root": {
      textTransform: "uppercase",
      color: "#888888",
      textAlign: "left",
      width: "auto",
      marginLeft: "32px",
      fontSize: 14,
      paddingRight: "10px"
    },
    "& #workflow ~ .MuiSelect-icon": {
      color: "#888888",
      display: "inline-block",
      position: "relative",
      marginTop: "-12px"
    },
    // Header
    "& h2": {
      margin: "10px 83px 16px 32px",
      fontSize: "24px",
      fontWeight: "normal",
      lineHeight: "28px",
      fontFamily: "Roboto",
      textAlign: "left"
    },
    // Divider
    "& hr": {
      width: "100%",
      border: "0px solid #cccccc",
      borderBottom: "1px solid #cccccc",
      margin: 0
    },
    // Buttons
    "& button": {
      textAlign: "left",
      textTransform: "none",
      padding: "10px 24px",
      margin: "4px 8px",
      width: "calc(100% - 16px)"
    },
    "& button span": {
      justifyContent: "flex-start"
    },
    "& button.nested": {
      marginLeft: "24px",
      color: "#888888",
      width: "calc(100% - 32px)"
    },
    "& button.nested.selected": {
      color: "#6202EE"
    },
    // organization Selector
    "& #organization.MuiSelect-root": {
      textTransform: "uppercase",
      fontWeight: 500,
      marginLeft: "24px",
      textAlign: "left",
      margin: "4px 8px",
      padding: "10px 24px"
    },
    "& #organization ~ .MuiSelect-icon": {
      color: "#000",
      marginRight: "33px"
    }
  }
});

const Navigation = ({ pathname, push }) => {
  const [workflow, setWorkflow] = useState("WorkFlow1");
  const [organization, setOrganization] = useState("UW Blueprint");

  const sendAlert = e => window.alert(e.target.textContent);
  const changeWorkflow = e => setWorkflow(e.target.value);
  const changeOrganization = e => setOrganization(e.target.value);

  const classes = useStyles();
  const isApplicationReview = pathname.includes("/submissions/");

  return (
    <nav>
      <Drawer variant="permanent" className={classes.root}>
        <Select
          id="workflow"
          labelId="workflow-label"
          value={workflow}
          onChange={changeWorkflow}
          autoWidth
          disableUnderline
        >
          <MenuItem value="WorkFlow1">Workflow</MenuItem>
          <MenuItem value="WorkFlow2">Workflow #2</MenuItem>
          <MenuItem value="WorkFlow3">Workflow #3</MenuItem>
          <MenuItem value="WorkFlow4">Workflow #4</MenuItem>
          <MenuItem value="WorkFlow5">Workflow #5</MenuItem>
        </Select>
        <h2>SVP Perfect Pitch Candidates</h2>
        <hr />
        <Button id="all_applications" onClick={() => {
          NavigationList.map(section => {
              document.getElementById(section.id).style.color = "black";
              document.getElementById(section.id).style.backgroundColor = "white";
            });
            document.getElementById("all_applications").style.color = "#6202EE";
            document.getElementById("all_applications").style.backgroundColor = "#ECE0FD";
            push("/applications");
        }}>
          All Applicants
        </Button>
        <Button id="application_submission"
          onClick={() => {
            NavigationList.map(section => {
              document.getElementById(section.id).style.color = "black";
              document.getElementById(section.id).style.backgroundColor = "white";
            });
            document.getElementById("application_submission").style.color = "#6202EE";
            document.getElementById("application_submission").style.backgroundColor = "#ECE0FD";
            push(`/submissions/${organization}`)
          }}
          variant="contained"
        >
          Application Submission
        </Button>
        <Select
          id="organization"
          labelId="organization-label"
          value={organization}
          onChange={changeOrganization}
          autoWidth
          disableUnderline
        >
          <MenuItem value="UW Blueprint">UW Blueprint</MenuItem>
        </Select>
        {isApplicationReview &&
          SectionList.map(section => (
            <Button id={section.title} key={section.title} className="nested" onClick={() => {
              SectionList.map(section => (document.getElementById(section.title).style.color = "#888888"));
              document.getElementById(section.title).style.color = "#6202EE";
            }}>
              {section.title}
            </Button>
          ))}
        <Button id="comparison" onClick={() => {
          NavigationList.map(section => {
            document.getElementById(section.id).style.color = "black";
            document.getElementById(section.id).style.backgroundColor = "white";
          });
          document.getElementById("comparison").style.color = "#6202EE";
          document.getElementById("comparison").style.backgroundColor = "#ECE0FD";
          push(`/comparisons/${organization}`)
        }}>
          Comparison
        </Button>
        <Button id="stacked_rankings" onClick={() => {
          NavigationList.map(section => {
            document.getElementById(section.id).style.color = "black";
            document.getElementById(section.id).style.backgroundColor = "white";
          });
          document.getElementById("stacked_rankings").style.color = "#6202EE";
          document.getElementById("stacked_rankings").style.backgroundColor = "#ECE0FD";
        }}>Stacked Rankings</Button>
      </Drawer>
    </nav>
  );
};

export default connect(
  state => ({
    pathname: state.router.location.pathname
  }),
  { push }
)(Navigation);
