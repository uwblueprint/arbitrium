import React from "react";
import styled from "styled-components";
import MaterialTable from "material-table";
import {
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@material-ui/core";
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
  .MuiTypography-h6 {
    font-size: 14px;
    font-weight: 400;
  }
`;

const rowStyle = {
  border: "1px solid #cccccc"
};

const ExportWrapper = styled.div`
  .dropdown-text {
    color: #2261ad;
    text-align: center;
    font-size: 14px;
    letter-spacing: 1.25px;
    position: absolute;
    height: 16px;
    right: 42px;
  }
  .dropdown {
    width: 180px;
    position: absolute;
    top: 0%;
    bottom: 0%;
    left: 0%;
    right: 0%;
  }
`;

function AllApplicationsTable({ applicationCount, reviewCount, ...props }) {
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
      title: null,
      /*}
        <ExportWrapper>
          <FormControl
            variant="outlined"
            size="small"
            margin="dense"
            className="dropdown"
          >
            <InputLabel className="dropdown-text"></InputLabel>
            <Select value="csv" onChange={(e) => console.log(e)}>
              <MenuItem value={"csv"}>Download as CSV</MenuItem>
              <MenuItem value={"pdf"}>Download as PDF</MenuItem>
            </Select>
          </FormControl>
        </ExportWrapper>
      */
      field: "applicantLink",
      sorting: false,
      searchable: false,
      export: false
    }
  ];

  console.log(applicationCount);
  const options = {
    pageSize: applicationCount > 0 ? Math.min(10, applicationCount) : 10,
    rowStyle: rowStyle,
    search: true,
    showTitle: true
  };

  console.log(reviewCount);
  return (
    <Wrapper>
      <MaterialTable
        key={reviewCount + applicationCount}
        icons={TableIcons}
        components={{
          Container: (props) => <Container {...props} elevation={0} />
        }}
        columns={columns}
        {...props}
        title={
          (reviewCount === {} ? 0 : reviewCount) +
          "/" +
          applicationCount +
          " candidates rated"
        }
        options={options}
      ></MaterialTable>
    </Wrapper>
  );
}

export default AllApplicationsTable;
