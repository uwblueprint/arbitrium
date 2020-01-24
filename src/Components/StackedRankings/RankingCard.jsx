import React from 'react';
import styled from "styled-components";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent"
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    
    root: {
        marginLeft: "168px",
        maxWidth: 800,
        minHeight: 56,
        borderRadius: 5,
        boxShadow: "1px 1px 2px 1px #cccccc",
        marginBottom: 12
    },

    company: {
        float: "left",
        marginLeft: "64px",
        color: "#000",
        fontFamily: "Roboto",
        lineHeight: "20px",
        fontSize: "14px",
        fontWeight: "normal"
      },
    
    rating: {
        float: "left",
        marginLeft: "213px",
        color: "#000",
        fontFamily: "Roboto",
        lineHeight: "20px",
        fontSize: "14px",
        fontWeight: "normal"
      },
    
    link: {
        float: "right",
        color: "#000",
        fontFamily: "Roboto",
        lineHeight: "20px",
        fontSize: "14px",
        fontWeight: "normal"
    }
    
    });

function RankingCard() {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.company}>a company</div>
                <div className={classes.rating}>Your Rating: 5/5</div>
                <div className={classes.link}>link here</div>
            </CardContent>
        </Card>);
}

export default RankingCard;