import React from "react";
import makeStyles from "@material-ui/core/styles";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  title: {
    fontSize: 20,
    fontWeight: 500,
    float: "right",
    marginRight: 200, // css needs to be fixed
    marginTop: 16
  },
  heading: {
    fontFamily: "Roboto",
    fontSize: 10,
    fontWeight: 500,
    marginTop: 24,
    marginLeft: 16
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: 400,
    marginTop: 4,
    marginLeft: 16
  },
  settings: {
    color: "grey",
    marginTop: 16,
    marginLeft: 20
  },
  button: {
    height: 36,
    marginTop: 16,
    marginBottom: 24,
    marginLeft: 16
  },
  response: {
    width: 348,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16
  },
  help: {
    color: "grey",
    fontSize: 10,
    display: "inline-flex"
  }
});

const FormSettingsSection = styled.div`
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12),
    0px 5px 5px rgba(0, 0, 0, 0.2);
  width: 380px;
  min-height: 100vh;
  float: left;
`;

const FormSettingsTitle = styled.div`
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12),
    0px 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 380px;
  height: 56px;
`;

const ImageOutlinedIconStyled = styled(ImageOutlinedIcon)`
  color: #2261ad;
`;

function FormSettings() {
  const classes = useStyles();
  return (
    <div>
      <FormSettingsSection>
        <FormSettingsTitle>
          <SettingsOutlinedIcon
            className={classes.settings}
          ></SettingsOutlinedIcon>
          <Typography className={classes.title}>Form Settings</Typography>
        </FormSettingsTitle>
        <Typography className={classes.heading}>HEADERS</Typography>
        <Typography className={classes.text}>
          Upload an image in .jpg, .jpeg, or .png with dimensions of at least
          640px by 160px.
        </Typography>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          startIcon={<ImageOutlinedIconStyled />}
        >
          Select Files
        </Button>
        <Divider />
        <Typography className={classes.heading}>THEME COLOUR</Typography>
        <Divider />
        <div>
          {/* needs to be aligned*/}
          <Typography className={classes.heading}>
            CONFIRMATION MESSAGE
          </Typography>
          <Tooltip
            className={classes.help}
            title="This is the message applicants see when they submit their response."
            placement="top"
            arrow
          >
            <HelpOutlineIcon></HelpOutlineIcon>
          </Tooltip>
        </div>
        <TextField
          className={classes.response}
          placeholder="Your response has been recorded."
          defaultValue="Your response has been recorded."
        />
        <div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          <Button className={classes.button} color="primary">
            Cancel
          </Button>
        </div>
      </FormSettingsSection>
    </div>
  );
}

export default FormSettings;
