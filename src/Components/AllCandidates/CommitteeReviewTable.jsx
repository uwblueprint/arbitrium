import React, { forwardRef } from "react";
import styled from "styled-components";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDropDown";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
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

/* eslint-disable react/display-name */
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const columns = [
  { title: "Average Rank", field: "ranking" },
  { title: "Candidate Name", field: "name" },
  { title: "Average Ranking", field: "ranking" },
  {
    title: "# of Reviews",
    field: "reviews",
    // render: (rowData) => {
    //   if (rowData.programAccess.length === 0) {
    //     return "None";
    //   }
    //   if (rowData.programAccess.length > 1) {
    //     return (
    //       <div>
    //         {rowData.programAccess[0]}
    //         <OverflowTooltip
    //           title={
    //             <Overflow>
    //               {rowData.programAccess.slice(1).map((program, i) => (
    //                 <div key={i}>{program}</div>
    //               ))}
    //             </Overflow>
    //           }
    //         >
    //           <span>{rowData.programAccess.length - 1} more</span>
    //         </OverflowTooltip>
    //       </div>
    //     );
    //   }
    //   return rowData.programAccess.join(", ");
    // }
  },
  {
    title: "",
    field: "candidateLink",
    sorting: false,
    searchable: false
  }
];

function UserManagementTable(props) {
  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        components={{
          Container: (props) => <Container {...props} elevation={0} />
        }}
        columns={columns}
        {...props}
        options={{
          pageSize: Math.min(10, props.data.length),
          rowStyle: rowStyle,
          search: true,
          showTitle: false
        }}
      />
    </div>
  );
}

export default UserManagementTable;
