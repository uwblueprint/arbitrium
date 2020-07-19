import React from "react";
import styled from "styled-components";
import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import TableIcons from "../Common/TableIcons";

const Container = styled(Paper)`
  table {
    border: 1px solid #cccccc;
  }
`;

const rowStyle = {
  border: "1px solid #cccccc"
};

const columns = [
  { title: "Committee Member", field: "committeeMember" },
  { title: "# of Candidates Reviewed", field: "candidatesReviewed" }
];

function CommitteeReviewTable(props) {
  return (
    <div>
      <MaterialTable
        icons={TableIcons}
        components={{
          Container: (props) => <Container {...props} elevation={0} />
        }}
        columns={columns}
        {...props}
        options={{
          pageSize: 10,
          rowStyle: rowStyle,
          search: true,
          showTitle: false
        }}
      />
    </div>
  );
}

export default CommitteeReviewTable;
