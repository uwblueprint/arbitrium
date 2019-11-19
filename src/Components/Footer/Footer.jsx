import React, {Component} from 'react';

export default class Footer extends Component {
    //constructor(props) {
    //    super(props);
    //}

    render(){


        let questions = this.props.getQuestionsAPI;
        console.log(questions);
        return(
            <div className="footer_main">
                <p>this is a footer</p>
            </div>
        )
    }
}
