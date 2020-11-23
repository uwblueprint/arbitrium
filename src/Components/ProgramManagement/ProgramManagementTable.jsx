import React from "react";
import styled from "styled-components";
import MaterialTable from "material-table";
import TableIcons from "../Common/TableIcons";
import { Paper, Tooltip } from "@material-ui/core";

const Container = styled(Paper)`
  table {
    border: 1px solid #cccccc;
  }
`;

const OverflowTooltip = styled(Tooltip)`
  color: #2261ad;
  margin: 0 1em;
  .MuiTooltip-popper {
    padding: 16px;
  }
`;

const Overflow = styled.div`
  font-size: 12px;
  padding: 16px;
  div {
    margin-bottom: 0.4em;
  }
`;

const rowStyle = {
  border: "1px solid #cccccc"
};

const columns = [
  { title: "Program Name", field: "name" },
  { title: "Organization", field: "organization" },
  { title: "Role", field: "role" },
  { title: "Status", field: "status" },
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
  { title: "Status", field: "status" },
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
          search: true,
          showTitle: false,
          exportButton: true,
          exportAllData: true
        }}
      />
    </div>
  );
}

export default ProgramManagementTable;
