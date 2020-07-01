import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React, { useCallback, useState } from "react";
import firebaseApp from "../../firebase.js";

import styled from "styled-components";

const CommentForm = styled.form`
  text-align: left;
  .textFields {
    margin-bottom: 10px;
    width: 100%;
  }
  a {
    font-size: 0.9rem;
  }
  .actions-container {
    display: flex;
  }

  .loginButton {
    margin-left: auto;
    display: inline-block;
    width: 120px;
    height: 36px;
  }
  .forgotPassword {
    display: inline-block;
    width: 160px;
    height: 36px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */
    letter-spacing: 0.25px;
    text-decoration-line: underline;
    color: #1976d2;
  }
`;

const LoginFieldsCard = ({ history, setLoginFlowState }) => {
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
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/applications");
      } catch (error) {
        alert("Wrong user name or password!");
        console.log(error);
      }
    },
    [history]
  );

  const validateForm = () => {
    return values.email.length > 0 && values.password.length > 0;
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
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
        <FormHelperText error={values.errorEmail}>
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
        <FormHelperText error={values.errorPassword}>
          {values.errorPassword ? errorPasswordMessage : ""}
        </FormHelperText>
      </FormControl>
      <div className="actions-container">
        <Button
          className="forgotPassword"
          onClick={() => setLoginFlowState("passwordResetEmail")}
        >
          Forgot Password?
        </Button>
        <Button
          className="loginButton"
          type="submit"
          disabled={!validateForm()}
          variant="contained"
          color="primary"
        >
          Log in
        </Button>
      </div>
    </CommentForm>
  );
};

export default LoginFieldsCard;
