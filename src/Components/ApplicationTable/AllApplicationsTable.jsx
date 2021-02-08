import React, { useRef, useContext, useState } from "react";
import styled from "styled-components";
import MaterialTable from "material-table";
import { Paper, Select, MenuItem, InputLabel } from "@material-ui/core";
import TableIcons from "../Common/TableIcons";
import GetApp from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import { CSVLink } from "react-csv";
import { ProgramContext } from "../../Contexts/ProgramContext";

const HiddenCSVLink = styled(CSVLink)`
  display: none;
`;

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

function AllApplicationsTable({
  reviewCount,
  applicationCount,
  data,
  ...props
}) {
  const appsDownloadLink = useRef();
  const applicationsCSVFilename = `Applications - ${moment().format(
    "DD-MM-YYYY hh-mm-ss"
  )}.csv`;
  const programContext = useContext(ProgramContext);
  const [downloadType, setDownloadType] = useState("csv");

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
      title: (
        <>
          <ExportWrapper>
            <InputLabel className="dropdown-text"></InputLabel>
            <Select value={"csv"}>
              <MenuItem value={"csv"} onSelect={() => setDownloadType("csv")}>
                Download as CSV
              </MenuItem>
              <MenuItem value={"pdf"} onSelect={() => setDownloadType("pdf")}>
                Download as PDF
              </MenuItem>
            </Select>
            <IconButton onClick={exportAllData} size="small">
              <GetApp />
            </IconButton>
          </ExportWrapper>
        </>
      ),
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

  function exportAllData() {
    if (downloadType === "csv") {
      appsDownloadLink.current.link.click();
    } else if (downloadType === "pdf") {
      // TODO: export pdf logic
    }
  }

  return (
    <Wrapper>
      <HiddenCSVLink
        ref={appsDownloadLink}
        filename={applicationsCSVFilename}
        data={programContext.applications.map(({ _id, ...item }) => item)}
      />
      <MaterialTable
        key={reviewCount + applicationCount}
        icons={TableIcons}
        components={{
          Container: (props) => <Container {...props} elevation={0} />
        }}
        columns={columns}
        data={data}
        {...props}
        title={
          (Number.isInteger(reviewCount) ? reviewCount : 0) +
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
