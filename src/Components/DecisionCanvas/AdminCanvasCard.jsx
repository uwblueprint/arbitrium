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

function AdminCanvasCard({
  children,
  expanded,
  id,
  onHeaderClick,
  onLinkClick,
  title
}) {
  let index = parseInt(id.substring(7), 10);
  const classes = useStyles(index);
  let rating = 0;

  return (
    <Card className={classes.root}>
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
              <span className="rating-label">{`Average Rating: ${rating}/ 5`}</span>
            </Footer>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default AdminCanvasCard;
