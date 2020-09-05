import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import firebaseApp from "./firebase.js";
import { getUserAPI } from "../requests/get";
import { initialAppLoad } from "../Actions";
import * as GET from "../requests/get";

export const AuthContext = React.createContext();

const isTokenExpired = (user) => {
  const MILLISECONDS_PER_DAY = 24 * 3600 * 1000;
  const NOW = new Date().getTime();
  // Firebase tokens don't expire, they automatically refresh every hour
  // we impose our own "expiration" time of 24 hours
  return Number(user.toJSON().lastLoginAt) < NOW - MILLISECONDS_PER_DAY;
};

const AUTH_STATES = {
  LOADING: "LOADING",
  NOT_AUTHENTICATED: "NOT_AUTHENTICATED",
  AUTHENTICATED: "AUTHENTICATED"
};

function AuthProvider({ initialAppLoad, children }) {
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

      if (isTokenExpired(user)) {
        firebaseApp.auth().signOut();
        setAuthState({ state: AUTH_STATES.NOT_AUTHENTICATED, user: null });
        return;
      }

      const appUser = await getUserAPI(user);
      //If the user doesn't have access to this program, sign them out
      if (!appUser) {
        alert(
          "You are not a registered user, please contact support for assistance."
        );
        setAuthState({
          state: AUTH_STATES.NOT_AUTHENTICATED,
          user: null
        });
        return;
      }
      const hasProgramAcess =
        Array.isArray(appUser.programs) &&
        appUser.programs.some(
          (program) => program.name === process.env.REACT_APP_PROGRAM
        );

      if (!hasProgramAcess) {
        firebaseApp.auth().signOut();
        alert(
          "You do not have access to this program. Please verify you are using the correct URL"
        );
        setAuthState({
          state: AUTH_STATES.NOT_AUTHENTICATED,
          user: null
        });
        return;
      }

      const applications = await GET.getAllApplicationsAPI();
      const reviewCount = await GET.getReviewCountAPI(user.uid);
      //Load the initial data into redux
      initialAppLoad(applications, reviewCount);
      // differentiate between the firebase user and the user retrieved from mongo (firebaseUser and appUser)
      setAuthState({
        state: AUTH_STATES.AUTHENTICATED,
        user: { firebaseUser: user, appUser }
      });
    }

    const unsubscribe = firebaseApp.auth().onAuthStateChanged(setUser);

    return () => {
      unsubscribe();
    };
  }, [initialAppLoad]);

  return (
    <AuthContext.Provider
      value={{
        isLoading: authState.state === AUTH_STATES.LOADING,
        currentUser: authState.user ? authState.user.firebaseUser : null,
        appUser: authState.user ? authState.user.appUser : null
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
