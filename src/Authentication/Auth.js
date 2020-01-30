import React, { useEffect, useState } from "react";
import firebaseApp from "./firebase.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  //leverage falsy value to ensure asynchronicity of auth status on page reload. 
  const [currentUser, setCurrentUser] = useState(false);

  //React hook
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(setCurrentUser);
  }, []);

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
