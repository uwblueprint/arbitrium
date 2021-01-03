import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import PublishedFormDialog from "./Dialogs/PublishedFormDialog";
import ManageApplicantAccessDialog from "./Dialogs/ManageApplicantAccessDialog";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import moment from "moment";
import { Link } from "../../Types/FormTypes";

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

type Props = {
  submissionLink: string;
  handleSaveFormAccess: (date: string) => void;
  linkData: Link;
  openFormWithNewLink: () => void;
};

function PublishedFormHeader({
  submissionLink,
  handleSaveFormAccess,
  linkData,
  openFormWithNewLink
}: Props): React.ReactElement<typeof Header> {
  const [showPublishedFormDialog, setshowPublishedFormDialog] = useState(false);
  const [showManageAccessDialog, setshowManageAccessDialog] = useState(false);
  const [copiedsubmissionLink, setCopiedsubmissionLink] = useState(false);

  function closeDialog() {
    setshowPublishedFormDialog(false);
    setshowManageAccessDialog(false);
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(submissionLink);
    const dummy = document.createElement("input");
    dummy.innerText = submissionLink;
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    dummy.select();
    document.execCommand("copy");
    dummy.remove();
    setCopiedsubmissionLink(true);
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
            If you published the form erroneously, make a copy of this program
            to keep editing.{" "}
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
                setshowManageAccessDialog(true);
              }}
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
              variant={
                moment(linkData.close).isBefore(moment())
                  ? "contained"
                  : "outlined"
              }
              onClick={() => {
                setshowPublishedFormDialog(true);
              }}
              color="primary"
              disabled={moment(linkData.close).isBefore(moment())}
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
      {showPublishedFormDialog && (
        <>
          <DialogOverlay />
          <PublishedFormDialog
            link={submissionLink}
            close={closeDialog}
            copyLinkToClipboard={copyLinkToClipboard}
          />
        </>
      )}
      {showManageAccessDialog && (
        <>
          <DialogOverlay />
          <ManageApplicantAccessDialog
            linkData={linkData}
            close={closeDialog}
            handleSaveFormAccess={handleSaveFormAccess}
            openFormWithNewLink={openFormWithNewLink}
          />
        </>
      )}
      <Snackbar
        open={copiedsubmissionLink}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        autoHideDuration={5000}
        resumeHideDuration={5000}
        onClose={() => {
          setCopiedsubmissionLink(false);
        }}
        message={"Copied to clipboard."}
      />
    </div>
  );
}

export default PublishedFormHeader;
