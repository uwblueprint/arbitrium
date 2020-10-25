import React, { useContext } from "react";
import { AuthContext } from "../../Authentication/Auth.js";
import firebaseApp from "../../Authentication/firebase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Signout = styled.div`
  display: inline-block;
  line-height: 16px;
  font-size: 16px;
  padding-right: 32px;

  button {
    text-transform: none;
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

  if (currentUser != null) {
    return (
      <div>
        <Signout>
          <button color="primary" onClick={() => firebaseApp.auth().signOut()}>
            <h> G </h>
          </button>
        </Signout>
      </div>
    );
  } else {
    return <div> </div>;
  }
};

export default UserDisplay;
