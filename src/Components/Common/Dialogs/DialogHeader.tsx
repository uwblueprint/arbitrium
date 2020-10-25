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
    color: black;
    margin: 0;
    font-weight: normal;
    font-size: 16px;
    display: inline-block;
  }
`;

type Props = {
  title?: string;
  showClose?: boolean;
  onClose?: () => void;
};

function DialogHeader({
  title,
  showClose,
  onClose
}: Props): React.ReactElement<typeof Header> {
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
