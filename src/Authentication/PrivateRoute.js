import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import Navigation from "../Components/Navigation/Navigation";
import LoadingOverlay from "../Components/Common/LoadingOverlay";

function PrivateRoute({ component: RouteComponent, route, ...rest }) {
  const { isLoading, currentUser: user, appUser } = useContext(AuthContext);

  // the user only has access if they are logged in and are in the proper user group
  const access =
    user &&
    (route.groups.length === 0 ||
      (user.appUser && route.groups.includes(appUser.role)));

  return (
    <>
      <Navigation />
      {isLoading ? (
        <LoadingOverlay
          spinnerProps={{
            radius: 220,
            color: "#333",
            stroke: 2,
            visible: true
          }}
        />
      ) : access ? (
        <Route
          {...rest}
          render={(routeProps) => (
            <RouteComponent {...routeProps} user={user} />
          )}
        />
      ) : (
        <Redirect to={user ? "/" : "/login"} />
      )}
    </>
  );
}

export default PrivateRoute;
