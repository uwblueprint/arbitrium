import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { AuthContext } from "./Auth";
import LoadingOverlay from "../Components/Common/LoadingOverlay";
import { Header } from "../Components/Header/Header";
import { NavigationHeader } from "../Components/Header/NavigationHeader";
import { ProgramContext } from "../Contexts/ProgramContext";
import createContainer from "../Components/Container/Container";
import { connect } from "react-redux";
import routes from "../appRoutes";

//PrivateRoute handles routing based on user permissions
function PrivateRoute({ component: RouteComponent, route, history, ...rest }) {
  const { isLoading, currentUser: user, appUser } = useContext(AuthContext);
  const { isLoading: programDataIsLoading } = useContext(ProgramContext);

  //Check if the user is in the proper roles & logged in
  const roleAccess =
    user != null &&
    (route.groups.length === 0 ||
      (appUser && route.groups.includes(appUser.role)));

  //This affects the loading of the navbar or not
  const adminRoute = route.path.includes("admin");
  const Container = createContainer(adminRoute);

  //Filter the list of appRoutes for routes that should NOT be displayed in the header
  const headerRoutes = routes.filter((route) => {
    if (
      route.header &&
      user != null &&
      (route.groups.length === 0 ||
        (appUser && route.groups.includes(appUser.role)))
    ) {
      return true;
    }
    return false;
  });

  //TODO: Check if the URL contains a programID and redirect/update the user accordingly
  //TODO: Check if the user has access to currentProgram (Admin removes their permission).
  //TODO: Check if the user has access to an organization (Are they admin?)

  //TODO: Redirect to pages based on error instead of just "/login"
  return isLoading || programDataIsLoading ? (
    <LoadingOverlay
      show
      spinnerProps={{
        radius: 220,
        stroke: 2
      }}
    />
  ) : roleAccess ? (
    <>
      <Container>
        <Header
          history={history}
          admin={adminRoute}
          curRoute={route}
          routes={headerRoutes}
        />
        {!adminRoute ? (
          <NavigationHeader
            history={history}
            admin={adminRoute}
            curRoute={route}
          />
        ) : null}
        {RouteComponent ? (
          <Route
            {...rest}
            render={(routeProps) => (
              <RouteComponent {...routeProps} user={appUser} />
            )}
          ></Route>
        ) : null}
      </Container>
    </>
  ) : (
    <Redirect to={user ? "/" : "/login"} />
  );
}

const mapStateToProps = (state) => ({
  program: state.program
});

export default connect(mapStateToProps)(PrivateRoute);
