import React from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import * as userRoles from "../../Constants/UserRoles";

const roles = [
  { id: userRoles.ADMIN, name: userRoles.rolesMap[userRoles.ADMIN] },
  {
    id: userRoles.ADMIN_REVIEWER,
    name: userRoles.rolesMap[userRoles.ADMIN_REVIEWER]
  },
  { id: userRoles.REVIEWER, name: userRoles.rolesMap[userRoles.REVIEWER] },
  { id: userRoles.GUEST, name: userRoles.rolesMap[userRoles.GUEST] }
];

const onlyAdminRoles = [
  { id: userRoles.ADMIN, name: userRoles.rolesMap[userRoles.ADMIN] },
  {
    id: userRoles.ADMIN_REVIEWER,
    name: userRoles.rolesMap[userRoles.ADMIN_REVIEWER]
  }
];

const StyledSelect = styled(Select)`
  width: 100%;
`;

function UserRoleSelect({ id, value, onChange, onlyAdmin = false }) {
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
      {onlyAdmin
        ? onlyAdminRoles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))
        : roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
    </StyledSelect>
  );
}

export default UserRoleSelect;
