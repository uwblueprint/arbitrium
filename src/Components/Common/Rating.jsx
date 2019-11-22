import React, {Component} from 'react';
import PropTypes from 'prop-types'
import "./Rating.css"
import { ReactComponent as Sad } from '../../Assets/sad.svg';
import { ReactComponent as Neutral } from '../../Assets/neutral.svg';
//import { ReactComponent as Happy } from '../../Assets/happy.svg';
import { ReactComponent as Laughing } from '../../Assets/laughing.svg';
import { ReactComponent as Love } from '../../Assets/love.svg';


const Rating = ({changeRating}) =>(
    <div className="rating-cont">
        <div className="rating-rect" onClick={changeRating}><Sad/></div>
        <div className="rating-rect" onClick={changeRating}><Neutral/></div>
        {/*<div className="rating-rect" onClick={changeRating}><Happy/></div>*/}
        <div className="rating-rect" onClick={changeRating}><Laughing/></div>
        <div className="rating-rect" onClick={changeRating}><Love/></div>
    </div>
);

Rating.propTypes = {
    changeRating: PropTypes.func.isRequired
};

export default Rating;