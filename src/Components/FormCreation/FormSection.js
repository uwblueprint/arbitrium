import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

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
  }
});

function FormSection({ numSections, section, title, description }) {
  const classes = useStyles();

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
        />
        <CardContent classes={{ root: classes.content }}>
          {description}
        </CardContent>
      </Card>
    </div>
  );
}

export default FormSection;
