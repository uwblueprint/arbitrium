import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import Navigation from "../Components/Navigation/Navigation";
import Header2 from "../Components/Header/Header2";
import Spinner from 'react-spinner-material';
import firebaseApp from "./firebase";
import { getUserAPI } from "../requests/get";

function PrivateRoute({ component: RouteComponent, route: route, ...rest }) {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser ] = useState(null);

  //React hook. Will fetch the user docment from mongo when currentUser context changes
  useEffect(()=>{
    if (!currentUser) return

    //Grabs the current users docment from mongo
    getUserAPI(currentUser).then((user) => {
      setUser(user[0]);
    })
  }, [currentUser]);


  //If the user doesn't have access to this program, sign them out
  let programAccess = false;
  if (user) {
    user.programs.forEach((program) => {
      if (program.name == process.env.REACT_APP_PROGRAM) {
        programAccess = true;
      }
    });

    if (!programAccess && currentUser) {
      firebaseApp.auth().signOut()
        alert("You do not have access to this program. Please verify you are using the correct URL")
    }
  }


  let access = (route.groups.length == 0) ||
    (user && route.groups.includes(user.role))


  return (currentUser !==false && access) ?
          ((currentUser!==null && access) ? (
            <>
              <Navigation />
              {/*<Header2 />*/}
              <Route
                {...rest}
                render={routeProps => (
                  <RouteComponent {...routeProps} user={currentUser} />
                )}
              />
            </>
          ) : (
            <>
              <h1> Please Login! </h1>
              <Redirect to="/login" />
            </>
          )) : (
            <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
          )
};

export default PrivateRoute;
