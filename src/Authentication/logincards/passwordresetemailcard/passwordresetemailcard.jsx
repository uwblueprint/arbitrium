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
  .sendResetLinkButton {
    position: absolute;
    width: 153px;
    height: 36px;
    right: 0px;
    top: 270px;
    margin-left: 10px;
  }
  .backToLogin {
  position: absolute;
  width: 121px;
  height: 36px;
  left: 8px;
  top: 270px;

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

.forgotPasswordTitle{
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: initial;
  margin-bottom: 5px;
}

.forgotPasswordText{
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  text-align: initial;
  margin-bottom: 25px;
}
`;

const PasswordResetEmailCard = (props) => {

    const [values, setValues] = useState({
        email: "",
        errorEmail: false,
        resetCallInProgress: false,
    });

    const errorEmailMessage = "Couldn't find your account";

    const handlePasswordResetSubmit = ()=> {
      const auth = firebaseApp.auth();
      auth.sendPasswordResetEmail(values.email).then(function() {
        props.setLoginFlowState({cardType: 'passwordResetResponse'})
        setValues({...values, resetCallInProgress: false})
      }).catch(function(error) {
        console.log(error)
        setValues({...values, resetCallInProgress: false})
      });
    }

    const handleForgotPasswordSubmitEvent = (event) => {
      //execute password reset 
      event.preventDefault()
      setValues({...values, resetCallInProgress: true})
      //execute async request 
      handlePasswordResetSubmit()
    }

    const validateForm = () => {
        return values.email.length > 0;
    }
    
    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <CommentForm onSubmit={handleForgotPasswordSubmitEvent}>
          <div className="forgotPasswordTitle">
            Forgot your password?
          </div>
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
        <CardActions>
          <Button className="backToLogin" onClick={()=>props.setLoginFlowState({cardType: 'loginFields'})}>Back to Login</Button>
          <Button
            className="sendResetLinkButton"
            type="submit"
            disabled={!validateForm() || values.resetCallInProgress}
            variant="contained"
            color="primary"
          >
            Send Reset Link
          </Button>
        </CardActions>
      </CommentForm>
    )
}

export default PasswordResetEmailCard;