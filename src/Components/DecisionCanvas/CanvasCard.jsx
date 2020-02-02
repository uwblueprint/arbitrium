import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import CommentIcon from "@material-ui/icons/ChatOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Link from "@material-ui/core/Link";
import SectionComments from "./SectionComments";
import SectionRating from "./SectionRating";

// Note that a rating of '0' is not possible.
const ratingColour = [
  "#55A94E",
  "#55A94E",
  "#51ACB9",
  "#EB9546",
  "#FCD717",
  "#DE5252"
];

const ClickableHeader = styled(CardHeader)`
  :hover {
    cursor: pointer;
  }
`;

const ReadMoreLink = styled(Link)`
  text-transform: uppercase;
  font-weight: 500;
  :hover {
    cursor: pointer;
  }
`;

const StyledCommentIcon = styled(CommentIcon)`
  transform: scale(-1, 1);
  vertical-align: middle;
`;

const Footer = styled.div`
  display: flex;
  .rating-label {
    margin-right: auto;
  }
`;

const useStyles = makeStyles({
  collapse: {
    marginBottom: 16
  },
  content: { marginTop: -16 },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  root: index => ({
    fontSize: 14,
    borderRadius: 0,
    borderTop: `4px solid ${ratingColour[index]}`,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20
  }),
  title: {
    color: "#000",
    fontSize: "20px",
    fontWeight: "500"
  }
});

function CanvasCard({
  children,
  expanded,
  id,
  onHeaderClick,
  onLinkClick,
  title,
  update,
  review,
}) {
  console.log(parseInt(id.substring(7), 10));
  let index = parseInt(id.substring(7), 10)
  const classes = useStyles(index);

  let rate = 0;
  let numComments = 0;
  if (review) {
    review.questionList.map(item => {
      if (item.id === id) {
        rate = item.rating;
        if (item.notes){
          numComments = item.notes.length;
        }
      }
    });
  }
  if (rate < 0) {
    rate = 0;
  }
  return (
    <Card className={classes.root} elevation={0}>
      <ClickableHeader
        action={
          <ExpandMoreIcon className={expanded ? classes.expandOpen : null} />
        }
        classes={{ title: classes.title }}
        title={title}
        id={id}
        onClick={onHeaderClick}
      />
      <CardContent classes={{ root: classes.content }}>
        <Collapse
          classes={{ container: classes.collapse }}
          collapsedHeight="75px"
          in={expanded}
          timeout="auto"
        >
          {children}
          <SectionRating
            id={id}
            update={update}
            review={review}
          ></SectionRating>
          <SectionComments
            id={id}
            update={update}
            review={review}
          ></SectionComments>
        </Collapse>
        {!expanded && (
          <ReadMoreLink
            color="textPrimary"
            onClick={onLinkClick}
            underline="always"
          >
            Read More
          </ReadMoreLink>
        )}
        {!expanded && (
          <>
            <Divider />
            <Footer>
              <span className="rating-label">{`Your Rating: ${rate}/5`}</span>
              <span>
                <StyledCommentIcon /> {numComments} comment(s)
              </span>
            </Footer>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default CanvasCard;
