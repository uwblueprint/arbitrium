import React, { useState } from "react";
import styled from "styled-components";
import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import TableIcons from "../../Common/TableIcons";
import moment from "moment";

const Container = styled(Paper)`
  table {
    border: 1px solid #cccccc;
  }
`;

const Wrapper = styled.div`
  position: "flex";
  .MuiToolbar-gutters {
    padding-left: 0px;
  }
`;

const rowStyle = {
  border: "1px solid #cccccc"
};

function AllApplicationsTable({ applicationCount, reviewCount, ...props }) {
  const [page, setpage] = useState(10);

  const columns = [
    { title: "Applicant Name", field: "applicantName" },
    { title: "Rating (/5)", field: "rating" },
    {
      title: "Last Edited",
      field: "lastEdited",
      render: (rowData) => {
        const date = rowData.lastEdited;
        if (!date) return "Never";
        return moment(date)
          .toDate()
          .toString()
          .substring(4, 16);
      }
    },
    {
      title: "",
      field: "applicantLink",
      sorting: false,
      searchable: false,
      export: false
    }
  ];

  const options = {
    pageSize: applicationCount > 0 ? Math.min(10, applicationCount) : 10,
    rowStyle: rowStyle,
    search: true,
    showTitle: true
  };
  return (
    <Wrapper>
      <MaterialTable
        icons={TableIcons}
        components={{
          Container: (props) => <Container {...props} elevation={0} />
        }}
        columns={columns}
        {...props}
        title={reviewCount + "/" + applicationCount + " candidates rated"}
        options={options}
      ></MaterialTable>
    </Wrapper>
  );
}

export default AllApplicationsTable;
