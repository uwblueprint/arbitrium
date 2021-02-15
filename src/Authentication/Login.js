import React, { useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./Auth.js";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import styled from "styled-components";
import LoginFieldsCard from "./logincards/loginfieldscard/LoginFieldsCard";
import FirstLogin from "./logincards/firstlogin/FirstLogIn";
import PasswordResetEmailCard from "./logincards/passwordresetemailcard/PasswordResetEmailCard";
import PasswordResetResponseCard from "./logincards/passwordresetresponsecard/PasswordResetResponseCard";
import { defaultRouteAfterLogin } from "./PrivateRoute";

const StyledCard = styled(Card)`
  width: 350px;
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
    padding-bottom: 50px;
  }
  .MuiCardHeader-subheader {
    color: black;
  }
  .MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(14px, -14px) scale(0.75);
  }
`;

function Login({ history, initialCardType }) {
  const { currentUser } = useContext(AuthContext);
  const [loginFlowState, setLoginFlowState] = useState(
    initialCardType ? initialCardType : "loginFields"
  );

  function onResetPassword() {
    setLoginFlowState("passwordResetResponse");
  }

  const backToLogin = () => {
    setLoginFlowState("loginFields");
  };

  if (currentUser != null && currentUser.displayName) {
    return <Redirect to={defaultRouteAfterLogin} />;
  }

  const getCardContent = () => {
    switch (loginFlowState) {
      case "passwordResetEmail":
        return (
          <PasswordResetEmailCard
            onSubmit={onResetPassword}
            backToLogin={backToLogin}
          />
        );
      case "passwordResetResponse":
        return (
          <PasswordResetResponseCard setLoginFlowState={setLoginFlowState} />
        );
      case "firstLogin":
        return <FirstLogin history={history} />;
      default:
        return (
          <LoginFieldsCard
            history={history}
            setLoginFlowState={setLoginFlowState}
          />
        );
    }
  };

  const content = getCardContent();

  return (
    <div>
      <StyledCard>
        <CardHeader
          title="arbitrium"
          subheader={loginFlowState === "loginFields" ? "Sign-In" : null}
        />
        <CardContent>{content}</CardContent>
      </StyledCard>
    </div>
  );
}

export default withRouter(Login);
