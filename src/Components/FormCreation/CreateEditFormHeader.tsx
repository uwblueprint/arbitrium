import React, { useState, useEffect } from "react";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import GetPreviewLinkDialog from "./GetPreviewLinkDialog";
import Snackbar from "@material-ui/core/Snackbar";

const Header = styled.div`
  box-sizing: border-box;
  height: 176px;
  width: 100%;
  box-shadow: 0 2px 3px 1px #cccccc;
  display: flex;
`;

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

function CreateEditFormHeader({
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
  const [copiedPreviewLink, setCopiedPreviewLink] = useState(false);

  function closePreviewLinkDialog() {
    setShowPreviewLink(false);
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
    <Header>
      <InputWrapper>
        <NameInput
          placeholder="Form name"
          value={formTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormTitle(e.target.value)
          }
          onBlur={() => {
            updateHeader();
          }}
        />
        <DescriptionInput
          multiline
          placeholder="Form description..."
          value={formDescription}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormDescription(e.target.value)
          }
          onBlur={() => {
            updateHeader();
          }}
        ></DescriptionInput>
      </InputWrapper>
      <ButtonWrapper>
        <Button
          variant="outlined"
          onClick={() => {
            setShowPreviewLink(true);
          }}
          href="#text-buttons"
          color="primary"
          style={{
            color: "#2261AD",
            marginRight: "16px",
            marginBottom: "8px",
            textTransform: "none",
            letterSpacing: "1.25px",
            lineHeight: "16px",
            padding: "10px 12px 10px 12px",
            border: "1px solid rgba(0, 0, 0, 0.33)"
          }}
        >
          Get Preview Link
        </Button>
        <Button
          variant="contained"
          onClick={() => {}}
          href="#text-buttons"
          color="primary"
          style={{
            backgroundColor: "#2261AD",
            marginLeft: "0px",
            marginBottom: "8px",
            textTransform: "none",
            letterSpacing: "1.25px",
            lineHeight: "16px",
            padding: "10px 12px 10px 12px"
          }}
        >
          Publish
        </Button>
      </ButtonWrapper>
      {showPreviewLink && (
        <>
          <DialogOverlay />
          <GetPreviewLinkDialog
            link={previewLink}
            close={closePreviewLinkDialog}
            copyLinkToClipboard={copyLinkToClipboard}
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
    </Header>
  );
}

export default CreateEditFormHeader;
