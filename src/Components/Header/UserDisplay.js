import React, { useContext, useState } from "react";
import { AuthContext } from "../../Authentication/Auth.js";
import firebaseApp from "../../Authentication/firebase";
import styled from "styled-components";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { HEADER_HEIGHT } from "./Header";

const Signout = styled.div`
  display: inline-block;
  line-height: 16px;
  font-size: 16px;
  padding-right: 32px;

  button {
    text-transform: none;
    padding-top: 3px;
    margin-left: 12px;
    height: 32px;
    width: 32px;
    border-radius: 100%;
    cursor: pointer;
    background-color: #eb9546;
    text-color: white;
    border: 0px;
    font-size: 16;
  }
`;

const UserDisplay = () => {
  const { currentUser, appUser } = useContext(AuthContext);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const handleClickProfileMenu = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleSelect = () => {
    firebaseApp.auth().signOut();
  };

  if (currentUser != null) {
    return (
      <div>
        <Signout>
          <button color="primary" onClick={handleClickProfileMenu}>
            {appUser.name ? appUser.name.substring(0, 1) : ""}
          </button>
        </Signout>

        <Menu
          elevation={0}
          id="simple-menu"
          anchorEl={profileMenuAnchor}
          keepMounted
          open={Boolean(profileMenuAnchor)}
          onClose={() => {
            setProfileMenuAnchor(null);
          }}
          style={{ marginTop: HEADER_HEIGHT / 2 }}
        >
          <div style={{ border: "1px solid #ccc" }}>
            <MenuItem onClick={() => handleSelect()}> {"Log out"}</MenuItem>
          </div>
        </Menu>
      </div>
    );
  } else {
    return <div> </div>;
  }
};

export default UserDisplay;
