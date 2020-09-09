import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { AuthContext } from "./Auth";
import Navigation from "../Components/Navigation/Navigation";
import LoadingOverlay from "../Components/Common/LoadingOverlay";
import { Header } from "../Components/Header/Header";
import createContainer from "../Components/Container/Container";
import usePromise from "../Hooks/usePromise";
import * as GET from "../requests/get";

function PrivateRoute({ component: RouteComponent, route, ...rest }) {
  const { isLoading, currentUser: user, appUser } = useContext(AuthContext);
  const [loadPrograms] = usePromise(GET.getAllProgramsAPI, {}, []);


  //The user only has access if they are logged in and are in the proper user group
  //This is mainly for admin access
  const roleAccess =
    user != null &&
    (route.groups.length === 0 ||
      (appUser && route.groups.includes(appUser.role)));


  //This affects the loading of the navbar or not
  const adminRoute = route.path.includes("admin")
  let Container = createContainer(adminRoute)


  //Finally, if the route is a program route then the user must have access to the program
  //Check if the route contains a program id
  let program = window.location.pathname.split("/")[1];
  let programExists = loadPrograms.value.find(p => p._id == program)


  //If a program doesn't exist then the user has access to the url
  let programAccess = !programExists || (appUser && appUser.programs.find(p => p.id == program))


  //Generate an array of programs that are valid and the user has access to
  //This is sent to the header for the drop down menu
  let headerPrograms = []
  if (appUser){
    headerPrograms = loadPrograms.value.filter((program) => {
      let valid = false
      appUser.programs.map((userProgram) => {
        if (userProgram.id == program._id) {
          valid = true
        }
      });
      return valid
    })
  }



  //Access to programs and organizations should also be decided here
  return isLoading ? (
    <LoadingOverlay
      show
      spinnerProps={{
        radius: 220,
        stroke: 2
      }}
    />
  ) : roleAccess && programAccess ? (
    <>
      <Container>
      <Header programs={headerPrograms} />
      {!route.path.includes("admin") ? (
          <Navigation />
      )  : null}
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

export default PrivateRoute;
