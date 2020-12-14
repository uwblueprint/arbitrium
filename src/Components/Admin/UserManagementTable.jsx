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

const columns = [
  { title: "Name", field: "name" },
  { title: "Email", field: "email" },
  { title: "Role", field: "role" },
  {
    title: "",
    field: "userLink",
    sorting: false,
    searchable: false,
    export: false
  }
];

function UserManagementTable(props) {
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
          pageSize: Math.min(10, props.data.length),
          rowStyle: rowStyle,
          search: true,
          showTitle: false,
          exportButton: true,
          exportAllData: true
        }}
      />
    </div>
  );
}

export default UserManagementTable;
