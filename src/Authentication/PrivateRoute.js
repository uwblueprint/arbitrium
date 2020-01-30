import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import Navigation from "../Components/Navigation/Navigation";
import Header2 from "../Components/Header/Header2";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  return (
    //note use of triple equality to faciliate type checking (refer to auth.js default React hook value)
    currentUser!==false ? (currentUser!==null ? (
        <>
        <Navigation/>
        <Header2/>
        <Route
          {...rest}
          render={routeProps =>
              <RouteComponent
              user = {currentUser}
              {...routeProps} />
          }
          user={currentUser}
        />
        </>
    )
    : (
      <>
      <h1> Please Login! </h1>
      <Redirect to={"/login"} />
      </>
    )) : null
  );
};


export default PrivateRoute
