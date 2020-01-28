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
    maxWidth: 300,
    maxHeight: 500,
    width: '15wh',
    height: '50vh',
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
  },
  fab: {
    position: 'fixed',
    right: '10px',
    width: '170px',
    height: '50px',
    marginLeft: '80wh',
    marginBottom: '70vh',
    textTransform: 'uppercase',
  },
  popover: {
    position: 'absolute',
    marginLeft: '80vw',
    marginTop: '20vh',
  },
}));


export default function Rubric() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  let open = Boolean(anchorEl);

  const handleClick = event => {
        if (event.currentTarget ) {
          setAnchorEl(true);
        }
        else {
          setAnchorEl(false);
        }
  };

  const handleClose = () => {
    setAnchorEl(false);
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
        <div>{"Rating Scale Arbitrium allows you to rate each of the LOI sections individually, as well as provide an overall rating. The overall rating is mandatory, while"} </div>
        <div>{"rating each section is optional. Please use this rating scale and the criteria on pgs. Refer 2-3 for each application section and overall ranking"} </div>
        <div>{" 5 = The organization meets all of our criteria, I think they would definitely be a good fit for SVP, I have no or very minor concerns\n"} </div>
        <div>{" 4 = The organization meets most of our criteria, I think they are likely a good fit, I have some minor concerns\n"} </div>
        <div>{" 3 = The organization meets some of our criteria, I think they have the potential to be a good fit, I have a few concerns\n"} </div>
        <div>{" 2 = The organization meets a few criteria, I think they are probably not a good fit, I have some significant concerns\n"} </div>
        <div>{" 1 = The organization does not meet our criteria, I don’t think they would be a good fit, I have many significant concerns"} </div>
        </Typography>
      </StyledPopover>
    </div>
  );
}
