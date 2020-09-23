import React from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// TODO: fetch from mongo
const userRoles = [
  { name: "Admin", id: "Admin" },
  { name: "Reviewer", id: "User" }
];

const StyledSelect = styled(Select)`
  width: 100%;
`;

function UserRoleSelect({ id, value, onChange }) {
  return (
    <StyledSelect
      autoWidth={false}
      id={id}
      value={value}
      MenuProps={{
        elevation: 0,
        PaperProps: {
          style: {
            backgroundColor: "FAFAFA",
            boxShadow: "0 3px 5px 3px #cccccc"
          }
        }
      }}
      onChange={onChange}
      variant="outlined"
    >
      {userRoles.map((role) => (
        <MenuItem key={role.id} value={role.id}>
          {role.name}
        </MenuItem>
      ))}
    </StyledSelect>
  );
}

export default UserRoleSelect;
