import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components";
import FormSettingsContext from "../FormSettingsContext";

const useStyles = makeStyles(() => ({
  content: {
    marginTop: -16
  },
  root: (props) => ({
    fontSize: 14,
    borderRadius: 0,
    borderTop: `14px solid #${props.themeColour}`,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816
  }),
  logo: {
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #CCCCCC",
    marginBottom: 20,
    width: 816
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  image: {
    textAlign: "center"
  }
}));

const TitleWrapper = styled.div`
  margin-top: 24px;
  margin-left: 8px;
  margin-bottom: 16px;
  margin-right: 16px;
  position: "flex";
`;

const NameField = styled.div`
  font-size: 20px;
  width: 816px;
  margin-bottom: 16px;
  line-height: 22px;
`;

const DescriptionField = styled.div`
  width: 816px;
  display: block;
  line-height: 21px;
  max-height: 56px;
  font-size: 16px;
  color: #888888;
`;

const CardWrapper = styled.div`
  display: flex;
`;

//Other props { numCards, card, type, question, options, required }
//commented due to lint error
function SubmissionFormHeader({ name, description }) {
  const { themeColour } = useContext(FormSettingsContext);
  const classes = useStyles({ themeColour });

  return (
    <div className={classes.container}>
      <CardWrapper key={"header"} id={"header"}>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <TitleWrapper>
              <NameField>{name}</NameField>
              <DescriptionField>{description}</DescriptionField>
            </TitleWrapper>
          </CardContent>
        </Card>
      </CardWrapper>
    </div>
  );
}

export default SubmissionFormHeader;
