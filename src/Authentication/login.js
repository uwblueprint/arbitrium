import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import firebaseApp from "./firebase.js";
import { AuthContext } from "./Auth.js";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CardActions from "@material-ui/core/CardActions";

const CommentForm = styled.form`
  .textFields {
    margin-bottom: 20px;
    width: 100%;
  }
  button {
    margin-left: auto;
  }
  a {
    font-size: 0.9rem;
  }
`;

const StyledCard = styled(Card)`
  width: 350px;

  //Center
  margin: 2 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-box-shadow: -1px 1px 5px 1px #ccc;
  -moz-box-shadow: -1px 1px 5px 1px #ccc;
  box-shadow: -1px 1px 5px 1px #ccc;

  .MuiCardHeader-title {
    font-size: 3rem;
  }
  .MuiCardHeader-root {
    padding-bottom: 5px;
  }
  .MuiCardHeader-subheader {
    color: black;
  }
  .MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(14px, -14px) scale(0.75);
  }
`;

const Login = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    errorEmail: false,
    errorPassword: false
  });

  const errorEmailMessage = "Couldn't find your account";
  const errorPasswordMessage =
    "Wrong password. Try again or click Forgot password";

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/applications");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

/*
  if (currentUser) {
    console.log(history.goBack());
    return <Redirect to={'/applications'} />;
  }
  */

  function validateForm() {
    return values.email.length > 0 && values.password.length > 0;
  }

  function handleForgotPassword() {
    alert("Please contact Rose if you need help with logging in");
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  if (currentUser!==null && currentUser!==false) {
      return <Redirect to={'/applications'} />;
  } else if (currentUser!==false){
  return (
    <StyledCard>
      <CardHeader title="arbitrium" subheader="Sign In" />
      <CardContent>
        <CommentForm onSubmit={handleLogin}>
          <FormControl variant="outlined" className="textFields">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              required
              autoFocus
              id="email"
              type={"text"}
              value={values.email}
              onChange={handleChange("email")}
            />
            <FormHelperText>
              {values.errorEmail ? errorEmailMessage : ""}
            </FormHelperText>
          </FormControl>
          <FormControl variant="outlined" className="textFields">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              required
              id="password"
              type={"password"}
              value={values.password}
              onChange={handleChange("password")}
            />
            <FormHelperText>
              {values.errorPassword ? errorPasswordMessage : ""}
            </FormHelperText>
          </FormControl>
          <CardActions>
            <Button onClick={handleForgotPassword}>Forgot Password?</Button>
            <Button
              type="submit"
              disabled={!validateForm()}
              variant="contained"
              color="primary"
            >
              Log in
            </Button>
          </CardActions>
        </CommentForm>
      </CardContent>
    </StyledCard>
  );
  } else return null;
};

export default withRouter(Login);
