import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { TableRow, TableHead, TableCell, TableBody } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Spinner from "react-spinner-material";
import moment from "moment";

const GET = require("../../../requests/get");

const Wrapper = styled.div`
  margin-top: 150px;
  padding: 0 136px;
  text-align: left;
  padding-bottom: 200px;
  h1 {
    font-size: 24px;
    font-weight: normal;
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
    GET.getApplicationTableData(user).then((res) => {
      if (Array.isArray(res)) setApps(res);
    });
  }, [user]);
  return (
    <Wrapper>
      <Paper>
        {applications ? (
          <div>
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
              {applications
                ? applications.map((application) => (
                    <TableBody key={application._id}>
                      <TableRow hover>
                        <TableCell component="th" scope="row">
                          {application["Organization Name (legal name)"]}
                        </TableCell>
                        <TableCell align="left">
                          {application.rating && application.rating > 0
                            ? application.rating
                            : "Not Rated"}
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
                    </TableBody>
                  ))
                : null}
            </Table>
          </div>
        ) : (
          <div>
            <h1>Loading Applications...</h1>
            <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
          </div>
        )}
      </Paper>
    </Wrapper>
  );
}

export default ApplicationTable;
