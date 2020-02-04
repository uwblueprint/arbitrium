import React, { useState } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import SectionList from "../../mock/decisionSections.json";

import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import "./Navigation.css";
const useStyles = makeStyles({
  selected: {
    backgroundColor: "#005EB826",
    color: "#005EB8"
  },
  unselected: {
    backgroundColor: "white",
    color: "black"
  },
  root: {
    // Entire Nav
    "& .MuiDrawer-paper": {
      marginTop: "56px",
      maxWidth: "300px",
      padding: "4px 0",
      position: "fixed",
      marginBottom: "50px"
    },
    // Header
    "& h2": {
      margin: "24px 32px 24px 32px",
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
      color: "#005EB8"
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

function getNavId(pathname) {
  const parts = pathname.split("/");
  if (parts.length === 1) return "all_applications";
  switch (parts[1]) {
    case "applications":
      return "all_applications";
    case "submissions":
      return "application_submission";
    case "rankings":
      return "rankings";
    default:
      return "all_applications";
  }
}

function Navigation({ applications, pathname, push, showStackedRankings }) {
  const [organization, setOrganization] = useState("UW Blueprint");
  const classes = useStyles();
  const isApplicationReview = pathname.includes("/submissions/");
  const [selected, setSelected] = useState(getNavId(pathname));

  const changeOrganization = e => setOrganization(e.target.value);
  //temporary re-route to first available application in redux
  const getNextValidApplication = () => applications[0]._id;

  const scrollToSection = title => {
    window.requestAnimationFrame(() => {
      document
        .getElementById("canvas_" + title)
        .scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  return (
    <nav>
      <Drawer variant="permanent" className={classes.root}>
        <h2> {" SVP Investee Grant Candidates "} </h2>
        <hr />
        <Button
          className={
            selected === "all_applications"
              ? classes.selected
              : classes.unselected
          }
          onClick={() => {
            setSelected("all_applications");
            push("/applications");
          }}
          variant="contained"
        >
          All Applicants
        </Button>
        <Button
          className={
            selected === "application_submission"
              ? classes.selected
              : classes.unselected
          }
          onClick={() => {
            setSelected("application_submission");
            push(`/submissions/${organization}`);
            push(`/submissions/${getNextValidApplication()}`);
          }}
        >
          Application Submission
        </Button>
        {/*
        //Removing this for now because the functionality is not implemented
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
        */
        }
        {isApplicationReview &&
          SectionList.map(section => (
            <Button
              key={section.title}
              className="nested"
              onClick={() => scrollToSection(section.id)}
            >
              {section.title}
            </Button>
          ))}
        {true && (
          <Button
            disabled={!showStackedRankings}
            className={
              selected === "rankings" ? classes.selected : classes.unselected
            }
            id="stacked_rankings"
            onClick={() => {
              push(`/rankings`);
              setSelected("rankings");
            }}
          >
            Stacked Rankings
          </Button>
        )}
      </Drawer>
    </nav>
  );
}

export default connect(
  state => ({
    applications: state.applications.applications,
    showStackedRankings:
      state.reviewCount >= state.applications.applications.length,
    pathname: state.router.location.pathname
  }),
  { push }
)(Navigation);
