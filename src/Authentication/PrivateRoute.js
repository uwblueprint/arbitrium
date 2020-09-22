import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { AuthContext } from "./Auth";
import Navigation from "../Components/Navigation/Navigation";
import LoadingOverlay from "../Components/Common/LoadingOverlay";
import { Header } from "../Components/Header/Header";
import { ProgramContext } from "../Contexts/ProgramContext";
import createContainer from "../Components/Container/Container";
import { connect } from "react-redux";

function PrivateRoute({ component: RouteComponent, route, history, ...rest }) {
  const { isLoading, currentUser: user, appUser } = useContext(AuthContext);
  const { isLoading: programDataIsLoading } = useContext(ProgramContext);

  //The user only has access if they are logged in and are in the proper user group
  //This is mainly for admin access
  const roleAccess =
    user != null &&
    (route.groups.length === 0 ||
      (appUser && route.groups.includes(appUser.role)));

  //This affects the loading of the navbar or not
  const adminRoute = route.path.includes("admin");
  const Container = createContainer(adminRoute);

  //Access to programs and organizations should also be decided here
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
        <Header history={history} />
        {!route.path.includes("admin") ? <Navigation /> : null}
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
