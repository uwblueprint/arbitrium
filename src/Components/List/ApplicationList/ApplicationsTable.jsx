import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { TableRow, TableHead, TableCell, TableBody, TableSortLabel } from '@material-ui/core';
import { loadApplications } from '../../../Actions/index';

export class ApplicationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Sample data
            applications: [
                {
                    name: 'UW Blueprint',
                    rating: '5.0',
                    lastReviewed: 'October 31, 2019',
                    url: 'https://uwblueprint.org'
                },
                {
                    name: 'Company A',
                    rating: '4.0',
                    lastReviewed: 'October 21, 2019',
                    url: 'https://uwblueprint.org'
                },
                {
                    name: 'Company B',
                    rating: '2.0',
                    lastReviewed: 'October 11, 2019',
                    url: 'https://uwblueprint.org'
                },
                {
                    name: 'Company C',
                    rating: '5.0',
                    lastReviewed: 'October 1, 2019',
                    url: 'https://uwblueprint.org'
                },
                {
                    name: 'Company D',
                    rating: '3.0',
                    lastReviewed: 'October 13, 2019',
                    url: 'https://uwblueprint.org'
                }
            ]
        }


    }

    componentDidMount() {
        // API call to Blitzen here, then dispatch this.props.loadApplications to store data to Redux store
    }

    render() {
        //this is definetly bad practice, shouldn't setState in render() and also setState() should be called
        //leaving this here because the logic works
        this.state.applications.sort((a,b) => (a.name > b.name) ? 1: -1);
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Applicant Name</TableCell>
                            <TableCell align="left">Rating</TableCell>
                            <TableCell align="left">Last reviewed</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.applications.map(application => (
                            <TableRow hover>
                                <TableCell component="th" scope="row">
                                    <TableSortLabel>
                                        {application.name}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="left">{application.rating}</TableCell>
                                <TableCell align="left">{application.lastReviewed}</TableCell>
                                <TableCell align="left"><a rel="noopener noreferrer" target="_blank" href={application.url}>Open application</a></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}


const mapStateToProps = state => ({
    applications: state.applications,
  });

const mapDispatchToProps = dispatch => ({
    loadApplications: payload => dispatch(loadApplications(payload))
  });

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationList)
