import React, { useEffect, useState } from "react";
import firebaseApp from "./firebase.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children, onAuthStateChange }) => {
  const [currentUser, setCurrentUser] = useState(false);

  //React hook
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  useEffect(() => {
    if (currentUser == null) return;
    onAuthStateChange(currentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
