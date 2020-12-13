import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router";
import { AuthContext } from "./Auth";
import { Header } from "../Components/Header/Header";
import { NavigationHeader } from "../Components/Header/NavigationHeader";
import { ProgramContext } from "../Contexts/ProgramContext";
import createContainer from "../Components/Container/Container";
import { connect } from "react-redux";
import routes from "../appRoutes";
import * as GET from "../requests/get";
import usePromise from "../Hooks/usePromise";

//This route must only require the user to be logged in. (no groups needed)
export const defaultRouteAfterLogin = "/home";

function doesRoleProvideAccess(routeRole, userRole) {
  if (routeRole === "ADMIN") {
    return userRole === "ADMIN" || userRole === "ADMIN_REVIEWER";
  } else if (routeRole === "REVIEWER") {
    return (
      userRole === "REVIEWER" ||
      userRole === "GUEST" ||
      userRole === "ADMIN" ||
      userRole === "ADMIN_REVIEWER"
    );
  } else {
    return userRole === "";
  }
}

function PrivateRoute({
  component: RouteComponent,
  route,
  history,
  program,
  ...rest
}) {
  const { isLoading, currentUser: user, appUser } = useContext(AuthContext);
  const { programDataIsLoading } = useContext(ProgramContext);
  const userId = appUser && appUser.userId;

  const [userPrograms] = usePromise(GET.getAllUserPrograms, { userId });
  const [hasAccess, setAccess] = useState(null);
  const [headerRoutes, setHeaderRoutes] = useState([]);
  useEffect(() => {
    //User is not logged in
    if (!isLoading && !appUser) {
      setAccess(false);
      return;
    }

    //Waiting for data to load before proceeding
    if (
      isLoading ||
      userPrograms.isPending ||
      userPrograms.value == null ||
      programDataIsLoading
    ) {
      return;
    }

    //If we reach here then there exists exactly one element in userPrograms which is the users current program
    let userCurrentProgram = userPrograms.value.filter(
      (userProgram) => userProgram.id === program
    );

    if (userCurrentProgram[0]) {
      userCurrentProgram = userCurrentProgram[0];

      //Check if the users role lets them access the route
      const hasRoleAccess =
        doesRoleProvideAccess(route.programGroup, userCurrentProgram.role) ||
        route.programGroup === "";

      //Filter the list of appRoutes for routes that should NOT be displayed in the header
      //Allowed routes have "header==true" and the users role lets them access the route
      const headerRoutes = routes.filter(
        (route) =>
          route.header &&
          doesRoleProvideAccess(route.programGroup, userCurrentProgram.role)
      );
      setAccess(hasRoleAccess);
      setHeaderRoutes(headerRoutes);
    }
  }, [
    user,
    userPrograms,
    appUser,
    isLoading,
    programDataIsLoading,
    route,
    program
  ]);

  //This affects the loading of the navbar or not
  const adminRoute = route.path.includes("admin");
  const programRoute = route.path.includes("program");
  const Container = createContainer(adminRoute);

  //If the user or program hasn't loaded, display the spinner
  //Else if the user has access let them access the page
  //Else redirect to login
  return isLoading ||
    programDataIsLoading ||
    hasAccess == null ? null : appUser && hasAccess ? (
    <>
      <Container>
        <Header
          history={history}
          admin={adminRoute}
          curRoute={route}
          routes={headerRoutes}
        />
        {!adminRoute && !programRoute ? (
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
