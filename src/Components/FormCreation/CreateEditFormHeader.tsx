import React, { useState, useEffect } from "react";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import GetPreviewLinkDialog from "./GetPreviewLinkDialog";
import Snackbar from "@material-ui/core/Snackbar";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ControlledDialogTrigger from "../Common/Dialogs/DialogTrigger";

const Header = styled.div`
  box-sizing: border-box;
  height: 176px;
  width: 100%;
  box-shadow: 0 2px 3px 1px #cccccc;
  display: flex;
`;

const NameInput = styled(InputBase)`
  && {
    input {
      font-size: 24px;
    }
    width: 100%;
    margin-bottom: 16px;
    line-height: 36px;
  }
`;

const DescriptionInput = styled(InputBase)`
  && {
    width: 100%;
    line-height: 21px;
    overflow-y: auto;
    max-height: 48px;
    textarea {
      font-size: 14px;
      color: #888888;
    }
  }
`;

const InputWrapper = styled.div`
  width: 526px;
  display: inline-block;
  padding: 48px 100px;
  padding-left: 15%;
  padding-right: 0px;
  margin-right: 32px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const LinkPreviewButton = styled(Button)`
  && {
    color: #2261ad;
    margin-right: 16px;
    margin-bottom: 8px;
    text-transform: none;
    letter-spacing: 1.25px;
    line-height: 16px;
    padding: 10px 12px 10px 12px;
    border: 1px solid rgba(0, 0, 0, 0.33);
  }
`;

const PublishButton = styled(Button)`
  && {
    backgroundcolor: #2261ad;
    text-transform: none;
    letter-spacing: 1.25px;
    line-height: 16px;
    padding: 10px 12px 10px 12px;
  }
`;

const SettingsButton = styled(Button)`
  && {
    margin-left: auto;
  }
`;

const FormSettingsOutlineIcon = styled(SettingsOutlinedIcon)`
  color: #2261ad;
`;

type Props = {
  name: string;
  description: string;
  previewLink: string;
  onChange: (name: string, description: string) => void;
  onFormSettingsClick: () => void;
};

function CreateEditFormHeader({
  name,
  description,
  previewLink,
  onChange,
  onFormSettingsClick
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
          onBlur={updateHeader}
        />
        <DescriptionInput
          multiline
          placeholder="Form description..."
          value={formDescription}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormDescription(e.target.value)
          }
          onBlur={updateHeader}
        ></DescriptionInput>
      </InputWrapper>
      <ButtonWrapper>
        <div>
          <LinkPreviewButton
            variant="outlined"
            onClick={() => {
              setShowPreviewLink(true);
            }}
            color="primary"
          >
            Get Preview Link
          </LinkPreviewButton>
          <PublishButton variant="contained" onClick={() => {}} color="primary">
            Publish
          </PublishButton>
        </div>
        <SettingsButton
          color="primary"
          startIcon={<FormSettingsOutlineIcon />}
          onClick={onFormSettingsClick}
        >
          Form Settings
        </SettingsButton>
      </ButtonWrapper>
      <ControlledDialogTrigger
        showDialog={showPreviewLink}
        Dialog={GetPreviewLinkDialog}
        dialogProps={{
          link: previewLink,
          close: closePreviewLinkDialog,
          copyLinkToClipboard: copyLinkToClipboard
        }}
      />
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
