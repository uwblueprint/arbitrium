import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { AuthContext } from "./Auth";
import Navigation from "../Components/Navigation/Navigation";
import LoadingOverlay from "../Components/Common/LoadingOverlay";
import { Header } from "../Components/Header/Header";

function PrivateRoute({ component: RouteComponent, route, ...rest }) {
  const { isLoading, currentUser: user, appUser } = useContext(AuthContext);

  // the user only has access if they are logged in and are in the proper user group
  const access =
    user != null &&
    (route.groups.length === 0 ||
      (appUser && route.groups.includes(appUser.role)));

  console.log(rest)
  console.log(appUser)
  return isLoading ? (
    <LoadingOverlay
      show
      spinnerProps={{
        radius: 220,
        stroke: 2
      }}
    />
  ) : access ? (
    <>
      <Header/>
      <Navigation />
      {RouteComponent ? (
        <Route
          {...rest}
          render={(routeProps) => <RouteComponent {...routeProps} user={appUser} />}
        >
        </Route>
      ) : null}
    </>
  ) : (
    <Redirect to={user ? "/" : "/login"} />
  );
}

export default PrivateRoute;
