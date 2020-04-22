import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import Navigation from "../Components/Navigation/Navigation";
import LoadingOverlay from "../Components/Common/LoadingOverlay";
import firebaseApp from "./firebase";

function PrivateRoute({ component: RouteComponent, route, ...rest }) {
  const { isLoading, currentUser: user, appUser } = useContext(AuthContext);

  //If the user doesn't have access to this program, sign them out
  let programAccess = false;
  if (appUser) {
    appUser.programs.forEach((program) => {
      if (program.name === process.env.REACT_APP_PROGRAM) {
        programAccess = true;
      }
    });

    if (!programAccess) {
      firebaseApp.auth().signOut();
      alert(
        "You do not have access to this program. Please verify you are using the correct URL"
      );
    }
  }

  const access =
    route.groups.length === 0 ||
    (user && user.appUser && route.groups.includes(appUser.role));

  return !isLoading ? (
    user ? (
      <>
        <Navigation />
        {access ? (
          <Route
            {...rest}
            render={(routeProps) => (
              <RouteComponent {...routeProps} user={user} />
            )}
          />
        ) : (
          <Redirect to="/" />
        )}
      </>
    ) : (
      <>
        <h1> Please Login! </h1>
        <Redirect to="/login" />
      </>
    )
  ) : (
    <div>
      <LoadingOverlay
        spinnerProps={{ radius: 220, color: "#333", stroke: 2, visible: true }}
      />
    </div>
  );
}

export default PrivateRoute;
