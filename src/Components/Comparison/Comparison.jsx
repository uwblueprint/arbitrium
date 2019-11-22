import { connect } from 'react-redux'
import React, { Component } from 'react';
import {changeRating} from "../../Actions";
import Rating from "../Common/Rating";

class Comparison extends Component {
    constructor(props){
        super(props);
        this.rating = this.rating.bind(this);
    }

    rating(rating, question){
        changeRating(rating, question);
    }

    render() {
        return (
            <div>
                <Rating changeRating={this.rating}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    changeRating: (rating, question) => dispatch(changeRating(rating, question)),
})

export default connect(
    null,
    mapDispatchToProps
)(Comparison)