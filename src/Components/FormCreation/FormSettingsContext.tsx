import React from "react";
import { FormSettingsType } from "../../Types/FormTypes";

const FormSettingsContext = React.createContext<FormSettingsType>({
  themeColour: "2261AD",
  headerImage: null,
  confirmationMessage: "Your response has been recorded."
});

export default FormSettingsContext;
