import React, { useState, useEffect } from "react";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import GetFormDialog from "./Dialogs/GetFormDialog";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import SettingsIcon from "@material-ui/icons/Settings";

const NameInput = styled(InputBase)`
  input {
    font-size: 24px;
  }
  && {
    width: 526px;
    margin-bottom: 16px;
    line-height: 36px;
  }
`;

const DescriptionInput = styled(InputBase)`
  && {
    width: 526px;
    display: block;
    line-height: 21px;
    overflow-y: auto;
    max-height: 48px;
  }
  textarea {
    font-size: 14px;
    color: #888888;
  }
`;

const InputWrapper = styled.div`
  padding: 48px 100px;
  padding-left: 15%;
  padding-right: 0px;
`;

const ButtonWrapper = styled.div`
  padding: 48px 0px;
  padding-left: 32px;
  align-items: center;
  justify-content: center;
`;

const DialogOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 150%;
  width: 100vw;
  z-index: 110;
  background: rgba(0, 0, 0, 0.5);
  .dialogButton {
    text-transform: none;
  }
`;

const Header = styled.div`
  box-sizing: border-box;
  height: 201px;
  width: 100%;
  box-shadow: 0 2px 3px 1px #cccccc;
  display: flex;
  background: #fafafa;
`;

const PublishedHeader = styled.div`
  box-sizing: border-box;
  height: 166px;
  width: 100%;
  background: #55a94e;
  display: flex;
`;

const TextWrapper = styled.div`
  padding-left: 15%;
  padding-right: 0px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

type HeaderData = {
  name: string;
  description: string;
  previewLink: string;
};

type Props = {
  name: string;
  description: string;
  previewLink: string;
  onChange: (name: string, description: string) => void;
};

function PublishedFormHeader({
  name,
  description,
  previewLink,
  onChange
}: Props): React.ReactElement<typeof Header> {
  const [formTitle, setFormTitle] = useState(name);
  const [formDescription, setFormDescription] = useState(description);

  useEffect(() => {
    setFormTitle(name);
    setFormDescription(description);
  }, [name, description]);

  const updateHeader = () => {
    onChange(formTitle, formDescription);
  };

  const [showPreviewLink, setShowPreviewLink] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [copiedPreviewLink, setCopiedPreviewLink] = useState(false);

  function closeDialog() {
    setShowPreviewLink(false);
    setShowPublishDialog(false);
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(previewLink);
    var dummy = document.createElement("input");
    dummy.innerText = previewLink;
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    dummy.select();
    document.execCommand("copy");
    dummy.remove();
    setCopiedPreviewLink(true);
  };

  return (
    <div>
      <PublishedHeader>
        <TextWrapper>
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <CheckCircleOutlineIcon
              style={{ color: "white", marginRight: 20 }}
            />
            <p style={{ color: "white", fontSize: 20 }}>
              {" "}
              This form has been published to applicants.{" "}
            </p>
          </div>
          <p style={{ color: "white" }}>
            {" "}
            If you published the form erroneously, make a copy of this form to
            keep editing.{" "}
          </p>
          <p style={{ color: "white" }}>
            {" "}
            If you need changes made to the form, please contact the Arbitrium
            team at{" "}
            <a href="mailto:arbitrium@uwblueprint.org">
              arbitrium@uwblueprint.org
            </a>{" "}
          </p>
        </TextWrapper>
      </PublishedHeader>
      <Header>
        <TextWrapper>
          <p
            style={{
              fontWeight: 400,
              fontSize: 20,
              letterSpacing: 0.25
            }}
          >
            {" "}
            This form is currently <b style={{ fontWeight: 700 }}>
              accepting
            </b>{" "}
            responses and not scheduled to close.
          </p>
          <p style={{ fontWeight: 400 }}>
            {" "}
            You can manually close the form or schedule a time for it to
            automatically close in “Manage Applicant Access”.
          </p>
          <div style={{ display: "flex", marginTop: 32, marginBottom: 32 }}>
            <Button
              variant="contained"
              onClick={() => {
                setShowPublishDialog(true);
              }}
              href="#text-buttons"
              color="primary"
              style={{
                backgroundColor: "#2261AD",
                marginLeft: "0px",
                marginBottom: "8px",
                textTransform: "none",
                letterSpacing: "1.25px",
                lineHeight: "16px",
                borderRadius: 5
              }}
            >
              <SettingsIcon style={{ marginRight: 8 }} />
              Manage Applicant Access
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setShowPreviewLink(true);
              }}
              href="#text-buttons"
              color="primary"
              style={{
                marginLeft: 369,
                color: "#2261AD",
                marginRight: "16px",
                marginBottom: "8px",
                textTransform: "none",
                letterSpacing: "1.25px",
                lineHeight: "16px",
                padding: "10px 12px 10px 12px",
                border: "1px solid rgba(0, 0, 0, 0.33)",
                borderRadius: 4
              }}
            >
              Get Link for Applicants
            </Button>
          </div>
        </TextWrapper>
      </Header>
      {showPreviewLink && (
        <>
          <DialogOverlay />
          <GetFormDialog
            link={previewLink}
            close={closeDialog}
            copyLinkToClipboard={copyLinkToClipboard}
            handlePublish={null}
          />
        </>
      )}
      {showPublishDialog && (
        <>
          <DialogOverlay />
          <GetFormDialog
            link={previewLink}
            close={closeDialog}
            copyLinkToClipboard={copyLinkToClipboard}
            publish={true}
            handlePublish={null}
          />
        </>
      )}
      <Snackbar
        open={copiedPreviewLink}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        autoHideDuration={5000}
        resumeHideDuration={5000}
        onClose={() => {
          setCopiedPreviewLink(false);
        }}
        message={"Copied to clipboard."}
      />
    </div>
  );
}

export default PublishedFormHeader;
