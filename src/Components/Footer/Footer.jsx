import React, {Component} from 'react';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            views: 0
        };
    }

    addVisitor = () => {
        // let realTimeDB = this.props.db.database().ref('website visitors');
        // realTimeDB.push({message: 5});

        let storageDB = this.props.db.collection("Website Visitors").doc(
            "PINRPcQ061nUISIIyeLj"
        );

        storageDB.get().then(function(doc) {
            if (doc.exists) {
                this.setState({"views": doc.data().visitors});
                console.log(doc.data().visitors);
                storageDB.set({
                    visitors: doc.data().visitors + 1
                });
            }
        }.bind(this)).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    componentDidMount() {
        //this.addVisitor();
    }

    render() {
        let madeby = "Made by ";
        return (
            <header>
                <div className="footer-container">
                    <div className="tagline"> {madeby}
                        <a href="https://uwblueprint.org/">UW Blueprint</a>
                    </div>
                </div>
            </header>
        );
    }
}
