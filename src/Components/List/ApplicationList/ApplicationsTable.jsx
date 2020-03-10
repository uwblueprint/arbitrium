import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { TableRow, TableHead, TableCell, TableBody } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import moment from "moment";

const GET = require("../../../requests/get");

const APPLICATION_STAGE = {
  LETTER_OF_INTEREST: 0,
  FULL_APPLICATION: 1
};

const Wrapper = styled.div`
  margin-top: 150px;
  padding: 0 136px;
  h1 {
    font-size: 24px;
    font-weight: normal;
  }
  .table {
    max-width: 864px;
    margin: 0 auto;
  }
  table.MuiTable-root {
    border: 1px solid #cccccc;
  }
  button {
    max-width: 200px;
    padding: 5px 5px;
    text-transform: uppercase;
    font-size: 15px;
  }
`;

function formatDate(date) {
  if (date == null) return null;
  return moment(date)
    .toDate()
    .toString()
    .substring(4, 16);
}

function ApplicationTable({ history, user }) {
  // Applications, with reviews attached
  const [applications, setApps] = useState([]);

  useEffect(() => {
    GET.getApplicationTableData(user).then(res => {
      if (Array.isArray(res)) setApps(res);
    });
  }, [user]);

  return (
    <Wrapper className="application-list">
      <Paper>
        <h1>All Applicants</h1>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "25%" }}>Applicant Name</TableCell>
              <TableCell style={{ width: "25%" }} align="left">
                Rating
              </TableCell>
              <TableCell style={{ width: "25%" }} align="left">
                Last Edited
              </TableCell>
              <TableCell style={{ width: "25%" }} align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications
              ? applications.map(application => (
                  <TableRow hover key={application._id}>
                    <TableCell component="th" scope="row">
                      {application["Organization Name"]}
                    </TableCell>
                    <TableCell align="left">
                      {application["rating"] || "Not Rated"}
                    </TableCell>
                    <TableCell align="left">
                      {formatDate(application["lastReviewed"]) || "Never"}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        color="primary"
                        target="_blank"
                        value="OpenApplication"
                        onClick={() => {
                          history.push("submissions/" + application._id);
                        }}
                      >
                        Open
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : "ERROR LOADING APPLICATIONS FROM DATABASE"}
          </TableBody>
        </Table>
      </Paper>
    </Wrapper>
  );
}

export default ApplicationTable;
