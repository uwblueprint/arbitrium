import React, { useState }  from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const CommentForm = styled.form`
  margin-top: 20px;
  position: relative;
  display: block;
  input[name="comment"] {
    box-sizing: border-box;
    padding: 18px 16px;
    border: 1px solid #cccccc;
    outline: 0;
    display: block;
    font-family: inherit;
    width: 100%;
  }
  .buttonGroup {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
  button {
    margin-left: 18px;
    border-radius: 0px;
  }
`;

function AddComment({ placeholder, primaryLabel, secondaryLabel, update, id }) {

  const [text, setText] = useState("");

  return (
    <CommentForm>
      <input
        type="text"
        name="comment"
        value={text}
        placeholder={placeholder}
        onChange={e => setText(e.target.value)}/>
      <div className="buttonGroup">
        <Button className="addcomment-cancel" color="primary" onClick={() => {setText("")}}>
          {secondaryLabel}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            update("comment", {text, id})
            setText("")
          }}
        >
          {primaryLabel}
        </Button>
      </div>
    </CommentForm>
  );
};

export default AddComment;
