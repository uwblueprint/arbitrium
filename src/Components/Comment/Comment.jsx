import React from "react";
import styled from "styled-components";

const CommentBlock = styled.div`
  display: grid;
  grid-template-columns: 32px auto;
  grid-template-rows: 20px auto;
  grid-column-gap: 16px;
  grid-row-gap: 2px;
  .image {
    grid-column: 1 / span 1;
    grid-row: 1 / span 2;
  }
  .circle {
    border-radius: 50%;
    border: 1px solid #cccccc;
    height: 32px;
    width: 32px;
    text-align: center;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .comment-info {
    display: block;
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
    span {
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-size: 12px;
      font-weight: 500;
    }
  }
  .comment-author {
    color: #000000;
    margin-right: 8px;
  }
  .comment-date {
    color: #cccccc;
  }
  .comment-text {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
    margin: 0;
  }
`;

const Comment = ({ comment: { author, relativeTime, text, image } }) => (
  <CommentBlock>
    {image ? (
      <img src={image} alt={author} className="displayPicture image" />
    ) : (
      <div className="circle image">
        {author
          .split(" ")
          .map(name => name[0])
          .join("")}
      </div>
    )}
    <div className="comment-info">
      <span className="comment-author">{author}</span>
      <span className="comment-date">{relativeTime}</span>
    </div>
    <p className="comment-text">{text}</p>
  </CommentBlock>
);

export default Comment;
