import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import { loadApplications } from '../../../Actions/index';
import "./ApplicationsTable.css";

const APPLICATION_STAGE = {
    LETTER_OF_INTEREST: 0,
    FULL_APPLICATION: 1
}

// Test data
const data = [
        {
            name: 'UW Blueprint',
            rating: '5.0',
            lastReviewed: 'October 31, 2019',
            url: 'https://uwblueprint.org',
            stage: APPLICATION_STAGE.LETTER_OF_INTEREST
        },
        {
            name: 'Company A',
            rating: '4.0',
            lastReviewed: 'October 21, 2019',
            url: 'https://uwblueprint.org',
            stage: APPLICATION_STAGE.LETTER_OF_INTEREST
        },
        {
            name: 'Company B',
            rating: '2.0',
            lastReviewed: 'October 11, 2019',
            url: 'https://uwblueprint.org',
            stage: APPLICATION_STAGE.LETTER_OF_INTEREST
        },
        {
            name: 'Company C',
            rating: '5.0',
            lastReviewed: 'October 1, 2019',
            url: 'https://uwblueprint.org',
            stage: APPLICATION_STAGE.LETTER_OF_INTEREST
        },
        {
            name: 'Company D',
            rating: '3.0',
            lastReviewed: 'October 13, 2019',
            url: 'https://uwblueprint.org',
            stage: APPLICATION_STAGE.LETTER_OF_INTEREST
        }
];

export class ApplicationList extends Component {

    componentDidMount() {
        // API call to Blitzen here, then dispatch this.props.loadApplications to store data to Redux store
        // Assume API returns the test data

        console.log("Loading applications")
        console.log(this.props);

        this.props.getAllApplicationsAPI().then((res) => {
            console.log(res);
            this.props.loadApplications(res)
        });

        console.log(this.props);
    }

    render() {
      console.log(this.props);
        return (
          <div className="application-list">
            <Paper align = "left">
                All Applicants
                <Table className="table2">
                    <TableHead>
                        <TableRow>
                            <TableCell>Applicant Name</TableCell>
                            <TableCell align="left">Rating</TableCell>
                            <TableCell align="left">Last reviewed</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.applications && this.props.applications.applications ?
                          this.props.applications.applications.map(application => (
                            <TableRow hover>
                                <TableCell component="th" scope="row">
                                    {application.City}
                                </TableCell>
                                <TableCell align="left">{application.Timestamp}</TableCell>
                                <TableCell align="left">{application.Linkedin}</TableCell>
                                <TableCell align="left"><a rel="noopener noreferrer" target="_blank" href={application.url}>Open application</a></TableCell>
                            </TableRow>

                        ))
                        : "hi"
                      }
                    </TableBody>
                </Table>
            </Paper>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    applications: state.applications,
  });

const mapDispatchToProps = dispatch => ({
    loadApplications: payload => dispatch(loadApplications(payload))
  });

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationList);
