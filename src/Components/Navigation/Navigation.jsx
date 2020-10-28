import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import NavButton from "./NavButton";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import { ProgramContext } from "../../Contexts/ProgramContext";

export const MAX_NAVBAR_WIDTH = 300;

const useStyles = makeStyles({
  root: {
    // Entire Nav
    "& .MuiDrawer-paper": {
      marginTop: "56px",
      maxWidth: `${MAX_NAVBAR_WIDTH}px`,
      position: "fixed",
      marginBottom: "50px",
      zIndex: 100
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

function Navigation({ pathname, push }) {
  const { reviewCount, applications } = useContext(ProgramContext);
  const showStackedRankings =
    reviewCount != null && reviewCount >= applications.length;
  const classes = useStyles();
  const isApplicationReview = pathname.includes("/submissions/");
  const [selected, setSelected] = useState(getNavId(pathname));

  //temporary re-route to first available application in redux
  const getNextValidApplication = () =>
    applications.length > 0 ? applications[0]._id : "/";

  const scrollToSection = (title) => {
    window.requestAnimationFrame(() => {
      const element = document.getElementById("canvas_" + title);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  };

  const onNavClick = (id, path) => {
    setSelected(id);
    push(path);
  };

  const nextApp = getNextValidApplication();
  return (
    <nav>
      <Drawer variant="permanent" className={classes.root}>
        <hr />
        <NavButton
          id="all_applications"
          isSelected={selected === "all_applications"}
          onClick={onNavClick}
          path={"/applications"}
        >
          All applicants
        </NavButton>
        <NavButton
          id="application_submission"
          isSelected={selected === "application_submission"}
          onClick={onNavClick}
          path={`/submissions/${nextApp}`}
        >
          Application submission
        </NavButton>
        {isApplicationReview &&
          ["1", "2", "3", "4", "5"].map((section) => (
            <Button
              key={"section" + section}
              className="nested"
              onClick={() => scrollToSection(section)}
            >
              {"Section " + section}
            </Button>
          ))}
        <NavButton
          disabled={!showStackedRankings}
          id="stacked_rankings"
          onClick={onNavClick}
          path={"/rankings"}
        >
          Stacked rankings
        </NavButton>
      </Drawer>
    </nav>
  );
}

export default connect(
  (state) => ({
    pathname: state.router.location.pathname,
    program: state.program
  }),
  { push }
)(Navigation);
