import React from "react";
import styled from "styled-components";
import MaterialTable from "material-table";
import TableIcons from "../Common/TableIcons";
import { Paper } from "@material-ui/core";

const Container = styled(Paper)`
  table {
    border: 1px solid #cccccc;
    margin-bottom: 48px;
  }
`;

const rowStyle = {
  border: "1px solid #cccccc"
};

const columnStyle = {
  maxWidth: 20
};

//There is a bug in material-table that causes the browser to freeze when clicking buttons in the cell
//Quick-fix: Move columns array directly into props, however, the width doesn't work anymore. :(

//Issue: https://github.com/mbrn/material-table/issues/2451
//Maintainer is inactive
//Community Core with a fix is here: https://github.com/material-table-core/core/pull/5/files

// const columns = [
//   {
//     title: "Program name",
//     field: "name",
//     cellStyle: { minWidth: 300, maxHeight: 52 },
//     headerStyle: { minWidth: 300 }
//   },
//   {
//     title: "Organization",
//     field: "organization"
//   },
//   { title: "Role", field: "role" },
//   {
//     title: "",
//     field: "link",
//     sorting: false,
//     searchable: false,
//     export: false
//   }
// ];

function ProgramManagementTable({ ...props }) {
  return (
    <div>
      <MaterialTable
        icons={TableIcons}
        components={{
          Container: (props) => <Container {...props} elevation={0} />
        }}
        columns={[
          {
            title: "Program name",
            field: "name"
          },
          {
            title: "Organization",
            field: "organization"
          },
          { title: "Role", field: "role" },
          {
            title: "",
            field: "link",
            sorting: false,
            searchable: false,
            export: false
          }
        ]}
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
