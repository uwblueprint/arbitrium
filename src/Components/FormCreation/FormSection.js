import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  collapse: {
    marginBottom: 16
  },
  content: { marginTop: -16 },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  root: () => ({
    fontSize: 14,
    borderRadius: 0,
    borderTop: `8px solid #2261AD`,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20
  }),
  title: {
    color: "#000",
    fontSize: "20px",
    fontWeight: "500"
  },
  section_title: {
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    marginBottom: "0px",
    fontSize: "14px",
    backgroundColor: "#2261AD",
    color: "white",
    width: "fit-content",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    paddingBottom: "5px"
  },
  paper: {
    boxShadow: "0 2px 3px 1px #cccccc"
  }
});

function FormSection({ numSections, section, title, description }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAnchorClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <span className={classes.section_title}>
        Section {section} of {numSections}
      </span>
      <Card className={classes.root}>
        <CardHeader
          classes={{ title: classes.title }}
          title={title}
          id={section}
          action={
            <IconButton
              aria-label="actions"
              aria-controls="actions-menu"
              onClick={handleAnchorClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent classes={{ root: classes.content }}>
          {description}
        </CardContent>
      </Card>
      <Menu
        id="actions-menu"
        classes={classes}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleAnchorClose}
      >
        <MenuItem onClick={console.log("a")}>Duplicate section</MenuItem>
        <MenuItem onClick={console.log("b")}>Move section</MenuItem>
        <MenuItem onClick={console.log("c")}>Delete section</MenuItem>
        <MenuItem onClick={console.log("c")}>Merge with above</MenuItem>
      </Menu>
    </div>
  );
}

export default FormSection;
