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
import * as GET from "../requests/get";
import usePromise from "../Hooks/usePromise";

function PrivateRoute({ component: RouteComponent, route, history, ...rest }) {
  const { isLoading, currentUser: user, appUser } = useContext(AuthContext);
  const { isLoading: programDataIsLoading } = useContext(ProgramContext);
  const userId = appUser && appUser.userId;

  console.log(rest);

  //TODO: Put this in a useEffect
  const [userPrograms] = usePromise(GET.getAllUserPrograms, { userId });

  console.log(userPrograms);
  console.log(appUser);

  //The user only has access if they are logged in and are in the proper user group
  //This is mainly for admin access
  const roleAccess =
    user != null &&
    !userPrograms.isPending &&
    userPrograms.value.filter(
      (program) => program.id == (appUser && appUser.currentProgram)
    );

  const roleAccess2 =
    roleAccess.role === route.programGroup || route.programGroup == "";
  //Filter the list of appRoutes for routes that should NOT be displayed in the header
  //User must have roleAccess
  const headerRoutes = routes.filter((route) => route.header && roleAccess2);

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
  ) : roleAccess2 ? (
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
