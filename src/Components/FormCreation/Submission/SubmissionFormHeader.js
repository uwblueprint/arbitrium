import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components";
import FormSettingsContext from "../FormSettingsContext";
import InputBase from "@material-ui/core/InputBase";

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
    width: 816,
    color: "black"
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
  width: 784px;
  margin-bottom: 16px;
  line-height: 22px;
`;

const DescriptionField = styled(InputBase)`
  width: 784px;
  display: block;
  line-height: 21px;
  font-size: 16px;
`;

const CardWrapper = styled.div`
  display: flex;
`;

//Other props { numCards, card, type, question, options, required }
//commented due to lint error
function SubmissionFormHeader({ name, description, page, submitted = false }) {
  const { themeColour } = useContext(FormSettingsContext);
  const classes = useStyles({ themeColour });

  return (
    <div className={classes.container}>
      <CardWrapper key={"header"} id={"header"}>
        <Card className={classes.root}>
          <CardContent className={classes.content}>
            <TitleWrapper>
              <NameField>{name}</NameField>
              {page === -1 || submitted ? (
                <DescriptionField
                  style={{ color: "black" }}
                  multiline
                  placeholder="Form description..."
                  value={description}
                  disabled={true}
                ></DescriptionField>
              ) : null}
            </TitleWrapper>
          </CardContent>
        </Card>
      </CardWrapper>
    </div>
  );
}

export default SubmissionFormHeader;
