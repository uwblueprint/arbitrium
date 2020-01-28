import React, { useContext } from "react";
import { AuthContext } from "../../Authentication/Auth.js";
import firebaseApp from "../../Authentication/firebase";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Signout = styled.div`
  display: inline-block;
  font-size: 16px;
  width: 350px;

  button {
    text-transform: uppercase;
    margin-left: 20px;
    
  }
`;

const UserDisplay = () => {

  const { currentUser } = useContext(AuthContext);

  
  console.log(currentUser)
  if (currentUser != null) {
    return (
      <div>
        <Signout>
          { currentUser.email }
          <button color="primary" style={{height: "32px", borderRadius: "100%"}} onClick={() => firebaseApp.auth().signOut()}>
            <FontAwesomeIcon style={{height:"16px", width:"16px"}} icon={faSignOutAlt} />
          </button>
        </Signout>
      </div>
    )
  }
  else {
    return (
      <div> </div>
    )
  }
};

export default UserDisplay;
