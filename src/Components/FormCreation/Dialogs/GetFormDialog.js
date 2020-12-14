import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Dialog from "../../Common/Dialogs/Dialog";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

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
  color: rgba(0, 0, 0, 0.87);
  background-color: #ffc27a;
  margin: auto;
  width: 100%;
  padding-top: 6px;
  height: 72px;
  left: 2.91%;
  right: 2.91%;
  top: 92px;
  border-radius: 4px;
  text-align: left;
`;

const WarningMessageText = styled.div`
  position: absolute;
  left: 11.65%;
  right: 20.12%;
  top: 106px;
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

const PreviewLinkWrapper = styled.div`
  position: absolute;
  left: 2.91%;
  right: 53.3%;
  top: 188px;
  width: 776px;
  align-items: left;
  margin: auto;
  display: block;
  p {
    height: 24px;
    left: 0%;
    right: 0%;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    display: block;
    align-items: center;
    letter-spacing: 0.15px;
  }
  input {
    height: 24px;
    left: 0%;
    right: 0%;
    width: 100%;
    border: 0px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    display: block;
    align-items: center;
    letter-spacing: 0.25px;
  }
  input:focus {
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 18px;
  right: 19px;
  button {
    text-transform: none;
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
  }
`;

function GetFormDialog({
  close,
  link,
  copyLinkToClipboard,
  publish = false,
  handlePublish = null
}) {
  const dialogRef = React.createRef();

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

  const handleFocus = (event) => {
    copyLinkToClipboard();
    event.preventDefault();
    event.target.select();
  };

  return (
    <Dialog
      ref={dialogRef}
      showClose={true}
      paddingHorizontal={28}
      paddingVertical={28}
      style={{
        width: "788px",
        height: "312px",
        boxShadow:
          "0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
        padding: "18px"
      }}
    >
      <Header
        style={{ lineHeight: "36px", fontSize: "24px", fontWeight: "400" }}
      >
        {publish ? "Publish to Applicants" : "Get Preview Link"}
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
            top: "116px"
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
        {publish ? (
          <WarningMessageText>
            <div>
              Please review the form <b>before</b> sending to applicants.
              <div>
                Changes to the form <b>after publishing</b> will require
                assistance from Arbitrium support.
              </div>
            </div>
          </WarningMessageText>
        ) : (
          <WarningMessageText>
            These links are meant for reviewing the form <b>before</b> allowing
            applicants to apply. Responses submitted with this link{" "}
            <b>will not</b> be saved.
          </WarningMessageText>
        )}
      </WarningMessage>
      {publish ? (
        <div>
          <p>
            {" "}
            Previewing in a new window is meant for reviewing the form{" "}
            <b>before</b> allowing applicants to apply. Responses submitted with
            this link <b>will not</b> be saved.{" "}
          </p>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
            {" "}
            If the form will not require any further changes, you are ready to
            publish.
          </p>
        </div>
      ) : (
        <PreviewLinkWrapper>
          <p>Preview Link</p>
          <input value={link} onClick={handleFocus} />
          <div
            style={{
              left: "0%",
              right: "0%",
              top: "-nan%",
              bottom: "-nan%",
              width: "776px",
              border: "0.25px solid rgba(0, 0, 0, 0.33)"
            }}
          />
        </PreviewLinkWrapper>
      )}
      <ButtonWrapper>
        <Button
          onClick={() => {
            window.open(link);
          }}
          href="#text-buttons"
          color="primary"
          style={
            !publish
              ? {
                  fontWeight: "500",
                  lineHeight: "16px",
                  letterSpacing: "1.25px",
                  textTransform: "capitalize",
                  color: "#2261AD"
                }
              : {
                  fontWeight: "500",
                  lineHeight: "16px",
                  letterSpacing: "1.25px",
                  textTransform: "capitalize",
                  color: "#2261AD",
                  border: "1px solid rgba(0, 0, 0, 0.33)",
                  boxSizing: "border-box",
                  height: "36px"
                }
          }
        >
          {publish ? "Preview in New Window" : "Open In New Window"}
        </Button>
        <Button
          onClick={publish ? handlePublish : copyLinkToClipboard}
          href="#text-buttons"
          variant="outlined"
          color="primary"
          style={{
            marginLeft: "23px",
            height: "36px",
            backgroundColor: publish ? "#2261AD" : "#C1E0FF",
            fontSize: "14px",
            border: "1px solid rgba(0, 0, 0, 0.33)",
            boxSizing: "border-box",
            borderRadius: "4px",
            fontWeight: "500",
            lineHeight: "16px",
            letterSpacing: "1.25px",
            textTransform: "capitalize",
            color: publish ? "#FFFFFF" : "#2261AD"
          }}
        >
          {publish ? "Publish" : "Copy Link"}
        </Button>
      </ButtonWrapper>
    </Dialog>
  );
}

export default GetFormDialog;
