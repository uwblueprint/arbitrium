import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React, { useCallback, useState } from "react";
import { defaultRouteAfterLogin } from "../../PrivateRoute";
import CircularProgress from "@material-ui/core/CircularProgress";
import { updateUserNameAPI } from "../../../requests/update";
import { getUserAPI } from "../../../requests/get";

import styled from "styled-components";

const CommentForm = styled.form`
  text-align: left;
  .welcome-text {
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    letter-spacing: 0px;
    text-align: left;
    margin-bottom: 40px;
    margin-top: 0px;
  }
  .text-fields {
    margin-bottom: 10px;
    width: 100%;
  }
  a {
    font-size: 0.9rem;
  }
  .actions-container {
    display: flex;
  }
  .next-button {
    margin-left: auto;
    display: inline-block;
    width: 120px;
    height: 36px;
    text-transform: none;
  }
`;

const FirstLogIn = ({ history, userCredentials }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameUpdate = useCallback(
    async (event) => {
      setLoading(true);
      event.preventDefault();

      // update user name and update route
      if (userCredentials) {
        const appUser = await getUserAPI(userCredentials.user);
        await updateUserNameAPI(appUser.userId, { name: name });
        history.push(defaultRouteAfterLogin);
      }
    },
    [history, name, userCredentials]
  );

  const validateForm = () => {
    return name.length > 0;
  };

  const handleChange = () => (event) => {
    setName(event.target.value);
  };

  return (
    <CommentForm onSubmit={handleNameUpdate}>
      <h2 className="welcome-text">
        Welcome to Arbitrium!
        <br />
        What&apos;s your name?
      </h2>
      <FormControl variant="outlined" className="text-fields">
        <InputLabel htmlFor="name">Full name</InputLabel>
        <OutlinedInput
          required
          autoFocus
          id="name"
          type={"text"}
          value={name}
          onChange={handleChange()}
        />
      </FormControl>
      <div className="actions-container">
        <Button
          style={{ display: "flex" }}
          className="next-button"
          type="submit"
          disabled={!validateForm() || loading}
          variant="contained"
          color="primary"
        >
          Next
          {loading ? (
            <CircularProgress style={{ marginLeft: 18 }} size={25} />
          ) : null}
        </Button>
      </div>
    </CommentForm>
  );
};

export default FirstLogIn;
