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
  { title: "User Name", field: "name" },
  { title: "Email", field: "email" },
  { title: "Role", field: "role" },
  {
    title: "Program Access",
    field: "programs",
    export: false,
    render: (rowData) => {
      if (rowData.programAccess.length === 0) {
        return "None";
      }
      if (rowData.programAccess.length > 1) {
        return (
          <div>
            {rowData.programAccess[0]}
            <OverflowTooltip
              title={
                <Overflow>
                  {rowData.programAccess.slice(1).map((program, i) => (
                    <div key={i}>{program}</div>
                  ))}
                </Overflow>
              }
            >
              <span>{rowData.programAccess.length - 1} more</span>
            </OverflowTooltip>
          </div>
        );
      }
      return rowData.programAccess.join(", ");
    }
  },
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
