import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import FormSettingsHeading from "./FormSettingsHeading";
import FormSettingsThemePickerSection from "./FormSettingsThemePickerSection";
import { FormSettingsType } from "../../Types/FormTypes";
import FormSettingsContext from "./FormSettingsContext";

const useStyles = makeStyles({
  title: {
    lineHeight: 24,
    display: "inline",
    fontSize: 20,
    fontWeight: 500
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: 400,
    marginTop: 4
  },
  settingsIcon: {
    display: "inline",
    color: "grey",
    marginRight: 24
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
    fontSize: 10
  }
});

const StyledDrawer = styled(Drawer)`
  && {
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14),
      0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2);
  }
`;

const FormSettingsBody = styled.div`
  width: 380px;
  padding: 16px;
`;

const FormSettingsTitle = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12),
    0px 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 380px;
  height: 56px;
`;

const ImageOutlinedIconStyled = styled(ImageOutlinedIcon)`
  color: #2261ad;
`;

type Props = {
  settingsInit: FormSettingsType;
  open: boolean;
  handleCloseFormSettings: () => void;
  onSave: (settings: FormSettingsType) => void;
};

function FormSettingsDrawer({
  open,
  handleCloseFormSettings,
  onSave
}: Props): React.ReactElement<typeof Drawer> {
  const settingsInit = useContext(FormSettingsContext);
  const classes = useStyles();
  const [themeColour, setThemeColour] = useState<string>(
    settingsInit.themeColour
  );
  const [headerImage, setHeaderImage] = useState<string>(
    settingsInit.headerImage || ""
  );
  const [confirmationMessage, setConfirmationMessage] = useState(
    settingsInit.confirmationMessage
  );

  function _onSave() {
    handleCloseFormSettings();
    onSave({
      themeColour,
      headerImage,
      confirmationMessage
    });
  }

  return (
    <StyledDrawer open={open} anchor="right">
      <FormSettingsTitle>
        <SettingsOutlinedIcon
          className={classes.settingsIcon}
        ></SettingsOutlinedIcon>
        <Typography className={classes.title}>Form Settings</Typography>
      </FormSettingsTitle>
      <FormSettingsBody>
        <FormSettingsHeading>Header</FormSettingsHeading>
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
        <FormSettingsThemePickerSection
          colour={themeColour}
          onSelect={setThemeColour}
        />
        <div>
          <FormSettingsHeading
            iconRight={
              <Tooltip
                className={classes.help}
                title="This is the message applicants see when they submit their response."
                placement="top"
                arrow
              >
                <HelpOutlineIcon />
              </Tooltip>
            }
          >
            Confirmation Message
          </FormSettingsHeading>
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
            onClick={_onSave}
          >
            Save
          </Button>
          <Button
            onClick={handleCloseFormSettings}
            className={classes.button}
            color="primary"
          >
            Cancel
          </Button>
        </div>
      </FormSettingsBody>
    </StyledDrawer>
  );
}

export default FormSettingsDrawer;
