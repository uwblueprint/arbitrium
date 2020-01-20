import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import Navigation from "../Components/Navigation/Navigation";
import Header2 from "../Components/Header/Header2";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  return (

    !!currentUser ? (
        <>
        <Navigation/>
        <Header2/>
        <Route
          {...rest}
          render={routeProps =>
              <RouteComponent {...routeProps} />
          }
        />
        </>
    )
    : (
      <>
      <h1> Please Login! </h1>
      <Redirect to={"/login"} />
      </>
    )


  );
};


export default PrivateRoute
