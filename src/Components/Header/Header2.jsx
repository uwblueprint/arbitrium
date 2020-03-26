import React, {useState, useEffect} from 'react';
import Menu from './Menu';
import FlowSelector from "../FlowSelector/FlowSelector";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { makeStyles } from "@material-ui/core/styles";

const APPLICATION_STAGE = {
  interest: "letter_of_interest",
  full: "full_application"
};

//return current application stage from path
function getNavId(pathname) {
  const parts = pathname.split("/");
  return (parts.length>=2 && parts[2] ==="full") ? APPLICATION_STAGE.full : APPLICATION_STAGE.interest;
}

const useStyles = makeStyles({
  selected: {
    borderColor: "#005EB8"
  },
  unselected: {
    borderColor: "transparent"
  }
});

const Header2 = ({ pathname, push }) => {
    const [selected, setSelected] = useState(getNavId(pathname));
    const styles = useStyles();
    
    useEffect(() => {
      setSelected(getNavId(pathname));
    }, [pathname]);

    //Update selected state, and load new path (attach /full in the path)
    const onNavClick = (id) => {
        setSelected(id);

        const parts = pathname.split("/");
        const pathFirstPart = parts[1]; //submissions | applications
        const pathAddedPart = (id === APPLICATION_STAGE.full)? "/full" : "";
        // ie. If submissions/full/abc -> pathSecondPart does not include 'full' (it is 'abc')
        let pathSecondPart = "";
        if(parts.length >= 3 && parts[2] ==="full")
            pathSecondPart = parts.slice(3).join("/");
        else if(parts.length >= 2)
            pathSecondPart = parts.slice(2).join("/")
        const forwardedPath = "/"+pathFirstPart+pathAddedPart+"/"+pathSecondPart;
        push(forwardedPath);
    };

    return (
        <div className="header2-container">
        <FlowSelector>
            <button 
              id={APPLICATION_STAGE.interest}
              className={selected === APPLICATION_STAGE.interest ? styles.selected : styles.unselected}
              onClick={()=>{onNavClick(APPLICATION_STAGE.interest)}}
            >
                1. Letter of Interest
            </button>
            <button
              id={APPLICATION_STAGE.full}
              className={selected === APPLICATION_STAGE.full ? styles.selected : styles.unselected}
              onClick={()=>{onNavClick(APPLICATION_STAGE.full)}}
            >
                2. Full Application
            </button>
        </FlowSelector>
        </div>
    );
}

export default connect(
  state => ({
    pathname: state.router.location.pathname
  }),
  { push }
)(Header2);