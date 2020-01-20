import React from "react";
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

const AddComment = ({ placeholder, primaryLabel, secondaryLabel }) => {
  return (
    <CommentForm>
      <input type="text" name="comment" placeholder={placeholder} />
      <div className="buttonGroup">
        <Button className="addcomment-cancel" color="primary">
          {secondaryLabel}
        </Button>
        <Button
          type="submit"
          className="addcomment-submit"
          variant="contained"
          color="primary"
        >
          {primaryLabel}
        </Button>
      </div>
    </CommentForm>
  );
};

export default AddComment;
