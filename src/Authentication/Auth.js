import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import firebaseApp from "./firebase.js";
import { getUserAPI } from "../requests/get";
import { initialAppLoad } from "../Actions";
import * as GET from "../requests/get";

export const AuthContext = React.createContext();

const AUTH_STATES = {
  LOADING: "LOADING",
  NOT_AUTHENTICATED: "NOT_AUTHENTICATED",
  AUTHENTICATED: "AUTHENTICATED"
};

function AuthProvider({ initialAppLoad, children }) {
  //React hook
  const [authState, setAuthState] = useState({
    state: AUTH_STATES.LOADING,
    user: null
  });

  useEffect(() => {
    async function setUser(user) {
      if (user == null) {
        setAuthState({ state: AUTH_STATES.NOT_AUTHENTICATED, user });
        return;
      }
      const appUser = await getUserAPI(user);
      console.log(appUser);
      const applications = await GET.getAllApplicationsAPI();
      const reviewCount = await GET.getReviewCountAPI(user);

      //Load the initial data into redux
      initialAppLoad(applications, reviewCount);
      setAuthState({
        state: AUTH_STATES.AUTHENTICATED,
        user: { firebaseUser: user, appUser }
      });
    }
    firebaseApp.auth().onAuthStateChanged(setUser);
  }, [initialAppLoad]);

  return (
    <AuthContext.Provider
      value={{
        isLoading: authState.state === AUTH_STATES.LOADING,
        currentUser: authState.user ? authState.user.firebaseUser : null,
        appUser: authState.user ? authState.appUser : null
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const mapDispatchToProps = {
  initialAppLoad
};

const connectedAuth = connect(null, mapDispatchToProps)(AuthProvider);

export { connectedAuth as AuthProvider };
