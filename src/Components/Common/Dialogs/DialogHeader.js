import React from "react";
import styled from "styled-components";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  closeRoot: {
    display: "inline-block",
    marginLeft: "auto"
  }
});

const Header = styled.div`
  display: flex;
  padding-bottom: 24px;
  h4 {
    margin: 0;
    font-weight: normal;
    display: inline-block;
  }
`;

function DialogHeader({ title, showClose, onClose }) {
  const styles = useStyles();
  const _showClose = showClose != null ? showClose : true;

  return (
    <Header>
      <h4>{title}</h4>
      {_showClose && (
        <IconButton
          onClick={onClose}
          classes={{ root: styles.closeRoot }}
          size="small"
        >
          <Close />
        </IconButton>
      )}
    </Header>
  );
}

export default DialogHeader;
