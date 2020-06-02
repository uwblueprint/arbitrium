import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
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
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-box-shadow: -1px 1px 5px 1px #ccc;
  -moz-box-shadow: -1px 1px 5px 1px #ccc;
  box-shadow: -1px 1px 5px 1px #ccc;

  .MuiCardHeader-title {
    font-size: 2rem;
  }
  .MuiCardHeader-root {
    padding-bottom: 5px;
  }
  .MuiCardHeader-subheader {
    color: black;
  }
`;

export default function Login({ login, logout, isAuthenticated }) {
  const errorEmailMessage = "Couldn't find your account";
  const errorPasswordMessage =
    "Wrong password. Try again or click Forgot password";

  const [values, setValues] = useState({
    email: "",
    password: "",
    errorEmail: false,
    errorPassword: false
  });

  function validateForm() {
    return values.email.length > 0 && values.password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    login();
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  if (isAuthenticated) {
    return <Redirect to="/applications" />;
  } else {
    return (
      <StyledCard>
        <CardHeader title="arbitrium" subheader="Sign-In" />
        <CardContent>
          <CommentForm onSubmit={handleSubmit}>
            <FormControl variant="outlined" className="textFields">
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                required
                autoFocus
                error={values.errorEmail}
                id="email"
                type={"text"}
                value={values.email}
                onChange={handleChange("email")}
              />
              <FormHelperText error={values.errorEmail}>
                {values.errorEmail ? errorEmailMessage : ""}
              </FormHelperText>
            </FormControl>
            <FormControl variant="outlined" className="textFields">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                required
                error={values.errorPassword}
                id="password"
                type={"password"}
                value={values.password}
                onChange={handleChange("password")}
              />
              <FormHelperText error={values.errorPassword}>
                {values.errorPassword ? errorPasswordMessage : ""}
              </FormHelperText>
            </FormControl>
            <CardActions>
              <Link to="/">Forgot Password?</Link>
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
  }
}
