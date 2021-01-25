import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import firebaseApp from "./firebase.js";
import { getUserAPI, getAllProgramsAPI } from "../requests/get";
import { loadProgram } from "../Actions/index.js";
import {
  updateUserProgramAPI,
  updateUserProgramMembershipAPI
} from "../requests/update";

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

function AuthProvider({ loadProgram, children }) {
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

      // differentiate between the firebase user and the user retrieved from mongo (firebaseUser and appUser)
      const allPrograms = await getAllProgramsAPI();
      const programsSet = new Set();
      allPrograms.forEach((p) => {
        if (!p.deleted) {
          programsSet.add(p._id);
        }
      });
      const validPrograms = appUser.programs
        ? appUser.programs.filter((p) => programsSet.has(p.id))
        : [];

      if (
        appUser.programs &&
        validPrograms.length !== appUser.programs.length
      ) {
        await updateUserProgramMembershipAPI({
          userId: user.uid,
          programs: validPrograms
        });
      }

      let program = appUser.currentProgram;

      //If they don't have any valid programs, set their current one to null
      //This can happen when they lost access to programs they used to have access to
      if (
        validPrograms.length === 0 ||
        !validPrograms.find((p) => p.id === program)
      ) {
        program = null;
        await updateUserProgramAPI(user.uid, { programId: program });
      }

      //Check if the user has a valid currentProgram, if not load the first one in the list
      if (
        !program &&
        !validPrograms.find((p) => p.id === program) &&
        validPrograms.length > 0
      ) {
        program = validPrograms[0].id;
        await updateUserProgramAPI(user.uid, { programId: program });
      }
      loadProgram(program);
      setAuthState({
        state: AUTH_STATES.AUTHENTICATED,
        user: { firebaseUser: user, appUser }
      });
    }

    const unsubscribe = firebaseApp.auth().onAuthStateChanged(setUser);

    return () => {
      unsubscribe();
    };
  }, [loadProgram]);

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
  loadProgram
};

const connectedAuth = connect(null, mapDispatchToProps)(AuthProvider);

export { connectedAuth as AuthProvider };
