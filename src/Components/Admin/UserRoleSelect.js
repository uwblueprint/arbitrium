import React from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import * as userRoles from "../../Constants/UserRoles";

// TODO: fetch from mongo
const roles = [
  { name: "Admin", id: userRoles.ADMIN },
  { name: "Admin & Reviewer", id: userRoles.ADMIN_REVIEWER },
  { name: "Reviewer", id: userRoles.REVIEWER },
  { name: "Guest", id: userRoles.GUEST }
];

const StyledSelect = styled(Select)`
  width: 100%;
`;

function UserRoleSelect({ id, value, onChange }) {
  return (
    <StyledSelect
      native
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
      {roles.map((role) => (
        <option key={role.id} value={role.id}>
          {role.name}
        </option>
      ))}
    </StyledSelect>
  );
}

export default UserRoleSelect;
