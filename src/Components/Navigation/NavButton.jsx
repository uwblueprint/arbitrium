import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  selected: {
    backgroundColor: "#005EB826",
    color: "#005EB8"
  },
  unselected: {
    backgroundColor: "white",
    color: "black"
  }
});

function NavButton({ children, id, isSelected, onClick, path, ...rest }) {
  const styles = useStyles();
  const _onClick = () => {
    if (onClick != null) {
      onClick(id, path);
    }
  };
  return (
    <Button
      className={isSelected ? styles.selected : styles.unselected}
      onClick={_onClick}
      {...rest}
    >
      {children}
    </Button>
  );
}

NavButton.propTypes = {
  children: PropTypes.any,
  id: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  path: PropTypes.string
};

export default NavButton;
