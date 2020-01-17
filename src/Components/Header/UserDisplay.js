import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Authentication/Auth.js";
import firebaseApp from "../../Authentication/firebase";


const UserDisplay = () => {

  const { currentUser } = useContext(AuthContext);

  console.log(currentUser)
  if (currentUser != null) {
    return (
      <div> { currentUser.email }
        <button onClick={() => firebaseApp.auth().signOut()}>Sign out</button>
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
