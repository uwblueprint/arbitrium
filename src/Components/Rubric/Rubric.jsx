import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import styled from "styled-components";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';





const StyledTooltip = styled(Tooltip)` 
  title: Rubric; 
`;

const StyledPopover = styled(Popover)`
  
`;

const StyledCard = styled(Card)`
  color: black; 
`;


const StyledFab = styled(Fab)`
`;


const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
    maxWidth: 500,
    maxHeight: 450,
    marginTop: 25
  },
  card: {
    display: 'flex',
    backgroundColor: 'black'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    color: 'white',
    top: 0,
    left: 0,
    height: 25
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  fab: {
    position: 'fixed',
    right: '120px',
    width: '170px',
    height: '50px',
    textTransform: 'uppercase',
  },
  popover: {
    // position: 'auto'
  } 
}));

export default function Rubric() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  let open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    console.log(this)
    // this.forceUpdate(); 
  };

  
  const id = Boolean(anchorEl) ? 'simple-popover' : undefined;
  
  return (
    <div>
      <StyledFab className={classes.fab} variant="extended" color="primary" onClick={handleClick}>
        Rubric
      </StyledFab>

      <StyledPopover 
        className={classes.popover}
        transformOrigin={{
          vertical: 'bottom', 
          horizontal: 'right', 
        }}
        container={ () => {
         console.log(Boolean(anchorEl))
         return anchorEl ? anchorEl.parentNode : null 
        }}
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose.bind(this)}
      > 
        <StyledCard className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                Rubric
              </Typography>
              {/* <AddIcon> */}
            </CardContent>
          </div>
        </StyledCard>
        <Typography className={classes.typography}>
          Advertising
          References
          newsletter (British English, American English): Cambridge English Dictionary, retrieved on 2017-05-18.
          "History of publishing - the first newspapers". Britannica. Retrieved 2019-11-26.
          Endres, Kathleen L. (2009). "Newsletters, Newspapers, Pamphlets". Journalism and Mass Communication, Volume 1. Encyclopedia of Life Support Systems. UNESCO. pp. 90–104. ISBN 978-1-905839-71-1.
          Best Practices for Developing Effective E-Newsletter Content on the website of the University of Washington, retrieved on 2018-05-09.
          Smith, Ronald D. (2004-09-15). Strategic Planning for Public Relations. ISBN 9781135606077.
          "What is newsletter marketing and why it's important for ecommerce".
          "Editorial Policies for Organizational Newsletters".
          Endres, Kathleen L. (2009). "Newsletters, Newspapers, Pamphlets". Journalism and Mass Communication, Volume 1. Encyclopedia of Life Support Systems. UNESCO. pp. 90–104. ISBN 978-1-905839-71-1.
          Best Practices for Developing Effective E-Newsletter Content on the website of the University of Washington, retrieved on 2018-05-09.
          Smith, Ronald D. (2004-09-15). Strategic Planning for Public Relations. ISBN 9781135606077.
          "What is newsletter marketing and why it's important for ecommerce".
          "Editorial Policies for Organizational Newsletters".
        </Typography>
      </StyledPopover>
    </div>
  );
}
