import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CardActions from "@material-ui/core/CardActions";
import React, { useCallback, useState } from "react";
import firebaseApp from "../../firebase.js";

import styled from "styled-components";

const CommentForm = styled.form`
  .textFields {
    margin-bottom: 20px;
    width: 100%;
  }
  button {
    display: flex;
    justify-content: end;
  }
  a {
    font-size: 0.9rem;
  }
  .loginButton {
    position: absolute;
    width: 80px;
    height: 36px;
    left: 244px;
    top: 290px;
    margin-left: 10px;
  }
  .forgotPassword {
  position: absolute;
  width: 160px;
  height: 36px;
  left: 8px;
  top: 290px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  letter-spacing: 0.25px;
  text-decoration-line: underline;

  color: #1976D2;
}
`;

const LoginFieldsCard = (props) => {

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
          props.history.push("/applications");
          } catch (error) {
              alert("Wrong user name or password!")
              console.log(error)
          }
      },
    [props.history]
    );

    const validateForm = () => {
        return values.email.length > 0 && values.password.length > 0;
    }

    const handleChange = prop => event => {
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
        <CardActions>
          <Button className="forgotPassword" onClick={()=>props.setLoginFlowState({cardType: 'passwordResetEmail'})}>Forgot Password?</Button>
          <Button
            className="loginButton"
            type="submit"
            disabled={true || !validateForm()}
            variant="contained"
            color="primary"
          >
            Log in
          </Button>
        </CardActions>
      </CommentForm>
    )
}

export default LoginFieldsCard;
