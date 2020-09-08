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
    borderLeft: `4px solid #2261AD`,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20
  }),
  title: {
    color: "#000",
    fontSize: "20px",
    fontWeight: "500"
  }
});

//Other props { numCards, card, type, question, options, required }
//commented due to lint error
function FormCard({ card, question}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{ title: classes.title }}
        title={question}
        id={card}
      />
      <CardContent classes={{ root: classes.content }}>todo</CardContent>
    </Card>
  );
}

export default FormCard;
