import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Dialog from "../../Common/Dialogs/Dialog";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const Header = styled.div`
  display: flex;
  padding-bottom: 16px;
  color: rgba(0, 0, 0, 0.87);
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  padding-top: 6px;
`;

const WarningMessage = styled.div`
  display: flex;
  padding-bottom: 16px;
  margin-bottom: 24px;
  color: rgba(0, 0, 0, 0.87);
  background-color: #ffc27a;
  width: 100%;
  padding-top: 6px;
  height: 31px;
  left: 2.91%;
  right: 2.91%;
  top: 92px;
  border-radius: 4px;
  text-align: left;
`;

const WarningMessageText = styled.div`
  position: absolute;
  left: 11.65%;
  right: 25.12%;
  top: 92px;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.25px;
  text-align: left;
  b {
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0.25px;
    text-align: left;
  }
`;

const OptionsWrapper = styled.div`
  margin-left: 24px;
  left: 100px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 18px;
  right: 19px;
  margin-left: 27px;
  button {
    text-transform: none;
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
  }
`;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginRight: theme.spacing(1),
    width: 267,
    border: "1px solid rgba(0, 0, 0, 0.33)",
    borderRadius: "4px",
    padding: "10px",
    marginLeft: "32px",
    marginTop: "16px",
    marginBottom: "84px"
  }
}));

function ManageApplicantAccessDialog({
  close,
  handleSaveFormAccess,
  linkData,
  openFormWithNewLink
}) {
  const classes = useStyles();
  const dialogRef = React.createRef();
  const [option, setOption] = useState(
    linkData.close !== null ? "schedule" : "manual"
  );
  const [open, setOpen] = useState(!moment(linkData.close).isBefore(moment()));

  useEffect(() => {
    function detectEscape(event) {
      if (event.keyCode === 27) {
        close();
      }
    }

    function detectOutsideClicks(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        close();
      }
    }

    if (dialogRef.current) {
      window.addEventListener("keydown", detectEscape);
      window.addEventListener("mousedown", detectOutsideClicks);
    }
  }, [close, dialogRef]);

  const handleSave = (date) => {
    setOpen(!moment(date).isBefore(moment()));
    handleSaveFormAccess(date);
    //save to db the new settings
  };

  return (
    <Dialog
      ref={dialogRef}
      showClose={true}
      paddingHorizontal={28}
      paddingVertical={28}
      style={{
        width: "824px",
        height: "auto",
        minHeight: "372px",
        boxShadow:
          "0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
        padding: "18px"
      }}
    >
      <Header
        style={{ lineHeight: "36px", fontSize: "24px", fontWeight: "400" }}
      >
        Manage Applicant Access
        <IconButton
          onClick={close}
          style={{
            display: "inline-block",
            marginLeft: "auto"
          }}
          size="small"
        >
          <Close />
        </IconButton>
      </Header>
      <WarningMessage>
        <svg
          style={{
            position: "absolute",
            left: "5.83%",
            right: "91.26%",
            top: "92"
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2ZM9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21ZM14 13.7L14.85 13.1C16.2 12.16 17 10.63 17 9C17 6.24 14.76 4 12 4C9.24 4 7 6.24 7 9C7 10.63 7.8 12.16 9.15 13.1L10 13.7V16H14V13.7Z"
            fill="black"
            fillOpacity="0.54"
          />
        </svg>
        <WarningMessageText>
          {open ? (
            <div>
              This form is current <b>accepting</b> responses.
            </div>
          ) : (
            <div>
              This form is currently <b>closed</b> to responses.
            </div>
          )}
        </WarningMessageText>
      </WarningMessage>
      {open ? (
        <div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 500 }}>
              {" "}
              <b>How do you want to close this form?</b>
            </p>
          </div>
          <OptionsWrapper>
            <FormControl component="fieldset">
              <FormLabel component="legend"></FormLabel>
              <RadioGroup
                value={option}
                onChange={(event) => setOption(event.target.value)}
              >
                <FormControlLabel
                  value="manual"
                  control={<Radio />}
                  label="Manually close the form"
                ></FormControlLabel>
                <Button
                  onClick={() => handleSave(moment())}
                  href="#text-buttons"
                  variant="outlined"
                  color="primary"
                  disabled={option !== "manual"}
                  style={{
                    marginLeft: "32px",
                    marginTop: "16px",
                    marginBottom: "16px",
                    width: "170px",
                    height: "36px",
                    backgroundColor:
                      option !== "manual" ? "#E5BAB6" : "#C94031",
                    fontSize: "14px",
                    border: "1px solid rgba(0, 0, 0, 0.33)",
                    borderRadius: "4px",
                    fontWeight: "500",
                    lineHeight: "16px",
                    textTransform: "capitalize",
                    color: "#FFFFFF"
                  }}
                >
                  Close the form now
                </Button>

                <FormControlLabel
                  value="schedule"
                  control={<Radio />}
                  label="Schedule the a time for the form to close "
                />
                <TextField
                  id="datetime-local"
                  type="datetime-local"
                  defaultValue={
                    linkData.close
                      ? moment(linkData.close).format("yyyy-MM-DDThh:mm")
                      : moment()
                          .add(7, "days")
                          .format("yyyy-MM-DDThh:mm")
                  }
                  disabled={option === "manual"}
                  className={classes.textField}
                  onChange={(event) =>
                    handleSave(moment(event.currentTarget.value))
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </RadioGroup>
            </FormControl>
          </OptionsWrapper>
        </div>
      ) : (
        <div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 500 }}>
              {" "}
              <b>Change form status to accept responses from applicants</b>
            </p>
          </div>
          <p>
            Reopening the form will generate a new link for applicants to use.
            To get the new link, click “Get Applicant Link” after reopening the
            form.
          </p>
          <Button
            onClick={() => {
              openFormWithNewLink();
              close();
            }}
            href="#text-buttons"
            variant="outlined"
            color="primary"
            style={{
              marginLeft: "32px",
              marginTop: "16px",
              marginBottom: "16px",
              width: "170px",
              height: "36px",
              backgroundColor: "#55A94E",
              fontSize: "14px",
              border: "1px solid rgba(0, 0, 0, 0.33)",
              borderRadius: "4px",
              fontWeight: "500",
              lineHeight: "16px",
              textTransform: "capitalize",
              color: "#FFFFFF"
            }}
          >
            Reopen form now
          </Button>
        </div>
      )}

      <ButtonWrapper>
        <Button
          onClick={close}
          href="#text-buttons"
          color="primary"
          style={{
            fontWeight: "500",
            lineHeight: "16px",
            letterSpacing: "1.25px",
            textTransform: "capitalize",
            color: "#2261AD"
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={close}
          href="#text-buttons"
          variant="outlined"
          color="primary"
          style={{
            marginLeft: "23px",
            height: "36px",
            backgroundColor: "#2261AD",
            fontSize: "14px",
            border: "1px solid rgba(0, 0, 0, 0.33)",
            boxSizing: "border-box",
            borderRadius: "4px",
            fontWeight: "500",
            lineHeight: "16px",
            letterSpacing: "1.25px",
            textTransform: "capitalize",
            color: "#FFFFFF"
          }}
        >
          Save Settings
        </Button>
      </ButtonWrapper>
    </Dialog>
  );
}

export default ManageApplicantAccessDialog;
