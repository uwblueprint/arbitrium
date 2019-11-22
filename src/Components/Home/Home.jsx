import React, { Component } from 'react';
import Rating from "../Common/Rating";

export default class Home extends Component {
    constructor(props){
        super(props);
        this.rating = this.rating.bind(this);
    }

    rating(){
        return 2;
    }

    render() {
        return (
            <div>
                <Rating changeRating={this.rating}/>
            </div>
        );
    }
}