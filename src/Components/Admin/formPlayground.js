import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Authentication/Auth.js";
import { createForm } from "../../requests/forms";
import { defaultFormState } from "../FormCreation/CreateEditFormStateManagement";
import { connect } from "react-redux";
import { createProgram } from "../../requests/update";
import Button from "@material-ui/core/Button";
import PublishTwoToneIcon from "@material-ui/icons/PublishTwoTone";

function FormPlayground({ program, history }) {
  const { currentUser, appUser } = useContext(AuthContext);

  //CreateProgram
  //1. Create Program entry in db
  //2. Add program id to organization
  //3. Create an s3bucket
  //4. Create a form entry in db

  async function createProgram() {
    const data = {
      databaseName: "Demo",
      displayName: "Demo",
      appVersion: 1
    };
    const result = await createProgram(data);
  }

  async function initiateForm() {
    const data = {
      formId: program,
      name: defaultFormState.name,
      description: defaultFormState.description,
      createdBy: appUser.userId,
      draft: true,
      sections: defaultFormState.sections
    };
    const res = await createForm(data);
    console.log(res);
    if (res) {
      history.push("/admin/form/" + program);
    }
  }

  return (
    <div>
      <div className="button-container">
        <Button
          variant="contained"
          color="primary"
          target="_blank"
          value="CreateForm"
          style={{ width: "250px", maxWidth: "250px" }}
          onClick={initiateForm}
        >
          Create form
        </Button>
        <Button variant="outlined" component="label" color="primary">
          <PublishTwoToneIcon />
          Upload File
          <input type="file" style={{ display: "none" }} />
        </Button>
      </div>
      Playground!!!
    </div>
  );
}

const mapStateToProps = (state) => ({
  program: state.program
});

export default connect(mapStateToProps)(FormPlayground);
