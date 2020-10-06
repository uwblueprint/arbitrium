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
  }
`;

const UserDisplay = () => {
  const { currentUser, appUser } = useContext(AuthContext);
  console.log(appUser);

  if (currentUser != null) {
    return (
      <div>
        <Signout>
          {"Hi " + appUser.name + "!"}
          <button color="primary" onClick={() => firebaseApp.auth().signOut()}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </Signout>
      </div>
    );
  } else {
    return <div> </div>;
  }
};

export default UserDisplay;
