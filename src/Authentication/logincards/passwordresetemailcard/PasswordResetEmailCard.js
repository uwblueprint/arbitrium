import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React, { useState } from "react";
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

  .sendResetLinkButton {
    height: 36px;
    margin-left: auto;
  }

  .backToLogin {
    height: 36px;
    letter-spacing: 0.25px;
    text-decoration-line: underline;
    color: #1976d2;
  }

  .action-container {
    display: flex;
  }

  .forgotPasswordTitle {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: initial;
    margin-bottom: 5px;
  }

  .forgotPasswordText {
    font-family: Roboto;
    font-weight: normal;
    font-size: 14px;
    text-align: initial;
    margin-bottom: 25px;
  }
`;

function PasswordResetEmailCard({ onSubmit, backToLogin }) {
  const [values, setValues] = useState({
    email: "",
    errorEmail: false,
    resetCallInProgress: false
  });

  const errorEmailMessage = "Couldn't find your account";

  const sendPasswordReset = async () => {
    try {
      await firebaseApp.auth().sendPasswordResetEmail(values.email);
      onSubmit();
    } catch (e) {
      console.log(e);
    }
    setValues({ ...values, resetCallInProgress: false });
  };

  async function handleForgotPasswordSubmitEvent(event) {
    //execute password reset
    event.preventDefault();
    setValues({ ...values, resetCallInProgress: true });
    sendPasswordReset();
  }

  const validateForm = () => {
    return values.email.length > 0;
  };


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <CommentForm onSubmit={handleForgotPasswordSubmitEvent}>
      <div className="forgotPasswordTitle">Reset your password</div>
      <div className="forgotPasswordText">
        Enter the email address associated with your account.
      </div>
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
      <div className="action-container">
        <Button className="backToLogin" onClick={backToLogin}>
          Back to Login
        </Button>
        <Button
          className="sendResetLinkButton"
          type="submit"
          disabled={!validateForm() || values.resetCallInProgress}
          variant="contained"
          color="primary"
        >
          Send Reset Link
        </Button>
      </div>
    </CommentForm>
  );
}

export default PasswordResetEmailCard;
