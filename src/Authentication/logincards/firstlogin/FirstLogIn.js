import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React, { useCallback, useState } from "react";
// import firebaseApp from "../../firebase.js";
import { defaultRouteAfterLogin } from "../../PrivateRoute";
import CircularProgress from "@material-ui/core/CircularProgress";

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

const FirstLogIn = ({ history }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameUpdate = useCallback(
    async (event) => {
      setLoading(true);
      event.preventDefault();

      // TODO: update user name in database
      // const { email, password } = event.target.elements;
      // try {
      //   await firebaseApp
      //     .auth()
      //     .signInWithEmailAndPassword(email.value, password.value);
      // } catch (error) {
      //   alert("Wrong user name or password!");
      //   setLoading(false);
      //   console.error(error); //We should really get a logging system going
      // }
      history.push(defaultRouteAfterLogin);
    },
    [history]
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
