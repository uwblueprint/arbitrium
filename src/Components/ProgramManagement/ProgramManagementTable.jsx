import React from "react";
import styled from "styled-components";
import MaterialTable from "material-table";
import TableIcons from "../Common/TableIcons";
import { Paper } from "@material-ui/core";

const Container = styled(Paper)`
  table {
    border: 1px solid #cccccc;
  }
`;

const rowStyle = {
  border: "1px solid #cccccc"
};
const columnStyle = {
  width: "100%"
};

const columns = [
  {
    title: "Program Name",
    field: "name",
    cellStyle: { width: 500, maxWidth: 800 },
    headerStyle: { width: 500, maxWidth: 800 }
  },
  { title: "Organization", field: "organization" },
  { title: "Role", field: "role" },
  // { title: "Status", field: "status" },
  {
    title: "",
    field: "link",
    sorting: false,
    searchable: false,
    export: false
  }
];

const columnsArchived = [
  { title: "Program Name", field: "name" },
  { title: "Organization", field: "organization" },
  { title: "Role", field: "role" },
  { title: "Archived", field: "archived" },
  {
    title: "",
    field: "link",
    sorting: false,
    searchable: false,
    export: false
  }
];

function ProgramManagementTable({ archived, ...props }) {
  return (
    <div>
      <MaterialTable
        icons={TableIcons}
        components={{
          Container: (props) => <Container {...props} elevation={0} />
        }}
        columns={archived ? columnsArchived : columns}
        {...props}
        options={{
          pageSize: Math.min(5, props.data.length),
          rowStyle: rowStyle,
          columnStyle: columnStyle,
          search: true,
          showTitle: false,
          paging: false
        }}
      />
    </div>
  );
}

export default ProgramManagementTable;
