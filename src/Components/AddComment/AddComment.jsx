import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { INSERT_COMMENT } from "../Application/reviewReducer";

const CommentForm = styled.form`
  margin-top: 20px;
  position: relative;
  display: block;
  textarea[name="comment"] {
    box-sizing: border-box;
    padding: 18px 16px;
    border: 1px solid #cccccc;
    outline: 0;
    display: block;
    font-family: inherit;
    width: 100%;
    fontsize: 14px;
  }
  .buttonGroup {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
  button {
    margin-left: 18px;
    border-radius: 0px;
    text-transform: none;
  }
`;

function AddComment({ placeholder, primaryLabel, secondaryLabel, update, id }) {
  const [text, setText] = useState("");

  function submitComment() {
    update({
      type: INSERT_COMMENT,
      comment: text,
      id
    });
    setText("");
  }

  return (
    <CommentForm>
      <textarea
        type="text"
        name="comment"
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="buttonGroup">
        <Button
          className="addcomment-cancel"
          color="primary"
          onClick={() => {
            setText("");
          }}
        >
          {secondaryLabel}
        </Button>
        <Button variant="contained" color="primary" onClick={submitComment}>
          {primaryLabel}
        </Button>
      </div>
    </CommentForm>
  );
}

export default AddComment;
